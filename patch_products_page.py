import sys

content = open('app/admin/products/page.tsx').read()

if "import { categories } from" not in content:
    content = content.replace("import { products } from '@/src/db/schema';", "import { products, categories } from '@/src/db/schema';")

if "const categoriesList = await db.select()" not in content:
    content = content.replace("const productsList = await db.select().from(products).orderBy(desc(products.createdAt));", "const productsList = await db.select().from(products).orderBy(desc(products.createdAt));\n  const categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));")

content = content.replace("<ProductForm />", "<ProductForm categories={categoriesList} />")
content = content.replace("<ProductForm product={product} />", "<ProductForm product={product} categories={categoriesList} />")

# Update table
content = content.replace('<th className="px-6 py-4">Danh mục</th>', '<th className="px-6 py-4">Hệ sinh thái</th>\n                <th className="px-6 py-4">Danh mục cũ</th>')

content = content.replace('<td className="px-6 py-4 text-gray-600">{product.category || \'—\'}</td>', '<td className="px-6 py-4 text-gray-600">{categoriesList.find(c => c.id === product.categoryId)?.name || \'—\'}</td>\n                    <td className="px-6 py-4 text-gray-600">{product.category || \'—\'}</td>')

open('app/admin/products/page.tsx', 'w').write(content)
