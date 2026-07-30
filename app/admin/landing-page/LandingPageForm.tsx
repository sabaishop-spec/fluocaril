'use client';

import { useState, ChangeEvent } from 'react';
import { LayoutTemplate, Image as ImageIcon, Upload, Save, CheckCircle, Download } from 'lucide-react';
import { saveSetting } from '@/app/admin/actions/settings';
import { uploadImage } from '@/app/admin/actions/upload';
import Image from 'next/image';

interface Step {
  id: string;
  title: string;
  description: string;
  imagePreview: string | null;
}

export function LandingPageForm({ initialSteps }: { initialSteps: Step[] | null }) {
  const defaultSteps = [
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

  const [steps, setSteps] = useState<Step[]>(initialSteps && initialSteps.length ? initialSteps : defaultSteps);
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleImageUpload = async (id: string, file: File) => {
    setUploadingId(id);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await uploadImage(formData);
      if (res.success && res.url) {
        setSteps(prevSteps => 
          prevSteps.map(step => 
            step.id === id ? { ...step, imagePreview: res.url as string } : step
          )
        );
      } else {
        alert(res.error || 'Upload failed');
      }
    } catch (err: any) {
      alert('Lỗi upload: ' + err.message);
    }
    setUploadingId(null);
  };

  const handleInputChange = (id: string, field: 'title' | 'description', value: string) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const handleImportLocal = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('landing_page_steps');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // If parsed contains base64 images, they should re-upload them to blob
          setSteps(parsed);
          alert('Đã nhập dữ liệu cũ từ trình duyệt. Chú ý: nếu ảnh vẫn dạng base64, vui lòng tải lại ảnh trước khi Lưu (bởi vì dung lượng base64 quá lớn để lưu vào DB).');
        } catch (e) {
          alert('Không thể đọc dữ liệu cũ.');
        }
      } else {
        alert('Không tìm thấy dữ liệu cũ trong trình duyệt này.');
      }
    }
  };

  const handleSave = async () => {
    // Basic validation to prevent saving large base64 strings to DB
    const hasBase64 = steps.some(s => s.imagePreview && s.imagePreview.startsWith('data:image'));
    if (hasBase64) {
      alert('Vui lòng tải lại ảnh thay vì dùng ảnh base64 cũ (ảnh base64 sẽ làm nặng database).');
      return;
    }

    setIsSaving(true);
    const result = await saveSetting('landing_page_steps', steps);
    setIsSaving(false);
    if (result.success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      alert('Lỗi: ' + result.error);
    }
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
        <div className="flex items-center gap-3">
          <button 
            onClick={handleImportLocal}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
          >
            <Download className="w-4 h-4" />
            Nhập dữ liệu cũ từ trình duyệt
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
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
                    <Image 
                      src={step.imagePreview} 
                      alt={step.title} 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <span className="text-sm font-medium">Chưa có ảnh</span>
                    </div>
                  )}
                </div>
                
                {/* Nút Upload Ảnh */}
                <label className={`cursor-pointer inline-flex items-center gap-2 text-sm font-medium transition-colors ${uploadingId === step.id ? 'text-gray-400' : 'text-teal-600 hover:text-teal-700'}`}>
                  <Upload className="w-4 h-4" />
                  {uploadingId === step.id ? 'Đang tải lên...' : 'Tải ảnh lên'}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    disabled={uploadingId === step.id}
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
