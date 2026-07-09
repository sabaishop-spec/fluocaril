'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteCategory } from '../actions/article-category';

export default function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('Bạn có chắc chắn muốn xoá danh mục này?')) {
      setIsDeleting(true);
      try {
        const res = await deleteCategory(id);
        if (!res.success) {
          alert(res.error);
        }
      } catch (error) {
        console.error(error);
        alert('Đã có lỗi xảy ra');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
