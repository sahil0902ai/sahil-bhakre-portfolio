'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Database, Brain, ChevronDown, Wrench, Shield, Cpu } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';
import { usePortfolio } from '@context/PortfolioContext';

const iconMap: Record<string, any> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  brain: Brain,
  cloud: Cpu,
  workflow: Wrench,
  penTool: Monitor,
  settings: Shield,
};

export function Technology() {
  const { technologyData } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>(technologyData[0]?.id || null);

  const toggleCategory = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="technology" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      {/* Header section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-3 sm:space-y-4 mb-10 sm:mb-16 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
          Infrastructure & Tech Stack
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] max-w-2xl">
          Modern Frameworks & Production Libraries
        </h2>
      </motion.div>

      {/* Mobile Accordion View (Under 640px) */}
      <div className="sm:hidden space-y-3">
        {technologyData.map((cat) => {
          const IconComponent = iconMap[cat.iconName] || Server;
          const isExpanded = expandedId === cat.id;

          return (
            <div
              key={cat.id}
              className="rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full p-4 flex items-center justify-between text-left min-h-[52px] focus-ring"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-bg-inset border border-border-subtle text-accent-primary">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-text-primary text-sm">
                    {cat.name}
                  </h3>
                </div>
                <ChevronDown className={`h-4 w-4 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180 text-accent-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 pt-0 border-t border-border-subtle/30 space-y-2"
                  >
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center px-3 py-2 rounded-xl border border-border-subtle/60 bg-bg-inset text-xs text-text-secondary font-mono"
                        >
                          <span className="font-bold text-text-primary">{item.name}</span>
                          <span className="text-[9px] text-text-muted border-l border-border-subtle/60 pl-1.5 ml-1.5 uppercase">
                            {item.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Desktop Grid View (640px and above) */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {technologyData.map((cat) => {
          const IconComponent = iconMap[cat.iconName] || Server;
          return (
            <motion.div
              key={cat.id}
              variants={fadeInUp}
              className={`p-6 premium-card premium-card-hover group flex flex-col justify-between ${cat.accentColor}`}
            >
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-border-subtle/30 pb-3">
                  <div className="p-2 rounded bg-bg-inset border border-border-subtle text-text-primary group-hover:text-accent-primary transition-colors">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-text-primary text-base">
                    {cat.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-inset text-xs text-text-secondary hover:text-text-primary hover:border-text-primary/40 transition-colors select-none"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="font-mono text-[9px] text-text-muted border-l border-border-subtle/60 pl-1.5 ml-1.5 uppercase">
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
