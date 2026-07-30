import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật | Fluocaril',
  description: 'Chính sách bảo mật thông tin khách hàng của Fluocaril.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-8">
            Chính sách bảo mật
          </h1>
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-brand-dark prose-a:text-brand">
            <p className="lead text-lg text-slate-600 mb-8">
              Chào mừng bạn đến với website của Fluocaril. Chúng tôi tôn trọng và cam kết bảo mật những thông tin cá nhân của bạn.
            </p>
            
            <h3>1. Thu thập thông tin</h3>
            <p>
              Chúng tôi chỉ thu thập những thông tin cần thiết và có liên quan đến giao dịch giữa bạn và chúng tôi. Bạn có thể ghé thăm trang web mà không cần phải cung cấp bất kỳ thông tin cá nhân nào.
            </p>

            <h3>2. Sử dụng thông tin</h3>
            <p>
              Thông tin thu thập được sẽ được sử dụng cho mục đích nâng cao chất lượng dịch vụ, bao gồm liên lạc, hỗ trợ khách hàng và cải thiện trải nghiệm trên website.
            </p>

            <h3>3. Bảo mật thông tin</h3>
            <p>
              Chúng tôi luôn nỗ lực để đảm bảo rằng thông tin của bạn được bảo mật an toàn nhất. Tuy nhiên, không có phương thức truyền tải dữ liệu nào qua internet hay phương thức lưu trữ điện tử nào an toàn tuyệt đối.
            </p>

            <h3>4. Quyền lợi của khách hàng</h3>
            <p>
              Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
