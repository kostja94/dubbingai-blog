import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-server";

const BASE_URL = "https://dubbingai.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const active = posts.filter((p) => !p.superseded);

  const entries: MetadataRoute.Sitemap = active.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return entries;
}
