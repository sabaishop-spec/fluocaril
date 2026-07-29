'use server';

import { db } from '@/src/db';
import { siteSettings } from '@/src/db/schema';
import { requireAdmin } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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

export async function saveSetting(key: string, value: any) {
  await requireAdmin();
  
  try {
    const existing = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, key)
    });
    
    if (existing) {
      await db.update(siteSettings)
        .set({ value })
        .where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({
        key,
        value
      });
    }
    
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to save setting ${key}:`, error);
    return { success: false, error: error.message };
  }
}
