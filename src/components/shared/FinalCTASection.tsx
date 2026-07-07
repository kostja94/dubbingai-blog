import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DOWNLOAD_CTA } from "@/lib/download";

interface FinalCTAProps {
  id: string;
  title: string;
  description?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: string;
}

const FinalCTASection = ({
  id,
  title,
  description,
  ctaLabel,
  ctaHref,
  intro,
}: FinalCTAProps) => {
  const label = ctaLabel ?? DOWNLOAD_CTA.label;
  const href = ctaHref ?? DOWNLOAD_CTA.href;
  const desc = description ?? intro;

  return (
    <section
      className="py-10 md:py-14 bg-gradient-to-br from-primary/10 to-background border-t border-border"
      aria-labelledby={`final-cta-${id}`}
    >
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 id={`final-cta-${id}`} className="text-h2 text-foreground">
              {title}
            </h2>
            {desc && (
              <p className="text-lead text-muted-foreground mt-2 max-w-2xl">
                {desc}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
