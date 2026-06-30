import { ShopByStage } from "@/components/home-sections-1";
import { CareRoutine, WhySpecialized } from "@/components/home-sections-2";

export default function StagesPage() {
  return (
    <div className="pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">Chăm sóc theo từng giai đoạn</h1>
        <p className="text-slate-600 text-lg max-w-2xl">Mỗi giai đoạn chỉnh nha cần một giải pháp chăm sóc khác biệt. Hãy chọn hành trình của bạn để có hiệu quả tốt nhất.</p>
      </div>
      <ShopByStage />
      <WhySpecialized />
      <CareRoutine />
    </div>
  );
}
