import { cache } from "react";
import type { BlogPost } from "@/lib/blog";
import type { FaqItem } from "@/lib/blog-faq";
import { BLOG_POSTS, BLOG_CONTENT } from "@/data/blog-data";
import { extractFaqs } from "@/lib/blog-faq";

const ALL_POSTS: BlogPost[] = BLOG_POSTS;

export const getPostSlugs = cache((): string[] => {
  return ALL_POSTS.map((p) => p.slug);
});

export function getPost(slug: string): {
  meta: BlogPost;
  content: string;
  faqs: FaqItem[];
} {
  const meta = ALL_POSTS.find((p) => p.slug === slug);
  if (!meta) throw new Error(`Post not found: ${slug}`);
  const rawContent = BLOG_CONTENT[slug] || "";
  const { faqs, body } = extractFaqs(rawContent);
  return { meta, content: body, faqs };
}

export const getAllPosts = cache((): BlogPost[] => {
  return ALL_POSTS;
});
