import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/blog-server";
import ArticlePage from "@/components/blog/ArticlePage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPost(slug);
    const title = meta.title;
    const description = meta.excerpt;
    const url = `https://dubbingai.io/blog/${slug}`;
    return {
      title,
      description,
      alternates: { canonical: url, languages: { "x-default": url, en: url } },
      openGraph: {
        title,
        description,
        url,
        type: "article",
        images: meta.image ? [meta.image] : [],
        publishedTime: meta.isoDate,
        authors: [meta.author],
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  try {
    const { meta, content, takeaways, faqs } = getPost(slug);
    if (meta.superseded) {
      permanentRedirect(meta.href);
    }
    return <ArticlePage meta={meta} content={content} takeaways={takeaways} faqs={faqs} />;
  } catch {
    notFound();
  }
}
