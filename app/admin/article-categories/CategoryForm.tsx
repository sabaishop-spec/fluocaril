'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createCategory, updateCategory } from '../actions/article-category';

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function CategoryForm({ category }: { category?: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      let res;
      if (category) {
        res = await updateCategory(category.id, formData);
      } else {
        res = await createCategory(formData);
      }

      if (res.success) {
        setIsOpen(false);
        if (!category) {
          form.reset();
        }
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error(error);
      alert('Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlugify = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const form = e.target.closest('form');
    if (form && !category) {
      const slugInput = form.querySelector('[name="slug"]') as HTMLInputElement;
      if (slugInput) {
        slugInput.value = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      }
    }
  };

  return (
    <>
      {category ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          Sửa
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm danh mục
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {category ? 'Sửa danh mục' : 'Thêm danh mục mới'}
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tên danh mục</label>
                  <input 
                    name="name" 
                    defaultValue={category?.name} 
                    onChange={handleSlugify}
                    required 
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                  <input 
                    name="slug" 
                    defaultValue={category?.slug} 
                    required 
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
