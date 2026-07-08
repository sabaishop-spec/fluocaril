'use server';

import { db } from '@/src/db';
import { categories } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    let imageUrl = formData.get('imageUrl') as string;
    
    const imageFile = formData.get('imageFile') as File;
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

    await db.insert(categories).values({
      name,
      slug,
      description,
      imageUrl,
    });

    revalidatePath('/admin/categories');
    revalidatePath('/san-pham');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating category:', error);
    return { success: false, error: error.message || 'Lỗi khi thêm hệ sinh thái' };
  }
}

export async function updateCategory(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    let imageUrl = formData.get('imageUrl') as string;
    
    const imageFile = formData.get('imageFile') as File;
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

    await db.update(categories).set({
      name,
      slug,
      description,
      ...(imageUrl !== undefined ? { imageUrl } : {}),
    }).where(eq(categories.id, id));

    revalidatePath('/admin/categories');
    revalidatePath('/san-pham');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating category:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật hệ sinh thái' };
  }
}

export async function deleteCategory(id: number) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/categories');
    revalidatePath('/san-pham');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return { success: false, error: error.message || 'Lỗi khi xoá hệ sinh thái' };
  }
}
