const fs = require('fs');
let content = fs.readFileSync('app/san-pham/[slug]/page.tsx', 'utf8');

const generateMetadataOld = `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  const product = productList[0];
    
  if (!product) {
    return { title: 'Sản phẩm không tìm thấy' };
  }`;

const generateMetadataNew = `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  if (slug) {
    try {
      const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
      product = productList[0];
    } catch(e) { console.error(e) }
  }
    
  if (!product) {
    return { title: 'Sản phẩm không tìm thấy' };
  }`;

const detailOld = `export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
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
        .where(
          and(
            eq(products.categoryId, product.categoryId),
            ne(products.id, product.id)
          )
        )
        .limit(4)
    : [];`;

const detailNew = `export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product = null;
  let category = null;
  let relatedProductsList: any[] = [];
  
  if (slug) {
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
    } catch(e) { console.error(e) }
  }

  if (!product) {
    notFound();
  }`;

content = content.replace(generateMetadataOld, generateMetadataNew).replace(detailOld, detailNew);
fs.writeFileSync('app/san-pham/[slug]/page.tsx', content);
