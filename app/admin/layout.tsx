import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, FileText, Users, Tags, Settings, Image as ImageIcon } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Admin</h2>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span className="font-medium">Tổng quan</span>
          </Link>
          <Link href="/admin/products" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Package className="w-5 h-5 mr-3" />
            <span className="font-medium">Quản lý Sản phẩm</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Tags className="w-5 h-5 mr-3" />
            <span className="font-medium">Danh mục sản phẩm</span>
          </Link>
          <Link href="/admin/posts" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <FileText className="w-5 h-5 mr-3" />
            <span className="font-medium">Quản lý Bài viết</span>
          </Link>
          <Link href="/admin/contacts" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            <span className="font-medium">Khách hàng liên hệ</span>
          </Link>
          <Link href="/admin/banner" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <ImageIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Cấu hình Banner</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
