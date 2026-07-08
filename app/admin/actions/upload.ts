'use server';

import { put } from '@vercel/blob';
import { sanitizeFilename } from '@/lib/utils';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'Không tìm thấy file' };
    }

    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File không phải là hình ảnh' };
    }

    const cleanFilename = sanitizeFilename(file.name);

    // upload to Vercel Blob
    const blob = await put(cleanFilename, file, {
      access: 'public',
      addRandomSuffix: true,
      multipart: true,
    });


    return { success: true, url: blob.url };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message || 'Lỗi khi tải ảnh lên' };
  }
}
