import { Accordion } from "@/components/ui";
import { faqs } from "@/lib/data";

export default function FaqPage() {
  return (
    <div className="pt-24 pb-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">Câu hỏi thường gặp</h1>
          <p className="text-slate-600 text-lg">Giải đáp những thắc mắc phổ biến về sản phẩm và chu trình chăm sóc.</p>
        </div>
        <Accordion items={faqs.map(f => ({ title: f.question, content: f.answer }))} />
      </div>
    </div>
  );
}
