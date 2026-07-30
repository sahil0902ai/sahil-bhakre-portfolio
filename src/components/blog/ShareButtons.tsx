'use client';

import { useState } from 'react';
import { Share2, Check, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3 pt-6 border-t border-border-subtle/50">
      <span className="font-mono text-xs text-text-muted flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5 text-accent-primary" />
        Share Article:
      </span>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full border border-border-subtle bg-bg-inset text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors btn-micro"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full border border-border-subtle bg-bg-inset text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors btn-micro"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>

      <button
        onClick={handleCopy}
        className="p-2 rounded-full border border-border-subtle bg-bg-inset text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors btn-micro"
        aria-label="Copy Link"
      >
        {copied ? <Check className="h-4 w-4 text-accent-success" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
