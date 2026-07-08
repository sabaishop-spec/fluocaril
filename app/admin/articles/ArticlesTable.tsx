'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, CheckSquare, Square, Loader2, ChevronDown } from 'lucide-react';
import { deletePosts, updatePostsStatus } from '@/app/admin/actions/post';
import { useRouter } from 'next/navigation';

export default function ArticlesTable({ posts }: { posts: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length && posts.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map(p => p.id.toString()));
    }
  };

  const toggleSelect = (rawId: any) => {
    const id = rawId.toString();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm('Bạn có chắc chắn muốn xóa các bài viết đã chọn?')) return;
    
    startTransition(async () => {
      const result = await deletePosts(selectedIds);
      if (result.success) {
        setSelectedIds([]);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  const handleUpdateStatus = async (status: string) => {
    if (selectedIds.length === 0) return;
    
    startTransition(async () => {
      const result = await updatePostsStatus(selectedIds, status);
      if (result.success) {
        setSelectedIds([]);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/50 px-6 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-700">
            Đã chọn {selectedIds.length} bài viết
          </span>
          <div className="flex items-center gap-2">
            <select
              disabled={isPending}
              onChange={(e) => {
                if (e.target.value) {
                  handleUpdateStatus(e.target.value);
                  e.target.value = '';
                }
              }}
              className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 outline-none"
            >
              <option value="">Cập nhật trạng thái...</option>
              <option value="Published">Xuất bản</option>
              <option value="Draft">Chuyển thành bản nháp</option>
            </select>
            <button 
              onClick={handleDeleteSelected}
              disabled={isPending}
              className="text-xs px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-md font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Đang xử lý...' : 'Xóa'}
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
              <th className="py-4 px-6 w-12">
                <button 
                  onClick={toggleSelectAll} 
                  className="text-gray-400 hover:text-brand transition-colors"
                >
                  {selectedIds.length === posts.length && posts.length > 0 ? (
                    <CheckSquare className="w-5 h-5 text-brand" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>
              </th>
              <th className="py-4 px-6 font-medium">Ảnh bìa</th>
              <th className="py-4 px-6 font-medium">Tiêu đề</th>
              <th className="py-4 px-6 font-medium">Trạng thái</th>
              <th className="py-4 px-6 font-medium">Ngày tạo</th>
              <th className="py-4 px-6 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  Chưa có bài viết nào. Hãy thêm bài viết mới.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => toggleSelect(post.id)} 
                      className="text-gray-400 hover:text-brand transition-colors"
                    >
                      {selectedIds.includes(post.id.toString()) ? (
                        <CheckSquare className="w-5 h-5 text-brand" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gray-100">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900 line-clamp-2">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.slug}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status === 'Published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : ''}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/articles/${post.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => {
                          const postIdStr = post.id.toString();
                          setSelectedIds([postIdStr]);
                          // Small timeout to allow state to update
                          setTimeout(() => {
                            if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
                              startTransition(async () => {
                                await deletePosts([postIdStr]);
                                setSelectedIds([]);
                                router.refresh();
                              });
                            } else {
                              setSelectedIds(selectedIds.filter(id => id !== postIdStr));
                            }
                          }, 10);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
