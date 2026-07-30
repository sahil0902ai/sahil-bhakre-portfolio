'use client';

import { motion } from 'framer-motion';
import { Compass, Cpu, Workflow, ShieldCheck, ArrowRight, Code, Sparkles, BookOpen } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';
import { usePortfolio } from '@context/PortfolioContext';

export function About() {
  const { timelineData } = usePortfolio();

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* Left Column: Structural First-Person About (Max 180 Words) */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="lg:col-span-6 space-y-6 text-left"
        >
          <motion.div variants={fadeInUp} className="space-y-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
              About Me
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
              AI Engineer & Full-Stack Developer
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
            {/* 1. Who I am */}
            <p className="font-semibold text-text-primary">
              I am Sahil Bhakre, a B.Tech Data Science student and full-stack software developer based in India.
            </p>
            
            {/* 2. What I build */}
            <p>
              I build modern web applications, API backends, and automated data pipelines designed for reliability and speed.
            </p>

            {/* 3. Technologies I enjoy working with */}
            <p className="text-xs sm:text-sm font-mono text-accent-primary">
              <span className="text-text-muted">Technologies I work with:</span> Next.js 15, React 19, TypeScript, Python, FastAPI, Playwright, and PostgreSQL.
            </p>

            {/* 4. My approach to solving problems */}
            <p className="text-xs sm:text-sm">
              <strong className="text-text-primary">My Approach:</strong> I write clean, type-safe code that solves real operational bottlenecks without unnecessary complexity. I focus on maintainable architectures, fast initial page loads, and deterministic data workflows.
            </p>

            {/* 5. Current learning focus */}
            <p className="text-xs sm:text-sm text-text-muted">
              <strong className="text-text-secondary">Current Focus:</strong> Deepening my expertise in autonomous AI agent architectures, vector embeddings with pgvector, and serverless edge deployments.
            </p>
          </motion.div>

          {/* 6. Call to Action */}
          <motion.div variants={fadeInUp} className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-gradient text-text-primary text-xs font-bold shadow-glow btn-micro min-h-[48px]"
            >
              <span>Contact Me</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Key Focus Areas & Background */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="lg:col-span-6 space-y-6 text-left"
        >
          <motion.div variants={fadeInUp} className="space-y-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
              Engineering Focus
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Core Principles & Background
            </h3>
          </motion.div>

          {/* 4 Core Principles Cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl border border-border-subtle bg-bg-surface space-y-1.5">
              <div className="flex items-center gap-2 text-accent-primary">
                <Compass className="h-4 w-4" />
                <h3 className="font-bold text-text-primary text-xs font-mono">Clean Architecture</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Structuring code modules to be readable, testable, and easy to maintain over time.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border-subtle bg-bg-surface space-y-1.5">
              <div className="flex items-center gap-2 text-accent-highlight">
                <Cpu className="h-4 w-4" />
                <h3 className="font-bold text-text-primary text-xs font-mono">Process Automation</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Building reliable background scripts and APIs to automate repetitive manual tasks.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border-subtle bg-bg-surface space-y-1.5">
              <div className="flex items-center gap-2 text-accent-success">
                <Workflow className="h-4 w-4" />
                <h3 className="font-bold text-text-primary text-xs font-mono">Type Safety</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Using TypeScript and Pydantic schema validation to catch errors before code reaches production.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border-subtle bg-bg-surface space-y-1.5">
              <div className="flex items-center gap-2 text-text-primary">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="font-bold text-text-primary text-xs font-mono">Performance</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Optimizing frontend assets and SQL database queries to keep page load times fast.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3 pt-2">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-border-subtle/70 bg-bg-surface space-y-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-accent-primary">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted bg-bg-inset px-2 py-0.5 rounded-full border border-border-subtle/50">
                    {item.company}
                  </span>
                </div>
                <h4 className="font-bold text-text-primary text-xs sm:text-sm">
                  {item.role}
                </h4>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
