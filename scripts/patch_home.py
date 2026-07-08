import sys

with open('app/page.tsx', 'r') as f:
    content = f.read()

old_logic = """  const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
  const heroData = heroSetting[0]?.value || null;

  const productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);
  const categoriesList = await db.select().from(categories);"""

new_logic = """  let heroData = null;
  let productsList: any[] = [];
  let categoriesList: any[] = [];
  try {
    const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
    heroData = heroSetting[0]?.value || null;
    productsList = await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);
    categoriesList = await db.select().from(categories);
  } catch (error) {
    console.error("Database connection error in Home:", error);
  }"""

content = content.replace(old_logic, new_logic)

with open('app/page.tsx', 'w') as f:
    f.write(content)
