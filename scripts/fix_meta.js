const fs = require('fs');
let content = fs.readFileSync('app/san-pham/[slug]/page.tsx', 'utf8');

const regex = /export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{[\s\S]*?if \(!product\) \{/g;
const newStr = `export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  if (slug) {
    try {
      const productList = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
      product = productList[0];
    } catch(e) { console.error(e) }
  }
    
  if (!product) {`;
  
content = content.replace(regex, newStr);
fs.writeFileSync('app/san-pham/[slug]/page.tsx', content);
