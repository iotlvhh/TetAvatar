export enum AspectRatio {
  SQUARE = "1:1",
  PORTRAIT = "9:16",
  LANDSCAPE = "16:9"
}

export enum IdentityStrength {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  MAX = "Max"
}

export enum StylizeLevel {
  REALISTIC = "Realistic",
  BALANCED = "Balanced",
  ARTISTIC = "Artistic"
}

export interface GenerationSettings {
  sceneId: string;
  outfitId: string;
  moodId: string;
  aspectRatio: AspectRatio;
  identityStrength: IdentityStrength;
  stylizeLevel: StylizeLevel;
  customPrompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string; // Base64 data URL
  promptUsed: string;
  timestamp: number;
}

export interface PresetOption {
  id: string;
  label: string;
  promptFragment: string;
}
