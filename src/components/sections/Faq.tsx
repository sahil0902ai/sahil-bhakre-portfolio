'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';
import { usePortfolio } from '@context/PortfolioContext';

export function Faq() {
  const { faqData } = usePortfolio();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 px-6 max-w-4xl mx-auto border-t border-border-subtle/40">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-4 mb-16 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
          Friction Solvers
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-4 text-left"
      >
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className={`premium-card overflow-hidden transition-all ${
                isOpen ? 'border-accent-primary/40 bg-bg-surface/80' : ''
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="flex items-center justify-between w-full p-6 text-left font-semibold text-text-primary text-sm sm:text-base focus-ring"
              >
                <span>{item.question}</span>
                <span className="ml-4 shrink-0 p-1.5 rounded-full bg-bg-inset border border-border-subtle">
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-accent-primary" />
                  ) : (
                    <Plus className="h-4 w-4 text-text-secondary" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-subtle/30 mt-2 pt-4">
                  {item.answer}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
