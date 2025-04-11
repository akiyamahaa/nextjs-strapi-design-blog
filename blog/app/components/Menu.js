"use client";

import mainMenu from "@/config/main-menu.json";
import { slugify } from "@/libs/utils/slugify";
import { usePathname } from "next/navigation";
import LocalizedLink from "./LocalizedLink";

const Menu = ({ menuOpen, className = "", menuDark = false }) => {
  const pathname = usePathname();

  return (
    <div
      className={`absolute left-0 right-0 origin-top backdrop-blur-lg z-[9909] text-center transition-all duration-500 ease-in-out transform ${
        menuOpen
          ? "scale-y-100 opacity-100 shadow-2xl"
          : "scale-y-0 opacity-0 pointer-events-none"
      } ${menuDark ? "bg-secondary/85" : "bg-white/15"} ${className}`}
      style={{ transitionProperty: "transform, opacity" }}
    >
      <nav>
        <ul className="my-10 mx-auto w-fit font-primary text-3xl">
          {mainMenu.map((menu, key) => {
            const isActive =
              pathname === menu.link ||
              (menu.submenu &&
                menu.submenu.some((submenu) => pathname === submenu.link));

            const menuNameSlug = slugify(menu.name);

            return menu.submenu && menu.submenu.length > 0 ? (
              <li key={key} className="transition-all duration-300">
                <label
                  htmlFor={menuNameSlug}
                  className={`block cursor-pointer ${
                    isActive ? "underline underline-offset-4 decoration-2" : ""
                  }`}
                >
                  <input
                    id={menuNameSlug}
                    type="checkbox"
                    name="menu"
                    className="hidden peer"
                  />
                  <span className="flex items-center justify-center gap-x-2 peer-checked:[&>svg]:rotate-180 transition-all">
                    {menu.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>

                  <div
                    className={`max-h-0 overflow-hidden peer-checked:max-h-[999px] gap-2 flex flex-col transition-all duration-300 bg-white shadow-md rounded-lg mt-3 px-4 py-2`}
                  >
                    {menu.submenu.map((submenu, subkey) => {
                      const isActive = pathname === submenu.link;

                      return (
                        <LocalizedLink
                          key={subkey}
                          href={submenu.link}
                          className={`
          block px-4 py-2 rounded-md text-base text-left transition-all duration-200
          ${
            isActive
              ? "bg-secondary text-white font-semibold"
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
          }
        `}
                        >
                          {submenu.name}
                        </LocalizedLink>
                      );
                    })}
                  </div>
                </label>
              </li>
            ) : (
              <li key={key} className="transition-all duration-300">
                <span
                  className={`block ${
                    pathname === menu.link ? "underline underline-offset-4" : ""
                  }`}
                >
                  <LocalizedLink href={menu.link}>{menu.name}</LocalizedLink>
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
