"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, ChevronRight, Clock, X, Eye, SlidersHorizontal } from "lucide-react";
import { QuickViewModal } from "./QuickViewModal";

import { ProductImage } from "@/components/ProductImage";

function CatalogContent({ products, categories }: { products: any[], categories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset visibleCount when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(12);
  }, [searchQuery, searchParams]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load recent searches", e);
    }
  }, []);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFilterOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      } catch (e) {
        console.error("Could not save recent searches", e);
      }
      return updated;
    });
  };

  const removeRecentSearch = (e: React.MouseEvent, queryToRemove: string) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(s => s !== queryToRemove);
      try {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      } catch (err) {
        console.error("Could not update recent searches", err);
      }
      return updated;
    });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveRecentSearch(searchQuery);
      setIsSearchFocused(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam ? parseInt(categoryParam, 10) : null;

  const badgeParam = searchParams.get("badge");
  const activeBadge = badgeParam || null;

  const setCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (id !== null) {
      newSearchParams.set("category", id.toString());
    } else {
      newSearchParams.delete("category");
    }
    router.push(`/san-pham?${newSearchParams.toString()}`);
  };

  const setBadge = (badge: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (badge !== null) {
      newSearchParams.set("badge", badge);
    } else {
      newSearchParams.delete("badge");
    }
    router.push(`/san-pham?${newSearchParams.toString()}`);
  };

  let filteredProducts = activeCategory
    ? products.filter(p => p.categoryId === activeCategory)
    : products;

  if (activeBadge) {
    filteredProducts = filteredProducts.filter(p => p.badge === activeBadge);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name?.toLowerCase().includes(query));
  }

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                <Link 
                  href="/san-pham" 
                  onClick={(e) => {
                    if (activeCategory) {
                      e.preventDefault();
                      setCategory(null);
                    }
                  }}
                  className={cn("hover:text-slate-900 transition-colors", !activeCategory && "text-slate-900 font-medium")}
                >
                  Sản phẩm
                </Link>
              </div>
            </li>
            {activeCategory && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <span className="text-slate-900 font-medium line-clamp-1">
                    {categories.find(c => c.id === activeCategory)?.name || ""}
                  </span>
                </div>
              </li>
            )}
          </ol>
        </nav>
      </div>

      {/* Sticky Category Tabs */}
      <div className="sticky top-[95px] md:top-[104px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Filter Button */}
          <div className="md:hidden flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Danh mục</h2>
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Lọc & Tìm kiếm
            </button>
          </div>

          {/* Desktop Filter Row */}
          <div className="hidden md:flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row gap-3 w-auto">
              {/* Category Dropdown */}
              <div className="relative w-64 shrink-0">
                <select
                  value={activeCategory === null ? 'all' : activeCategory}
                  onChange={(e) => setCategory(e.target.value === 'all' ? null : parseInt(e.target.value, 10))}
                  className="w-full px-4 py-2.5 pr-10 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent appearance-none cursor-pointer transition-all"
                >
                  <option value="all">Tất cả</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 min-w-[240px] max-w-xs" ref={searchRef}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleSearchKeyDown}
                  onBlur={() => {
                    setTimeout(() => {
                      if (searchQuery.trim()) saveRecentSearch(searchQuery);
                    }, 200);
                  }}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent sm:text-sm transition-all relative z-10"
                />
                
                {isSearchFocused && recentSearches.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tìm kiếm gần đây</span>
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {recentSearches.map((search, idx) => (
                        <li key={idx} className="border-b border-slate-50 last:border-0">
                          <button
                            onClick={() => {
                              setSearchQuery(search);
                              setIsSearchFocused(false);
                              saveRecentSearch(search);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="text-sm text-slate-700 truncate">{search}</span>
                            </div>
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(e) => removeRecentSearch(e, search)}
                              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
              <button
                onClick={() => setBadge(null)}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                  activeBadge === null
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Tất cả
              </button>
              <button
                onClick={() => setBadge('new')}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                  activeBadge === 'new'
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Mới
              </button>
              <button
                onClick={() => setBadge('best-seller')}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                  activeBadge === 'best-seller'
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                Bán chạy
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Drawer */}
      <AnimatePresence>
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full rounded-t-3xl shadow-xl flex flex-col max-h-[85vh]"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 font-serif">Lọc & Tìm kiếm</h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tìm kiếm sản phẩm</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsMobileFilterOpen(false);
                      }
                    }}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Danh mục</label>
                <div className="relative">
                  <select
                    value={activeCategory === null ? 'all' : activeCategory}
                    onChange={(e) => setCategory(e.target.value === 'all' ? null : parseInt(e.target.value, 10))}
                    className="w-full px-4 py-3 pr-10 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
              
              {/* Badges */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Lọc theo nhãn</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setBadge(null)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
                      activeBadge === null
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => setBadge('new')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
                      activeBadge === 'new'
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    Mới
                  </button>
                  <button
                    onClick={() => setBadge('best-seller')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
                      activeBadge === 'best-seller'
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    Bán chạy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 mt-auto">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-navy text-white text-center font-semibold py-3.5 rounded-xl hover:bg-navy/90 transition-colors shadow-sm"
              >
                Hiển thị kết quả
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>


      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {displayedProducts.map((prod) => (
            <Link href={`/san-pham/${prod.slug}`} key={prod.id} className="group block cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full flex flex-col rounded-2xl bg-white p-1 pb-3"
              >
                {/* Image Box */}
                <div className="relative aspect-[3/4] bg-[#f8f8f8] rounded-xl overflow-hidden mb-3">
                <ProductImage
                  src={prod.imageUrl || prod.image || "https://picsum.photos/seed/placeholder/400/533"}
                  alt={prod.name}
                  className="group-hover:scale-105"
                />

                {/* Badge / Tag */}
                {prod.badge && (
                  <div className={cn(
                    "absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                    prod.badge === 'new' ? 'bg-blue-100 text-blue-700' : 
                    prod.badge === 'best-seller' ? 'bg-red-100 text-red-700' : 'bg-white/90 text-slate-900'
                  )}>
                    {prod.badge === 'new' ? 'MỚI' : 
                     prod.badge === 'best-seller' ? 'BÁN CHẠY' : prod.badge}
                  </div>
                )}

                {/* Optional dark gradient to make the button text pop more if needed */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {/* Quick Action Button */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setQuickViewProduct(prod);
                    }}
                    className="flex-1 bg-white text-navy border border-white hover:border-slate-200 text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-lg"
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Xem nhanh
                  </button>
                  <div className="flex-1 bg-navy text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center hover:bg-navy/90 transition-colors shadow-lg">
                    Chi tiết
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 flex flex-col px-1">
                <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-brand transition-colors">
                  {prod.name}
                </h3>
                {prod.price && (
                  <p className="mt-1.5 font-bold text-navy">
                    {prod.price}
                  </p>
                )}
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
              <Search className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-slate-500 mb-6 max-w-md">Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với bộ lọc và từ khóa tìm kiếm của bạn.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                router.push("/san-pham");
              }}
              className="px-6 py-2 bg-navy text-white rounded-full font-medium hover:bg-navy/90 transition-colors shadow-sm"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
        
        {/* Load More Button */}
        {filteredProducts.length > displayedProducts.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-full hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2"
            >
              <ChevronDown className="w-4 h-4" />
              Xem thêm sản phẩm
            </button>
          </div>
        )}
      </div>
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </div>
  );
}

export function ProductCatalog({ products, categories }: { products: any[], categories: any[] }) {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Đang tải...</div>}>
      <CatalogContent products={products} categories={categories} />
    </Suspense>
  );
}
