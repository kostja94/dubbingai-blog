export type BlogPost = {
  slug: string;
  href: string;
  superseded?: boolean;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: string;
  featured?: boolean;
  ctaTitle?: string;
  ctaIntro?: string;
};

export const BLOG_CATEGORIES = [
  "All",
  "Voice Changer Tips",
  "Voice Changer Review",
  "Sound Effect Tips",
  "Soundboard Tips",
  "Voice Actors",
  "Vocal Remover Tips",
] as const;

export function plainText(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fff\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
