import type { KeyTakeawayItem } from "@/lib/blog-key-takeaways";

interface Props {
  items: KeyTakeawayItem[];
}

export default function KeyTakeaways({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden rounded-xl border border-border bg-card"
      aria-label="Key Takeaways"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" aria-hidden />

      <div className="pl-7 pr-6 py-6 md:pl-9 md:pr-8 md:py-7">
        {/* TL;DR badge */}
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/60 mb-3">
          TL;DR
        </span>

        {/* List */}
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-[15px] md:text-base leading-relaxed text-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" aria-hidden />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
