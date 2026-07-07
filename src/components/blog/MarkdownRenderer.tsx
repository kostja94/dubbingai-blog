"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { plainText } from "@/lib/blog";

type Props = { content: string; featuredImage?: string };

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (typeof node === "boolean" || node === null || node === undefined) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as React.ReactElement).props.children);
  }
  return "";
}

function stripFeaturedImage(content: string, featuredImage: string): string {
  const match = content.match(/!\[.*?\]\(([^)]+)\)/);
  if (!match) return content;
  const [, imageUrl] = match;
  if (imageUrl !== featuredImage) return content;
  return content.replace(
    /!\[.*?\]\([^)]+\)\s*(?:Image\s*Source:\s*[^\n]*\n?)?/i,
    "",
  );
}

export default function MarkdownRenderer({ content, featuredImage }: Props) {
  const cleaned = useMemo(
    () => (featuredImage ? stripFeaturedImage(content, featuredImage) : content),
    [content, featuredImage],
  );
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:text-foreground prose-headings:font-bold
        prose-h2:mt-14 prose-h2:scroll-mt-24 prose-h2:text-h2
        prose-h3:mt-10 prose-h3:scroll-mt-24 prose-h3:text-h3
        prose-p:mt-5 prose-p:text-[18px] prose-p:leading-6 prose-p:text-muted-foreground
        prose-a:text-primary prose-a:underline prose-a:decoration-primary/40 prose-a:underline-offset-4 hover:prose-a:decoration-primary
        prose-strong:font-semibold prose-strong:text-foreground
        prose-ul:mt-5 prose-ul:space-y-2.5 prose-ul:pl-5 prose-ul:text-[18px] prose-ul:leading-6 prose-ul:text-muted-foreground
        prose-ol:mt-5 prose-ol:space-y-2.5 prose-ol:pl-5 prose-ol:text-[18px] prose-ol:leading-6 prose-ol:text-muted-foreground
        prose-li:list-disc prose-li:marker:text-muted-foreground/60
        prose-table:mt-5 prose-table:w-full prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-border prose-table:text-sm
        prose-thead:bg-muted/40 prose-thead:text-foreground
        prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
        prose-td:px-4 prose-td:py-3 prose-td:text-foreground/85
        prose-tr:border-t prose-tr:border-border
        prose-blockquote:mt-5 prose-blockquote:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:text-muted-foreground
        prose-img:mt-8 prose-img:overflow-hidden prose-img:rounded-2xl prose-img:border prose-img:border-border prose-img:bg-muted/20
        prose-code:rounded prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
        prose-em:text-muted-foreground
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          img: ({ src, alt }) => (
            <img
              src={src ?? ""}
              alt={alt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover rounded-2xl border border-border bg-muted/20 my-8"
              onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
            />
          ),
          a: ({ href, children, ...props }) => {
            const url = (href ?? "").replace(/^https:\/\/dubbingai\.io/, "") || "/";
            const isExternal = url.startsWith("http");
            if (isExternal) {
              return (
                <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            }
            return (
              <Link href={url} {...props}>
                {children}
              </Link>
            );
          },
          h2: ({ children, ...props }) => {
            const id = plainText(extractText(children));
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const id = plainText(extractText(children));
            return <h3 id={id} {...props}>{children}</h3>;
          },
        }}
      >
        {cleaned}
      </ReactMarkdown>
    </div>
  );
}
