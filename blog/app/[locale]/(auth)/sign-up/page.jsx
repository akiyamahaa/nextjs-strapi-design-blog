"use client";
import { useState } from "react";
import { ERouteTable } from "@/constants/route";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function SignUpPage() {
  const locale = useLocale();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpMutation } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      signUpMutation.mutate({ username, email, password });
    } catch (error) {
      console.error("Đăng ký thất bại", error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-6 bg-[#E5DFFD] rounded-xl shadow-lg">
      <div className="relative z-10 w-full max-w-md bg-white/90 dark:bg-gray-800/80 shadow-xl rounded-xl px-8 py-12 border border-[#C1B2FF] flex flex-col">
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold text-center text-[#6B5CC4] dark:text-[#C1B2FF]">
            Đăng ký
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 my-10">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#C1B2FF] rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A18CFF]"
            />

            <input
              type="email"
              placeholder="Địa chỉ Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                signUpMutation.isPending
                  ? "bg-[#D4CCF7] cursor-not-allowed"
                  : "bg-[#A18CFF] hover:bg-[#8F7AFF]"
              }`}
            >
              {signUpMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <div className="text-center">
            <span className="text-gray-700 dark:text-gray-300">
              Đã có tài khoản?{" "}
            </span>
            <Link
              href={`/${locale}${ERouteTable.SIGIN_IN}`}
              className="text-[#8F7AFF] hover:underline dark:text-[#C1B2FF]"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
