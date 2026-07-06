'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4 font-serif">Lỗi nghiêm trọng!</h2>
          <button onClick={() => reset()} className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}
