"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { Post, ArticleCategory } from "@/src/db/queries";

interface KnowledgeHubWrapperProps {
  posts: Post[];
  categories: ArticleCategory[];
}

export default function KnowledgeHubWrapper({ posts, categories }: KnowledgeHubWrapperProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(categories[0]?.id || null);

  const filteredPosts = activeCategoryId
    ? posts.filter((post) => post.categoryId === activeCategoryId)
    : posts;

  const featured = filteredPosts[0];
  const list = filteredPosts.slice(1, 5);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const placeholderImage = "https://picsum.photos/seed/placeholder/800/600";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
              Tin tức & Góc kiến thức
            </h2>
            <p className="text-slate-600 max-w-xl text-lg">
              Bài viết chuyên sâu giúp bạn chăm sóc răng miệng tốt hơn mỗi ngày.
            </p>
          </div>
          <div className="hidden md:flex">
            <Link href="/goc-kien-thuc" className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors hover:bg-slate-100 text-brand-dark hover:text-navy h-11 px-6 py-2 shrink-0">
              Xem tất cả bài viết <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
                activeCategoryId === cat.id
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-brand border-brand hover:bg-brand hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured (Left Column) */}
          <div className="lg:col-span-7 xl:col-span-8">
            {featured ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Link href={`/goc-kien-thuc/${featured.slug}`} className="group flex flex-col h-full">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={featured.thumbnail || placeholderImage}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-dark leading-snug group-hover:text-brand transition-colors font-serif mb-4">
                      {featured.title}
                    </h3>
                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featured.createdAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {featured.author || "Admin"}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed mb-6">
                      {featured.metaDescription || "Đọc bài viết chi tiết để hiểu thêm về chủ đề này."}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ) : (
               <div className="flex items-center justify-center h-full min-h-[300px] bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-500">Chưa có bài viết nào trong danh mục này.</p>
               </div>
            )}
          </div>

          {/* List Sidebar (Right Column) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            {list.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="pb-6 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <Link href={`/goc-kien-thuc/${article.slug}`} className="flex gap-4 group items-start">
                  <div className="relative w-32 h-24 shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={article.thumbnail || placeholderImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-brand-dark leading-snug group-hover:text-brand transition-colors font-serif line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <div className="mt-auto text-slate-400 text-xs flex items-center gap-3">
                       <span className="flex items-center gap-1.5">
                         <User className="w-3 h-3" />
                         <span className="line-clamp-1">{article.author || "Admin"}</span>
                       </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            <div className="mt-6 md:hidden">
              <Link href="/goc-kien-thuc" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 bg-white text-navy h-11 px-6 py-2 w-full rounded-full text-brand-dark border-slate-200 hover:bg-slate-50">
                Xem tất cả bài viết <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
