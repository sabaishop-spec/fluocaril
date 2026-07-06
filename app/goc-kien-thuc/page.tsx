import Image from "next/image";
import Link from "next/link";
import { articles, articleCategories, topViewedArticles } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Góc Kiến Thức Chăm Sóc Răng Niềng | Fluocaril',
  description: 'Các bài viết, chia sẻ kinh nghiệm và hướng dẫn từ chuyên gia về cách vệ sinh, chăm sóc răng miệng khi niềng.',
};


export default function KnowledgePage() {
  const featured = articles[0];
  const list = articles.slice(1);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">Góc kiến thức</h1>
        <p className="text-slate-600 text-lg max-w-2xl">Bài viết chuyên sâu giúp bạn chăm sóc răng miệng tốt hơn mỗi ngày từ các chuyên gia nha khoa.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content - 75% */}
          <div className="w-full lg:w-3/4">
            
            {/* Featured Post */}
            {featured && (
              <div className="mb-12 group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-auto">
                  <Image 
                    src={featured.image} 
                    alt={featured.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-4">
                    <span className="bg-brand/10 text-brand-dark px-3 py-1 rounded-full">{featured.category}</span>
                    <span className="text-slate-400">{featured.date}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-navy leading-snug group-hover:text-brand transition-colors font-serif mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {featured.description || 'Bộ tài liệu tổng hợp từ các chuyên gia nha khoa hàng đầu, hướng dẫn chi tiết cách vệ sinh, lựa chọn sản phẩm phù hợp và chế độ ăn uống chuẩn nhất dành riêng cho người niềng răng để đạt hiệu quả tối ưu nhất.'}
                  </p>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image src="https://picsum.photos/seed/avatar1/100/100" alt="Author" fill className="object-cover" />
                    </div>
                    <span>Bác sĩ Nguyễn Văn A</span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {list.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-slate-400 text-xs font-semibold mb-3 block">{article.date}</span>
                    <h3 className="text-xl font-bold text-navy leading-snug group-hover:text-brand-dark transition-colors font-serif mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {article.description}
                    </p>
                    <div className="mt-auto flex items-center text-brand font-semibold text-sm group-hover:text-brand-dark transition-colors">
                      Đọc tiếp <ArrowRight className="w-4 h-4 ml-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
               <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <button className="w-10 h-10 rounded-full bg-brand text-white font-semibold flex items-center justify-center shadow-sm">1</button>
               <button className="w-10 h-10 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center">2</button>
               <button className="w-10 h-10 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center">3</button>
               <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Sidebar - 25% */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              
              {/* Block 1: Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-navy font-serif mb-4 pb-4 border-b border-slate-100">Danh mục kiến thức</h3>
                <ul className="space-y-2">
                  {articleCategories.map((cat, idx) => (
                    <li key={idx}>
                      <Link 
                        href="#" 
                        className="block px-4 py-3 text-slate-600 font-medium rounded-xl hover:bg-brand hover:text-white transition-colors"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Block 2: Most Viewed */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-navy font-serif mb-4 pb-4 border-b border-slate-100">Xem nhiều nhất</h3>
                <ul className="space-y-4">
                  {topViewedArticles.map((article, idx) => (
                    <li key={article.id} className="flex gap-4 group cursor-pointer">
                      <span className="text-2xl font-bold font-serif text-brand/30 group-hover:text-brand transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-navy transition-colors line-clamp-3 mt-1.5">
                        {article.title}
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
