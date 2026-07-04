"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Logo = ({ className }: { className?: string }) => (
  <img 
    src="https://assets.unileversolutions.com/v1/38775417.png?im=Resize,width=768,height=768" 
    alt="Fluocaril Logo" 
    className={cn("h-10 sm:h-12 w-auto object-contain", className)} 
  />
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
          <div className="relative group cursor-pointer">
            <Link href="/san-pham" className="hover:text-brand-dark transition-colors flex items-center gap-1">
              Sản phẩm <ChevronDown className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="absolute top-full left-0 pt-4 hidden group-hover:flex flex-col z-50 min-w-[240px] transition-all duration-300">
              <div className="bg-white shadow-xl rounded-xl p-3 border border-slate-100 flex flex-col">
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Kem đánh răng chuyên dụng</Link>
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Nước súc miệng kháng khuẩn</Link>
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Bàn chải kẽ rãnh V</Link>
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Làm sạch khay & hàm duy trì</Link>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <Link href="/goc-kien-thuc" className="hover:text-brand-dark transition-colors flex items-center gap-1">
              Góc kiến thức <ChevronDown className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="absolute top-full left-0 pt-4 hidden group-hover:flex flex-col z-50 min-w-[240px] transition-all duration-300">
              <div className="bg-white shadow-xl rounded-xl p-3 border border-slate-100 flex flex-col">
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Kiến thức chỉnh nha tổng quát</Link>
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Hướng dẫn vệ sinh đúng cách</Link>
                <Link href="#" className="text-slate-700 text-sm py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-[#84EF6E] transition-colors">Dinh dưỡng cho răng niềng</Link>
              </div>
            </div>
          </div>

          <Link href="/cau-hoi-thuong-gap" className="hover:text-brand-dark transition-colors flex items-center gap-1">Câu hỏi thường gặp</Link>
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
              <Link href="/goc-kien-thuc" className="py-2 border-b border-slate-50">Góc kiến thức</Link>
              <Link href="/cau-hoi-thuong-gap" className="py-2 border-b border-slate-50">Câu hỏi thường gặp</Link>
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
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-0.5 shrink-0"></i>
                <span>Tòa nhà ABC, Đường XYZ, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone-alt shrink-0"></i>
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope shrink-0"></i>
                <span>contact@fluocaril.vn</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-navy mb-4 font-serif">Sản phẩm</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Kem đánh răng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Nước súc miệng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Bàn chải kẽ</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Làm sạch khay & hàm duy trì</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-navy mb-4 font-serif">Chăm sóc chỉnh nha</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Sắp niềng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Đang niềng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Sau tháo niềng</Link></li>
              <li><Link href="#" className="hover:text-brand-dark transition-colors">Khay trong suốt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-navy mb-4 font-serif">Thông tin pháp lý & Hỗ trợ</h4>
            <ul className="space-y-3 text-sm text-slate-600 mb-6">
              <li><Link href="/cau-hoi-thuong-gap" className="hover:text-brand-dark transition-colors">Câu hỏi thường gặp</Link></li>
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

