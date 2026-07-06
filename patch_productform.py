import sys
content = open('app/admin/products/ProductForm.tsx').read()
badge_dropdown = """
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thẻ nổi bật (Badge)</label>
                  <select defaultValue={product?.badge || ''} name="badge" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Không có</option>
                    <option value="new">Mới</option>
                    <option value="best-seller">Bán chạy</option>
                  </select>
                </div>"""

content = content.replace('<div>\n                  <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>', badge_dropdown + '\n                <div>\n                  <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>')

open('app/admin/products/ProductForm.tsx', 'w').write(content)
