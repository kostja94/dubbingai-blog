import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-server";
import Blog from "@/views/Blog";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Dubbing AI Blog — Voice Changer Guides & Tips",
  description:
    "Tutorials, comparisons and creative ideas for using Dubbing AI's real-time voice changer in games, streams, Discord and beyond.",
  alternates: {
    canonical: "https://dubbingai.io/blog",
  },
  openGraph: {
    title: "Dubbing AI Blog — Voice Changer Guides & Tips",
    description:
      "Voice changer guides, soundboard ideas and streaming playbooks from Dubbing AI.",
    url: "https://dubbingai.io/blog",
    type: "website",
  },
};

export default async function Page() {
  const posts = getAllPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dubbing AI Blog",
    description:
      "Voice changer guides, soundboard ideas and streaming playbooks from Dubbing AI.",
    url: "https://dubbingai.io/blog",
    inLanguage: "en",
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `https://dubbingai.io/blog/${p.slug}`,
      datePublished: p.isoDate,
      author: { "@type": "Organization", name: p.author },
      image: p.image,
    })),
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <Suspense fallback={null}>
        <Blog posts={posts} />
      </Suspense>
    </>
  );
}
