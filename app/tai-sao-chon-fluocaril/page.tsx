"use client";

import Link from "next/link";
import { AlertCircle, Bug, Flame, CheckCircle, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Step {
  id: string;
  title: string;
  description: string;
  imagePreview: string | null;
}

export default function TaiSaoChonFluocaril() {
  const [steps, setSteps] = useState<Step[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('landing_page_steps');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved steps", e);
        }
      }
    }
    return [
      {
        id: 'step-1',
        title: 'Chải răng',
        description: 'Sử dụng bàn chải rãnh chữ V thiết kế riêng biệt để làm sạch hoàn hảo cả bề mặt mắc cài lẫn kẽ răng xung quanh.',
        imagePreview: null,
      },
      {
        id: 'step-2',
        title: 'Làm sạch kẽ',
        description: 'Len lỏi vào những vị trí hẹp nhất dưới dây cung và giữa các kẽ răng để loại bỏ triệt để mảnh vụn thức ăn cứng đầu.',
        imagePreview: null,
      },
      {
        id: 'step-3',
        title: 'Súc miệng',
        description: 'Tăng cường màng bảo vệ Fluoride, tái khoáng hóa men răng và diệt khuẩn toàn diện cho khoang miệng thơm mát dài lâu.',
        imagePreview: null,
      },
    ];
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-900 tracking-tight leading-tight">
            Hành trình chỉnh nha an toàn <br className="hidden md:block" /> cùng chuyên gia Fluocaril
          </h1>
          <p className="mt-6 text-lg md:text-xl text-teal-700/80 max-w-2xl mx-auto">
            Sản phẩm chuyên biệt được thiết kế để bảo vệ toàn diện nụ cười của bạn trong suốt quá trình niềng răng.
          </p>
        </div>
      </section>

      {/* Nỗi Đau (Pain Points) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Những rủi ro tiềm ẩn khi vệ sinh răng niềng sai cách
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Khí cụ niềng răng tạo ra nhiều không gian khó tiếp cận, làm tăng nguy cơ mắc các bệnh lý răng miệng nếu không được chăm sóc đúng chuẩn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Mảng bám & Điểm mù</h3>
            <p className="text-gray-500 leading-relaxed">
              Mắc cài và dây cung tạo ra những &quot;điểm mù&quot; mà bàn chải thông thường không thể làm sạch, dẫn đến tích tụ mảng bám nguy hiểm.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6">
              <Bug className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Đốm trắng & Sâu răng</h3>
            <p className="text-gray-500 leading-relaxed">
              Vi khuẩn chuyển hóa đường thành axit, tấn công men răng yếu ớt quanh mắc cài, gây ra các đốm trắng mất thẩm mỹ và sâu răng.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Viêm nướu</h3>
            <p className="text-gray-500 leading-relaxed">
              Mảng bám lâu ngày gây kích ứng nướu, khiến nướu sưng đỏ, dễ chảy máu, cản trở quá trình dịch chuyển của răng.
            </p>
          </div>
        </div>
      </section>

      {/* Giải Pháp Từ Fluocaril */}
      <section className="bg-emerald-600 py-24 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Chu trình 3 bước chuẩn Nha khoa
            </h2>
            <p className="mt-4 text-emerald-100 max-w-2xl mx-auto">
              Giải pháp chăm sóc răng niềng chuyên nghiệp, được các chuyên gia nha khoa khuyên dùng để bảo vệ sức khỏe răng miệng tối ưu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className="w-full aspect-video bg-emerald-700/50 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative shadow-sm">
                  {step.imagePreview ? (
                    <img src={step.imagePreview} className="w-full h-full object-cover" alt={step.title} />
                  ) : (
                    <div className="text-emerald-300 font-medium">Hình ảnh placeholder</div>
                  )}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">{index + 1}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-300" />
                  {step.title}
                </h3>
                <p className="text-emerald-50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sẵn sàng cho một nụ cười khỏe đẹp?
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Trang bị ngay bộ giải pháp vệ sinh răng miệng chuyên biệt để quá trình niềng răng trở nên dễ dàng và hiệu quả hơn bao giờ hết.
            </p>
            <Link href="/san-pham" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30">
              Khám phá hệ sinh thái sản phẩm Fluocaril
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
