"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white shadow-sm flex flex-col">
      <div className="bg-brand text-white py-1.5 px-4 text-xs font-medium text-center">
        Fluocaril - Chuyên gia chăm sóc răng niềng đến từ Pháp
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between w-full">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700">
          <Link href="/san-pham" className="hover:text-brand-dark transition-colors flex items-center gap-1">Sản phẩm <ChevronDown className="w-4 h-4 text-slate-400" /></Link>
          <Link href="/cham-soc-theo-giai-doan" className="hover:text-brand-dark transition-colors flex items-center gap-1">Chăm sóc theo giai đoạn <ChevronDown className="w-4 h-4 text-slate-400" /></Link>
          <Link href="/goc-kien-thuc" className="hover:text-brand-dark transition-colors flex items-center gap-1">Góc kiến thức <ChevronDown className="w-4 h-4 text-slate-400" /></Link>
        </nav>
        
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
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
            <h4 className="font-bold text-navy mb-4 font-display">Thông tin pháp lý & Hỗ trợ</h4>
            <ul className="space-y-3 text-sm text-slate-600 mb-6">
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Điều khoản sử dụng</Link></li>
            </ul>
            <div className="flex items-center gap-3">
               <Link href="#" className="w-10 h-10 rounded-full bg-navy text-white hover:text-[#2DD4BF] flex items-center justify-center transition-colors">
                 <i className="fa-brands fa-facebook text-xl"></i>
               </Link>
               <Link href="#" className="w-10 h-10 rounded-full bg-navy text-white hover:text-[#2DD4BF] flex items-center justify-center transition-colors">
                 <i className="fa-brands fa-instagram text-xl"></i>
               </Link>
               <Link href="#" className="w-10 h-10 rounded-full bg-navy text-white hover:text-[#2DD4BF] flex items-center justify-center transition-colors">
                 <i className="fa-brands fa-tiktok text-xl"></i>
               </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 text-sm text-slate-400 text-center">
          <p>© {new Date().getFullYear()} Fluocaril Vietnam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

