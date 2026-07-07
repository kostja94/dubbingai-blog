"use client";

import Image from "next/image";
import Link from "next/link";
import { Youtube, Twitter } from "lucide-react";

const SITE = "https://dubbingai.io";

const footerSections = [
  {
    title: "Voice Changer",
    links: [
      { name: "Valorant", to: `${SITE}/voice-changer/valorant` },
      { name: "Fortnite", to: `${SITE}/voice-changer/fortnite` },
      { name: "CS2", to: `${SITE}/voice-changer/cs2` },
      { name: "Dota 2", to: `${SITE}/voice-changer/dota2` },
      { name: "League of Legends", to: `${SITE}/voice-changer/league-of-legends` },
      { name: "Discord", to: `${SITE}/voice-changer/discord` },
      { name: "Zoom", to: `${SITE}/voice-changer/zoom` },
    ],
  },
  {
    title: "Soundboard",
    links: [
      { name: "All Categories", to: `${SITE}/community-sounds` },
      { name: "Memes", to: `${SITE}/community-sounds/memes` },
      { name: "Anime", to: `${SITE}/community-sounds/anime` },
      { name: "Games", to: `${SITE}/community-sounds/games` },
      { name: "TikTok", to: `${SITE}/community-sounds/tiktok` },
      { name: "AI SFX Generator", to: `${SITE}/sound-effect-generator` },
    ],
  },
  {
    title: "Use Cases",
    links: [
      { name: "Gaming", to: `${SITE}/use-cases/gaming` },
      { name: "Streaming", to: `${SITE}/use-cases/streaming` },
      { name: "VTubing", to: `${SITE}/use-cases/vtubing` },
      { name: "Privacy & Security", to: `${SITE}/use-cases/privacy-and-security` },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Pricing", to: `${SITE}/pricing` },
      { name: "Dubbing Box", to: `${SITE}/dubbing-box` },
      { name: "Supported Apps", to: `${SITE}/supported-apps` },
      { name: "Developer SDK", to: `${SITE}/sdk` },
      { name: "Affiliate Program", to: `${SITE}/affiliate` },
    ],
  },
];

const socials = [
  {
    label: "Discord",
    href: "https://discord.gg/dubbingaivc",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  { label: "YouTube", href: "https://www.youtube.com/@DUBBINGAIOFFICIAL", icon: <Youtube className="w-4 h-4" /> },
  { label: "Twitter", href: "https://twitter.com/Dubbing_AI_", icon: <Twitter className="w-4 h-4" /> },
];

const Footer = () => {
  return (
    <footer className="relative bg-secondary/40 border-t border-border/60">
      <div className="content-container py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Dubbing AI Logo"
                width={140}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-meta mt-3 max-w-xs">
              Free real-time AI voice changer with 500+ voices and a massive soundboard.
            </p>
            <ul className="mt-4 flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-9">
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <p className="text-caption mb-3">{section.title}</p>
                  <ul className="space-y-1.5">
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.name}`}>
                        <a
                          href={link.to}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-meta">
          <p>© {new Date().getFullYear()} Dubbing AI. All rights reserved.</p>
          <a href={`${SITE}/use-cases/privacy-and-security`} className="hover:text-foreground transition-colors">
            Privacy & Security
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
