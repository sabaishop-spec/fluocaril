'use client';

import { useState } from 'react';
import { updateHeroBanner } from './actions';
import ImageDropzone from '../products/ImageDropzone';
import { Trash2, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export default function HeroBannerForm({ currentData }: { currentData: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const initialSlides = Array.isArray(currentData) ? currentData : (currentData ? [currentData] : []);
  if (initialSlides.length === 0) {
    initialSlides.push({ title: '', subtitle: '', linkUrl: '', imageUrl: '' });
  }

  const [slides, setSlides] = useState<any[]>(initialSlides);
  const [imageFiles, setImageFiles] = useState<{ [key: number]: File | null }>({});

  const handleAddSlide = () => {
    setSlides([...slides, { title: '', subtitle: '', linkUrl: '', imageUrl: '' }]);
  };

  const handleRemoveSlide = (index: number) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
    
    const newImageFiles = { ...imageFiles };
    delete newImageFiles[index];
    setImageFiles(newImageFiles);
  };

  const handleSlideChange = (index: number, field: string, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  const handleImageSelected = (index: number, file: File | null) => {
    setImageFiles(prev => ({ ...prev, [index]: file }));
    if (!file) {
      const newSlides = [...slides];
      newSlides[index].imageUrl = '';
      setSlides(newSlides);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const formData = new FormData();
    formData.append('count', slides.length.toString());
    
    slides.forEach((slide, index) => {
      formData.append(`title_${index}`, slide.title || '');
      formData.append(`subtitle_${index}`, slide.subtitle || '');
      formData.append(`linkUrl_${index}`, slide.linkUrl || '');
      formData.append(`imageUrl_${index}`, slide.imageUrl || '');
      
      const file = imageFiles[index];
      if (file) {
        formData.append(`imageFile_${index}`, file);
      }
    });
    
    const result = await updateHeroBanner(formData);
    
    setLoading(false);
    if (result.success) {
      setMessage({ type: 'success', text: 'Cập nhật Banner thành công!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Danh sách Slide</h3>
        <button 
          type="button" 
          onClick={handleAddSlide}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Thêm Slide mới
        </button>
      </div>
      
      {slides.map((slide, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
          <div className="absolute top-4 right-4 flex items-center justify-between">
            <button 
              type="button"
              onClick={() => handleRemoveSlide(index)}
              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
              title="Xóa Slide"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <h4 className="font-medium text-gray-900 mb-4">Slide #{index + 1}</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề chiến dịch</label>
              <input 
                value={slide.title || ''} 
                onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                type="text" 
                placeholder="Nhập tiêu đề banner..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phụ (Subtitle)</label>
              <input 
                value={slide.subtitle || ''} 
                onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                type="text" 
                placeholder="Nhập tiêu đề phụ..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link đích (Khi click)</label>
              <input 
                value={slide.linkUrl || ''} 
                onChange={(e) => handleSlideChange(index, 'linkUrl', e.target.value)}
                type="text" 
                placeholder="https://... hoặc /san-pham/..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh Banner</label>
              <ImageDropzone 
                onImageSelected={(file) => handleImageSelected(index, file)} 
                defaultImage={slide.imageUrl} 
              />
              <p className="text-xs text-gray-500 mt-2">Kích thước khuyến nghị: 1920x600px</p>
            </div>
          </div>
        </div>
      ))}

      {slides.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Chưa có banner nào. Hãy bấm "Thêm Slide mới".</p>
        </div>
      )}

      <div className="flex justify-end pt-4 sticky bottom-4 z-10">
        <button 
          type="submit" 
          disabled={loading}
          className="px-8 py-3 shadow-lg bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : 'Lưu tất cả Banner'}
        </button>
      </div>

      {message && (
        <div className={`fixed top-5 right-5 z-[100] shadow-xl min-w-[300px] p-4 rounded-lg transition-all border animate-in fade-in slide-in-from-top-5 duration-300 flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}
    </form>
  );
}
