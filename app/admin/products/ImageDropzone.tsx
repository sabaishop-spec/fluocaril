'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Trash2 } from 'lucide-react';

interface ImageDropzoneProps {
  onImageSelected: (file: File | null) => void;
  defaultImage?: string | null;
}

export default function ImageDropzone({ onImageSelected, defaultImage }: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelected(file);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering dropzone
    setPreview(null);
    onImageSelected(null);
  };

  useEffect(() => {
    return () => {
      // Clean up the object URL to avoid memory leaks
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden
          ${isDragActive ? 'border-[#84EF6E] bg-[#84EF6E]/5' : 'border-gray-300 hover:bg-gray-50 bg-white'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative w-full h-full group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={removeImage}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                title="Xóa ảnh"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <UploadCloud className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Kéo thả hình ảnh hoặc <span className="text-blue-600">tải lên từ thiết bị</span>
            </p>
            <p className="text-xs text-gray-500">
              Định dạng hỗ trợ: JPG, PNG, WEBP. Tối đa 5MB.
            </p>
          </div>
        )}
      </div>
      {fileRejections.length > 0 && (
        <p className="mt-2 text-sm text-red-500">
          File không hợp lệ. Vui lòng chọn ảnh JPG/PNG/WEBP dưới 5MB.
        </p>
      )}
    </div>
  );
}
