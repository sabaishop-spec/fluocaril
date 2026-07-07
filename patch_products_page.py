import sys

with open('app/san-pham/page.tsx', 'r') as f:
    content = f.read()

old_logic = """  const productsList = await db.select().from(products).orderBy(desc(products.createdAt));
  const categoriesList = await db.select().from(categoriesTable).orderBy(desc(categoriesTable.createdAt));"""

new_logic = """  let productsList: any[] = [];
  let categoriesList: any[] = [];
  try {
    productsList = await db.select().from(products).orderBy(desc(products.createdAt));
    categoriesList = await db.select().from(categoriesTable).orderBy(desc(categoriesTable.createdAt));
  } catch (error) {
    console.error("Database error in ProductsPage:", error);
  }"""

content = content.replace(old_logic, new_logic)

with open('app/san-pham/page.tsx', 'w') as f:
    f.write(content)
