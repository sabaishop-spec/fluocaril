import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-navy mb-4 font-serif">404 - Không tìm thấy trang</h2>
      <p className="text-slate-600 mb-8 max-w-md">Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link href="/" className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
        Trở về trang chủ
      </Link>
    </div>
  );
}
