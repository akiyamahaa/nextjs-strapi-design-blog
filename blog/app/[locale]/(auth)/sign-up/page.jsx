"use client";
import { useState } from "react";
import { ERouteTable } from "@/constants/route";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function SignUpPage() {
  const locale = useLocale(); // 👈 Lấy locale hiện tại: 'vi' | 'en' | ...
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpMutation } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gọi API đăng ký, bạn cần có API backend xử lý route này
      signUpMutation.mutate({ username, email, password });
    } catch (error) {
      console.error("Đăng ký thất bại", error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/60 to-yellow-100/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md  h-full bg-white/90 dark:bg-gray-800/80 shadow-xl rounded-xl px-8 py-12 border border-yellow-300 flex flex-col">
        <div className="flex flex-col justify-between h-full">
          {/* Tiêu đề */}
          <h2 className="text-3xl font-bold text-center text-yellow-700 dark:text-yellow-300">
            Đăng ký
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 my-12">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg bg-white/90 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <input
              type="email"
              placeholder="Địa chỉ Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg bg-white/90 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg bg-white/90 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                signUpMutation.isPending
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {signUpMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          {/* Link chuyển sang đăng nhập */}
          <div className="text-center">
            <span className="text-gray-700 dark:text-gray-300">
              Đã có tài khoản?{" "}
            </span>
            <Link
              href={`/${locale}${ERouteTable.SIGIN_IN}`}
              className="text-yellow-600 dark:text-yellow-400 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
