"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { ERouteTable } from "@/constants/route";
import { useLocale } from "next-intl";

export default function SignInPage() {
  const locale = useLocale(); // 👈 Lấy locale hiện tại: 'vi' | 'en' | ...
  const { signInMutation } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signInMutation.mutate({ identifier, password });
    } catch (err) {
      alert("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
      {/* Overlay màu nhẹ giúp nội dung rõ hơn */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/60 to-yellow-100/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 dark:bg-gray-800/80 shadow-xl rounded-xl px-8 py-12 border border-yellow-300">
        <h2 className="text-3xl font-bold text-center text-yellow-700 dark:text-yellow-300 ">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 my-12">
          <input
            type="text"
            placeholder="Email hoặc Tên đăng nhập"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            disabled={signInMutation.isPending}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
              signInMutation.isPending
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {signInMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="text-center">
          <span className="text-gray-700 dark:text-gray-300">
            Chưa có tài khoản?{" "}
          </span>
          <Link
            href={`/${locale}${ERouteTable.SIGIN_UP}`}
            className="text-yellow-600 dark:text-yellow-400 hover:underline"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
