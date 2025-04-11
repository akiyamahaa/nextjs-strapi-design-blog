import CustomImage from "@/components/blog/CustomImage";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import React, { isValidElement } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const extractText = (node) => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) return extractText(node.props.children);
  return "";
};

const MDXcomponents = {
  Link,
  CustomImage,
  h2: (props) => {
    const text = extractText(props.children);
    return (
      <Link className="no-underline" href={`#${slugify(text)}`}>
        <h2 className="heading" id={slugify(text)} {...props} />
      </Link>
    );
  },
  h3: (props) => {
    const text = extractText(props.children);
    return (
      <Link className="no-underline" href={`#${slugify(text)}`}>
        <h3 className="heading" id={slugify(text)} {...props} />
      </Link>
    );
  },
  pre: (props) => (
    <SyntaxHighlighter
      language={props.children.props.className.split("-")[1]}
      style={dracula}
      className="rounded-lg !p-6 !pl-3"
      showLineNumbers
    >
      {props.children.props.children}
    </SyntaxHighlighter>
  ),
  code: (props) => (
    <code
      className="bg-[#282a36] text-[#f1fa8c] rounded px-2 py-1 text-sm"
      {...props}
    ></code>
  ),
};

export default MDXcomponents;
