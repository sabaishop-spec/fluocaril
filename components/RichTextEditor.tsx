'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { useEffect, useState } from 'react';
import { uploadImage } from '@/app/admin/actions/upload';
import { Loader2 } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, view: any, event: any) => {
    if (!file.type.startsWith('image/')) {
      return false;
    }
    
    // Prevent default behavior to avoid base64 conversion
    event.preventDefault();
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        // Find cursor position or default to end
        const { schema } = view.state;
        const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
        
        editor?.chain().focus().setImage({ src: result.url }).run();
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
    
    return true;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: true,
        allowBase64: false, // Disallow base64
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none min-h-[200px] border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent',
      },
      handleDrop: function(view, event, slice, moved) {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            handleImageUpload(file, view, event);
            return true;
          }
        }
        return false;
      },
      handlePaste: function(view, event, slice) {
        if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
          const file = event.clipboardData.files[0];
          if (file.type.startsWith('image/')) {
            handleImageUpload(file, view, event);
            return true;
          }
        }
        return false;
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor rounded-md overflow-hidden border border-gray-200 relative">
      {isUploading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span className="text-sm font-medium text-gray-700">Đang tải ảnh lên...</span>
          </div>
        </div>
      )}
      <div className="bg-gray-100 p-2 flex gap-2 flex-wrap border-b border-gray-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('bold') ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('italic') ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('bulletList') ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('orderedList') ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          Ordered List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('blockquote') ? 'bg-gray-300 text-black' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
          Blockquote
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1 self-center"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200"
        >
          Chèn Bảng
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
          className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          + Cột
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
          className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          - Cột
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
          className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          + Hàng
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
          className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          - Hàng
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().mergeCells().run()}
          disabled={!editor.can().mergeCells()}
          className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          Gộp ô
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          className="px-2 py-1 rounded text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
        >
          Xóa bảng
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1 self-center"></div>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="toolbar-image-upload"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Mock view and event for handleImageUpload since it expects them
                const view = editor.view;
                const event = new Event('change') as any;
                event.preventDefault = () => {};
                
                setIsUploading(true);
                try {
                  const formData = new FormData();
                  formData.append('file', file);
                  const result = await uploadImage(formData);
                  if (result.success && result.url) {
                    editor.chain().focus().setImage({ src: result.url }).run();
                  } else {
                    alert(result.error || 'Upload failed');
                  }
                } catch (error) {
                  console.error(error);
                  alert('Upload failed');
                } finally {
                  setIsUploading(false);
                  e.target.value = '';
                }
              }
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('toolbar-image-upload')?.click()}
            className="px-2 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-200 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            Thêm ảnh
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
