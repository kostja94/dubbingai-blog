"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "@/components/shared/JsonLd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
  origin?: string;
}

const Breadcrumbs = ({ items, origin = "https://dubbingai.io" }: Props) => {
  if (!items || items.length === 0) return null;

  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${origin}${c.href}` : undefined,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative border-b border-border bg-background"
    >
      <JsonLd data={schema} />
      <div className="content-container py-3">
        <Breadcrumb>
          <BreadcrumbList className="text-breadcrumb">
            {trail.map((c, i) => {
              const isLast = i === trail.length - 1;
              const isHome = i === 0;
              return (
                <Fragment key={`${c.label}-${i}`}>
                <BreadcrumbItem>
                  {isLast || !c.href ? (
                    <BreadcrumbPage className="text-breadcrumb inline-flex items-center gap-1" style={{ color: "hsl(var(--nav-default))" }}>
                      {isHome && <Home className="w-4 h-4" aria-hidden />}
                      {c.label}
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link href={c.href}
                          className="inline-flex items-center gap-1 text-breadcrumb transition-colors hover:!text-[hsl(var(--nav-default))]"
                        >
                          {isHome && <Home className="w-4 h-4" aria-hidden />}
                          {c.label}
                        </Link>
                      </BreadcrumbLink>
                    </>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" style={{ color: "hsl(var(--breadcrumb-default))" }} />
                  </BreadcrumbSeparator>
                )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
