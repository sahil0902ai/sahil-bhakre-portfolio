'use client';

import { motion } from 'framer-motion';
import { Globe, Brain, Layout, CheckCircle2, ArrowRight, UserCheck, Cpu, Workflow, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';
import { usePortfolio } from '@context/PortfolioContext';

const iconMap: Record<string, any> = {
  globe: Globe,
  layout: Layout,
  brain: Brain,
  cpu: Cpu,
  workflow: Workflow,
  zap: Zap,
};

export function Services() {
  const { servicesData } = usePortfolio();

  return (
    <section id="capabilities" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      {/* Header section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-3 sm:space-y-4 mb-12 sm:mb-16 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
          Services
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] max-w-2xl">
          Core Engineering & Automation Services
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm max-w-lg">
          Building modern web applications, AI solutions, and intelligent automation systems tailored to business goals.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {servicesData.map((service) => {
          const IconComponent = iconMap[service.iconName] || Globe;
          return (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className={`flex flex-col justify-between p-6 sm:p-8 premium-card premium-card-hover group text-left ${service.accentClass}`}
            >
              <div className="space-y-5">
                {/* Icon */}
                <div className="p-3 w-fit rounded-xl bg-bg-inset border border-border-subtle/50 group-hover:border-text-primary/30 transition-colors">
                  <IconComponent className="h-6 w-6 text-text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* One-Line Description */}
                <p className="text-xs text-text-secondary leading-relaxed font-normal">
                  {service.oneLiner}
                </p>

                {/* Ideal For Block */}
                <div className="p-3 rounded-xl bg-bg-inset border border-border-subtle/40 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent-primary font-bold">
                    <UserCheck className="h-3 w-3" />
                    <span>Ideal For</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {service.idealFor}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2 pt-2 border-t border-border-subtle/30">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block font-bold">
                    Deliverables
                  </span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-success shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle/30 font-mono text-[10px]">
                  {service.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-bg-inset border border-border-subtle/60 text-accent-primary font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-text-primary/40 text-xs font-semibold transition-all min-h-[48px]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
