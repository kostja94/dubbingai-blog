import { cache } from "react";
import type { BlogPost } from "@/lib/blog";
import type { FaqItem } from "@/lib/blog-faq";
import type { KeyTakeawayItem } from "@/lib/blog-key-takeaways";
import { BLOG_POSTS, BLOG_CONTENT } from "@/data/blog-data";
import { extractFaqs } from "@/lib/blog-faq";
import { extractKeyTakeaways } from "@/lib/blog-key-takeaways";

const ALL_POSTS: BlogPost[] = BLOG_POSTS;

export const getPostSlugs = cache((): string[] => {
  return ALL_POSTS.map((p) => p.slug);
});

export function getPost(slug: string): {
  meta: BlogPost;
  content: string;
  takeaways: KeyTakeawayItem[];
  faqs: FaqItem[];
} {
  const meta = ALL_POSTS.find((p) => p.slug === slug);
  if (!meta) throw new Error(`Post not found: ${slug}`);
  const rawContent = BLOG_CONTENT[slug] || "";
  const { takeaways, body: bodyAfterKT } = extractKeyTakeaways(rawContent);
  const { faqs, body } = extractFaqs(bodyAfterKT);
  return { meta, content: body, takeaways, faqs };
}

export const getAllPosts = cache((): BlogPost[] => {
  return ALL_POSTS;
});
