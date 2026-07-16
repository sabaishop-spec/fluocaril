import { Package, FileText, LayoutDashboard } from 'lucide-react';
import AdminToast from '@/components/AdminToast';
import { products } from '@/lib/data';
import { db } from '@/src/db';
import { posts } from '@/src/db/schema';
import { count } from 'drizzle-orm';

export default async function AdminDashboard() {
  const [articlesResult] = await db.select({ count: count() }).from(posts);
  const totalArticles = articlesResult.count;
  const totalProducts = products.length;

  return (
    <div className="p-8 relative">
      {/* Pop-up thông báo góc phải trên */}
      <AdminToast />

      {/* Tiêu đề trang */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
          <p className="text-gray-500 text-sm">Chào mừng bạn trở lại bảng điều khiển Fluocaril</p>
        </div>
      </div>

      {/* Lưới thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Thẻ Sản phẩm */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-full">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Tổng sản phẩm</p>
            <h3 className="text-3xl font-bold text-gray-800">{totalProducts}</h3>
          </div>
        </div>

        {/* Thẻ Bài viết */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Tổng bài viết</p>
            <h3 className="text-3xl font-bold text-gray-800">{totalArticles}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
