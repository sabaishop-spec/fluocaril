'use client';

import { useState } from 'react';
import { deleteProduct } from './actions';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setLoading(true);
      await deleteProduct(id);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 transition-colors"
      title="Xóa"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
