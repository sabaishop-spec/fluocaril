'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { createPost, updatePost } from '@/app/admin/actions/post';
import { uploadImage } from '@/app/admin/actions/upload';
import { Upload, Loader2 } from 'lucide-react';
import mammoth from 'mammoth';

interface ArticleFormProps {
  initialData?: any;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
    thumbnail: initialData?.thumbnail || '',
    status: initialData?.status || 'Draft',
  });

  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploadingThumbnail(true);
    
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      
      const uploadResult = await uploadImage(uploadFormData);
      if (uploadResult.success && uploadResult.url) {
        setFormData(prev => ({ ...prev, thumbnail: uploadResult.url }));
      } else {
        alert('Upload ảnh thất bại.');
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Đã có lỗi xảy ra khi upload ảnh.');
    } finally {
      setIsUploadingThumbnail(false);
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsProcessingFile(true);
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      if (arrayBuffer) {
        try {
          const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
          const htmlString = result.value;
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlString, 'text/html');
          const images = doc.querySelectorAll('img');
          
          const uploadPromises = Array.from(images).map(async (img) => {
            const src = img.getAttribute('src');
            if (src && src.startsWith('data:image/')) {
              try {
                // Convert base64 to Blob
                const res = await fetch(src);
                const blob = await res.blob();
                
                const mimeType = blob.type;
                const ext = mimeType.split('/')[1] || 'png';
                const { sanitizeFilename } = await import('@/lib/utils');
                const cleanFilename = sanitizeFilename(`embedded-${Date.now()}.${ext}`);
                const fileObj = new File([blob], cleanFilename, { type: mimeType });
                
                const uploadFormData = new FormData();
                uploadFormData.append('file', fileObj);
                
                const uploadResult = await uploadImage(uploadFormData);
                if (uploadResult.success && uploadResult.url) {
                  img.setAttribute('src', uploadResult.url);
                }
              } catch (error) {
                console.error('Error uploading embedded image:', error);
              }
            }
          });
          
          await Promise.all(uploadPromises);
          
          const cleanedHtmlString = doc.body.innerHTML;
          setFormData(prev => ({ ...prev, content: cleanedHtmlString }));
        } catch (error) {
          console.error('Error processing HTML file:', error);
        }
      }
      setIsProcessingFile(false);
    };
    reader.onerror = () => {
      setIsProcessingFile(false);
    };
    reader.readAsArrayBuffer(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    const form = e.currentTarget;
    const data = new FormData(form);
    
    startTransition(async () => {
      let result;
      if (initialData?.id) {
        result = await updatePost(initialData.id, data);
      } else {
        result = await createPost(data);
      }
      
      if (result.success) {
        router.push('/admin/articles');
        router.refresh();
      } else {
        setErrorMsg(result.error || 'Đã có lỗi xảy ra.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-4">
          {errorMsg}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện bài viết</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden group">
            {(previewUrl || formData.thumbnail) ? (
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl || formData.thumbnail || '/images/placeholder.png'} alt="Thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-50">
                    Thay đổi ảnh
                    <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={isUploadingThumbnail} />
                  </label>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-40">
                {isUploadingThumbnail ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-500 font-medium">Đang tải ảnh lên...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700">Nhấn để tải lên hoặc kéo thả ảnh</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF lên đến 5MB</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={isUploadingThumbnail} />
              </label>
            )}
          </div>
          {/* Hidden input to store the thumbnail URL for FormData */}
          <input type="hidden" name="existing_thumbnail" value={formData.thumbnail || ''} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn (Slug)</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
          >
            <option value="Draft">Bản nháp</option>
            <option value="Published">Xuất bản</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Nội dung</label>
          <div>
            <input 
              type="file" 
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessingFile}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingFile ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xử lý ảnh...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Tải lên tệp Word (.docx)
                </>
              )}
            </button>
          </div>
        </div>
        <RichTextEditor content={formData.content} onChange={handleContentChange} />
        {/* Hidden input to ensure content is included in FormData for Server Actions */}
        <input type="hidden" name="content" value={formData.content} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isPending || isUploadingThumbnail || isProcessingFile}
          className="px-6 py-2.5 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {isPending ? 'Đang lưu...' : (isUploadingThumbnail || isProcessingFile) ? 'Đang tải...' : 'Lưu bài viết'}
        </button>
      </div>
    </form>
  );
}
