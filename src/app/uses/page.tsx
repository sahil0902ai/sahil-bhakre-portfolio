'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, Monitor, Keyboard, MousePointer, Armchair, Camera, Mic, 
  Code2, Puzzle, Sparkles, Cloud, PenTool, CheckCircle2, Star, Wrench 
} from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { usesData, usesCategories, UsesItem } from '@config/uses';

const CATEGORY_ICONS: Record<string, any> = {
  Laptop,
  Monitor,
  Keyboard,
  Mouse: MousePointer,
  Chair: Armchair,
  Camera,
  Microphone: Mic,
  IDE: Code2,
  Extensions: Puzzle,
  'AI Tools': Sparkles,
  Hosting: Cloud,
  'Design Tools': PenTool,
};

export default function UsesPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const filteredItems = usesData.filter((item) => {
    return selectedGroup === 'All' || item.group === selectedGroup;
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 text-left">
        
        {/* Page Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <Wrench className="h-4 w-4" /> Hardware, Software & Workspace Setup
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            What I Use Daily / Setup
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            A comprehensive list of the hardware, monitor setup, mechanical keyboard, ergonomics, IDE extensions, AI pair programmers, cloud hosting providers, and design software I rely on daily to engineer high-performance web applications.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 border-b border-border-subtle/40 pb-4 overflow-x-auto">
          {usesCategories.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 btn-micro ${
                selectedGroup === group
                  ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary shadow-sm'
                  : 'bg-bg-inset border border-border-subtle/50 text-text-muted hover:text-text-primary hover:bg-bg-surface'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* 12-Item Uses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const IconComponent = CATEGORY_ICONS[item.category] || Wrench;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 premium-card space-y-4 flex flex-col justify-between border-accent-primary/20 hover:border-accent-primary transition-all group text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-accent-primary uppercase tracking-wider font-semibold block">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {item.isDailyDriver && (
                      <span className="px-2 py-0.5 rounded bg-accent-success/10 border border-accent-success/20 text-[9px] font-mono text-accent-success font-semibold shrink-0">
                        Daily Driver
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.spec && (
                  <div className="pt-3 border-t border-border-subtle/30 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span>Specification</span>
                    <span className="text-accent-secondary font-semibold">{item.spec}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
