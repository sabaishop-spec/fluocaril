import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng | Fluocaril',
  description: 'Điều khoản và điều kiện sử dụng website của Fluocaril.',
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-8">
            Điều khoản sử dụng
          </h1>
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-brand-dark prose-a:text-brand">
            <p className="lead text-lg text-slate-600 mb-8">
              Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
            </p>
            
            <h3>1. Quyền sở hữu trí tuệ</h3>
            <p>
              Mọi nội dung, hình ảnh, văn bản và thiết kế trên website này thuộc bản quyền của Fluocaril. Mọi hành vi sao chép, phân phối hoặc sử dụng trái phép đều bị nghiêm cấm.
            </p>

            <h3>2. Trách nhiệm của người dùng</h3>
            <p>
              Bạn cam kết không sử dụng website cho bất kỳ mục đích bất hợp pháp nào hoặc có hành vi gây ảnh hưởng đến hoạt động bình thường của hệ thống.
            </p>

            <h3>3. Thay đổi nội dung</h3>
            <p>
              Chúng tôi bảo lưu quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản sử dụng này vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng tải trên website.
            </p>

            <h3>4. Giới hạn trách nhiệm</h3>
            <p>
              Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng website này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
