'use client';

import { useState } from 'react';
import { createProduct, updateProduct } from './actions';
import { Plus, Edit2, X } from 'lucide-react';
import ImageDropzone from './ImageDropzone';

export default function ProductForm({ product, categories }: { product?: any, categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(product?.imageUrl || null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    // send currentImageUrl to keep track if we didn't upload a new file but kept the old one
    formData.append('imageUrl', currentImageUrl || '');
    
    let result;
    if (product?.id) {
      result = await updateProduct(product.id, formData);
    } else {
      result = await createProduct(formData);
    }
    
    setLoading(false);
    if (result.success) {
      setMessage({ type: 'success', text: product ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!' });
      setTimeout(() => {
        setIsOpen(false);
        setMessage(null);
        if (!product) {
          form.reset();
          setImageFile(null);
          setCurrentImageUrl(null);
        }
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra' });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (!product) {
      setImageFile(null);
      setCurrentImageUrl(null);
    } else {
      setCurrentImageUrl(product?.imageUrl || null);
      setImageFile(null);
    }
    setMessage(null);
  };

  const handleImageSelected = (file: File | null) => {
    setImageFile(file);
    if (!file) {
      setCurrentImageUrl(null);
    }
  };

  const handleSlugify = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const form = e.target.closest('form');
    if (form && !product) {
      const slugInput = form.querySelector('[name="slug"]') as HTMLInputElement;
      if (slugInput) {
        slugInput.value = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      }
    }
  };

  return (
    <>
      {product ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="text-blue-500 hover:text-blue-700 p-2 transition-colors"
          title="Chỉnh sửa"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm sản phẩm mới
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {message && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              
              <form id={product ? `product-form-${product.id}` : "product-form"} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                  <input defaultValue={product?.name} required onChange={handleSlugify} name="name" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <input defaultValue={product?.slug} required name="slug" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục sản phẩm</label>
                  <select defaultValue={product?.categoryId || ''} required name="categoryId" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="" disabled>-- Chọn hệ sinh thái --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select defaultValue={product?.status || 'Active'} name="status" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="Active">Hoạt động</option>
                    <option value="Draft">Bản nháp</option>
                  </select>
                </div>
                
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thẻ nổi bật (Badge)</label>
                  <select defaultValue={product?.badge || ''} name="badge" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">Không có</option>
                    <option value="new">Mới</option>
                    <option value="best-seller">Bán chạy</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Shopee</label>
                  <input defaultValue={product?.shopeeUrl || ''} placeholder="https://shopee.vn/..." name="shopeeUrl" type="url" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
                  <ImageDropzone onImageSelected={handleImageSelected} defaultImage={product?.imageUrl} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea defaultValue={product?.description} name="description" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thành phần</label>
                  <textarea defaultValue={product?.ingredients} name="ingredients" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
                  <p className="text-xs text-gray-500 mt-1">Mỗi dòng sẽ hiển thị thành một gạch đầu dòng.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thông số sản phẩm</label>
                  <textarea defaultValue={product?.productSpecifications} name="productSpecifications" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
                  <p className="text-xs text-gray-500 mt-1">Mỗi dòng nhập theo dạng Tên thông số: Nội dung.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hướng dẫn sử dụng</label>
                  <textarea defaultValue={product?.usageInstructions} name="usageInstructions" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
              <button 
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Hủy
              </button>
              <button 
                form={product ? `product-form-${product.id}` : "product-form"}
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
