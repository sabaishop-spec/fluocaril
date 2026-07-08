import sys

content = open('app/page.tsx').read()

if "import { categories } from '@/src/db/schema';" not in content:
    content = content.replace("import { products } from '@/src/db/schema';", "import { products, categories } from '@/src/db/schema';")

if "const productsWithCategory =" not in content:
    old_code = "  const productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);"
    
    new_code = """  const productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);
  const categoriesList = await db.select().from(categories);
  const productsWithCategory = productsList.map(p => {
    const cat = categoriesList.find(c => c.id === p.categoryId);
    return {
      ...p,
      categoryName: cat ? cat.name : null
    };
  });"""
    content = content.replace(old_code, new_code)
    content = content.replace("<FeaturedProducts items={productsList} />", "<FeaturedProducts items={productsWithCategory} />")

open('app/page.tsx', 'w').write(content)
