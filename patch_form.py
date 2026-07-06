import sys

with open('app/admin/products/ProductForm.tsx', 'r') as f:
    content = f.read()

old_badge = """                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thẻ nổi bật (Badge)</label>
                  <select defaultValue={product?.badge || ''} name="badge" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Không có</option>
                    <option value="new">Mới</option>
                    <option value="best-seller">Bán chạy</option>
                  </select>
                </div>"""

new_badge = """                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thẻ nổi bật (Badge)</label>
                  <select defaultValue={product?.badge || ''} name="badge" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Không có</option>
                    <option value="new">Mới</option>
                    <option value="best-seller">Bán chạy</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Shopee</label>
                  <input defaultValue={product?.shopeeUrl || ''} placeholder="https://shopee.vn/..." name="shopeeUrl" type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>"""

content = content.replace(old_badge, new_badge)

with open('app/admin/products/ProductForm.tsx', 'w') as f:
    f.write(content)
