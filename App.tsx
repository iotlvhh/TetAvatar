import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Gallery } from "./components/Gallery";
import {
    GenerationSettings,
    AspectRatio,
    IdentityStrength,
    StylizeLevel,
    GeneratedImage,
} from "./types";
import { SCENES, OUTFITS, MOODS } from "./constants";
import { generateImages } from "./services/geminiService";

const App: React.FC = () => {
    const [settings, setSettings] = useState<GenerationSettings>({
        sceneId: SCENES[0].id,
        outfitId: OUTFITS[0].id,
        moodId: MOODS[0].id,
        aspectRatio: AspectRatio.SQUARE,
        identityStrength: IdentityStrength.MEDIUM,
        stylizeLevel: StylizeLevel.BALANCED,
        customPrompt: "",
    });

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

    // ✅ Mobile slider state
    const [activeTab, setActiveTab] = useState<"controls" | "results">("controls");

    // Upload Handler
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUploadedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Generate Handler
    const handleGenerate = async () => {
        if (!uploadedImage) {
            alert("Vui lòng tải lên ảnh khuôn mặt trước.");
            return;
        }

        setIsGenerating(true);

        try {
            const result = await generateImages(uploadedImage, settings, 2);

            const newImages: GeneratedImage[] = result.images.map((url) => ({
                id: Math.random().toString(36).substr(2, 9),
                url,
                promptUsed: result.promptUsed,
                timestamp: Date.now(),
            }));

            setGeneratedImages((prev) => [...newImages, ...prev]);

            // ✅ Auto switch to Results tab on mobile
            setActiveTab("results");
        } catch (error: any) {
            console.error(error);
            alert(`Lỗi: ${error.message || "Không thể tạo ảnh"}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="h-screen bg-[#FFFBF0] flex flex-col overflow-hidden">
            {/* ✅ Mobile Top Tabs */}
            <div className="lg:hidden flex border-b bg-white shadow-sm">
                <button
                    onClick={() => setActiveTab("controls")}
                    className={`flex-1 py-3 text-sm font-semibold ${activeTab === "controls"
                            ? "text-red-600 border-b-2 border-red-600"
                            : "text-gray-500"
                        }`}
                >
                    🎛 Controls
                </button>

                <button
                    onClick={() => setActiveTab("results")}
                    className={`flex-1 py-3 text-sm font-semibold ${activeTab === "results"
                            ? "text-red-600 border-b-2 border-red-600"
                            : "text-gray-500"
                        }`}
                >
                    🖼 Results
                </button>
            </div>

            {/* ✅ Desktop Layout */}
            <div className="hidden lg:flex flex-1 overflow-hidden">
                <Sidebar
                    settings={settings}
                    setSettings={setSettings}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    imageUploaded={!!uploadedImage}
                    onImageUpload={handleImageUpload}
                    previewUrl={uploadedImage}
                />

                <main className="flex-1 overflow-y-auto">
                    <Gallery images={generatedImages} isGenerating={isGenerating} />
                </main>
            </div>

            {/* ✅ Mobile Slider Layout */}
            <div className="lg:hidden flex-1 overflow-hidden">
                {activeTab === "controls" && (
                    <div className="h-full overflow-y-auto">
                        <Sidebar
                            settings={settings}
                            setSettings={setSettings}
                            onGenerate={handleGenerate}
                            isGenerating={isGenerating}
                            imageUploaded={!!uploadedImage}
                            onImageUpload={handleImageUpload}
                            previewUrl={uploadedImage}
                        />
                    </div>
                )}

                {activeTab === "results" && (
                    <div className="h-full overflow-y-auto">
                        <Gallery images={generatedImages} isGenerating={isGenerating} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
