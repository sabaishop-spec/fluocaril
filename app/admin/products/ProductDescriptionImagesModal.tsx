'use client';

import { useState, useRef } from 'react';
import { 
  createProductDescriptionImages, 
  updateProductDescriptionImage, 
  deleteProductDescriptionImage, 
  reorderProductDescriptionImages 
} from './description-image-actions';
import { Images, Plus, Edit2, X, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function ProductDescriptionImagesModal({ product, images = [] }: { product: any, images: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    resetForm();
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingImage(null);
    setMessage(null);
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const startEdit = (img: any) => {
    resetForm();
    setEditingImage(img);
    setPreviewUrls([img.imageUrl]);
  };

  const checkImageRatio = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        const ratio = img.width / img.height;
        const targetRatio = 3 / 4;
        const errorMargin = 0.02; // 2%
        if (Math.abs(ratio - targetRatio) <= errorMargin) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(false);
      };
      img.src = url;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setMessage(null);
    const validFiles: File[] = [];
    const validUrls: string[] = [];

    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setMessage({ type: 'error', text: `File ${file.name} không đúng định dạng (chỉ nhận JPG, PNG, WebP).` });
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setMessage({ type: 'error', text: `File ${file.name} vượt quá 8MB.` });
        return;
      }
      
      const isValidRatio = await checkImageRatio(file);
      if (!isValidRatio) {
        setMessage({ type: 'error', text: `Ảnh mô tả phải có tỷ lệ 3:4. (Lỗi file: ${file.name})` });
        return;
      }

      validFiles.push(file);
      validUrls.push(URL.createObjectURL(file));
    }

    if (isAdding) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setPreviewUrls(prev => [...prev, ...validUrls]);
    } else if (editingImage) {
      setSelectedFiles([validFiles[0]]);
      setPreviewUrls([validUrls[0]]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isAdding && selectedFiles.length === 0) {
      setMessage({ type: 'error', text: 'Vui lòng chọn ít nhất 1 ảnh.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append('productId', product.id.toString());
    
    let result;
    if (editingImage) {
      if (selectedFiles.length > 0) {
        formData.append('imageFile', selectedFiles[0]);
      } else {
        formData.append('imageUrl', editingImage.imageUrl);
      }
      result = await updateProductDescriptionImage(editingImage.id, formData);
    } else {
      selectedFiles.forEach(file => {
        formData.append('imageFiles', file);
      });
      result = await createProductDescriptionImages(product.id, formData);
    }
    
    setLoading(false);
    if (result.success) {
      setMessage({ type: 'success', text: editingImage ? 'Cập nhật thành công!' : 'Thêm ảnh thành công!' });
      setTimeout(() => {
        resetForm();
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xoá ảnh này?')) return;
    
    setLoading(true);
    const result = await deleteProductDescriptionImage(id);
    setLoading(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Xoá thành công!' });
      setTimeout(() => setMessage(null), 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Lỗi khi xoá' });
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === images.length - 1)) return;
    
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    
    const newOrderIds = newImages.map(img => img.id);
    
    setLoading(true);
    await reorderProductDescriptionImages(product.id, newOrderIds);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={handleOpen}
        className="text-pink-500 hover:text-pink-700 p-2 transition-colors"
        title="Quản lý ảnh mô tả"
      >
        <Images className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Ảnh mô tả: <span className="text-blue-600">{product.name}</span>
              </h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar with List */}
              <div className="w-1/3 border-r border-gray-100 overflow-y-auto p-4 bg-gray-50/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">Danh sách ảnh</h3>
                  <button 
                    onClick={startAdd}
                    className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                    title="Thêm ảnh mô tả"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {images.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-4">Chưa có ảnh mô tả nào.</div>
                ) : (
                  <div className="space-y-3">
                    {images.map((img, index) => (
                      <div 
                        key={img.id} 
                        className={`p-2 rounded-lg border flex flex-col gap-2 ${editingImage?.id === img.id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="relative w-12 h-16 bg-gray-100 rounded border overflow-hidden shrink-0">
                            <Image src={img.imageUrl} alt={img.altText || 'img'} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-900 truncate" title={img.altText || 'Không có Alt Text'}>
                              {img.altText || 'Không có Alt Text'}
                            </div>
                            <div className={`text-[10px] mt-1 ${img.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                              {img.status}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex flex-col items-center gap-1">
                            <button onClick={() => startEdit(img)} className="text-blue-500 hover:text-blue-700 p-1">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(img.id)} className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Sort actions */}
                        <div className="flex justify-between items-center border-t pt-1 mt-1">
                          <span className="text-[10px] text-gray-400 font-mono">Order: {img.sortOrder}</span>
                          <div className="flex gap-1">
                            <button 
                              disabled={index === 0 || loading}
                              onClick={() => handleMove(index, 'up')}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowUp className="w-3 h-3 text-gray-600" />
                            </button>
                            <button 
                              disabled={index === images.length - 1 || loading}
                              onClick={() => handleMove(index, 'down')}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowDown className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        </div>
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

                {(!isAdding && !editingImage) ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Images className="w-16 h-16 mb-4 opacity-20" />
                    <p>Chọn một ảnh để chỉnh sửa hoặc tạo mới</p>
                    <button 
                      onClick={startAdd}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Thêm ảnh mô tả
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">
                      {isAdding ? 'Thêm ảnh mới' : `Chỉnh sửa ảnh`}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                        <select defaultValue={editingImage?.status || 'Active'} name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="Active">Hoạt động</option>
                          <option value="Draft">Bản nháp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                        <input defaultValue={editingImage?.sortOrder ?? images.length} name="sortOrder" type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alt text (Mô tả ảnh)</label>
                      <input defaultValue={editingImage?.altText || ''} name="altText" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ví dụ: Góc nghiêng của sản phẩm..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Ảnh (Tỷ lệ 3:4)
                      </label>
                      
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Chọn ảnh {isAdding ? '(có thể chọn nhiều)' : ''}
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/jpeg,image/png,image/webp" 
                          multiple={isAdding}
                          onChange={handleFileChange}
                        />
                      </div>

                      {previewUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="relative aspect-[3/4] border rounded overflow-hidden bg-gray-50">
                              <Image src={url} alt="preview" fill className="object-contain" sizes="150px" />
                              {(isAdding || editingImage) && (
                                <button 
                                  type="button" 
                                  onClick={() => removeSelectedFile(index)}
                                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-50 text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Huỷ
                      </button>
                      <button 
                        type="submit"
                        disabled={loading || (!editingImage && selectedFiles.length === 0)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Đang lưu...' : (isAdding ? 'Tải lên' : 'Lưu thay đổi')}
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
