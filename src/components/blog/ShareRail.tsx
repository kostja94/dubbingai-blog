"use client";

import { useState } from "react";
import { Twitter, Linkedin, Facebook, Copy, Check } from "lucide-react";

interface ShareRailProps {
  url: string;
  title: string;
}

const ShareRail = ({ url, title }: ShareRailProps) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
        return;
    }
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const btnClass =
    "h-9 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors";

  return (
    <div>
      <p className="text-meta text-muted-foreground mb-3">Share</p>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => handleShare("twitter")} className={btnClass} title="Share to Twitter/X" aria-label="Share to Twitter/X">
          <Twitter className="w-4 h-4" />
        </button>
        <button onClick={() => handleShare("linkedin")} className={btnClass} title="Share to LinkedIn" aria-label="Share to LinkedIn">
          <Linkedin className="w-4 h-4" />
        </button>
        <button onClick={() => handleShare("facebook")} className={btnClass} title="Share to Facebook" aria-label="Share to Facebook">
          <Facebook className="w-4 h-4" />
        </button>
        <button onClick={() => handleShare("copy")} className={btnClass} title="Copy link" aria-label="Copy link">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default ShareRail;
