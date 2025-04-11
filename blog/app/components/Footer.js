"use client";

import SocialLinks from "@/app/components/essential/SocialLinks";
import config from "@/config/site.config";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();

  const phoneNumberTel = config.footerWidgets.phone
    .replace(/\s/g, "")
    .replace("(", "")
    .replace(")", "")
    .replace(/-/g, "");

  return (
    <footer className={`bg-home5 bg-cover mt-auto py-16 sm:py-24 text-white`}>
      <div className="container">
        <div className="border-t-2 border-[#fff] pt-10 mb-6">
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl">
            Có câu hỏi hay về lịch sử?
          </h2>
        </div>
        <div className="row gy-4">
          <div className="lg:col-5">
            <p className="font-light max-w-xs">{t("footer.description")}</p>
          </div>
          <div className="lg:col-7">
            <div className="row gy-4">
              <div className="sm:col-5 md:col-4">
                <h3 className="text-white text-2xl sm:text-3xl mb-4">
                  {t("footer.contact")}
                </h3>
                <p className="uppercase">
                  <Link
                    href={`tel:${phoneNumberTel}`}
                    className="has-line-link-white"
                  >
                    <span className="line-link-el">
                      {config.footerWidgets.phone}
                    </span>
                  </Link>
                </p>
              </div>
              <div className="sm:col-5 md:col-4">
                <h3 className="text-white text-2xl sm:text-3xl mb-4">
                  {t("footer.email")}
                </h3>
                <p className="uppercase">
                  <Link
                    href={`mailto:${config.footerWidgets.email}`}
                    className="has-line-link-white"
                  >
                    <span className="line-link-el">
                      {config.footerWidgets.email}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-10 lg:mt-16 gy-4">
          <div className="lg:col-5">
            <SocialLinks dark isFooter border />
          </div>
          <div className="lg:col-7">
            <ul className="flex flex-wrap gap-y-3 gap-x-10 ms:gap-x-10 xl:gap-x-16 capitalize">
              {config.footerLinks.map((item, key) => (
                <li key={key}>
                  <Link href={item.url} className="has-line-link-white">
                    <span className="line-link-el">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
