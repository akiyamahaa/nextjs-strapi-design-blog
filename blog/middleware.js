import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // auto redirect
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/vi", req.url));
  }

  const segments = pathname.split("/");
  const locale = segments[1];

  // Check if first part is a locale
  const isLocale = routing.locales.includes(locale);
  const pathWithoutLocale = isLocale
    ? `/${segments.slice(2).join("/")}`
    : pathname;

  // 2. Redirect các route ẩn
  const hiddenRoute = [
    "/author",
    "/videos",
    "/home-2",
    "/home-3",
    "/blog/elements",
  ];

  if (hiddenRoute.includes(pathWithoutLocale)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
