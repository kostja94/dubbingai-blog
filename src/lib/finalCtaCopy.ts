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

/** Blog detail page CTA — tailored to article category */
export function buildBlogDetailCta(category: string): FinalCtaCopy {
  switch (category) {
    case "Voice Changer Tips":
      return {
        title: "Master Your Voice Changer Today",
        intro:
          "Apply these tips in real time — 500+ AI voices, soundboard, and sub-30 ms latency. Free for Windows and macOS.",
      };
    case "Voice Changer Review":
      return {
        title: "Try the Top-Rated AI Voice Changer",
        intro:
          "Compare features and download the voice changer trusted by millions of gamers and streamers.",
      };
    case "Sound Effect Tips":
      return {
        title: "Create Better Sound Effects Instantly",
        intro:
          "AI sound effect generator + real-time voice changer. Free desktop app with 3 daily generations.",
      };
    case "Soundboard Tips":
      return {
        title: "Build Your Ultimate Soundboard",
        intro:
          "100K+ community sounds, hotkey triggers, and a real-time AI voice changer — all in one free app.",
      };
    case "Voice Actors":
      return {
        title: "Discover More Character Voices",
        intro:
          "500+ AI-powered character voices with real-time modulation. Free to download and try.",
      };
    case "Vocal Remover Tips":
      return {
        title: "Get Professional Audio Tools for Free",
        intro:
          "AI vocal remover, instrumental extractor, and real-time voice changer — one free desktop app.",
      };
    default:
      return buildBlogIndexFinalCta();
  }
}
