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

/** Return article-specific CTA from frontmatter, or fall back to generic. */
export function resolveArticleCta(
  ctaTitle: string | undefined,
  ctaIntro: string | undefined,
): FinalCtaCopy {
  if (ctaTitle) return { title: ctaTitle, intro: ctaIntro };
  return buildBlogIndexFinalCta();
}
