import DeviceSizeIndicator from "@/components/essential/DeviceSizeIndicator";
import { fontLexendDeca, fontPrata } from "@/components/essential/Fonts";
import config from "@/config/site.config.json";
import NextTopLoader from "nextjs-toploader";

import "@/styles/styles.scss";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import QueryProvider from "@/context/QueryProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata = {
  title: config.metaData.title,
  description: config.metaData.description,
  url: config.siteURL,
  siteName: config.metaData.title,
  type: "website",

  icons: {
    icon: "/images/favicon.png",
  },

  metadataBase: new URL("https://blog.makiacademy.com/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: "/images/ogimage.png",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${fontPrata.variable} ${fontLexendDeca.variable}`}
      suppressHydrationWarning
    >
      <body className="font-secondary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <NextTopLoader
                color="#ff4848"
                shadow="none"
                showSpinner={false}
                zIndex={9999999}
                height={2}
              />
              {/* <DeviceSizeIndicator /> */}
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
