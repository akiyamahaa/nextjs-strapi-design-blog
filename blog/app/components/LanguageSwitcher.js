"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useBlogStore } from "@/stores/useBlogStore"; // You store currentPost here
import { useCategoryStore } from "@/stores/useCategoryStore";

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = pathname.split("/")[1];
  const currentPost = useBlogStore((state) => state.currentPost);

  const currentCategory = useCategoryStore((state) => state.currentCategory);

  const changeLocale = (targetLocale) => {
    const segments = pathname.split("/");
    const currentSlug = segments[2]; // Because URL is /vi/[slug]

    // Blog detail case
    if (currentPost && currentSlug === currentPost.slug) {
      const localized = currentPost.frontmatter.localizations;
      if (currentLang === targetLocale) {
        router.push(`/${targetLocale}/${currentSlug}`);
      } else if (localized?.locale === targetLocale && localized?.slug) {
        router.push(`/${targetLocale}/${localized.slug}`);
      } else {
        // Fallback: go to homepage of new locale
        router.push(`/${targetLocale}`);
      }

      setIsOpen(false);
      return;
    }

    // ✅ Category case
    if (pathname.includes("/category") && currentCategory) {
      const localizations = currentCategory.localization;
      if (currentLang === targetLocale) {
        router.push(`/${targetLocale}/category/${currentSlug}`);
      } else if (
        localizations?.locale === targetLocale &&
        localizations?.slug
      ) {
        router.push(`/${targetLocale}/category/${localizations.slug}`);
      } else {
        router.push(`/${targetLocale}`);
      }

      setIsOpen(false);
      return;
    }

    // Other pages — generic locale swap
    segments[1] = targetLocale;
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-1 bg-white rounded-full hover:opacity-60 transition"
      >
        <span className="text-2xl">{current.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLocale(lang.code)}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                lang.code === currentLang ? "bg-gray-100 font-medium" : ""
              }`}
            >
              <span className="text-xl mr-2">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
