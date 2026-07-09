"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FinalCTASection from "@/components/shared/FinalCTASection";
import FAQSection from "@/components/shared/FAQSection";
import type { FaqItem } from "@/components/shared/FAQSection";
import ShareRail from "@/components/blog/ShareRail";
import JsonLd from "@/components/shared/JsonLd";
import { buildBlogIndexFinalCta } from "@/lib/finalCtaCopy";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { type BlogPost, plainText } from "@/lib/blog";

type Props = {
  meta: BlogPost;
  content: string;
  faqs: FaqItem[];
};

function extractToc(markdown: string): { id: string; label: string }[] {
  const headings: { id: string; label: string }[] = [];
  const regex = /^## (.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    const label = match[1];
    const id = plainText(label);
    headings.push({ id, label });
  }
  return headings;
}

export default function ArticlePage({ meta, content, faqs }: Props) {
  const toc = useMemo(() => extractToc(content), [content]);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    const ids = toc.map((t) => t.id);
    if (ids.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  const articleSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.excerpt,
      image: meta.image.startsWith("http") ? meta.image : `https://dubbingai.io${meta.image}`,
      datePublished: meta.isoDate,
      dateModified: meta.isoDate,
      author: { "@type": "Organization", name: meta.author },
      publisher: {
        "@type": "Organization",
        name: "Dubbing AI",
        logo: { "@type": "ImageObject", url: "https://dubbingai.io/logo.png" },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://dubbingai.io/blog/${meta.slug}` },
    }),
    [meta],
  );

  const breadcrumbLabel = meta.title.length > 30 ? meta.title.slice(0, 30) + "..." : meta.title;
  const articleUrl = `https://dubbingai.io/blog/${meta.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: breadcrumbLabel }]} />

      <main className="pb-20 pt-10 md:pt-14">
        <div className="content-container">
          <header className="overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl">
            <div className="grid md:grid-cols-[5fr_7fr]">
              <div className="aspect-[21/9] overflow-hidden bg-muted/40 md:aspect-auto">
                <img
                  src={meta.image}
                  alt={meta.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
                <span className="inline-block w-fit rounded-full bg-muted px-3 py-1 text-caption uppercase tracking-wider text-muted-foreground">
                  {meta.category}
                </span>
                <h1 className="mt-4 text-h1-article text-foreground leading-tight">{meta.title}</h1>
                <p className="mt-4 text-lead">{meta.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                    D
                  </div>
                  <div className="text-sm">
                    <Link
                      href="/author/kostja"
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {meta.author}
                    </Link>
                    <p className="text-meta inline-flex items-center gap-3 mt-0.5">
                      <span>Updated on {meta.date}</span>
                      <span></span>
                      <span>{meta.readTime}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="min-w-0 max-w-none">
              <MarkdownRenderer content={content} featuredImage={meta.image} />
            </article>

            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-10">
                  <div>
                    <p className="text-meta text-muted-foreground mb-4">On this page</p>
                    <nav className="space-y-1.5 text-sm">
                      {toc.map((t) => (
                        <a
                          key={t.id}
                          href={`#${t.id}`}
                          className={`block py-1 transition-colors ${
                            activeId === t.id
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {t.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="pt-8 border-t border-border">
                    <ShareRail url={articleUrl} title={meta.title} />
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>

        {faqs.length > 0 && (
          <FAQSection id={`blog-${meta.slug}`} faqs={faqs} background="default" />
        )}

        <FinalCTASection id="blog-detail" {...buildBlogIndexFinalCta()} />
      </main>
    </div>
  );
}
