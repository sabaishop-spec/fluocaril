import { Hero, HeroIntro, FeaturedProducts } from "@/components/home-sections-1";
import { WhySpecialized, CareRoutine, KnowledgeHub } from "@/components/home-sections-2";
import { getHeroBanner, getLatestProducts, getCategories } from '@/src/db/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chăm Sóc Răng Niềng Chuyên Biệt | Trang Chủ | Fluocaril',
  description: 'Khám phá sản phẩm chăm sóc răng miệng chuyên biệt từ Fluocaril dành cho người niềng răng, chỉnh nha, và đeo khay trong suốt.',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroData = await getHeroBanner();
  const productsList = await getLatestProducts();
  const categoriesList = await getCategories();

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
