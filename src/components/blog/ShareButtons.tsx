"use client";

import { useState } from "react";
import { Share2, Twitter, Linkedin, Facebook, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

const ShareButtons = ({ title, url, className }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

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
          setTimeout(() => setCopied(false), 2000);
        });
        return;
    }
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Share</span>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => handleShare("twitter")}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-all duration-200 hover:scale-105"
          title="Share to Twitter/X"
          aria-label="Share to Twitter/X"
        >
          <Twitter className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] transition-all duration-200 hover:scale-105"
          title="Share to LinkedIn"
          aria-label="Share to LinkedIn"
        >
          <Linkedin className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-all duration-200 hover:scale-105"
          title="Share to Facebook"
          aria-label="Share to Facebook"
        >
          <Facebook className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => handleShare("copy")}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-all duration-200 hover:scale-105"
          title="Copy link"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4.5 h-4.5 text-green-500" /> : <Copy className="w-4.5 h-4.5" />}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
