import sys

with open('app/san-pham/[slug]/page.tsx', 'r') as f:
    content = f.read()

import_old = """import Script from "next/script";
import { RelatedProducts } from "./RelatedProducts";
import { ShareButton } from "./ShareButton";"""

import_new = """import Script from "next/script";
import { RelatedProducts } from "./RelatedProducts";
import { ShareButton } from "./ShareButton";
import { ProductAccordion } from "./ProductAccordion";"""

content = content.replace(import_old, import_new)

logic_old = """  const jsonLd = {"""

logic_new = """  const accordionItems = [
    {
      title: 'Thành phần',
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Sodium Fluoride (1480ppm) giúp tái khoáng hóa men răng.</li>
          <li>Thành phần kháng khuẩn giúp giảm mảng bám.</li>
          <li>Chiết xuất tự nhiên dịu nhẹ cho nướu nhạy cảm.</li>
          <li>Không chứa cồn (đối với nước súc miệng), an toàn khi sử dụng hàng ngày.</li>
        </ul>
      )
    },
    {
      title: 'Thông số sản phẩm',
      content: (
        <div className="space-y-2">
          <p><span className="font-medium text-slate-700">Dung tích / Trọng lượng:</span> Thay đổi theo sản phẩm (VD: 100ml, 150g, 500ml)</p>
          <p><span className="font-medium text-slate-700">Xuất xứ thương hiệu:</span> Pháp</p>
          <p><span className="font-medium text-slate-700">Đối tượng sử dụng:</span> Người lớn và trẻ em trên 12 tuổi, đặc biệt dành cho người đang niềng răng, chỉnh nha.</p>
          <p><span className="font-medium text-slate-700">Hạn sử dụng:</span> Xem trên bao bì sản phẩm.</p>
        </div>
      )
    },
    {
      title: 'Hướng dẫn sử dụng',
      content: (
        <p>
          Sử dụng 2 lần mỗi ngày (sáng và tối) hoặc sau các bữa ăn. Đối với kem đánh răng, lấy một lượng vừa đủ lên bàn chải và chải đều các mặt răng. Đối với nước súc miệng, ngậm và súc trong khoảng 30 giây rồi nhổ bỏ, không cần súc lại với nước.
        </p>
      )
    }
  ];

  const jsonLd = {"""

content = content.replace(logic_old, logic_new)


comp_old = """          <p className="leading-relaxed text-slate-600 mt-6 font-sans text-base whitespace-pre-line">
            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này. Fluocaril mang đến các giải pháp chuyên biệt giúp bảo vệ và chăm sóc sức khỏe răng miệng tối ưu trong suốt quá trình chỉnh nha."}
          </p>

          <div className="space-y-4 mt-8 mb-8">"""

comp_new = """          <p className="leading-relaxed text-slate-600 mt-6 font-sans text-base whitespace-pre-line">
            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này. Fluocaril mang đến các giải pháp chuyên biệt giúp bảo vệ và chăm sóc sức khỏe răng miệng tối ưu trong suốt quá trình chỉnh nha."}
          </p>
          
          <ProductAccordion items={accordionItems} />

          <div className="space-y-4 mt-8 mb-8">"""

content = content.replace(comp_old, comp_new)

with open('app/san-pham/[slug]/page.tsx', 'w') as f:
    f.write(content)
