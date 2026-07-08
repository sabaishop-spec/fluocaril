import { motion, AnimatePresence } from "motion/react";
import { ProductImage } from "@/components/ProductImage";
import { X, Check } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function QuickViewModal({ product, onClose }: { product: any; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-[#f8f8f8] relative min-h-[300px] md:min-h-[400px] shrink-0">
            <ProductImage
              src={product.imageUrl || product.image || "https://picsum.photos/seed/placeholder/400/533"}
              alt={product.name}
            />
            {product.badge && (
              <div className={cn(
                "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm",
                product.badge === 'new' ? 'bg-blue-100 text-blue-700' : 
                product.badge === 'best-seller' ? 'bg-red-100 text-red-700' : 'bg-white/90 text-slate-900'
              )}>
                {product.badge === 'new' ? 'MỚI' :
                  product.badge === 'best-seller' ? 'BÁN CHẠY' : product.badge}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
            <div className="flex flex-col h-full">
              {product.categoryName && (
                <div className="text-sm font-medium text-brand mb-2">
                  {product.categoryName}
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                {product.name}
              </h2>
              
              <div className="text-2xl font-bold text-navy mb-6">
                {product.price || "Đang cập nhật"}
              </div>

              <div className="prose prose-sm text-slate-600 mb-8 flex-1">
                <p>{product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}</p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Sản phẩm chính hãng Fluocaril</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Chuyên biệt cho người niềng răng</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <Link
                  href={`/san-pham/${product.slug}`}
                  onClick={onClose}
                  className="w-full bg-navy text-white text-base font-semibold py-3.5 rounded-xl flex items-center justify-center hover:bg-navy/90 transition-all shadow-md hover:shadow-lg"
                >
                  Xem chi tiết đầy đủ
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
