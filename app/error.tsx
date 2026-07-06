'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-navy mb-4 font-serif">Đã có lỗi xảy ra!</h2>
      <p className="text-slate-600 mb-8 max-w-md">Chúng tôi đang cố gắng khắc phục sự cố này.</p>
      <button onClick={() => reset()} className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
        Thử lại
      </button>
    </div>
  );
}
