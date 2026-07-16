'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Đưa email về chữ thường để chống lỗi tự động viết hoa
    if (email.toLowerCase() === 'sabaishop7979@gmail.com' && password === 'Fluocaril@123') {
      setIsSuccess(true);
      setMessage('✅ Đăng nhập thành công! Đang vào hệ thống...');
      
      // Chờ 1.5 giây để thấy thông báo rồi mới chuyển trang
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1500);
    } else {
      setIsSuccess(false);
      setMessage('❌ Tài khoản hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập Quản trị</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input type="email" placeholder="Địa chỉ email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-[#e8f0fe] border border-gray-200 outline-none text-gray-800" required />
          </div>
          <div>
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 outline-none" required />
          </div>
          {message && <p className={`text-sm text-center font-semibold ${isSuccess ? 'text-emerald-600' : 'text-red-500'}`}>{message}</p>}
          <button type="submit" disabled={isSuccess} className={`w-full p-3 rounded-lg font-bold text-white transition-colors ${isSuccess ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4ba3a3] hover:bg-teal-600'}`}>
            {isSuccess ? 'Đang tải...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
