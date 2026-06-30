"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "./ui";
import { stages, categories, products } from "@/lib/data";
import { CheckCircle2, Sparkles, Smile, ShieldCheck, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <span className="inline-block py-1 px-3 rounded-full bg-brand-light text-brand-dark text-sm font-semibold mb-6">Giải pháp nha khoa chuyên nghiệp</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-navy leading-tight mb-6">
            Chăm răng niềng đúng cách, tự tin trọn hành trình.
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Khám phá hệ sinh thái chăm sóc răng miệng chuyên biệt giúp làm sạch hiệu quả quanh mắc cài, chăm sóc hơi thở và bảo vệ thành quả chỉnh nha mỗi ngày.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full text-base font-semibold">Khám phá sản phẩm</Button>
            <Button size="lg" variant="outline" className="rounded-full text-base font-semibold">Tìm chu trình phù hợp</Button>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.6, delay:0.2}} className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
            <Image src="https://picsum.photos/seed/smilebraces/800/600" alt="Người niềng răng tự tin" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-light text-brand-dark rounded-full flex items-center justify-center">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-navy font-display">Bảo vệ toàn diện</p>
                <p className="text-sm text-slate-500">Cho mọi giai đoạn chỉnh nha</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const points = [
    "Chuyên biệt cho chỉnh nha",
    "Thông tin minh bạch",
    "Chu trình dễ áp dụng",
    "Gian hàng chính hãng"
  ];
  return (
    <div className="bg-brand text-navy py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
        {points.map((pt, i) => (
          <div key={i} className="flex items-center gap-3 font-semibold">
            <CheckCircle2 className="w-6 h-6 text-brand-dark" />
            <span className="text-[15px]">{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShopByStage() {
  const iconMap: Record<string, any> = { Sparkles, Smile, CheckCircle2, ShieldCheck };
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Bạn đang ở giai đoạn nào?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Mỗi giai đoạn chỉnh nha cần một giải pháp chăm sóc khác biệt. Hãy chọn hành trình của bạn.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, i) => {
            const Icon = iconMap[stage.icon];
            return (
              <motion.div key={stage.id} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.1}} className="group cursor-pointer border border-slate-100 bg-slate-50 hover:bg-brand-light/30 rounded-3xl p-8 transition-colors text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {Icon && <Icon className="w-8 h-8 text-brand-dark" />}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 font-display">{stage.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{stage.desc}</p>
                <div className="flex items-center justify-center text-brand-dark font-medium group-hover:underline">
                  Tìm hiểu thêm <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Hệ sinh thái sản phẩm</h2>
            <p className="text-slate-600 max-w-xl text-lg">Khám phá các dòng sản phẩm được thiết kế tối ưu để làm sạch các vùng khó tiếp cận.</p>
          </div>
          <Button variant="outline" className="rounded-full shrink-0">Xem tất cả</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{opacity:0, scale:0.95}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{delay: i*0.1}} className="group rounded-3xl overflow-hidden relative cursor-pointer aspect-[4/5]">
              <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl font-display group-hover:text-brand transition-colors">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Sản phẩm nổi bật</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Những giải pháp được chuyên gia khuyên dùng và khách hàng yêu thích nhất.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod, i) => (
            <div key={prod.id} className="group flex flex-col h-full">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-6">
                <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-brand-dark">
                  {prod.stage}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{prod.category}</p>
                <h3 className="text-lg font-bold text-navy mb-2 font-display">{prod.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{prod.benefit}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <Button className="flex-1" variant="default">Mua chính hãng</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
