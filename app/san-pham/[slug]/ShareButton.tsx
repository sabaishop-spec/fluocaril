'use client';

import { Share2 } from "lucide-react";

export function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      try {
        await navigator.clipboard.writeText(url);
        alert('Đã sao chép đường dẫn sản phẩm!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex-1 bg-white border-2 border-slate-200 text-slate-700 text-base font-semibold py-4 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
    >
      <Share2 className="w-5 h-5" />
      Chia sẻ
    </button>
  );
}
