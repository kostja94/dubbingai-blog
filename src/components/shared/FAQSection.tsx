"use client";

import JsonLd from "@/components/shared/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  id: string;
  faqs: FaqItem[];
  title?: string;
  intro?: string;
  background?: "default" | "muted" | "transparent";
  theme?: "default" | "dark";
  max?: number;
  jsonLd?: boolean;
}

const bgClass = {
  default: "bg-background",
  muted: "bg-muted/30",
  transparent: "",
} as const;

const FAQSection = ({
  id,
  faqs,
  title = "Frequently asked questions",
  intro,
  background = "muted",
  theme = "default",
  max,
  jsonLd = true,
}: Props) => {
  const items = max ? faqs.slice(0, max) : faqs;
  if (!items || items.length === 0) return null;

  const isDark = theme === "dark";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const sectionClass = isDark
    ? "py-14 md:py-20 bg-black border-t border-white/5"
    : `py-10 md:py-12 ${bgClass[background]}`;

  return (
    <section className={sectionClass}>
      {jsonLd && <JsonLd data={faqSchema} id={`faq-schema-${id}`} />}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("mb-8", isDark && "mb-8")}>
          <h2
            className={cn(
              isDark
                ? "dh-display uppercase text-white leading-[0.95]"
                : "text-h2 text-foreground",
            )}
            style={
              isDark
                ? { fontSize: "clamp(32px, 4vw, 52px)" }
                : undefined
            }
          >
            {title}
          </h2>
          {intro && (
            <p className={cn("text-lead mt-3", isDark && "text-white/60")}>
              {intro}
            </p>
          )}
        </div>

        <Accordion
          type="single"
          collapsible
          className={cn(
            "border-t",
            isDark ? "border-white/10" : "border-border",
          )}
        >
          {items.map((faq, index) => (
            <AccordionItem
              key={`${id}-${index}`}
              value={`${id}-item-${index}`}
              className={cn(
                "border-b",
                isDark ? "border-white/10" : "border-border",
              )}
            >
              <AccordionTrigger
                className={cn(
                  "text-left text-h6 hover:no-underline py-5",
                  isDark
                    ? "text-white hover:text-white/80"
                    : "text-foreground hover:text-foreground/80",
                )}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "leading-relaxed pb-5 pr-12",
                  isDark ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
