import sys

# admin/products
with open('app/admin/products/page.tsx', 'r') as f:
    content = f.read()

old_logic = """  const productsList = await db.select().from(products).orderBy(desc(products.createdAt));
  const categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));"""

new_logic = """  let productsList: any[] = [];
  let categoriesList: any[] = [];
  try {
    productsList = await db.select().from(products).orderBy(desc(products.createdAt));
    categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));
  } catch (error) {
    console.error("Database error:", error);
  }"""
content = content.replace(old_logic, new_logic)
with open('app/admin/products/page.tsx', 'w') as f:
    f.write(content)


# admin/categories
with open('app/admin/categories/page.tsx', 'r') as f:
    content = f.read()

old_logic = """  const categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));"""

new_logic = """  let categoriesList: any[] = [];
  try {
    categoriesList = await db.select().from(categories).orderBy(desc(categories.createdAt));
  } catch (error) {
    console.error("Database error:", error);
  }"""
content = content.replace(old_logic, new_logic)
with open('app/admin/categories/page.tsx', 'w') as f:
    f.write(content)
