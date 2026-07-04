"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Button, Accordion } from "./ui";
import { faqs, articles } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function WhySpecialized() {
  const reasons = [
    { title: 'Làm sạch điểm mù', desc: 'Thiết kế len lỏi sâu vào các khe hẹp của mắc cài và dây cung, loại bỏ mảng bám hiệu quả.' },
    { title: 'Bảo vệ men răng', desc: 'Cung cấp Fluoride thích hợp giúp tăng cường tái khoáng, ngăn ngừa sâu răng.' },
    { title: 'Chăm sóc nướu', desc: 'Thành phần dịu nhẹ, giảm sưng viêm nướu do cọ xát với khí cụ chỉnh nha.' },
    { title: 'Hơi thở thơm mát', desc: 'Kiểm soát vi khuẩn sinh mùi, mang lại sự tự tin giao tiếp suốt ngày dài.' }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-navy">Tại sao người niềng răng cần sản phẩm chuyên biệt?</h2>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              Khí cụ chỉnh nha (mắc cài, dây cung) tạo ra nhiều &quot;điểm mù&quot; mà bàn chải thông thường khó làm sạch. Thức ăn dễ dắt lại gây mảng bám, tụt lợi, đốm trắng và hơi thở kém thơm tho.
            </p>
            <p>
              Sử dụng các sản phẩm chuyên khoa không chỉ giúp làm sạch sâu mọi ngóc ngách mà còn bảo vệ cấu trúc răng yếu ớt trong thời kỳ chịu lực kéo, đảm bảo bạn có một hàm răng khỏe mạnh khi tháo niềng.
            </p>
          </div>
          <Button size="lg" className="mt-8 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors border-none">Tìm hiểu chi tiết</Button>
        </div>
        <div className="grid gap-6">
          {reasons.map((r, i) => (
             <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
               <div>
                 <h3 className="font-bold text-navy font-serif text-lg mb-2">{r.title}</h3>
                 <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareRoutine() {
  const steps = [
    { num: '01', title: 'Chải sạch bề mặt', desc: 'Sử dụng bàn chải rãnh V và kem đánh răng chuyên dụng để làm sạch bề mặt răng và khí cụ.' },
    { num: '02', title: 'Làm sạch kẽ răng', desc: 'Dùng bàn chải kẽ để len lỏi dưới dây cung và khoảng trống giữa các răng.' },
    { num: '03', title: 'Bổ trợ bảo vệ', desc: 'Súc miệng để tiêu diệt vi khuẩn và duy trì hơi thở thơm mát suốt cả ngày.' }
  ];

  return (
    <section className="py-24 bg-[#84EF6E] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Chu trình 3 bước chuẩn chuyên gia</h2>
          <p className="text-slate-800 max-w-2xl mx-auto text-lg">Đơn giản, dễ áp dụng và mang lại hiệu quả tối ưu cho người niềng răng.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {steps.map((step, i) => (
             <div key={i} className="flex-1 bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-8 hover:shadow-md transition-shadow flex flex-col xl:flex-row gap-6 items-start">
                <span className="text-6xl font-bold font-serif text-slate-900 leading-none">{step.num}</span>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">{step.title}</h3>
                   <p className="text-slate-800 leading-relaxed text-sm">{step.desc}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function KnowledgeHub() {
  const featured = articles[0] || { id: '1', title: 'Loading...', category: '', date: '', image: 'https://picsum.photos/800/600' };
  const list = articles.slice(1, 4);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">Tin tức & Góc kiến thức</h2>
            <p className="text-slate-600 max-w-xl text-lg">Bài viết chuyên sâu giúp bạn chăm sóc răng miệng tốt hơn mỗi ngày.</p>
          </div>
          <Button variant="ghost" className="rounded-full text-brand-dark shrink-0">
            Xem tất cả bài viết <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured */}
          <div className="lg:col-span-7 group cursor-pointer">
             <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="text-brand-dark">{featured.category}</span>
                <span className="text-slate-400">{featured.date}</span>
             </div>
             <h3 className="text-2xl font-bold text-navy leading-snug group-hover:text-brand-dark transition-colors font-serif mb-4">{featured.title}</h3>
             <p className="text-slate-600 line-clamp-3 leading-relaxed">Bộ tài liệu tổng hợp từ các chuyên gia nha khoa hàng đầu, hướng dẫn chi tiết cách vệ sinh, lựa chọn sản phẩm phù hợp và chế độ ăn uống chuẩn nhất dành riêng cho người niềng răng để đạt hiệu quả tối ưu nhất...</p>
          </div>
          
          {/* List Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             {list.map((article, i) => (
                <div key={article.id} className="flex gap-5 group cursor-pointer items-start pb-6 border-b border-slate-100 last:border-0">
                   <div className="relative w-32 h-24 shrink-0 rounded-xl overflow-hidden">
                      <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider mb-2">
                        <span className="text-brand-dark">{article.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-navy leading-snug group-hover:text-brand-dark transition-colors font-serif line-clamp-2">{article.title}</h3>
                      <span className="text-slate-400 text-xs mt-2 block">{article.date}</span>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
