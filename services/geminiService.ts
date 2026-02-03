import { GoogleGenAI } from "@google/genai";
import { GenerationSettings, IdentityStrength, StylizeLevel } from '../types';
import { SCENES, OUTFITS, MOODS, NEGATIVE_PROMPT } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const buildPrompt = (settings: GenerationSettings): string => {
  const scene = SCENES.find(s => s.id === settings.sceneId)?.promptFragment || '';
  const outfit = OUTFITS.find(o => o.id === settings.outfitId)?.promptFragment || '';
  const mood = MOODS.find(m => m.id === settings.moodId)?.promptFragment || '';
  
  let identityInstruction = "";
  switch(settings.identityStrength) {
    case IdentityStrength.LOW:
      identityInstruction = "Create a person resembling the reference photo.";
      break;
    case IdentityStrength.MEDIUM:
      identityInstruction = "Use the uploaded reference photo. Preserve the person's identity and facial features reasonably well.";
      break;
    case IdentityStrength.HIGH:
      identityInstruction = "STRICTLY use the uploaded reference photo. Preserve the SAME person identity, facial geometry, proportions, and distinguishing features (moles, scars). Do not change age or ethnicity.";
      break;
    case IdentityStrength.MAX:
      identityInstruction = "EXTREME IDENTITY PRESERVATION. The output MUST look exactly like the person in the reference photo. Copy facial structure, eyes, nose, and mouth exactly. Do not morph the face.";
      break;
  }

  let styleInstruction = "Professional portrait, 85mm lens, high detail.";
  if (settings.stylizeLevel === StylizeLevel.REALISTIC) {
    styleInstruction += " Hyper-realistic, 8k resolution, raw photo style, natural skin texture.";
  } else if (settings.stylizeLevel === StylizeLevel.ARTISTIC) {
    styleInstruction += " Digital art style, slightly stylized, vibrant colors, artistic lighting.";
  }

  // Combine components
  const prompt = `
    ${identityInstruction}
    ${scene}
    The person is ${outfit}
    ${mood}
    ${styleInstruction}
    ${settings.customPrompt ? `Additional details: ${settings.customPrompt}` : ''}
    
    Negative prompt: ${NEGATIVE_PROMPT}
  `;

  return prompt;
};

export const generateImages = async (
  referenceImageBase64: string,
  settings: GenerationSettings,
  count: number = 2
): Promise<{ images: string[], promptUsed: string }> => {
  const ai = getClient();
  const model = 'gemini-2.5-flash-image';
  
  const finalPrompt = buildPrompt(settings);
  const cleanBase64 = referenceImageBase64.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, '');

  const generatedImages: string[] = [];

  // Parallel requests to simulate batch generation (since flash-image implies singular generation usually)
  const promises = Array.from({ length: count }).map(async () => {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
            { text: finalPrompt }
          ]
        },
        config: {
          // Note: aspectRatio is not directly supported in generateContent for flash-image in all versions
          // but we include it in the prompt or config if the specific version supports imageConfig.
          // For safety with the 'banana' model, we rely on the prompt or post-processing, 
          // but strictly speaking, gemini-2.5-flash-image accepts imageConfig in newer revisions.
          // We will attempt to pass it.
          imageConfig: {
             aspectRatio: settings.aspectRatio
          }
        }
      });

      // Extract image
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
             return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
      return null;
    } catch (e) {
      console.error("Generation error:", e);
      return null;
    }
  });

  const results = await Promise.all(promises);
  results.forEach(res => {
    if (res) generatedImages.push(res);
  });

  if (generatedImages.length === 0) {
    throw new Error("Không thể tạo ảnh. Vui lòng thử lại hoặc giảm độ phức tạp.");
  }

  return {
    images: generatedImages,
    promptUsed: finalPrompt
  };
};
