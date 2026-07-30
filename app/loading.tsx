export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium">Đang tải...</p>
    </div>
  );
}
