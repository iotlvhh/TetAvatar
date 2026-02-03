import React from 'react';
import { GeneratedImage } from '../types';
import { Button } from './Button';

interface GalleryProps {
  images: GeneratedImage[];
  isGenerating: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ images, isGenerating }) => {
  const [selectedPromptId, setSelectedPromptId] = React.useState<string | null>(null);

  if (images.length === 0 && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-600">Chưa có ảnh nào</h3>
        <p className="max-w-xs mt-2">Tải ảnh lên và nhấn "Tạo ảnh" để bắt đầu phép màu ngày Tết.</p>
      </div>
    );
  }

  return (
    <div className="p-8 h-full overflow-y-auto">
      {isGenerating && (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-red-100 text-center animate-pulse">
          <div className="inline-block p-3 rounded-full bg-red-100 mb-3">
             <svg className="animate-spin h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Đang tạo ảnh Tết...</h3>
          <p className="text-gray-500 text-sm">Quá trình này có thể mất khoảng 15-30 giây.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
            <div className="relative group flex-grow bg-gray-100 flex items-center justify-center overflow-hidden">
               <img 
                 src={img.url} 
                 alt="Generated Tet Avatar" 
                 className="max-w-full max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <a 
                    href={img.url} 
                    download={`tet-avatar-${img.id}.png`}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium shadow-lg hover:bg-gray-50 transform translate-y-2 group-hover:translate-y-0 transition-all"
                  >
                    Tải về
                  </a>
               </div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs text-gray-500">
                    {new Date(img.timestamp).toLocaleTimeString()}
                 </span>
                 <button 
                   onClick={() => setSelectedPromptId(selectedPromptId === img.id ? null : img.id)}
                   className="text-xs text-red-600 hover:underline font-medium focus:outline-none"
                 >
                   {selectedPromptId === img.id ? 'Ẩn Prompt' : 'Xem Prompt'}
                 </button>
               </div>
               
               {selectedPromptId === img.id && (
                 <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-600 font-mono break-words">
                   {img.promptUsed}
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
      
      {images.length > 0 && (
         <div className="text-center text-gray-400 text-xs mt-8 pb-4">
            Ảnh được tạo bởi AI. Độ giống thật phụ thuộc vào chất lượng ảnh gốc.
         </div>
      )}
    </div>
  );
};
