import sys

with open('app/page.tsx', 'r') as f:
    content = f.read()

import_old = "import { products, categories } from '@/src/db/schema';"
import_new = "import { products, categories, siteSettings } from '@/src/db/schema';"
content = content.replace(import_old, import_new)

query_old = "  const productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);"
query_new = """  const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
  const heroData = heroSetting[0]?.value || null;

  const productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);"""
content = content.replace(query_old, query_new)

import_eq_old = "import { desc } from 'drizzle-orm';"
import_eq_new = "import { desc, eq } from 'drizzle-orm';"
content = content.replace(import_eq_old, import_eq_new)

hero_old = "<Hero />"
hero_new = "<Hero data={heroData} />"
content = content.replace(hero_old, hero_new)

with open('app/page.tsx', 'w') as f:
    f.write(content)
