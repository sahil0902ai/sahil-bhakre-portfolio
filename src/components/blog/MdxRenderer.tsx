'use client';

import { useState } from 'react';
import { Check, Copy, Code2 } from 'lucide-react';

interface MdxRendererProps {
  content: string;
}

export function MdxRenderer({ content }: MdxRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, idx: number) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  // Process MDX string into structured render blocks
  const blocks = content.split('\n\n');

  return (
    <div className="prose-readable space-y-6 text-left text-text-secondary text-sm sm:text-base leading-relaxed">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // 1. Code Block
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const firstLine = lines[0];
          const language = firstLine.replace('```', '') || 'code';
          const codeString = lines.slice(1, -1).join('\n');

          return (
            <div key={idx} className="relative rounded-xl border border-border-subtle bg-bg-inset overflow-hidden my-6 shadow-xl">
              <div className="flex items-center justify-between px-4 py-2 bg-bg-surface border-b border-border-subtle/50 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-1.5 font-semibold text-accent-primary">
                  <Code2 className="h-3.5 w-3.5" />
                  {language}
                </span>
                <button
                  onClick={() => handleCopyCode(codeString, idx)}
                  className="inline-flex items-center gap-1 text-[11px] hover:text-text-primary transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-accent-success" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 overflow-x-auto font-mono text-xs text-text-primary leading-relaxed">
                <code>{codeString}</code>
              </pre>
            </div>
          );
        }

        // 2. Heading 2 (## Heading {#id})
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace('## ', '');
          const idMatch = headingText.match(/\{#([^}]+)\}/);
          const cleanText = headingText.replace(/\{#([^}]+)\}/, '').trim();
          const id = idMatch ? idMatch[1] : cleanText.toLowerCase().replace(/\s+/g, '-');

          return (
            <h2 key={idx} id={id} className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary pt-6 border-t border-border-subtle/40">
              {cleanText}
            </h2>
          );
        }

        // 3. Unordered List Items
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n');
          return (
            <ul key={idx} className="space-y-2 pl-4">
              {items.map((it, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-primary mt-2 shrink-0" />
                  <span>{it.replace('- ', '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        // 4. Standard Paragraph
        return (
          <p key={idx} className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
