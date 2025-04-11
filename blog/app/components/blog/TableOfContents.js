"use client";

import { useEffect, useState } from "react";

const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const content = document.querySelector(".content");
    if (!content) return;

    const headingElements = content.querySelectorAll("h2, h3");

    const headingArray = [];
    let currentSection = null;

    headingElements.forEach((heading) => {
      heading.setAttribute("data-id", heading.id);

      if (heading.tagName === "H2") {
        // Create a new section for each H2
        currentSection = {
          title: heading.textContent,
          id: heading.id,
          subHeadings: [],
        };
        headingArray.push(currentSection);
      } else if (heading.tagName === "H3" && currentSection) {
        // Add H3 to the most recent H2
        currentSection.subHeadings.push({
          title: heading.textContent,
          id: heading.id,
        });
      }
    });

    setHeadings(headingArray);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let currentActive = null;

      headingElements.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element?.offsetTop <= scrollPosition + 200) {
          currentActive = heading.id;
        }
      });

      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);

  return (
    <nav className="border border-[#DBD8BD] rounded-xl lg:p-6">
      <h3
        className="font-secondary uppercase cursor-pointer lg:cursor-auto select-none flex lg:block justify-between items-center px-5 py-4 lg:p-0"
        onClick={handleExpand}
      >
        <span className="text-sm sm:text-base">Table of Contents</span>
        <span className="block lg:hidden">
          <svg
            className={expanded ? "rotate-45" : ""}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            height="1em"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </span>
      </h3>

      {!headings.length && (
        <div className="mt-6 flex flex-col gap-y-4">
          <span className="h-4 w-[60%] block bg-dark/5 rounded"></span>
          <span className="h-4 w-3/4 block bg-dark/5 rounded"></span>
          <span className="h-4 w-[70%] block bg-dark/5 rounded"></span>
          <span className="h-4 w-[65%] block bg-dark/5 rounded"></span>
          <span className="h-4 w-[50%] block bg-dark/5 rounded"></span>
        </div>
      )}

      <ol
        className={`list-decimal pl-9 lg:pl-4 lg:mt-4 p-5 lg:p-0 !pt-0 ${
          expanded ? "block" : "hidden lg:block"
        }`}
      >
        {headings.map((section) => (
          <li key={section.id} className="mb-3 last:mb-0">
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`font-semibold text-[#4a4a3f] hover:text-secondary ${
                section.id === active ? "text-secondary" : ""
              }`}
            >
              {section.title}
            </a>

            {section.subHeadings.length > 0 && (
              <ol className="list-disc ml-5 mt-2">
                {section.subHeadings.map((sub) => (
                  <li
                    key={sub.id}
                    className="text-[#6c6c5f] text-[15px] hover:text-secondary"
                  >
                    <a
                      href={`#${sub.id}`}
                      onClick={(e) => handleClick(e, sub.id)}
                      className={`${
                        sub.id === active ? "text-secondary font-bold" : ""
                      }`}
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
