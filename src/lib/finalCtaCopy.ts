export interface FinalCtaCopy {
  title: string;
  intro?: string;
}

export function buildBlogIndexFinalCta(): FinalCtaCopy {
  return {
    title: "Download the AI Voice Changer",
    intro:
      "500+ voices, 100K+ soundboard sounds, and sub-30 ms latency — free for Windows and macOS.",
  };
}
