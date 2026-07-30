'use client';

import { TocItem } from '@config/blog';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl border border-border-subtle bg-bg-surface/50 backdrop-blur-md space-y-4 text-left">
      <div className="flex items-center gap-2 pb-3 border-b border-border-subtle/50 text-accent-primary">
        <List className="h-4 w-4" />
        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-text-primary">
          Table of Contents
        </h4>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-xs font-mono text-text-secondary hover:text-accent-primary transition-colors py-1 pl-2 border-l border-border-subtle/50 hover:border-accent-primary"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
