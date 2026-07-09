const KT_HEADING_RE = /^##\s+Key Takeaways?\s*$/m;

export interface KeyTakeawayItem {
  text: string;
}

export function extractKeyTakeaways(content: string): {
  takeaways: KeyTakeawayItem[];
  body: string;
} {
  const match = KT_HEADING_RE.exec(content);
  if (!match) return { takeaways: [], body: content };

  const headingEnd = match.index + match[0].length;
  const beforeKt = content.slice(0, match.index).trimEnd();
  const afterHeading = content.slice(headingEnd).trimStart();

  const nextH2Idx = afterHeading.search(/^## /m);
  const ktSection =
    nextH2Idx === -1 ? afterHeading : afterHeading.slice(0, nextH2Idx).trimEnd();
  const afterKt = nextH2Idx === -1 ? "" : afterHeading.slice(nextH2Idx);

  const items: KeyTakeawayItem[] = [];
  for (const line of ktSection.split("\n")) {
    const trimmed = line.trim();
    // Match lines like "* text", "- text", "  * text"
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const text = trimmed.slice(2).trim();
      if (text) items.push({ text });
    }
  }

  if (afterKt) {
    return { takeaways: items, body: beforeKt + "\n\n" + afterKt };
  }
  return { takeaways: items, body: beforeKt };
}
