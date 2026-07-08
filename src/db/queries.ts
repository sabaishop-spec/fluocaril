import { db } from '@/src/db';
import { products, categories, siteSettings } from '@/src/db/schema';
import { desc, eq } from 'drizzle-orm';

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;

export type ProductWithCategory = Product & {
  categoryName: string | null;
};

export async function getHeroBanner() {
  try {
    const heroSetting = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);
    return heroSetting[0]?.value || null;
  } catch (error) {
    console.error("Database error in getHeroBanner:", error);
    return null;
  }
}

export async function getLatestProducts(): Promise<Product[]> {
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt)).limit(4);
  } catch (error) {
    console.error("Database error in getLatestProducts:", error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await db.select().from(categories);
  } catch (error) {
    console.error("Database error in getCategories:", error);
    return [];
  }
}
