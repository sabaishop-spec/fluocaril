'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function AdminToast() {
  const [showPopup, setShowPopup] = useState(true);

  // Tự động ẩn pop-up sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed top-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-bounce z-50 transition-opacity duration-500">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">Đăng nhập thành công!</span>
    </div>
  );
}
