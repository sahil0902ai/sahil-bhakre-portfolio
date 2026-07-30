'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Clock,
  GitBranch,
  Gauge,
  MessageSquare,
  Cpu,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';

interface TrustPrinciple {
  id: string;
  icon: typeof ShieldCheck;
  title: string;
  category: string;
  description: string;
  keyPoints: string[];
  pillText: string;
  accentClass: string;
}

const trustPrinciples: TrustPrinciple[] = [
  {
    id: 'business-focus',
    icon: ShieldCheck,
    title: 'Business-Focused Approach',
    category: 'ROI Alignment',
    description: 'Every line of code maps directly to overhead reduction, onboarding velocity, or user conversion speed—never vanity tech specs.',
    keyPoints: [
      'Focus on verifiable revenue metrics',
      'No unnecessary tech stack over-engineering',
      'Strategic partnership from wireframe to launch',
    ],
    pillText: 'Outcome Driven',
    accentClass: 'text-accent-primary border-accent-primary/30',
  },
  {
    id: 'response-time',
    icon: Clock,
    title: 'Response Time & Availability',
    category: 'Communication SLA',
    description: 'Guaranteed rapid response window with daily asynchronous Slack updates, Loom walkthroughs, and clear milestone tracking.',
    keyPoints: [
      'Sub-4-hour response window (Mon-Fri)',
      'Daily async Loom video progress demos',
      'Transparent task board tracking',
    ],
    pillText: '< 4-Hour SLA',
    accentClass: 'text-accent-highlight border-accent-highlight/30',
  },
  {
    id: 'delivery-workflow',
    icon: GitBranch,
    title: 'Predictable Delivery Workflow',
    category: 'Execution Pipeline',
    description: 'Structured 4-stage execution model ensures zero scope surprises and on-time staging deployments.',
    keyPoints: [
      'Stage 1: Architecture Audit & DB Schema',
      'Stage 2: Interactive Figma Prototypes',
      'Stage 3: Type-Safe Production Code',
      'Stage 4: Staging Review & Hand-off',
    ],
    pillText: '4-Stage Pipeline',
    accentClass: 'text-accent-success border-accent-success/30',
  },
  {
    id: 'code-quality',
    icon: Lock,
    title: 'Strict Code Quality Principles',
    category: 'Maintainability',
    description: '100% strict TypeScript mode, zero implicit any types, Zod runtime data validation, and clean component modularity.',
    keyPoints: [
      'Strict TypeScript & Zod schema gates',
      'Self-healing async background workers',
      'Clean folder conventions & documentation',
    ],
    pillText: '100% Strict TS',
    accentClass: 'text-accent-primary border-accent-primary/30',
  },
  {
    id: 'performance-first',
    icon: Gauge,
    title: 'Performance-First Philosophy',
    category: 'Speed & UX',
    description: 'Sub-second page loading speeds, WebP image asset optimizations, and snappy sub-300ms micro-interactions.',
    keyPoints: [
      'Target 100/100 Google Lighthouse score',
      'Edge-routed Next.js Server Components',
      'Optimized sub-300ms Framer Motion springs',
    ],
    pillText: 'Sub-Second Speeds',
    accentClass: 'text-accent-highlight border-accent-highlight/30',
  },
  {
    id: 'communication-style',
    icon: MessageSquare,
    title: 'Direct Engineering Access',
    category: 'Transparency',
    description: 'No account managers or middleman games of telephone. You collaborate 1-on-1 directly with the engineer building your product.',
    keyPoints: [
      'Direct 1-on-1 Slack/Discord channel',
      'Clear, jargon-free technical explanations',
      'Real-time staging links for every feature',
    ],
    pillText: 'Direct Access',
    accentClass: 'text-accent-success border-accent-success/30',
  },
  {
    id: 'technologies-used',
    icon: Cpu,
    title: 'Battle-Tested Stack',
    category: 'Production Frameworks',
    description: 'Leveraging production-ready frameworks chosen for long-term stability, rapid execution speed, and scalability.',
    keyPoints: [
      'Next.js 15 & React 19 for Web Apps',
      'Python FastAPI & Playwright for AI/Automation',
      'PostgreSQL & SQLite for Data Storage',
    ],
    pillText: 'Production Ready',
    accentClass: 'text-accent-primary border-accent-primary/30',
  },
  {
    id: 'ip-ownership',
    icon: Zap,
    title: 'Complete Ownership & Confidentiality',
    category: 'Security',
    description: 'Full intellectual property transfer upon final delivery, signed Mutual NDAs, clean Git commits, and complete documentation.',
    keyPoints: [
      '100% IP code transfer upon completion',
      'Mutual NDA signed before kickoff',
      'Clean Git repository transfer with README docs',
    ],
    pillText: '100% IP Transfer',
    accentClass: 'text-accent-highlight border-accent-highlight/30',
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      {/* Background ambient radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Header section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-4 mb-16 text-left max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
          Execution Certainty
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
          Engineering Principles & Trust Standards
        </h2>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
          Transparent workflows, strict code quality, and predictable delivery timelines designed to give founders complete peace of mind.
        </p>
      </motion.div>

      {/* Trust Cards Grid */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
      >
        {trustPrinciples.map((item) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="p-6 premium-card premium-card-hover group flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top Bar: Icon & Pill */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary group-hover:text-accent-primary transition-colors">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-bg-inset border ${item.accentClass}`}>
                    {item.pillText}
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

              {/* Key Bullet Points */}
              <div className="pt-4 border-t border-border-subtle/30 space-y-2">
                {item.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-text-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-success shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
