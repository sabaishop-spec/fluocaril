'use server';

import { db } from '@/src/db';
import { productVariants, products } from '@/src/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

export async function createProductVariant(productId: number, formData: FormData) {
  await requireAdmin();
  try {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const swatchColor = formData.get('swatchColor') as string;
    let imageUrl = formData.get('imageUrl') as string | null;
    let shopeeUrl = formData.get('shopeeUrl') as string | null;
    if (!shopeeUrl) shopeeUrl = null;
    
    const sortOrderStr = formData.get('sortOrder') as string;
    const sortOrder = sortOrderStr ? parseInt(sortOrderStr, 10) : 0;
    
    const status = formData.get('status') as string;
    const isDefault = formData.get('isDefault') === 'true';

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

    await db.transaction(async (tx) => {
      if (isDefault) {
        await tx.update(productVariants)
          .set({ isDefault: false })
          .where(eq(productVariants.productId, productId));
      }

      await tx.insert(productVariants).values({
        productId,
        name,
        slug,
        swatchColor,
        imageUrl: imageUrl || null,
        shopeeUrl,
        isDefault,
        sortOrder,
        status: status || 'Active',
      });
    });

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });
    
    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating product variant:', error);
    return { success: false, error: error.message || 'Lỗi khi thêm biến thể' };
  }
}

export async function updateProductVariant(id: number, formData: FormData) {
  await requireAdmin();
  try {
    const productIdStr = formData.get('productId') as string;
    const productId = parseInt(productIdStr, 10);
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const swatchColor = formData.get('swatchColor') as string;
    let imageUrl = formData.get('imageUrl') as string | null;
    let shopeeUrl = formData.get('shopeeUrl') as string | null;
    if (!shopeeUrl) shopeeUrl = null;
    
    const sortOrderStr = formData.get('sortOrder') as string;
    const sortOrder = sortOrderStr ? parseInt(sortOrderStr, 10) : 0;
    
    const status = formData.get('status') as string;
    const isDefault = formData.get('isDefault') === 'true';

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

    await db.transaction(async (tx) => {
      if (isDefault) {
        await tx.update(productVariants)
          .set({ isDefault: false })
          .where(eq(productVariants.productId, productId));
      }

      await tx.update(productVariants).set({
        name,
        slug,
        swatchColor,
        ...(imageUrl !== undefined ? { imageUrl: imageUrl || null } : {}),
        shopeeUrl,
        isDefault,
        sortOrder,
        status: status || 'Active',
        updatedAt: new Date(),
      }).where(eq(productVariants.id, id));
    });

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });
    
    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating product variant:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật biến thể' };
  }
}

export async function deleteProductVariant(id: number) {
  await requireAdmin();
  try {
    const variant = await db.query.productVariants.findFirst({ where: eq(productVariants.id, id) });
    if (!variant) throw new Error('Biến thể không tồn tại');

    await db.transaction(async (tx) => {
      await tx.delete(productVariants).where(eq(productVariants.id, id));
      
      if (variant.isDefault) {
        // If deleted variant was default, make the first active variant default
        const nextVariant = await tx.query.productVariants.findFirst({
          where: and(
            eq(productVariants.productId, variant.productId),
            eq(productVariants.status, 'Active')
          ),
          orderBy: (productVariants, { asc }) => [asc(productVariants.sortOrder), asc(productVariants.id)]
        });
        
        if (nextVariant) {
          await tx.update(productVariants)
            .set({ isDefault: true })
            .where(eq(productVariants.id, nextVariant.id));
        }
      }
    });

    const product = await db.query.products.findFirst({ where: eq(products.id, variant.productId) });

    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product variant:', error);
    return { success: false, error: error.message || 'Lỗi khi xoá biến thể' };
  }
}

export async function setDefaultProductVariant(id: number, productId: number) {
  await requireAdmin();
  try {
    await db.transaction(async (tx) => {
      await tx.update(productVariants)
        .set({ isDefault: false })
        .where(eq(productVariants.productId, productId));
        
      await tx.update(productVariants)
        .set({ isDefault: true })
        .where(eq(productVariants.id, id));
    });

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });

    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error setting default product variant:', error);
    return { success: false, error: error.message || 'Lỗi khi đặt mặc định' };
  }
}

export async function updateProductVariantLabel(productId: number, label: string) {
  await requireAdmin();
  try {
    const cleanLabel = label.trim().substring(0, 50) || 'Phân loại';
    
    await db.update(products).set({
      variantLabel: cleanLabel,
    }).where(eq(products.id, productId));

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) });
    
    revalidatePath('/admin/products');
    revalidatePath('/san-pham');
    revalidatePath('/');
    if (product) {
      revalidatePath(`/san-pham/${product.slug}`);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating product variant label:', error);
    return { success: false, error: error.message || 'Lỗi khi cập nhật tên phân loại' };
  }
}
