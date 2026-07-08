import sys

with open('app/san-pham/[slug]/page.tsx', 'r') as f:
    content = f.read()

old_logic_1 = """  const { slug } = await params;
  const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  const product = productList[0];
    
  if (!product) {"""

new_logic_1 = """  const { slug } = await params;
  let product = null;
  try {
    const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    product = productList[0];
  } catch (error) {
    console.error("Database error in generateMetadata:", error);
  }
  if (!product) {"""

old_logic_2 = """  const { slug } = await params;
  const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  const product = productList[0];

  if (!product) {
    notFound();
  }

  const categoryList = product.categoryId 
    ? await db.select().from(categoriesTable).where(eq(categoriesTable.id, product.categoryId)).limit(1) 
    : [];
  const category = categoryList[0];

  const relatedProductsList = product.categoryId 
    ? await db.select().from(products)
        .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
        .limit(4)
    : [];"""

new_logic_2 = """  const { slug } = await params;
  let product = null;
  let category = null;
  let relatedProductsList: any[] = [];
  
  try {
    const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    product = productList[0];
    
    if (product) {
      if (product.categoryId) {
        const categoryList = await db.select().from(categoriesTable).where(eq(categoriesTable.id, product.categoryId)).limit(1);
        category = categoryList[0];
        
        relatedProductsList = await db.select().from(products)
            .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
            .limit(4);
      }
    }
  } catch (error) {
    console.error("Database error in ProductDetail:", error);
  }

  if (!product) {
    notFound();
  }"""

content = content.replace(old_logic_1, new_logic_1).replace(old_logic_2, new_logic_2)

with open('app/san-pham/[slug]/page.tsx', 'w') as f:
    f.write(content)
