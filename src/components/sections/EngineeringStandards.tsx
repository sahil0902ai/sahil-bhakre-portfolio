'use client';

import { motion } from 'framer-motion';
import {
  Gauge,
  Eye,
  Search,
  ShieldCheck,
  Smartphone,
  Code,
  Layers,
  Check,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';

interface EngineeringStandardItem {
  id: string;
  icon: typeof Gauge;
  title: string;
  category: string;
  targetIndicator: string;
  description: string;
  qualityTags: string[];
  accentClass: string;
}

const engineeringStandardsData: EngineeringStandardItem[] = [
  {
    id: 'performance',
    icon: Gauge,
    title: 'Performance & Load Speed',
    category: 'Speed & Optimization',
    targetIndicator: 'Lighthouse Target > 95',
    description: 'Edge-routed Server Side Rendering, Next.js image optimization, sub-300ms spring animations, and minimal JavaScript bundle sizes.',
    qualityTags: ['Sub-Second Initial Load', 'Edge SSR Routing', 'Bundle Optimization'],
    accentClass: 'text-accent-primary border-accent-primary/30',
  },
  {
    id: 'accessibility',
    icon: Eye,
    title: 'Inclusive Accessibility',
    category: 'A11y & Usability',
    targetIndicator: 'WCAG 2.1 AA Compliant',
    description: 'Accessible focus rings, screen-reader ARIA attributes, keyboard navigation, and high-contrast color ratios across themes.',
    qualityTags: ['WCAG Compliant', 'Keyboard Navigable', 'ARIA Attributes'],
    accentClass: 'text-accent-highlight border-accent-highlight/30',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'Search Engine Optimization',
    category: 'Discoverability',
    targetIndicator: 'Semantic HTML & OpenGraph',
    description: 'Structured HTML5 headings, descriptive meta tags, dynamic OpenGraph preview cards, and automated sitemap indexing.',
    qualityTags: ['Semantic HTML', 'Automated Sitemap', 'Structured Meta Tags'],
    accentClass: 'text-accent-success border-accent-success/30',
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Security & Data Integrity',
    category: 'Protection & Safety',
    targetIndicator: 'Zod Runtime Validation',
    description: 'Strict runtime input sanitization with Zod schemas, CORS configuration, HTTPS SSL encryption, and environment secret isolation.',
    qualityTags: ['Zod Schema Validation', 'HTTPS Transport', 'Input Sanitization'],
    accentClass: 'text-accent-primary border-accent-primary/30',
  },
  {
    id: 'responsive',
    icon: Smartphone,
    title: 'Adaptive Responsive Design',
    category: 'Layout & Breakpoints',
    targetIndicator: 'Mobile-First Fluid Layouts',
    description: 'Responsive clamp font scaling, touch-friendly button targets (44px min), fluid flexbox/grid containers across mobile, tablet, and desktop.',
    qualityTags: ['Fluid Typography', 'Touch Targets', 'Cross-Device Tested'],
    accentClass: 'text-accent-highlight border-accent-highlight/30',
  },
  {
    id: 'maintainability',
    icon: Code,
    title: 'Codebase Maintainability',
    category: 'Code Quality',
    targetIndicator: 'Type-Safe Architecture',
    description: '100% strict TypeScript mode, decoupled component patterns, consistent naming conventions, and self-documenting codebases.',
    qualityTags: ['Type-Safe Architecture', 'Reusable Components', 'Strict Type Checking'],
    accentClass: 'text-accent-success border-accent-success/30',
  },
  {
    id: 'scalability',
    icon: Layers,
    title: 'System Scalability',
    category: 'Architecture',
    targetIndicator: 'API-First & Decoupled State',
    description: 'Decoupled REST & FastAPI backends, serverless edge function execution, SQLite WAL mode, and modular React Context providers.',
    qualityTags: ['API-First Design', 'Decoupled Architecture', 'Modular State Providers'],
    accentClass: 'text-accent-primary border-accent-primary/30',
  },
];

export function EngineeringStandards() {
  return (
    <section id="standards" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      {/* Header section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-4 mb-16 text-left max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
          Technical Rigor
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
          Engineering Standards & Quality Criteria
        </h2>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
          Concrete benchmarks and design guidelines enforced across every software release to guarantee stability, security, and speed.
        </p>
      </motion.div>

      {/* Standards Cards Grid */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
      >
        {engineeringStandardsData.map((item) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="p-6 premium-card premium-card-hover group flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header: Icon & Indicator Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary group-hover:text-accent-primary transition-colors">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className={`font-mono text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-bg-inset border ${item.accentClass}`}>
                    {item.targetIndicator}
                  </span>
                </div>

                {/* Title & Category */}
                <div>
                  <h3 className="font-bold text-text-primary text-base sm:text-lg group-hover:text-accent-primary transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mt-0.5">
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Quality Tags */}
              <div className="pt-4 border-t border-border-subtle/30 flex flex-wrap gap-2">
                {item.qualityTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-inset border border-border-subtle/60 text-[10px] font-mono text-text-secondary select-none"
                  >
                    <Check className="h-3 w-3 text-accent-success shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
