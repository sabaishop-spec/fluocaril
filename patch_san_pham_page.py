import sys

content = open('app/san-pham/page.tsx').read()

if "const productsWithCategory =" not in content:
    old_code = """  const productsList = await db.select().from(products).orderBy(desc(products.createdAt));
  const categoriesList = await db.select().from(categoriesTable).orderBy(desc(categoriesTable.createdAt));"""
    
    new_code = """  const productsList = await db.select().from(products).orderBy(desc(products.createdAt));
  const categoriesList = await db.select().from(categoriesTable).orderBy(desc(categoriesTable.createdAt));
  
  const productsWithCategory = productsList.map(p => {
    const cat = categoriesList.find(c => c.id === p.categoryId);
    return {
      ...p,
      categoryName: cat ? cat.name : null
    };
  });"""
    content = content.replace(old_code, new_code)
    content = content.replace("<FeaturedProducts items={productsList} />", "<FeaturedProducts items={productsWithCategory} />")

open('app/san-pham/page.tsx', 'w').write(content)
