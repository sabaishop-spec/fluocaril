import { Hero, HeroIntro, FeaturedProducts } from "@/components/home-sections-1";
import { WhySpecialized, CareRoutine, KnowledgeHub } from "@/components/home-sections-2";
import { db } from '@/src/db';
import { products, categories, siteSettings } from '@/src/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chăm Sóc Răng Niềng Chuyên Biệt | Trang Chủ | Fluocaril',
  description: 'Khám phá sản phẩm chăm sóc răng miệng chuyên biệt từ Fluocaril dành cho người niềng răng, chỉnh nha, và đeo khay trong suốt.',
};


export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
  const heroData = heroSetting[0]?.value || null;

  const productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);
  const categoriesList = await db.select().from(categories);
  const productsWithCategory = productsList.map(p => {
    const cat = categoriesList.find(c => c.id === p.categoryId);
    return {
      ...p,
      categoryName: cat ? cat.name : null
    };
  });

  return (
    <>
      <Hero data={heroData} />
      <HeroIntro />
      <FeaturedProducts items={productsWithCategory} />
      <WhySpecialized />
      <CareRoutine />
      <KnowledgeHub />
    </>
  );
}
