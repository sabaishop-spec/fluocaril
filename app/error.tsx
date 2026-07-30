'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-navy mb-4 font-serif">Đã có lỗi xảy ra!</h2>
      <p className="text-slate-600 mb-8 max-w-md">Chúng tôi đang cố gắng khắc phục sự cố này. Vui lòng thử lại sau.</p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors font-medium">
          Thử lại
        </button>
        <button onClick={() => router.push('/')} className="bg-slate-100 text-slate-700 px-6 py-3 rounded-full hover:bg-slate-200 transition-colors font-medium">
          Về trang chủ
        </button>
      </div>
    </div>
  );
}
