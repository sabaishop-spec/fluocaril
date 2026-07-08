import Link from 'next/link';
import { db } from '@/src/db';
import { posts } from '@/src/db/schema';
import { desc } from 'drizzle-orm';
import { Plus } from 'lucide-react';
import ArticlesTable from './ArticlesTable';

export default async function ArticlesPage() {
  const allPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Bài viết</h1>
        <Link 
          href="/admin/articles/create" 
          className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm bài viết mới
        </Link>
      </div>
      
      <ArticlesTable posts={allPosts} />
    </div>
  );
}
