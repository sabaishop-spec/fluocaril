import { Package, FileText, LayoutDashboard, Clock } from 'lucide-react';
import AdminToast from '@/components/AdminToast';
import { db } from '@/src/db';
import { posts, products as dbProducts } from '@/src/db/schema';
import { count, desc } from 'drizzle-orm';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default async function AdminDashboard() {
  const [articlesResult] = await db.select({ count: count() }).from(posts);
  const totalArticles = articlesResult.count;
  
  const [productsResult] = await db.select({ count: count() }).from(dbProducts);
  const totalProducts = productsResult.count;

  // Lấy 5 bài viết và 5 sản phẩm mới nhất
  const recentPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(5);
  const recentProducts = await db.select().from(dbProducts).orderBy(desc(dbProducts.createdAt)).limit(5);

  // Kết hợp và sắp xếp để lấy 5 hoạt động mới nhất
  const recentActivities = [
    ...recentPosts.map(p => ({
      id: `post-${p.id}`,
      title: p.title,
      type: 'Bài viết mới',
      time: p.createdAt,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    })),
    ...recentProducts.map(p => ({
      id: `prod-${p.id}`,
      title: p.name,
      type: 'Sản phẩm mới',
      time: p.createdAt,
      icon: Package,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }))
  ].sort((a, b) => {
    const timeA = a.time ? new Date(a.time).getTime() : 0;
    const timeB = b.time ? new Date(b.time).getTime() : 0;
    return timeB - timeA;
  }).slice(0, 5);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

      {/* Hoạt động gần đây */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-bold text-gray-800">Hoạt động gần đây</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className={`p-3 rounded-full ${activity.bgColor} ${activity.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{activity.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{activity.type}</p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.time 
                      ? formatDistanceToNow(new Date(activity.time), { addSuffix: true, locale: vi })
                      : 'Không rõ thời gian'}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              Chưa có hoạt động nào gần đây.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
