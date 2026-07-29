'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './actions';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const result = await loginAction(formData);

    if (result.success) {
      setIsSuccess(true);
      setMessage(result.message);
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1000);
    } else {
      setIsSuccess(false);
      setMessage(result.message);
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
