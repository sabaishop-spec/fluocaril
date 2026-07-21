import { ProductImage } from "@/components/ProductImage";
import { db } from '@/src/db';
import { products, categories as categoriesTable } from '@/src/db/schema';
import { eq, and, ne } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import Script from "next/script";
import { RelatedProducts } from "./RelatedProducts";
import { ShareButton } from "./ShareButton";
import { ProductAccordion } from "./ProductAccordion";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  if (slug) {
    try {
      const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
      product = productList[0];
    } catch(e) { console.error(e) }
  }
    
  if (!product) {
    return { title: 'Sản phẩm không tìm thấy' };
  }

  return {
    title: `${product.name} | Fluocaril`,
    description: product.description || `Sản phẩm ${product.name} từ Fluocaril`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product = null;
  let category = null;
  let relatedProductsList: any[] = [];
  
  if (slug) {
    try {
      const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
      product = productList[0];
      if (product) {
        if (product.categoryId) {
          const categoryList = await db.select().from(categoriesTable).where(eq(categoriesTable.id, product.categoryId)).limit(1);
          category = categoryList[0];
          relatedProductsList = await db.select().from(products)
            .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
            .limit(4);
        }
      }
    } catch(e) { console.error(e) }
  }

  if (!product) {
    notFound();
  }

  const accordionItems: { title: string; content: React.ReactNode }[] = [];
  
  if (product.ingredients && product.ingredients.trim() !== '') {
    accordionItems.push({
      title: 'Thành phần',
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {product.ingredients.split('\n').map((line: string, idx: number) => line.trim() ? <li key={idx}>{line.trim()}</li> : null)}
        </ul>
      )
    });
  }

  if (product.productSpecifications && product.productSpecifications.trim() !== '') {
    accordionItems.push({
      title: 'Thông số sản phẩm',
      content: (
        <div className="space-y-2">
          {product.productSpecifications.split('\n').map((line: string, idx: number) => {
            if (!line.trim()) return null;
            const colonIdx = line.indexOf(':');
            if (colonIdx !== -1) {
              const before = line.substring(0, colonIdx + 1);
              const after = line.substring(colonIdx + 1);
              return <p key={idx}><span className="font-medium text-slate-700">{before}</span>{after}</p>;
            }
            return <p key={idx}>{line.trim()}</p>;
          })}
        </div>
      )
    });
  }

  if (product.usageInstructions && product.usageInstructions.trim() !== '') {
    accordionItems.push({
      title: 'Hướng dẫn sử dụng',
      content: (
        <p className="whitespace-pre-line">
          {product.usageInstructions.trim()}
        </p>
      )
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.imageUrl || 'https://picsum.photos/seed/placeholder/400/533',
    description: product.description || `Sản phẩm ${product.name} chuyên biệt cho người niềng răng.`,
    brand: {
      '@type': 'Brand',
      name: 'Fluocaril'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: '0',
      availability: 'https://schema.org/InStock',
      url: `https://fluocaril.com.vn/san-pham/${product.slug}`
    }
  };

  return (
    <div className="bg-white pb-20">
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Product Detail Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto px-4 py-8">
        {/* Left Column (Image) */}
        <div>
          <div className="relative aspect-square md:aspect-[3/4] bg-[#f8f8f8] rounded-2xl overflow-hidden shadow-sm">
            <ProductImage
              src={product.imageUrl || "https://picsum.photos/seed/placeholder/600/800"}
              alt={product.name}
              priority
            />
          </div>
        </div>

        {/* Right Column (Details) */}
        <div className="flex flex-col">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <Link href="/san-pham" className="hover:text-slate-900 transition-colors">
                    Sản phẩm
                  </Link>
                </div>
              </li>
              {category && (
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                    <Link href={`/san-pham?category=${category.id}`} className="hover:text-slate-900 transition-colors">
                      {category.name}
                    </Link>
                  </div>
                </li>
              )}
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <span className="text-slate-900 font-medium line-clamp-1">
                    {product.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Badge */}
          {product.badge && (
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                product.badge === 'new' ? 'bg-blue-100 text-blue-700' : 
                product.badge === 'best-seller' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-900'
              }`}>
                {product.badge === 'new' ? 'MỚI' :
                 product.badge === 'best-seller' ? 'BÁN CHẠY' : product.badge}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 font-serif">
            {product.name}
          </h1>
          
          {/* Description */}
          <p className="leading-relaxed text-slate-600 mt-6 font-sans text-base whitespace-pre-line">
            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này. Fluocaril mang đến các giải pháp chuyên biệt giúp bảo vệ và chăm sóc sức khỏe răng miệng tối ưu trong suốt quá trình chỉnh nha."}
          </p>
          
          {accordionItems.length > 0 && (
            <ProductAccordion items={accordionItems} />
          )}

          <div className="space-y-4 mt-8 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 bg-green-100 rounded-full p-1 text-green-600">
                <Check className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-slate-900">Sản phẩm chính hãng Fluocaril</h4>
                <p className="text-sm text-slate-500 mt-1">Đảm bảo nguồn gốc xuất xứ và chất lượng.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 bg-green-100 rounded-full p-1 text-green-600">
                <Check className="w-4 h-4" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-slate-900">Chuyên biệt cho người niềng răng</h4>
                <p className="text-sm text-slate-500 mt-1">Công thức độc quyền giúp làm sạch sâu và bảo vệ men răng.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {product.shopeeUrl ? (
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#ee4d2d] hover:bg-[#d74326] text-white text-base font-bold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Mua ngay trên Shopee
              </a>
            ) : (
              <button className="flex-1 bg-navy text-white text-base font-semibold py-4 rounded-xl shadow-lg shadow-navy/20 hover:bg-navy/90 hover:-translate-y-0.5 transition-all">
                Liên hệ tư vấn
              </button>
            )}
            <ShareButton 
              title={product.name} 
              text={product.description || `Sản phẩm ${product.name} từ Fluocaril`}
              url={`https://fluocaril.com.vn/san-pham/${product.slug}`} 
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedProducts products={relatedProductsList} />
      </div>
    </div>
  );
}
