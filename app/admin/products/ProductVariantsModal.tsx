'use client';

import { useState } from 'react';
import { createProductVariant, updateProductVariant, deleteProductVariant, setDefaultProductVariant } from './variant-actions';
import { Palette, Plus, Edit2, X, Trash2, CheckCircle } from 'lucide-react';
import ImageDropzone from './ImageDropzone';

export default function ProductVariantsModal({ product, variants = [] }: { product: any, variants: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  
  const [color, setColor] = useState('#000000');

  const handleOpen = () => {
    setIsOpen(true);
    setIsAdding(false);
    setEditingVariant(null);
    setMessage(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAdding(false);
    setEditingVariant(null);
    setMessage(null);
    setImageFile(null);
    setCurrentImageUrl(null);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingVariant(null);
    setMessage(null);
    setImageFile(null);
    setCurrentImageUrl(null);
    setColor('#000000');
  };

  const startEdit = (variant: any) => {
    setIsAdding(false);
    setEditingVariant(variant);
    setMessage(null);
    setImageFile(null);
    setCurrentImageUrl(variant.imageUrl || null);
    setColor(variant.swatchColor || '#000000');
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingVariant(null);
    setMessage(null);
    setImageFile(null);
    setCurrentImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append('productId', product.id.toString());
    formData.append('swatchColor', color);
    
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    formData.append('imageUrl', currentImageUrl || '');
    
    let result;
    if (editingVariant) {
      result = await updateProductVariant(editingVariant.id, formData);
    } else {
      result = await createProductVariant(product.id, formData);
    }
    
    setLoading(false);
    if (result.success) {
      setMessage({ type: 'success', text: editingVariant ? 'Cập nhật thành công!' : 'Thêm biến thể thành công!' });
      setTimeout(() => {
        setIsAdding(false);
        setEditingVariant(null);
        setMessage(null);
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xoá biến thể này?')) return;
    
    setLoading(true);
    const result = await deleteProductVariant(id);
    setLoading(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Xoá thành công!' });
      setTimeout(() => setMessage(null), 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Lỗi khi xoá' });
    }
  };

  const handleSetDefault = async (id: number) => {
    setLoading(true);
    const result = await setDefaultProductVariant(id, product.id);
    setLoading(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Đã đặt làm mặc định!' });
      setTimeout(() => setMessage(null), 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Lỗi khi đặt mặc định' });
    }
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
    if (form && !editingVariant) {
      const slugInput = form.querySelector('[name="slug"]') as HTMLInputElement;
      if (slugInput) {
        slugInput.value = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      }
    }
  };

  return (
    <>
      <button 
        onClick={handleOpen}
        className="text-purple-500 hover:text-purple-700 p-2 transition-colors"
        title="Quản lý biến thể"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Biến thể: <span className="text-blue-600">{product.name}</span>
              </h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar with List */}
              <div className="w-1/3 border-r border-gray-100 overflow-y-auto p-4 bg-gray-50/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">Danh sách biến thể</h3>
                  <button 
                    onClick={startAdd}
                    className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                    title="Thêm biến thể"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {variants.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-4">Chưa có biến thể nào.</div>
                ) : (
                  <div className="space-y-2">
                    {variants.map(v => (
                      <div 
                        key={v.id} 
                        className={`p-3 rounded-lg border flex flex-col gap-2 ${editingVariant?.id === v.id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: v.swatchColor }}></div>
                            <span className="font-medium text-sm text-gray-900">{v.name}</span>
                            {v.isDefault && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Mặc định</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => startEdit(v)} className="text-blue-500 hover:text-blue-700 p-1">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        {!v.isDefault && (
                           <button onClick={() => handleSetDefault(v.id)} className="text-xs flex items-center text-gray-500 hover:text-green-600 transition-colors">
                             <CheckCircle className="w-3 h-3 mr-1" /> Đặt làm mặc định
                           </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Form Area */}
              <div className="w-2/3 overflow-y-auto p-6">
                {message && (
                  <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                  </div>
                )}

                {(!isAdding && !editingVariant) ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Palette className="w-16 h-16 mb-4 opacity-20" />
                    <p>Chọn một biến thể để chỉnh sửa hoặc tạo mới</p>
                    <button 
                      onClick={startAdd}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Thêm biến thể đầu tiên
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">
                      {isAdding ? 'Thêm biến thể mới' : `Chỉnh sửa: ${editingVariant?.name}`}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên vị/biến thể *</label>
                        <input defaultValue={editingVariant?.name} required onChange={handleSlugify} name="name" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="VD: Vị dâu" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                        <input defaultValue={editingVariant?.slug} required name="slug" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="vi-dau" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Màu đại diện (Mã HEX) *</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={color} 
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-12 rounded cursor-pointer border border-gray-300"
                          />
                          <input 
                            type="text" 
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                            required
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono text-sm" 
                            placeholder="#FFFFFF"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                        <input defaultValue={editingVariant?.sortOrder ?? 0} name="sortOrder" type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                        <select defaultValue={editingVariant?.status || 'Active'} name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="Active">Hoạt động</option>
                          <option value="Draft">Bản nháp</option>
                        </select>
                      </div>

                      <div className="flex items-center h-full pt-6">
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" name="isDefault" value="true" defaultChecked={editingVariant?.isDefault} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700 font-medium">Là biến thể mặc định</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Link Shopee riêng (không bắt buộc)</label>
                      <input defaultValue={editingVariant?.shopeeUrl || ''} name="shopeeUrl" type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://shopee.vn/..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh biến thể</label>
                      <ImageDropzone onImageSelected={handleImageSelected} defaultImage={editingVariant?.imageUrl} />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Huỷ
                      </button>
                      <button 
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Đang lưu...' : 'Lưu biến thể'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
