'use server';

import { db } from '@/src/db';
import { siteSettings } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateHeroBanner(formData: FormData) {
  try {
    const countStr = formData.get('count') as string;
    const count = parseInt(countStr || '0', 10);
    
    const value = [];
    
    for (let i = 0; i < count; i++) {
      const title = formData.get(`title_${i}`) as string;
      const subtitle = formData.get(`subtitle_${i}`) as string;
      const linkUrl = formData.get(`linkUrl_${i}`) as string;
      let imageUrl = formData.get(`imageUrl_${i}`) as string;
      
      const imageFile = formData.get(`imageFile_${i}`) as File;
      if (imageFile && imageFile.size > 0) {
        const { put } = await import('@vercel/blob');
        const { sanitizeFilename } = await import('@/lib/utils');
        const cleanFilename = sanitizeFilename(imageFile.name);
        const blob = await put(cleanFilename, imageFile, {
          access: 'public',
          addRandomSuffix: true,
          multipart: true,
        });
        imageUrl = blob.url;
      }
      
      value.push({ title, subtitle, linkUrl, imageUrl });
    }

    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, 'home_hero_banner')).limit(1);

    if (existing.length > 0) {
      await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, 'home_hero_banner'));
    } else {
      await db.insert(siteSettings).values({ key: 'home_hero_banner', value });
    }

    revalidatePath('/');
    revalidatePath('/admin/banner');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating hero banner:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật banner' };
  }
}
