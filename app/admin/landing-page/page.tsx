'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { LayoutTemplate, Image as ImageIcon, Upload, Save, CheckCircle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  imagePreview: string | null;
}

export default function AdminLandingPage() {
  const [steps, setSteps] = useState<Step[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('landing_page_steps');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved steps", e);
        }
      }
    }
    return [
      {
        id: 'step-1',
        title: 'Chải răng',
        description: 'Sử dụng bàn chải rãnh chữ V thiết kế riêng biệt để làm sạch hoàn hảo cả bề mặt mắc cài lẫn kẽ răng xung quanh.',
        imagePreview: null,
      },
      {
        id: 'step-2',
        title: 'Làm sạch kẽ',
        description: 'Len lỏi vào những vị trí hẹp nhất dưới dây cung và giữa các kẽ răng để loại bỏ triệt để mảnh vụn thức ăn cứng đầu.',
        imagePreview: null,
      },
      {
        id: 'step-3',
        title: 'Súc miệng',
        description: 'Tăng cường màng bảo vệ Fluoride, tái khoáng hóa men răng và diệt khuẩn toàn diện cho khoang miệng thơm mát dài lâu.',
        imagePreview: null,
      },
    ];
  });

  const [showToast, setShowToast] = useState(false);

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSteps(prevSteps => 
        prevSteps.map(step => 
          step.id === id ? { ...step, imagePreview: base64String } : step
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (id: string, field: 'title' | 'description', value: string) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const handleSave = () => {
    localStorage.setItem('landing_page_steps', JSON.stringify(steps));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      {showToast && (
        <div className="fixed top-24 right-8 bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-teal-600" />
          <span className="font-medium">Đã lưu cấu hình thành công!</span>
        </div>
      )}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-800">Quản lý trang: Tại sao chọn Fluocaril</h1>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Save className="w-5 h-5" />
          Lưu thay đổi
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Khu vực: Chu trình 3 bước</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                Bước {index + 1}
              </h3>
              
              {/* Khu vực hiển thị ảnh */}
              <div className="mb-6">
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative flex flex-col items-center justify-center mb-3 shadow-inner">
                  {step.imagePreview ? (
                    <img 
                      src={step.imagePreview} 
                      alt={step.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <span className="text-sm font-medium">Chưa có ảnh</span>
                    </div>
                  )}
                </div>
                
                {/* Nút Upload Ảnh */}
                <label className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  Tải ảnh lên
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(step.id, file);
                    }}
                  />
                </label>
              </div>

              {/* Input Fields */}
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input 
                    type="text" 
                    value={step.title}
                    onChange={(e) => handleInputChange(step.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea 
                    value={step.description}
                    onChange={(e) => handleInputChange(step.id, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
