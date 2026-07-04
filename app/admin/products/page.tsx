import { db } from '@/src/db';
import { products } from '@/src/db/schema';
import { desc } from 'drizzle-orm';
import ProductForm from './ProductForm';
import DeleteButton from './DeleteButton';

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const productsList = await db.select().from(products).orderBy(desc(products.createdAt));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
        <ProductForm />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Hình ảnh</th>
                <th className="px-6 py-4">Tên sản phẩm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productsList.length > 0 ? (
                productsList.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {product.imageUrl ? (
                        <div className="relative w-16 h-16 rounded overflow-hidden border border-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
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
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.category || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {product.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteButton id={product.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!
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
