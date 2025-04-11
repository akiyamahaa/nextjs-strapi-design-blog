"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const SUPPORTED_LOCALES = ["en", "vi"]; // Add more if needed

const isPrefixedWithLocale = (href) => {
  const firstSegment = href.replace(/^\/+/, "").split("/")[0];
  return SUPPORTED_LOCALES.includes(firstSegment);
};

const getCurrentLocale = (pathname) => {
  const segment = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(segment) ? segment : "vi"; // default fallback locale
};

export default function LocalizedLink({ href, children, className }) {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  let finalHref = href;

  if (!isPrefixedWithLocale(href)) {
    finalHref = `/${currentLocale}${href.startsWith("/") ? href : `/${href}`}`;
  }

  // Remove any accidental duplicate locale prefix (e.g. /vi/vi/...)
  const regex = new RegExp(`^/(${SUPPORTED_LOCALES.join("|")})/\\1/`);
  finalHref = finalHref.replace(regex, `/${currentLocale}/`);

  return (
    <Link href={finalHref} className={className}>
      {children}
    </Link>
  );
}
