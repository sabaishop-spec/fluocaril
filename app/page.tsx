import { Hero, TrustStrip, ShopByStage, Categories, FeaturedProducts } from "@/components/home-sections-1";
import { WhySpecialized, CareRoutine, KnowledgeHub, LeadGen, FaqSection } from "@/components/home-sections-2";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ShopByStage />
      <Categories />
      <FeaturedProducts />
      <WhySpecialized />
      <CareRoutine />
      <KnowledgeHub />
      <LeadGen />
      <FaqSection />
    </>
  );
}
