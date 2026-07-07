"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui";
import { stages, categories, products } from "@/lib/data";
import {
  CheckCircle2,
  Sparkles,
  Smile,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function Hero({ data }: { data?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = Array.isArray(data) && data.length > 0 
    ? data 
    : (data && data.imageUrl ? [data] : [
        { imageUrl: "https://picsum.photos/seed/dental1/1920/600" },
        { imageUrl: "https://picsum.photos/seed/dental2/1920/600" },
        { imageUrl: "https://picsum.photos/seed/dental3/1920/600" }
      ]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (slides.length > 0) {
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
            <Link href={slides[currentIndex].linkUrl || "#"} className="absolute inset-0 block cursor-pointer">
              <Image
                src={slides[currentIndex].imageUrl || "https://picsum.photos/seed/dental1/1920/600"}
                alt={slides[currentIndex].title || `Hero banner ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                {slides[currentIndex].title && (
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md text-center px-4">
                    {slides[currentIndex].title}
                  </h1>
                )}
                {slides[currentIndex].subtitle && (
                  <p className="text-lg md:text-2xl text-white drop-shadow-md text-center max-w-3xl px-4 mt-2">
                    {slides[currentIndex].subtitle}
                  </p>
                )}
              </div>
            </Link>
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
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex ? "bg-white w-8" : "bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    );
  }

  return null;
}

export function HeroIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-brand-light text-brand-dark text-sm font-semibold mb-6">
            Giải pháp nha khoa chuyên nghiệp
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight mb-6">
            Chăm răng niềng đúng cách,
            <br />
            tự tin trọn hành trình.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Khám phá hệ sinh thái chăm sóc răng miệng chuyên biệt giúp làm sạch
            hiệu quả quanh mắc cài, chăm sóc hơi thở và bảo vệ thành quả chỉnh
            nha mỗi ngày.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full text-base font-semibold bg-brand hover:bg-brand-dark text-white border-0 px-8"
            >
              Khám phá sản phẩm
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-base font-semibold border-2 border-brand text-brand hover:bg-brand-light px-8"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturedProducts({ items }: { items?: any[] }) {
  const displayItems = items && items.length > 0 ? items : products;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
            Sản phẩm chuyên biệt
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hệ sinh thái Fluocaril với công thức Sodium Fluoride 1480ppm được
            thiết kế đặc biệt để bảo vệ men răng trong suốt quá trình chỉnh nha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              <Link href={`/san-pham/${product.slug}`} className="flex flex-col h-full">
                <div className="relative aspect-square p-6 bg-slate-50/50">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block px-3 py-1 bg-brand text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                        {product.badge === 'new' ? 'Mới' : product.badge === 'best-seller' ? 'Bán chạy' : product.badge}
                      </span>
                    </div>
                  )}
                  <Image
                    src={product.imageUrl || "https://picsum.photos/seed/placeholder/400/533"}
                    alt={product.name}
                    fill
                    className="object-cover p-8 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm font-medium text-brand mb-2">
                    {product.categoryName || product.category}
                  </p>
                  <h3 className="text-lg font-bold text-navy mb-2 leading-tight group-hover:text-brand transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                    Xem chi tiết <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShopByStage() {
  const IconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-8 h-8 text-brand" />,
    Smile: <Smile className="w-8 h-8 text-brand" />,
    CheckCircle2: <CheckCircle2 className="w-8 h-8 text-brand" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-brand" />
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-navy mb-4">Mua Sắm Theo Giai Đoạn</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Chọn giai đoạn chỉnh nha của bạn để khám phá các sản phẩm phù hợp nhất.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, i) => (
            <Link href={`/cham-soc-theo-giai-doan`} key={stage.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 flex flex-col items-center text-center group cursor-pointer transition-all"
              >
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {IconMap[stage.icon]}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{stage.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{stage.desc}</p>
                <div className="mt-auto text-brand text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem sản phẩm <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
