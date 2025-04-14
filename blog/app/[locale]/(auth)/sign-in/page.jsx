"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { ERouteTable } from "@/constants/route";
import { useLocale } from "next-intl";

export default function SignInPage() {
  const locale = useLocale();
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
    <div className="w-full max-w-md mx-auto px-4 py-12 bg-[#E5DFFD] rounded-xl shadow-lg">
      <div className="relative z-10 w-full max-w-md bg-white/90 dark:bg-gray-800/80 shadow-xl rounded-xl px-8 py-12 border border-[#C1B2FF]">
        <h2 className="text-3xl font-bold text-center text-[#6B5CC4] dark:text-[#C1B2FF]">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 my-10">
          <input
            type="text"
            placeholder="Email hoặc Tên đăng nhập"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-4 py-3 border border-[#C1B2FF] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A18CFF]"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-[#C1B2FF] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A18CFF]"
          />

          <button
            type="submit"
            disabled={signInMutation.isPending}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              signInMutation.isPending
                ? "bg-[#D4CCF7] cursor-not-allowed"
                : "bg-[#A18CFF] hover:bg-[#8F7AFF]"
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
            className="text-[#8F7AFF] hover:underline dark:text-[#C1B2FF]"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
