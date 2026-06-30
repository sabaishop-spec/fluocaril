"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 120" className={cn("h-8 sm:h-10 w-auto", className)} aria-label="Fluocaril Logo">
    <path d="M40 25 L380 25 Q210 40 40 30 Z" fill="#84EF6E" />
    <text x="210" y="90" fontFamily="sans-serif" fontStyle="italic" fontWeight="900" fontSize="72" textAnchor="middle" fill="#000" letterSpacing="-1">Fluocaril</text>
    <path d="M35 105 L360 105 L355 120 L30 120 Z" fill="#84EF6E" />
  </svg>
);

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="bg-brand-light text-brand-dark py-2 px-4 text-center text-sm font-medium relative">
      <span>Nhận cẩm nang chăm sóc răng niềng miễn phí tại đây!</span>
      <button onClick={() => setIsVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark/70 hover:text-brand-dark">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 inset-x-0 z-50 transition-all duration-300", scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white py-5")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700">
          <Link href="/san-pham" className="hover:text-brand-dark transition-colors">Sản phẩm</Link>
          <Link href="/cham-soc-theo-giai-doan" className="hover:text-brand-dark transition-colors">Chăm sóc theo giai đoạn</Link>
          <Link href="/goc-kien-thuc" className="hover:text-brand-dark transition-colors">Góc kiến thức</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full"><Search className="w-5 h-5" /></Button>
          <Button className="font-semibold shadow-sm">Mua chính hãng</Button>
        </div>
        
        <button className="md:hidden p-2 -mr-2 text-navy" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4 font-medium text-navy">
              <Link href="/san-pham" className="py-2 border-b border-slate-50">Sản phẩm</Link>
              <Link href="/cham-soc-theo-giai-doan" className="py-2 border-b border-slate-50">Chăm sóc theo giai đoạn</Link>
              <Link href="/goc-kien-thuc" className="py-2 border-b border-slate-50">Góc kiến thức</Link>
              <Button className="mt-4 w-full justify-center">Mua chính hãng</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="mb-6 block">
              <Logo className="h-8" />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Thương hiệu chăm sóc răng miệng chuyên biệt đồng hành cùng người dùng trong từng giai đoạn chỉnh nha.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-navy mb-4 font-display">Sản phẩm</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Kem đánh răng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Nước súc miệng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Bàn chải kẽ</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Làm sạch khay & hàm duy trì</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-navy mb-4 font-display">Chăm sóc chỉnh nha</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Sắp niềng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Đang niềng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Sau tháo niềng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Khay trong suốt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-navy mb-4 font-display">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Liên hệ</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Hướng dẫn mua hàng</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Fluocaril Vietnam. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
             <Link href="#" className="hover:text-navy transition-colors">Facebook</Link>
             <Link href="#" className="hover:text-navy transition-colors">Shopee</Link>
             <Link href="#" className="hover:text-navy transition-colors">TikTok</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform" title="Chat Zalo">
        <MessageCircle className="w-6 h-6" />
      </button>
      <button className="w-14 h-14 bg-[#84EF6E] text-navy rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform" title="Gọi Hotline">
        <Phone className="w-6 h-6" />
      </button>
    </div>
  );
}
