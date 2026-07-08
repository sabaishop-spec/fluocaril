import ArticleForm from '@/app/admin/articles/ArticleForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { db } from '@/src/db';
import { posts } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Chỉnh sửa Bài Viết | Admin',
};

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  
  if (isNaN(postId)) {
    notFound();
  }

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });

  if (!post) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Bài Viết</h1>
        <p className="text-gray-500 mt-2">Cập nhật nội dung bài viết.</p>
      </div>

      <ArticleForm initialData={post} />
    </div>
  );
}
