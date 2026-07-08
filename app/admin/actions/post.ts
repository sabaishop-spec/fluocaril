'use server';

import { db } from '@/src/db';
import { posts } from '@/src/db/schema';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const author = formData.get('author') as string;
    const status = formData.get('status') as string;
    const content = formData.get('content') as string;
    const thumbnailFile = formData.get('thumbnail') as File | null;
    let thumbnailUrl = (formData.get('existing_thumbnail') as string) || '';

    if (thumbnailFile && thumbnailFile.size > 0) {
      const { put } = await import('@vercel/blob');
      const { sanitizeFilename } = await import('@/lib/utils');
      const cleanFilename = sanitizeFilename(thumbnailFile.name);
      const blob = await put(cleanFilename, thumbnailFile, {
        access: 'public',
        addRandomSuffix: true
      });
      thumbnailUrl = blob.url;
    }
    
    // basic validation
    if (!title || !slug) {
      return { success: false, error: 'Tiêu đề và đường dẫn (slug) là bắt buộc.' };
    }

    await db.insert(posts).values({
      title,
      slug,
      author,
      status: status || 'Draft',
      content,
      thumbnail: thumbnailUrl,
    });

    revalidatePath('/goc-kien-thuc');
    revalidatePath(`/goc-kien-thuc/${slug}`);
    revalidatePath('/admin/articles');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message || 'Đã có lỗi xảy ra.' };
  }
}

export async function updatePost(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const author = formData.get('author') as string;
    const status = formData.get('status') as string;
    const content = formData.get('content') as string;
    const thumbnailFile = formData.get('thumbnail') as File | null;
    let thumbnailUrl = (formData.get('existing_thumbnail') as string) || '';

    if (thumbnailFile && thumbnailFile.size > 0) {
      const { put } = await import('@vercel/blob');
      const { sanitizeFilename } = await import('@/lib/utils');
      const cleanFilename = sanitizeFilename(thumbnailFile.name);
      const blob = await put(cleanFilename, thumbnailFile, {
        access: 'public',
        addRandomSuffix: true
      });
      thumbnailUrl = blob.url;
    }
    
    // basic validation
    if (!title || !slug) {
      return { success: false, error: 'Tiêu đề và đường dẫn (slug) là bắt buộc.' };
    }

    const { eq } = await import('drizzle-orm');
    await db.update(posts).set({
      title,
      slug,
      author,
      status: status || 'Draft',
      content,
      thumbnail: thumbnailUrl,
    }).where(eq(posts.id, id));

    revalidatePath('/goc-kien-thuc');
    revalidatePath(`/goc-kien-thuc/${slug}`);
    revalidatePath('/admin/articles');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return { success: false, error: error.message || 'Đã có lỗi xảy ra.' };
  }
}

export async function deletePosts(ids: string[]) {
  try {
    if (!ids || ids.length === 0) return { success: false, error: 'Chưa chọn bài viết nào.' };
    
    // Parse ids to numbers since posts.id is PgSerial
    const numericIds = ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    if (numericIds.length === 0) return { success: false, error: 'ID không hợp lệ.' };
    
    // Need to use inArray for Drizzle ORM
    const { inArray } = await import('drizzle-orm');
    await db.delete(posts).where(inArray(posts.id, numericIds));
    
    revalidatePath('/admin/articles');
    revalidatePath('/goc-kien-thuc');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting posts:', error);
    return { success: false, error: error.message || 'Đã có lỗi xảy ra khi xóa.' };
  }
}

export async function updatePostsStatus(ids: string[], status: string) {
  try {
    if (!ids || ids.length === 0) return { success: false, error: 'Chưa chọn bài viết nào.' };
    
    const numericIds = ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    if (numericIds.length === 0) return { success: false, error: 'ID không hợp lệ.' };
    
    const { inArray } = await import('drizzle-orm');
    await db.update(posts).set({ status }).where(inArray(posts.id, numericIds));
    
    revalidatePath('/admin/articles');
    revalidatePath('/goc-kien-thuc');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating posts:', error);
    return { success: false, error: error.message || 'Đã có lỗi xảy ra khi cập nhật.' };
  }
}
