'use client';

import { motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold flex items-center justify-center gap-1.5">
          <MessageSquare className="h-4 w-4" /> Client & Team Collaborations
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
          Client Feedback & Reviews
        </h2>

        {/* Intentional Polished Empty State Box */}
        <div className="p-8 sm:p-12 rounded-3xl border border-border-subtle bg-bg-surface/80 backdrop-blur-xl shadow-2xl space-y-6 text-center">
          <ShieldCheck className="h-10 w-10 text-accent-primary mx-auto" />

          <p className="text-lg sm:text-xl text-text-primary font-medium leading-relaxed max-w-2xl mx-auto">
            Client feedback will appear here after completed projects.
          </p>

          <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
            Currently accepting select engineering contracts for AI automation, web applications, and UI development.
          </p>

          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-gradient text-text-primary text-xs font-bold shadow-glow btn-micro min-h-[48px]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
