'use server';

import { db } from '@/src/db';
import { products } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const category = formData.get('category') as string;
    const status = formData.get('status') as string;

    await db.insert(products).values({
      name,
      slug,
      description,
      imageUrl,
      category,
      status: status || 'Active',
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message || 'Lỗi khi thêm sản phẩm' };
  }
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message || 'Lỗi khi xoá sản phẩm' };
  }
}
