"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui";
import { stages, categories, products } from "@/lib/data";
import { CheckCircle2, Sparkles, Smile, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function Hero() {
  const images = [
    "https://picsum.photos/seed/dental1/1920/600",
    "https://picsum.photos/seed/dental2/1920/600",
    "https://picsum.photos/seed/dental3/1920/600"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-100 group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Hero banner ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-md flex items-center justify-center text-white md:opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft className="w-6 h-6 text-slate-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-md flex items-center justify-center text-white md:opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronRight className="w-6 h-6 text-slate-800" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentIndex ? "bg-white w-8" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function HeroIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <span className="inline-block py-1 px-4 rounded-full bg-brand-light text-brand-dark text-sm font-semibold mb-6">Giải pháp nha khoa chuyên nghiệp</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-navy leading-tight mb-6">
            Chăm răng niềng đúng cách,<br />tự tin trọn hành trình.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Khám phá hệ sinh thái chăm sóc răng miệng chuyên biệt giúp làm sạch hiệu quả quanh mắc cài, chăm sóc hơi thở và bảo vệ thành quả chỉnh nha mỗi ngày.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full text-base font-semibold bg-brand hover:bg-brand-dark text-white border-0 px-8">Khám phá sản phẩm</Button>
            <Button size="lg" variant="outline" className="rounded-full text-base font-semibold text-navy hover:bg-slate-50 border-slate-200 px-8">Tìm chu trình phù hợp</Button>
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">Dịch vụ & Sản phẩm tiêu biểu</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Hệ sinh thái chăm sóc răng miệng chuyên biệt mang đến nụ cười hoàn hảo.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod, i) => (
            <div key={prod.id} className="group flex flex-col h-full bg-[#84EF6E] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-6">
                <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {prod.stage}
                </div>
              </div>
              <div className="flex-1 flex flex-col text-center">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">{prod.category}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-display group-hover:text-black transition-colors line-clamp-2">{prod.name}</h3>
                <p className="text-sm text-slate-800 mb-0 line-clamp-2 leading-relaxed">{prod.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
