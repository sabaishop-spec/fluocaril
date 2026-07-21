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
    let imageUrl = formData.get('imageUrl') as string;
    const categoryIdStr = formData.get('categoryId') as string;
    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const status = formData.get('status') as string;
    let badge = formData.get('badge') as string | null;
    if (!badge) badge = null;
    
    let shopeeUrl = formData.get('shopeeUrl') as string | null;
    if (!shopeeUrl) shopeeUrl = null;

    const ingredients = (formData.get('ingredients') as string)?.trim() || null;
    const productSpecifications = (formData.get('productSpecifications') as string)?.trim() || null;
    const usageInstructions = (formData.get('usageInstructions') as string)?.trim() || null;
    
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

    await db.insert(products).values({
      name,
      slug,
      description,
      imageUrl,
      categoryId,
      badge,
      shopeeUrl,
      ingredients,
      productSpecifications,
      usageInstructions,
      status: status || 'Active',
    });

    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    revalidatePath(`/san-pham/${slug}`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message || 'Lỗi khi thêm sản phẩm' };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    let imageUrl = formData.get('imageUrl') as string;
    const categoryIdStr = formData.get('categoryId') as string;
    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const status = formData.get('status') as string;
    let badge = formData.get('badge') as string | null;
    if (!badge) badge = null;
    
    let shopeeUrl = formData.get('shopeeUrl') as string | null;
    if (!shopeeUrl) shopeeUrl = null;

    const ingredients = (formData.get('ingredients') as string)?.trim() || null;
    const productSpecifications = (formData.get('productSpecifications') as string)?.trim() || null;
    const usageInstructions = (formData.get('usageInstructions') as string)?.trim() || null;
    
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

    await db.update(products).set({
      name,
      slug,
      description,
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      categoryId,
      badge,
      shopeeUrl,
      ingredients,
      productSpecifications,
      usageInstructions,
      status: status || 'Active',
    }).where(eq(products.id, id));

    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    revalidatePath(`/san-pham/${slug}`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật sản phẩm' };
  }
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message || 'Lỗi khi xoá sản phẩm' };
  }
}
