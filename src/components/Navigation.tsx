"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

type NavItem = { label: string; to: string };

const SITE = "https://dubbingai.io";

const games: NavItem[] = [
  { label: "Valorant", to: `${SITE}/voice-changer/valorant` },
  { label: "Fortnite", to: `${SITE}/voice-changer/fortnite` },
  { label: "CS2", to: `${SITE}/voice-changer/cs2` },
  { label: "Dota 2", to: `${SITE}/voice-changer/dota2` },
  { label: "League of Legends", to: `${SITE}/voice-changer/league-of-legends` },
  { label: "Apex Legends", to: `${SITE}/voice-changer/apex` },
  { label: "PUBG", to: `${SITE}/voice-changer/pubg` },
  { label: "Roblox", to: `${SITE}/voice-changer/roblox` },
];

const apps: NavItem[] = [
  { label: "Discord", to: `${SITE}/voice-changer/discord` },
  { label: "Zoom", to: `${SITE}/voice-changer/zoom` },
  { label: "WhatsApp", to: `${SITE}/voice-changer/whatsapp` },
  { label: "OBS Studio", to: `${SITE}/voice-changer/obs` },
  { label: "Steam", to: `${SITE}/voice-changer/steam` },
  { label: "VRChat", to: `${SITE}/voice-changer/vrchat` },
];

const useCases: NavItem[] = [
  { label: "Gaming", to: `${SITE}/use-cases/gaming` },
  { label: "Streaming", to: `${SITE}/use-cases/streaming` },
  { label: "VTubing", to: `${SITE}/use-cases/vtubing` },
  { label: "Privacy & Security", to: `${SITE}/use-cases/privacy-and-security` },
];

const soundboards: NavItem[] = [
  { label: "All Categories", to: `${SITE}/community-sounds` },
  { label: "Memes", to: `${SITE}/community-sounds/memes` },
  { label: "Anime", to: `${SITE}/community-sounds/anime` },
  { label: "Games", to: `${SITE}/community-sounds/games` },
  { label: "TikTok", to: `${SITE}/community-sounds/tiktok` },
  { label: "Movies", to: `${SITE}/community-sounds/movies` },
  { label: "Funny", to: `${SITE}/community-sounds/funny` },
  { label: "Music", to: `${SITE}/community-sounds/music` },
  { label: "SFX", to: `${SITE}/community-sounds/sfx` },
  { label: "Creepy", to: `${SITE}/community-sounds/creepy` },
];

const moreLinks: NavItem[] = [
  { label: "AI SFX Generator", to: `${SITE}/sound-effect-generator` },
  { label: "Dubbing Box", to: `${SITE}/dubbing-box` },
  { label: "Dubbing Headphones", to: `${SITE}/dubbing-headphones` },
  { label: "Supported Apps", to: `${SITE}/supported-apps` },
  { label: "Developer SDK", to: `${SITE}/sdk` },
  { label: "Affiliate Program", to: `${SITE}/affiliate` },
];

const triggerClass =
  "flex items-center gap-1 text-meta text-muted-foreground transition-colors hover:text-foreground";

const MegaLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <li key={href}>
    <a
      href={href}
      onClick={onClick}
      className="block rounded-md px-2 py-1.5 text-sm text-foreground/85 transition-colors hover:bg-muted hover:text-foreground"
    >
      {label}
    </a>
  </li>
);

const Column = ({ title, items, onClick }: { title: string; items: NavItem[]; onClick: () => void }) => (
  <div>
    <p className="mb-2 px-2 text-meta">{title}</p>
    <ul className="grid gap-px">
      {items.map((it) => (
        <MegaLink key={it.to} href={it.to} label={it.label} onClick={onClick} />
      ))}
    </ul>
  </div>
);

const FeaturedCard = ({
  to,
  title,
  body,
  cta,
  onClick,
}: {
  to: string;
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) => {
  const className =
    "grid content-between gap-2 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-3 transition-all hover:border-primary/60";
  const inner = (
    <>
      <div>
        <p className="text-h4 text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{body}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
        {cta} <ArrowRight className="h-3 w-3" />
      </span>
    </>
  );
  return (
    <a href={to} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {inner}
    </a>
  );
};

type MenuKey = "voice" | "soundboard" | "useCases" | "more";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const close = () => setOpenMenu(null);

  return (
    <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="content-container">
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <Image
              src="/logo.png"
              alt="Dubbing AI Logo"
              width={120}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {/* Voice Changer mega */}
            <div className="relative" onMouseEnter={() => setOpenMenu("voice")} onMouseLeave={close}>
              <button className={`${triggerClass} px-2.5 py-1.5`} aria-expanded={openMenu === "voice"}>
                Voice Changer
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "voice" ? "rotate-180" : ""}`} />
              </button>
              {openMenu === "voice" && (
                <div className="absolute left-0 top-full z-50 w-[44rem] pt-1">
                  <div className="grid grid-cols-[1fr_1fr_1.1fr] gap-4 rounded-xl border border-border bg-card/95 backdrop-blur-xl p-4 shadow-2xl">
                    <Column title="By Game" items={games} onClick={close} />
                    <Column title="By App" items={apps} onClick={close} />
                    <FeaturedCard
                      to="https://dubbingai.io/download-desktop"
                      title="Download for Free"
                      body="Real-time voice changer for Windows, Mac, iOS, Android."
                      cta="Download"
                      onClick={close}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Soundboard */}
            <div className="relative" onMouseEnter={() => setOpenMenu("soundboard")} onMouseLeave={close}>
              <button className={`${triggerClass} px-2.5 py-1.5`} aria-expanded={openMenu === "soundboard"}>
                Soundboard
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "soundboard" ? "rotate-180" : ""}`} />
              </button>
              {openMenu === "soundboard" && (
                <div className="absolute left-0 top-full z-50 w-[36rem] pt-1">
                  <div className="grid grid-cols-[1.4fr_1fr] gap-4 rounded-xl border border-border bg-card/95 backdrop-blur-xl p-4 shadow-2xl">
                    <Column title="Categories" items={soundboards} onClick={close} />
                    <FeaturedCard
                      to={`${SITE}/sound-effect-generator`}
                      title="Free SFX Generator"
                      body="Generate custom sound effects from text. 3 free daily."
                      cta="Try it free"
                      onClick={close}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Use Cases */}
            <div className="relative" onMouseEnter={() => setOpenMenu("useCases")} onMouseLeave={close}>
              <button className={`${triggerClass} px-2.5 py-1.5`} aria-expanded={openMenu === "useCases"}>
                Use Cases
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "useCases" ? "rotate-180" : ""}`} />
              </button>
              {openMenu === "useCases" && (
                <div className="absolute left-0 top-full z-50 w-[16rem] pt-1">
                  <div className="rounded-xl border border-border bg-card/95 backdrop-blur-xl p-3 shadow-2xl">
                    <Column title="Use Cases" items={useCases} onClick={close} />
                  </div>
                </div>
              )}
            </div>

            <a
              href={`${SITE}/pricing`}
              className="px-2.5 py-1.5 text-meta text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>

            {/* More */}
            <div className="relative" onMouseEnter={() => setOpenMenu("more")} onMouseLeave={close}>
              <button className={`${triggerClass} px-2.5 py-1.5`} aria-expanded={openMenu === "more"}>
                More
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "more" ? "rotate-180" : ""}`} />
              </button>
              {openMenu === "more" && (
                <div className="absolute left-0 top-full z-50 w-[16rem] pt-1">
                  <div className="rounded-xl border border-border bg-card/95 backdrop-blur-xl p-3 shadow-2xl">
                    <Column title="Explore" items={moreLinks} onClick={close} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild size="sm">
              <a href="https://dubbingai.io/download-desktop" target="_blank" rel="noopener noreferrer">Download</a>
            </Button>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden max-h-[calc(100vh-3rem)] overflow-y-auto py-4 border-t border-border/50">
            <div className="space-y-4">
              <a href={`${SITE}/pricing`} className="block px-1 text-sm font-medium text-foreground/90 hover:text-foreground">
                Pricing
              </a>
              {[
                { title: "Voice Changer · Games", items: games },
                { title: "Voice Changer · Apps", items: apps },
                { title: "Soundboard", items: soundboards },
                { title: "Use Cases", items: useCases },
                { title: "More", items: moreLinks },
              ].map((section) => (
                <div key={section.title}>
                  <p className="px-1 mb-1.5 text-meta">{section.title}</p>
                  <div className="grid gap-px">
                    {section.items.map((it) => (
                      <a
                        key={it.to}
                        href={it.to}
                        className="block rounded-md px-3 py-1.5 text-sm text-foreground/90 hover:bg-muted hover:text-foreground"
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              <Button asChild size="md" className="w-full">
                <a href="https://dubbingai.io/download-desktop" target="_blank" rel="noopener noreferrer">
                  Download for Free
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
