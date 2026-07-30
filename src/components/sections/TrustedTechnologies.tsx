'use client';

import { motion } from 'framer-motion';

const techLogos = [
  'NEXT.JS 15',
  'PYTHON FASTAPI',
  'REACT 19',
  'TYPESCRIPT',
  'LANGCHAIN',
  'PLAYWRIGHT',
  'POSTGRESQL',
  'TAILWIND CSS',
  'OPENAI API',
  'DOCKER',
];

export function TrustedTechnologies() {
  return (
    <div className="w-full py-8 border-y border-border-subtle/30 bg-bg-surface/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-3 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Core Technologies & Production Frameworks
        </span>
      </div>
      <div className="flex w-[200%] gap-12 animate-marquee-horizontal">
        {Array.from({ length: 2 }).map((_, loopIdx) => (
          <div key={loopIdx} className="flex w-1/2 justify-around items-center gap-8 min-w-[600px]">
            {techLogos.map((logo, idx) => (
              <span
                key={`${loopIdx}-${idx}`}
                className="font-mono text-xs font-bold tracking-wider text-text-secondary/50 uppercase hover:text-accent-primary transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
