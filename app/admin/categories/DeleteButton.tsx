'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteCategory } from './actions';

export default function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xoá hệ sinh thái này?')) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteCategory(id);
      if (!res.success) {
        alert(res.error);
      }
    } catch (error) {
      alert('Đã có lỗi xảy ra');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Xoá"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
