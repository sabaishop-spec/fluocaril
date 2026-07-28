'use server';

import { db } from '@/src/db';
import { productDescriptionImages, products } from '@/src/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import { sanitizeFilename } from '@/lib/utils';

export async function createProductDescriptionImages(productId: number, formData: FormData) {
  try {
    const images = formData.getAll('imageFiles') as File[];
    if (!images || images.length === 0) return { success: false, error: 'Không có ảnh nào được chọn' };

    const status = formData.get('status') as string || 'Active';
    const altText = formData.get('altText') as string || null;

    let sortOrder = parseInt(formData.get('sortOrder') as string || '0', 10);
    
    const uploadedImages = [];

    for (const file of images) {
      if (file.size > 0) {
        const cleanFilename = sanitizeFilename(file.name);
        const blob = await put(cleanFilename, file, {
          access: 'public',
          addRandomSuffix: true,
          multipart: true,
        });
        
        uploadedImages.push({
          productId,
          imageUrl: blob.url,
          altText,
          sortOrder,
          status,
        });
        sortOrder += 1;
      }
    }

    if (uploadedImages.length > 0) {
      await db.insert(productDescriptionImages).values(uploadedImages);
    }

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });
    
    revalidatePath('/admin/products');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error creating product description images:', error);
    return { success: false, error: error.message || 'Lỗi khi thêm ảnh mô tả' };
  }
}

export async function updateProductDescriptionImage(id: number, formData: FormData) {
  try {
    const productIdStr = formData.get('productId') as string;
    const productId = parseInt(productIdStr, 10);
    
    const status = formData.get('status') as string || 'Active';
    const altText = formData.get('altText') as string || null;
    const sortOrder = parseInt(formData.get('sortOrder') as string || '0', 10);
    
    let imageUrl = formData.get('imageUrl') as string | null;

    const file = formData.get('imageFile') as File;
    if (file && file.size > 0) {
      const cleanFilename = sanitizeFilename(file.name);
      const blob = await put(cleanFilename, file, {
        access: 'public',
        addRandomSuffix: true,
        multipart: true,
      });
      imageUrl = blob.url;
    }

    await db.update(productDescriptionImages).set({
      ...(imageUrl ? { imageUrl } : {}),
      altText,
      sortOrder,
      status,
      updatedAt: new Date(),
    }).where(eq(productDescriptionImages.id, id));

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });
    
    revalidatePath('/admin/products');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating product description image:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật ảnh mô tả' };
  }
}

export async function deleteProductDescriptionImage(id: number) {
  try {
    const image = await db.query.productDescriptionImages.findFirst({ where: eq(productDescriptionImages.id, id) });
    if (!image) throw new Error('Ảnh không tồn tại');

    await db.delete(productDescriptionImages).where(eq(productDescriptionImages.id, id));

    const product = await db.query.products.findFirst({ where: eq(products.id, image.productId) });

    revalidatePath('/admin/products');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product description image:', error);
    return { success: false, error: error.message || 'Lỗi khi xoá ảnh mô tả' };
  }
}

export async function reorderProductDescriptionImages(productId: number, newOrderIds: number[]) {
  try {
    await db.transaction(async (tx) => {
      for (let i = 0; i < newOrderIds.length; i++) {
        await tx.update(productDescriptionImages)
          .set({ sortOrder: i })
          .where(eq(productDescriptionImages.id, newOrderIds[i]));
      }
    });

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });
    revalidatePath('/admin/products');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error reordering images:', error);
    return { success: false, error: error.message || 'Lỗi khi sắp xếp ảnh' };
  }
}
