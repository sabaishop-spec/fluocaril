import { Categories, FeaturedProducts } from "@/components/home-sections-1";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="pb-12 bg-slate-50">
      
      {/* Static Hero Banner */}
      <div className="w-full relative h-[300px] md:h-[450px] mb-8">
        <Image 
          src="https://picsum.photos/seed/fluocaril-hero/1920/600" 
          alt="Fluocaril Chăm sóc răng niềng" 
          fill 
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">Tất cả sản phẩm</h1>
        <p className="text-slate-600 text-lg max-w-2xl">Khám phá các dòng sản phẩm chăm sóc răng miệng chuyên biệt từ Fluocaril dành riêng cho quá trình chỉnh nha.</p>
      </div>
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
