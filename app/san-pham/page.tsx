import { Categories, FeaturedProducts } from "@/components/home-sections-1";
import { FaqSection } from "@/components/home-sections-2";

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">Tất cả sản phẩm</h1>
        <p className="text-slate-600 text-lg max-w-2xl">Khám phá các dòng sản phẩm chăm sóc răng miệng chuyên biệt từ Fluocaril dành riêng cho quá trình chỉnh nha.</p>
      </div>
      <Categories />
      <FeaturedProducts />
      <FaqSection />
    </div>
  );
}
