"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Button, Accordion } from "./ui";
import { faqs, articles } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function WhySpecialized() {
  return (
    <section className="py-24 bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/10 blur-[100px] -z-10 rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">Tại sao người niềng răng cần sản phẩm chuyên biệt?</h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Khí cụ chỉnh nha (mắc cài, dây cung) tạo ra nhiều "điểm mù" mà bàn chải thông thường khó làm sạch. Thức ăn dễ dắt lại gây mảng bám, tụt lợi, đốm trắng và hơi thở kém thơm tho.
            </p>
            <p>
              Sử dụng các sản phẩm chuyên khoa không chỉ giúp làm sạch sâu mọi ngóc ngách mà còn bảo vệ cấu trúc răng yếu ớt trong thời kỳ chịu lực kéo, đảm bảo bạn có một hàm răng khỏe mạnh khi tháo niềng.
            </p>
          </div>
          <Button size="lg" className="mt-8 rounded-full bg-brand text-navy hover:bg-white transition-colors border-none">Đọc thêm nghiên cứu</Button>
        </div>
        <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden">
           <Image src="https://picsum.photos/seed/brushing/800/800" alt="Làm sạch mắc cài" fill className="object-cover" />
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Chu trình 3 bước chuẩn chuyên gia</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Đơn giản, dễ áp dụng và mang lại hiệu quả tối ưu cho người niềng răng.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line hidden on mobile */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative text-center">
              <div className="w-16 h-16 bg-brand-light text-brand-dark rounded-full flex items-center justify-center font-display font-bold text-2xl mx-auto mb-6 outline outline-4 outline-white">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-navy mb-4 font-display">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function KnowledgeHub() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Góc kiến thức</h2>
            <p className="text-slate-600 max-w-xl text-lg">Bài viết chuyên sâu giúp bạn chăm sóc răng miệng tốt hơn mỗi ngày.</p>
          </div>
          <Button variant="ghost" className="rounded-full text-brand-dark shrink-0">
            Xem tất cả bài viết <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="text-brand-dark">{article.category}</span>
                <span className="text-slate-400">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-navy leading-snug group-hover:text-brand-dark transition-colors font-display">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadGen() {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand opacity-20 blur-[100px] rounded-full" />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
         <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-6">Tải cẩm nang chăm sóc răng niềng miễn phí</h2>
         <p className="text-slate-700 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">Bộ tài liệu tổng hợp từ các chuyên gia nha khoa, hướng dẫn chi tiết cách vệ sinh và chế độ ăn uống chuẩn nhất.</p>
         <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Nhập địa chỉ email của bạn" className="flex-1 px-6 py-4 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-dark text-slate-800" required />
            <Button type="submit" size="lg" className="rounded-full font-semibold shadow-md whitespace-nowrap">Đăng ký ngay</Button>
         </form>
         <p className="text-xs text-slate-500 mt-6">Bằng việc đăng ký, bạn đồng ý với Chính sách bảo mật của chúng tôi.</p>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Câu hỏi thường gặp</h2>
          <p className="text-slate-600 text-lg">Giải đáp những thắc mắc phổ biến về sản phẩm và chu trình chăm sóc.</p>
        </div>
        <Accordion items={faqs.map(f => ({ title: f.question, content: f.answer }))} />
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">Bạn chưa tìm thấy câu trả lời?</p>
          <Button variant="outline" className="rounded-full">Liên hệ đội ngũ hỗ trợ</Button>
        </div>
      </div>
    </section>
  );
}
