import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Gallery } from './components/Gallery';
import { GenerationSettings, AspectRatio, IdentityStrength, StylizeLevel, GeneratedImage } from './types';
import { SCENES, OUTFITS, MOODS } from './constants';
import { generateImages } from './services/geminiService';

const App: React.FC = () => {
  // Application State
  const [settings, setSettings] = useState<GenerationSettings>({
    sceneId: SCENES[0].id,
    outfitId: OUTFITS[0].id,
    moodId: MOODS[0].id,
    aspectRatio: AspectRatio.SQUARE,
    identityStrength: IdentityStrength.MEDIUM,
    stylizeLevel: StylizeLevel.BALANCED,
    customPrompt: ''
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      alert("Vui lòng tải lên ảnh khuôn mặt trước.");
      return;
    }

    setIsGenerating(true);
    try {
      // In a real scenario, we might try to crop faces here using a library like face-api.js, 
      // but to keep it lightweight as requested, we send the full image to Gemini 
      // and rely on the prompt "Use the uploaded reference photo".
      
      const result = await generateImages(uploadedImage, settings, 2); // Generate 2 images by default
      
      const newImages: GeneratedImage[] = result.images.map(url => ({
        id: Math.random().toString(36).substr(2, 9),
        url,
        promptUsed: result.promptUsed,
        timestamp: Date.now()
      }));

      // Prepend new images
      setGeneratedImages(prev => [...newImages, ...prev]);

    } catch (error: any) {
      console.error(error);
      alert(`Lỗi: ${error.message || "Không thể tạo ảnh"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Header (Only visible on small screens) */}
      <div className="lg:hidden bg-white p-4 shadow-sm flex items-center justify-between border-b border-gray-200">
        <h1 className="text-xl font-bold text-red-700">Tết Avatar Studio</h1>
        {uploadedImage && <img src={uploadedImage} alt="Ref" className="w-8 h-8 rounded-full border border-red-200 object-cover" />}
      </div>

      {/* Sidebar Controls */}
      <Sidebar 
        settings={settings} 
        setSettings={setSettings}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        imageUploaded={!!uploadedImage}
        onImageUpload={handleImageUpload}
        previewUrl={uploadedImage}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative h-full bg-[#FFFBF0]">
        <div className="absolute inset-0 overflow-auto">
          <Gallery 
            images={generatedImages} 
            isGenerating={isGenerating} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;
