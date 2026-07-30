'use client';

import { motion } from 'framer-motion';
import { Search, Brain, Palette, Code, ShieldCheck, Rocket, Zap, Headphones } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';

const processSteps = [
  { step: '01', title: 'Discovery & Audit', icon: Search, desc: 'We identify friction points, define business metrics, and map out system requirements.' },
  { step: '02', title: 'Architecture Research', icon: Brain, desc: 'Deep dive into APIs, vector search schemas, and database dependencies.' },
  { step: '03', title: 'UI/UX Prototype', icon: Palette, desc: 'High-contrast Figma wireframes, responsive tokens, and component flows.' },
  { step: '04', title: 'Production Engineering', icon: Code, desc: 'Writing Next.js 15 frontends, FastAPI async workers, and Zod validation rules.' },
  { step: '05', title: 'QA & Testing', icon: ShieldCheck, desc: 'Verifying sub-150ms table response speeds, stealth anti-scraping triggers, and type safety.' },
  { step: '06', title: 'Deployment', icon: Rocket, desc: 'Deploying edge-routed servers, setting up domain SSL, and configuring error alerts.' },
  { step: '07', title: 'Optimization', icon: Zap, desc: 'Lighthouse 100/100 audits, image compression, and search engine indexation.' },
  { step: '08', title: 'SLA Support', icon: Headphones, desc: '30-day post-launch monitoring, API maintenance, and model prompt updates.' },
];

export function Process() {
  return (
    <section id="process" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      {/* Header section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-3 sm:space-y-4 mb-10 sm:mb-16 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
          Execution Methodology
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] max-w-2xl">
          The 8-Stage Development Blueprint
        </h2>
      </motion.div>

      {/* Mobile Vertical Step Timeline View */}
      <div className="sm:hidden space-y-4 relative pl-4 border-l-2 border-accent-primary/20">
        {processSteps.map((s, idx) => {
          const IconComp = s.icon;

          return (
            <div key={idx} className="relative pl-4 space-y-1 text-left">
              <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-accent-primary border-2 border-bg-surface flex items-center justify-center" />
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-primary">
                <span>{s.step}</span>
                <span>•</span>
                <span className="text-text-primary">{s.title}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop Timeline Grid View (640px and above) */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {processSteps.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="p-6 premium-card premium-card-hover space-y-4 group"
            >
              <div className="flex items-center justify-between border-b border-border-subtle/30 pb-3">
                <span className="font-mono text-xs font-bold text-accent-primary">{s.step}</span>
                <div className="p-2 rounded bg-bg-inset border border-border-subtle text-text-secondary group-hover:text-accent-primary transition-colors">
                  <IconComp className="h-4 w-4" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
