import { db } from '@/src/db';
import { categories } from '@/src/db/schema';
import { desc } from 'drizzle-orm';
import CategoryForm from './CategoryForm';
import DeleteButton from './DeleteButton';
import Image from 'next/image';

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Danh mục sản phẩm</h1>
        <CategoryForm />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Hình ảnh</th>
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
                      {category.imageUrl ? (
                        <div className="relative w-16 h-16 rounded overflow-hidden border border-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={category.imageUrl} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded border border-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      /{category.slug}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <CategoryForm category={category} />
                        <DeleteButton id={category.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
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
