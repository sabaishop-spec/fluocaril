'use server';

import { db } from '@/src/db';
import { categories } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;

    await db.insert(categories).values({
      name,
      slug,
    });

    revalidatePath('/admin/article-categories');
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating category:', error);
    return { success: false, error: error.message || 'Lỗi khi thêm danh mục' };
  }
}

export async function updateCategory(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;

    await db.update(categories).set({
      name,
      slug,
    }).where(eq(categories.id, id));

    revalidatePath('/admin/article-categories');
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating category:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật danh mục' };
  }
}

export async function deleteCategory(id: number) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/article-categories');
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return { success: false, error: error.message || 'Lỗi khi xoá danh mục' };
  }
}
