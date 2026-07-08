import { ProductImage } from "@/components/ProductImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function RelatedProducts({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-navy font-serif">
          Sản phẩm liên quan
        </h2>
        <Link href="/san-pham" className="text-brand font-medium hover:underline">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((prod) => (
          <Link href={`/san-pham/${prod.slug}`} key={prod.id} className="group block cursor-pointer">
            <div className="h-full flex flex-col rounded-2xl bg-white p-1 pb-3 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Image Box */}
              <div className="relative aspect-[3/4] bg-[#f8f8f8] rounded-xl overflow-hidden mb-3">
                <ProductImage
                  src={prod.imageUrl || prod.image || "https://picsum.photos/seed/placeholder/400/533"}
                  alt={prod.name}
                  className="group-hover:scale-105"
                />
                {/* Badge / Tag */}
                {prod.badge && (
                  <div className={cn(
                    "absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm",
                    prod.badge === 'new' ? 'bg-blue-100 text-blue-700' : 
                    prod.badge === 'best-seller' ? 'bg-red-100 text-red-700' : 'bg-white/90 text-slate-900'
                  )}>
                    {prod.badge === 'new' ? 'MỚI' :
                      prod.badge === 'best-seller' ? 'BÁN CHẠY' : prod.badge}
                  </div>
                )}
                
                {/* Optional dark gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                
                {/* Quick Action Button */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                  <div className="w-full bg-navy text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center hover:bg-navy/90 transition-colors shadow-lg">
                    Xem chi tiết
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 flex flex-col px-2 text-center">
                <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                  {prod.name}
                </h3>
                {prod.price && (
                  <p className="mt-1.5 font-bold text-navy">
                    {prod.price}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
