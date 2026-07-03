import { Hero, HeroIntro, FeaturedProducts } from "@/components/home-sections-1";
import { WhySpecialized, CareRoutine, KnowledgeHub, FaqSection } from "@/components/home-sections-2";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroIntro />
      <FeaturedProducts />
      <WhySpecialized />
      <CareRoutine />
      <KnowledgeHub />
      <FaqSection />
    </>
  );
}
