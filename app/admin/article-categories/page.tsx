import { db } from '@/src/db';
import { articleCategories } from '@/src/db/schema';
import { desc } from 'drizzle-orm';
import CategoryForm from './CategoryForm';
import DeleteButton from './DeleteButton';

export const dynamic = "force-dynamic";

export default async function ArticleCategoriesPage() {
  let categoriesList: any[] = [];
  try {
    categoriesList = await db.select().from(articleCategories).orderBy(desc(articleCategories.createdAt));
  } catch (error) {
    console.error("Database error:", error);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Danh mục bài viết</h1>
        <CategoryForm />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Tên danh mục</th>
                <th className="px-6 py-4">Đường dẫn (Slug)</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categoriesList.length > 0 ? (
                categoriesList.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      /{category.slug}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-4">
                        <CategoryForm category={category} />
                        <DeleteButton id={category.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    Chưa có danh mục nào. Hãy thêm danh mục mới!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
