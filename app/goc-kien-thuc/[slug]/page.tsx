import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye, Calendar, User } from 'lucide-react';
import { db } from '@/src/db';
import { posts } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { Metadata } from 'next';
import * as cheerio from 'cheerio';

export const revalidate = 60; // Revalidate cache every 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết',
    };
  }

  return {
    title: `${post.title} | Góc Kiến Thức`,
    description: post.metaDescription || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || 'Bài viết chuyên sâu giúp bạn chăm sóc răng miệng tốt hơn.',
  };
}

function generateTOCAndAddIds(html: string) {
  if (!html) return { toc: [], html: '' };
  
  const $ = cheerio.load(html, null, false);
  const toc: { id: string; text: string; level: number }[] = [];
  
  $('h2, h3').each((i, el) => {
    const text = $(el).text();
    const id = text.toLowerCase().replace(/[^\w\s\u00C0-\u1EF9]/g, '').replace(/\s+/g, '-');
    $(el).attr('id', id);
    toc.push({
      id,
      text,
      level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
    });
  });

  // Ensure images are centered and formatted
  $('img').each((i, el) => {
    $(el).parent().addClass('flex justify-center my-8');
    $(el).addClass('rounded-xl shadow-sm max-w-full h-auto');
  });

  return { toc, html: $.html() };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const article = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  if (!article) {
    notFound();
  }

  // Fetch recent articles for the sidebar
  const recentArticles = await db.query.posts.findMany({
    where: eq(posts.status, 'Published'),
    orderBy: [desc(posts.createdAt)],
    limit: 10,
  });

  const displayDate = article.createdAt ? new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(article.createdAt)) : 'Mới cập nhật';

  // Simulated view count
  const viewCount = 100 + (slug.length * 10) % 500;

  const { toc, html: processedHtml } = generateTOCAndAddIds(article.content || '');

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 font-medium mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-brand transition-colors">Trang chủ</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link href="/goc-kien-thuc" className="hover:text-brand transition-colors">Kiến thức nha khoa</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-slate-800 line-clamp-1">{article.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content - 70% */}
          <div className="w-full lg:w-[70%]">
            <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Header */}
                <header className="mb-10">
                  <h1 className="text-3xl md:text-5xl font-bold font-serif text-navy mb-6 leading-[1.15]">
                    {article.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 font-medium pb-8 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{displayDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author || 'Ban biên tập'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{viewCount} lượt xem</span>
                    </div>
                  </div>
                </header>

                {/* Table of Contents */}
                {toc.length > 0 && (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-10">
                    <h2 className="text-lg font-bold text-navy mb-4">Nội dung chính:</h2>
                    <ul className="space-y-2">
                      {toc.map((item, index) => (
                        <li key={index} className={`${item.level === 3 ? 'ml-6' : ''}`}>
                          <a 
                            href={`#${item.id}`} 
                            className="text-brand-dark hover:text-brand font-medium flex items-start gap-2 group transition-colors"
                          >
                            <span className="text-brand/50 mt-1">•</span>
                            <span className="group-hover:underline underline-offset-2">{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Content */}
                <div 
                  className="prose prose-slate prose-lg max-w-none 
                    prose-headings:font-serif prose-headings:text-navy prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:leading-relaxed prose-p:text-slate-600 prose-p:mb-6
                    prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                    prose-ul:list-disc prose-ul:ml-6 prose-ul:text-slate-600
                    prose-ol:list-decimal prose-ol:ml-6 prose-ol:text-slate-600
                    prose-li:mb-2
                    prose-strong:text-navy prose-strong:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:bg-brand/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700
                    prose-img:rounded-2xl prose-img:mx-auto prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: processedHtml }} 
                />
              </div>
            </article>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold font-serif text-navy mb-6">Bài viết liên quan</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recentArticles.filter(a => a.id !== article.id).slice(0, 3).map((related) => (
                  <Link href={`/goc-kien-thuc/${related.slug}`} key={related.id} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image 
                        src={related.thumbnail || 'https://picsum.photos/seed/placeholder/400/300'} 
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-base text-navy font-bold font-serif group-hover:text-brand transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">
                        {related.createdAt ? new Intl.DateTimeFormat('vi-VN').format(new Date(related.createdAt)) : ''}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 30% */}
          <div className="w-full lg:w-[30%] space-y-8">
            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-brand to-brand-dark rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold font-serif mb-4 relative z-10">Bạn cần tư vấn?</h3>
              <p className="text-white/80 mb-6 text-sm leading-relaxed relative z-10">
                Hãy để lại thông tin, đội ngũ bác sĩ chuyên gia của chúng tôi sẽ liên hệ tư vấn miễn phí cho bạn.
              </p>
              <Link href="/lien-he" className="block w-full py-3 bg-white text-brand font-bold text-center rounded-xl hover:bg-slate-50 transition-colors relative z-10 shadow-sm">
                Đăng ký tư vấn ngay
              </Link>
            </div>

            {/* Recent Articles */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-navy mb-6 pb-4 border-b border-slate-100">Bài viết mới nhất</h3>
              <div className="space-y-6">
                {recentArticles.filter(a => a.id !== article.id).slice(0, 5).map((recent) => (
                  <Link href={`/goc-kien-thuc/${recent.slug}`} key={recent.id} className="group flex gap-4 items-start">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image 
                        src={recent.thumbnail || 'https://picsum.photos/seed/placeholder/200/200'} 
                        alt={recent.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy leading-snug group-hover:text-brand transition-colors line-clamp-2 mb-2">
                        {recent.title}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">
                        {recent.createdAt ? new Intl.DateTimeFormat('vi-VN').format(new Date(recent.createdAt)) : ''}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
