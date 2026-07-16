"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Button, Accordion } from "./ui";
import { faqs, articles } from "@/lib/data";
import { ArrowRight } from "lucide-react";

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
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-navy">Tại sao người niềng răng cần sản phẩm chuyên biệt?</h2>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              Khí cụ chỉnh nha (mắc cài, dây cung) tạo ra nhiều &quot;điểm mù&quot; mà bàn chải thông thường khó làm sạch. Thức ăn dễ dắt lại gây mảng bám, tụt lợi, đốm trắng và hơi thở kém thơm tho.
            </p>
            <p>
              Sử dụng các sản phẩm chuyên khoa không chỉ giúp làm sạch sâu mọi ngóc ngách mà còn bảo vệ cấu trúc răng yếu ớt trong thời kỳ chịu lực kéo, đảm bảo bạn có một hàm răng khỏe mạnh khi tháo niềng.
            </p>
          </div>
          <Link href="/tai-sao-chon-fluocaril">
            <Button size="lg" className="mt-8 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors border-none">Tìm hiểu chi tiết</Button>
          </Link>
        </motion.div>
        <div className="grid gap-6">
          {reasons.map((r, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
             >
               <div>
                 <h3 className="font-bold text-navy font-serif text-lg mb-2">{r.title}</h3>
                 <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
               </div>
             </motion.div>
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

  return null;
  /*
  return (
    <section className="py-24 bg-[#84EF6E] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Chu trình 3 bước chuẩn chuyên gia</h2>
          <p className="text-slate-800 max-w-2xl mx-auto text-lg">Đơn giản, dễ áp dụng và mang lại hiệu quả tối ưu cho người niềng răng.</p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-6">
          {steps.map((step, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: i * 0.15 }}
               className="flex-1 bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-8 hover:shadow-md transition-shadow flex flex-col xl:flex-row gap-6 items-start"
             >
                <span className="text-6xl font-bold font-serif text-slate-900 leading-none">{step.num}</span>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">{step.title}</h3>
                   <p className="text-slate-800 leading-relaxed text-sm">{step.desc}</p>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  */
}
