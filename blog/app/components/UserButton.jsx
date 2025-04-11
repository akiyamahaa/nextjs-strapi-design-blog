"use client";
import { ERouteTable } from "@/constants/route";
import { useAuthContext } from "@/context/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import LocalizedLink from "./LocalizedLink";
import { useState } from "react";

export default function UserButton() {
  const { user, signOut, isHydrated } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const initial = (user && user.username?.[0]?.toUpperCase()) || "?";

  if (!isHydrated) {
    return <LoadingSpinner />; // ⏳ Đợi Zustand khôi phục xong trước khi render
  }

  if (!user) {
    return (
      <div className="relative">
        {/* Desktop view: Hiển thị nút đăng nhập / đăng ký */}
        <div className="hidden sm:flex gap-4 items-center">
          <LocalizedLink href={ERouteTable.SIGIN_IN}>
            <button className="px-4 py-2 text-gray-900 hover:bg-gray-100 rounded whitespace-nowrap">
              Đăng nhập
            </button>
          </LocalizedLink>
          <LocalizedLink href={ERouteTable.SIGIN_UP}>
            <button className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded whitespace-nowrap">
              Đăng ký
            </button>
          </LocalizedLink>
        </div>

        {/* Mobile view: Hiển thị avatar (giả lập bằng nút) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
          >
            👤
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute mt-2 right-0 w-32 bg-white border rounded shadow-md z-10">
              <LocalizedLink href={ERouteTable.SIGIN_IN}>
                <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">
                  Đăng nhập
                </div>
              </LocalizedLink>
              <LocalizedLink href={ERouteTable.SIGIN_UP}>
                <div className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">
                  Đăng ký
                </div>
              </LocalizedLink>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      {/* Avatar button */}
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-semibold"
      >
        {initial}
      </button>

      {/* Dropdown */}
      {openDropdown && (
        <div className="absolute top-8 right-0 mt-4 w-32 bg-white border rounded shadow-md z-10">
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
