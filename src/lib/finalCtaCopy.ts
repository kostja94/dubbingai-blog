import CTA_DATA from "@/data/cta-data.json";

export interface FinalCtaCopy {
  title: string;
  intro?: string;
}

/** Blog index page CTA — generic brand message */
export function buildBlogIndexFinalCta(): FinalCtaCopy {
  return {
    title: "Download the AI Voice Changer",
    intro:
      "500+ voices, 100K+ soundboard sounds, and sub-30 ms latency — free for Windows and macOS.",
  };
}

/** Resolve per-article CTA from cta-data.json. Falls back to generic. */
export function resolveArticleCta(slug: string): FinalCtaCopy {
  const entry = (CTA_DATA as Record<string, { ctaTitle: string; ctaIntro: string }>)[slug];
  if (entry?.ctaTitle) {
    return { title: entry.ctaTitle, intro: entry.ctaIntro };
  }
  return buildBlogIndexFinalCta();
}
