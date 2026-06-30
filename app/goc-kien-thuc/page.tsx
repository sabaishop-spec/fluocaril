import { KnowledgeHub, LeadGen } from "@/components/home-sections-2";

export default function KnowledgePage() {
  return (
    <div className="pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">Góc kiến thức</h1>
        <p className="text-slate-600 text-lg max-w-2xl">Bài viết chuyên sâu giúp bạn chăm sóc răng miệng tốt hơn mỗi ngày từ các chuyên gia nha khoa.</p>
      </div>
      <KnowledgeHub />
      <LeadGen />
    </div>
  );
}
