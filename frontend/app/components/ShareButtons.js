"use client";

import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? url || window.location.href : "";
  const shareText = `Check out "${title}" on Productify!`;

  const shareTo = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: ignore */
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-text-muted dark:text-neutral-500 mr-1 font-medium">
        Share
      </span>

      <a
        href={shareTo.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white hover:bg-surface-card dark:hover:bg-neutral-800 transition-all duration-200"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a
        href={shareTo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white hover:bg-surface-card dark:hover:bg-neutral-800 transition-all duration-200"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <button
        onClick={copyLink}
        className="p-2 rounded-full text-text-muted dark:text-neutral-500 hover:text-text-primary dark:hover:text-white hover:bg-surface-card dark:hover:bg-neutral-800 transition-all duration-200 cursor-pointer"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
