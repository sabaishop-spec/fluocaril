import ArticleForm from '@/app/admin/articles/ArticleForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { db } from '@/src/db';
import { articleCategories } from '@/src/db/schema';

export const metadata = {
  title: 'Thêm Bài Viết Mới | Admin',
};

export default async function CreateArticlePage() {
  const allCategories = await db.select().from(articleCategories);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <Link 
          href="/admin/articles" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại danh sách
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Thêm Bài Viết Mới</h1>
        <p className="text-gray-500 mt-2">Tạo một bài viết mới cho Góc Kiến Thức.</p>
      </div>

      <ArticleForm categories={allCategories} />
    </div>
  );
}
