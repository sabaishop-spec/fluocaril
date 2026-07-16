"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "sabaishop7979@gmail.com" && password === "Fluocaril@123") {
      document.cookie = "admin_session=true; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Tài khoản hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] px-4">
      <div className="bg-white rounded-xl shadow-sm max-w-md w-full p-8 md:p-10">
        <h1 className="font-bold text-2xl text-center mb-8 text-gray-800">
          Đăng nhập Quản trị
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-[#e8f0fe] border border-transparent focus:border-[#4ba3a3] rounded-lg p-4 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full bg-slate-800 text-white placeholder:text-gray-400 border border-transparent focus:border-slate-600 rounded-lg p-4 focus:outline-none transition-colors"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#4ba3a3] hover:bg-[#3d8b8b] text-white rounded-lg p-4 font-semibold transition-colors"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
