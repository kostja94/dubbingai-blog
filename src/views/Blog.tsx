"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FinalCTASection from "@/components/shared/FinalCTASection";
import { buildBlogIndexFinalCta } from "@/lib/finalCtaCopy";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog";

type Props = { posts: BlogPost[] };

const PAGE_TITLE = "Dubbing AI Blog — Voice Changer Guides & Tips";
const PAGE_DESC =
  "Tutorials, comparisons and creative ideas for using Dubbing AI's real-time voice changer in games, streams, Discord and beyond.";

const PAGE_SIZE = 12;

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = "/placeholder.svg";
};

function CardSkeleton() {
  return (
    <div className="group block animate-pulse">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-5 w-full rounded bg-muted" />
        <div className="h-5 w-3/4 rounded bg-muted" />
        <div className="flex gap-3">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

const PostCard = ({ post }: { post: BlogPost }) => (
  <Link
    href={post.href}
    className="group block rounded-2xl border border-border bg-card/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
  >
    <div className="aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-muted/40">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        onError={handleImgError}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
    <div className="p-5 space-y-3">
      <span className="inline-block rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {post.category}
      </span>
      <h3 className="text-h6 text-foreground leading-snug group-hover:underline transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-3 pt-1 text-meta text-muted-foreground">
        <span>{post.date}</span>
        <span className="opacity-30">·</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </Link>
);

const FeatureHero = ({ post }: { post: BlogPost }) => (
  <Link href={post.href} className="group block">
    <div className="overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl hover:border-primary/20 hover:shadow-xl transition-all duration-300">
      <div className="grid md:grid-cols-[6fr_5fr]">
        <div className="aspect-[21/9] overflow-hidden bg-muted/40 md:aspect-auto md:min-h-[360px]">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="eager"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
          <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-primary">
            Latest
          </span>
          <h2 className="mt-4 text-h2 text-foreground leading-tight group-hover:underline transition-colors">
            {post.title}
          </h2>
          <p className="mt-4 text-lead text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
              D
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">{post.author}</p>
              <p className="text-meta inline-flex items-center gap-3 mt-0.5 text-muted-foreground">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const FeaturedGrid = ({ posts }: { posts: BlogPost[] }) => (
  <section className="border-b border-foreground/5">
    <div className="content-container section-py-sm">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-h4 text-foreground">Editor's picks</h2>
        <Link href="#archive" className="text-sm font-semibold text-primary hover:underline">
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={p.href}
            className="group flex flex-col sm:flex-row gap-5"
          >
            <div className="sm:w-40 flex-shrink-0 aspect-[4/3] overflow-hidden rounded-xl bg-muted/40">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                onError={handleImgError}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {p.date}
              </span>
              <h3 className="text-h6 text-foreground leading-snug group-hover:underline transition-colors line-clamp-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const FilterChips = ({
  categories,
  activeCategory,
  counts,
  onChange,
}: {
  categories: readonly string[];
  activeCategory: string;
  counts: Record<string, number>;
  onChange: (c: string) => void;
}) => (
  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
    {categories.map((c) => {
      const active = c === activeCategory;
      return (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            active
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {c === "All" ? "All" : c}
          <span
            className={`text-[11px] font-normal opacity-60 ${
              active ? "text-primary-foreground" : ""
            }`}
          >
            {counts[c] ?? 0}
          </span>
        </button>
      );
    })}
  </div>
);

const Blog = ({ posts: allPosts }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initQuery = searchParams.get("q") ?? "";
  const initCategory = (searchParams.get("category") ?? "All") as string;

  const [query, setQuery] = useState(initQuery);
  const [activeCategory, setActiveCategory] = useState<string>(initCategory);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [cardsReady, setCardsReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setCardsReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (activeCategory !== "All") params.set("category", activeCategory);
    const qs = params.toString();
    const newUrl = qs ? `/?${qs}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [query, activeCategory, router]);

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = { All: allPosts.length };
    for (const p of allPosts) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, [allPosts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = allPosts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    return list.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  }, [query, activeCategory, allPosts]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const [hero, ...rest] = allPosts;
  const editorsPicks = rest.slice(0, 4);

  const activeCategories = BLOG_CATEGORIES.filter(
    (c) => c === "All" || (categoryCounts[c] ?? 0) > 0,
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveCategory("All");
  }, []);

  const onCategoryChange = useCallback((c: string) => {
    setActiveCategory(c);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <main>
        {hero && (
          <section className="content-container pt-10 md:pt-16 pb-12 md:pb-20">
            <div className="mb-8">
              <h1 className="text-h1-article text-foreground">{PAGE_TITLE}</h1>
              <p className="mt-4 text-lead text-muted-foreground max-w-xl">{PAGE_DESC}</p>
            </div>
            <FeatureHero post={hero} />
          </section>
        )}

        {editorsPicks.length > 0 && <FeaturedGrid posts={editorsPicks} />}

        <div
          id="archive"
          className="content-container section-py-sm scroll-mt-20"
        >
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${allPosts.length} articles…`}
                  aria-label="Search articles"
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </p>
              {(query || activeCategory !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
                >
                  Clear filters
                </button>
              )}
            </div>
            <FilterChips
              categories={activeCategories}
              activeCategory={activeCategory}
              counts={categoryCounts}
              onChange={onCategoryChange}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/60">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
              <p className="text-h6 text-foreground mb-2">No articles found</p>
              <p className="text-meta text-muted-foreground mb-6">
                Try a different keyword or clear your filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {visible.map((p) =>
                  cardsReady ? (
                    <PostCard key={p.slug} post={p} />
                  ) : (
                    <CardSkeleton key={p.slug} />
                  ),
                )}
              </div>

              {hasMore && (
                <div className="mt-14 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    Load more articles
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <FinalCTASection id="blog" {...buildBlogIndexFinalCta()} />
      </main>
    </div>
  );
};

export default Blog;
