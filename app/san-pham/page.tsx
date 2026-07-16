import Image from "next/image";
import { ProductCatalog } from "./ProductCatalog";
import type { Metadata } from 'next';
import { db } from '@/src/db';
import { products, categories } from '@/src/db/schema';
import { desc } from 'drizzle-orm';

export const metadata: Metadata = {
  title: {
    template: '%s | Sản phẩm tiêu biểu - Fluocaril',
    default: 'Sản phẩm tiêu biểu - Fluocaril',
  },
  description: 'Danh mục các sản phẩm kem đánh răng, nước súc miệng, và bàn chải chuyên biệt cho quá trình chỉnh nha từ Fluocaril.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let productsList: any[] = [];
  let categoriesList: any[] = [];
  
  try {
    productsList = await db.select().from(products).orderBy(desc(products.createdAt));
    categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));
  } catch (error) {
    console.error("Database error in ProductsPage:", error);
  }

  const productsWithCategory = productsList.map(p => {
    const cat = categoriesList.find(c => c.id === p.categoryId);
    return {
      ...p,
      categoryName: cat ? cat.name : null
    };
  });

  return (
    <div className="pb-12 bg-white">
      
      {/* Static Hero Banner */}
      <div className="w-full relative h-[300px] md:h-[450px] mb-8">
        <Image 
            src="https://picsum.photos/seed/fluocaril-hero/1920/600" 
            alt="Fluocaril Chăm sóc răng niềng" 
            fill 
            className="object-cover" 
            priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">Tất cả sản phẩm</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto px-4 drop-shadow">Khám phá các dòng sản phẩm chăm sóc răng miệng chuyên biệt từ Fluocaril dành riêng cho quá trình chỉnh nha.</p>
          </div>
        </div>
      </div>

      <ProductCatalog products={productsWithCategory} categories={categoriesList} />
    </div>
  );
}
