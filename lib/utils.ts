import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitizeFilename = (filename: string) => {
  const extension = filename.split('.').pop();
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  const cleanName = nameWithoutExt
    .normalize('NFD') // Tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-zA-Z0-9]/g, '-') // Thay ký tự đặc biệt/khoảng trắng bằng '-'
    .replace(/-+/g, '-') // Sửa các dấu gạch ngang liên tiếp '--' thành '-'
    .trim()
    .toLowerCase();
  return `${cleanName}.${extension}`;
};
