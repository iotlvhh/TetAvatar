import React from 'react';
import { GenerationSettings, AspectRatio, IdentityStrength, StylizeLevel } from '../types';
import { SCENES, OUTFITS, MOODS } from '../constants';
import { Button } from './Button';

interface SidebarProps {
  settings: GenerationSettings;
  setSettings: React.Dispatch<React.SetStateAction<GenerationSettings>>;
  onGenerate: () => void;
  isGenerating: boolean;
  imageUploaded: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  settings,
  setSettings,
  onGenerate,
  isGenerating,
  imageUploaded,
  onImageUpload,
  previewUrl
}) => {
  const handleChange = (field: keyof GenerationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 shadow-xl border-r border-red-100 flex flex-col h-full overflow-y-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-1">Tết Avatar Studio</h1>
        <p className="text-amber-600 text-sm font-medium">Mr Công sẽ giúp bạn tạo ảnh Avatar Tết ấn tượng</p>
      </div>

      <div className="space-y-6 pb-20">
        
        {/* Upload Section */}
        <div className="bg-red-50 p-4 rounded-xl border-2 border-dashed border-red-200 text-center relative group hover:border-red-400 transition-colors">
          <input 
            type="file" 
            accept="image/*" 
            onChange={onImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          {previewUrl ? (
            <div className="relative">
              <img src={previewUrl} alt="Preview" className="mx-auto h-40 object-cover rounded-lg shadow-sm" />
              <div className="mt-2 text-xs text-red-600 font-semibold">Nhấp để thay đổi ảnh</div>
            </div>
          ) : (
            <div className="py-8">
              <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-red-700 font-medium">Tải ảnh người mẫu (Rõ mặt)</span>
              <p className="text-xs text-gray-500 mt-1">Hỗ trợ JPG, PNG</p>
            </div>
          )}
        </div>

        {/* Output Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Loại ảnh</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(AspectRatio).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleChange('aspectRatio', value)}
                className={`py-2 text-sm rounded-md border ${
                  settings.aspectRatio === value 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-red-300'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Scene */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bối cảnh</label>
          <select 
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500"
            value={settings.sceneId}
            onChange={(e) => handleChange('sceneId', e.target.value)}
          >
            {SCENES.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Outfit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Trang phục</label>
          <select 
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500"
            value={settings.outfitId}
            onChange={(e) => handleChange('outfitId', e.target.value)}
          >
            {OUTFITS.map(o => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tone màu / Mood</label>
          <select 
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500"
            value={settings.moodId}
            onChange={(e) => handleChange('moodId', e.target.value)}
          >
            {MOODS.map(m => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">Độ giống mặt</label>
                <span className="text-xs font-mono text-red-600">{settings.identityStrength}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="1"
                value={Object.values(IdentityStrength).indexOf(settings.identityStrength)}
                onChange={(e) => handleChange('identityStrength', Object.values(IdentityStrength)[parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">Mức Stylize (Nghệ thuật)</label>
                <span className="text-xs font-mono text-red-600">{settings.stylizeLevel}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="1"
                value={Object.values(StylizeLevel).indexOf(settings.stylizeLevel)}
                onChange={(e) => handleChange('stylizeLevel', Object.values(StylizeLevel)[parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>
        </div>

        {/* Custom Text */}
        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú thêm (Tùy chọn)</label>
           <textarea 
             className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500"
             rows={2}
             placeholder="VD: Cầm phong bao lì xì đỏ, cười tươi..."
             value={settings.customPrompt}
             onChange={(e) => handleChange('customPrompt', e.target.value)}
           />
        </div>

        {/* Action Button - Sticky at bottom of container conceptually, but we put it in flow here */}
        <div className="pt-4 border-t border-gray-100">
          <Button 
            className="w-full text-lg py-3" 
            onClick={onGenerate} 
            isLoading={isGenerating}
            disabled={!imageUploaded}
          >
            {imageUploaded ? "Tạo ảnh ngay" : "Vui lòng chọn ảnh"}
          </Button>
          {!imageUploaded && (
            <p className="text-xs text-center text-red-400 mt-2">Cần tải ảnh lên trước khi tạo</p>
          )}
        </div>

      </div>
    </div>
  );
};
