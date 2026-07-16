'use client';

import { useState, useEffect } from 'react';
import { PanelBottom, Save, CheckCircle } from 'lucide-react';

interface FooterData {
  description: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  copyright: string;
}

export default function AdminFooterPage() {
  const [data, setData] = useState<FooterData>(() => {
    const defaults = {
      description: 'Thương hiệu chăm sóc răng miệng chuyên biệt đồng hành cùng người dùng trong từng giai đoạn chỉnh nha.',
      address: 'Tòa nhà ABC, Đường XYZ, Hà Nội',
      phone: '1900 1234',
      email: 'contact@fluocaril.vn',
      facebook: '#',
      instagram: '#',
      tiktok: '#',
      copyright: `© ${new Date().getFullYear()} Fluocaril Vietnam. All rights reserved.`
    };
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('site_footer');
      if (saved) {
        try {
          return { ...defaults, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse saved footer data", e);
        }
      }
    }
    return defaults;
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (field: keyof FooterData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('site_footer', JSON.stringify(data));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
          <PanelBottom className="w-8 h-8 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Footer</h1>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Save className="w-5 h-5" />
          Lưu cấu hình
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Thông tin cấu hình Footer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả thương hiệu</label>
            <textarea 
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
            <input 
              type="text" 
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input 
              type="text" 
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Link</label>
            <input 
              type="text" 
              value={data.facebook}
              onChange={(e) => handleChange('facebook', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Link</label>
            <input 
              type="text" 
              value={data.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Link</label>
            <input 
              type="text" 
              value={data.tiktok}
              onChange={(e) => handleChange('tiktok', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
            <input 
              type="text" 
              value={data.copyright}
              onChange={(e) => handleChange('copyright', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow bg-white text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
