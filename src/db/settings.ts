import { db } from '@/src/db';
import { siteSettings } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export async function getSetting(key: string) {
  try {
    const result = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, key)
    });
    return result?.value || null;
  } catch (error) {
    console.error(`Failed to get setting ${key}:`, error);
    return null;
  }
}
