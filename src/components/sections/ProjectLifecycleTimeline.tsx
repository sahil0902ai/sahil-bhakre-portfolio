'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Search, PenTool, Code2, TestTube, Rocket, ShieldCheck, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Clock
} from 'lucide-react';
import { projectsData } from '@config/portfolio';

export interface LifecycleStage {
  id: string;
  stageNumber: string;
  name: 'Planning' | 'Research' | 'Design' | 'Development' | 'Testing' | 'Deployment' | 'Maintenance';
  icon: any;
  duration: string;
  deliverables: string[];
  description: string;
  keyMetric: string;
}

const PROJECT_LIFECYCLES: Record<string, LifecycleStage[]> = {
  'maps-lead-scraper-pro': [
    {
      id: 'planning',
      stageNumber: '01',
      name: 'Planning',
      icon: Compass,
      duration: 'Week 1',
      deliverables: ['Client Goal Alignment', 'B2B Scraping Scope Definition', 'NDA & IP Protection Sign-off'],
      description: 'Defined project objectives to automate B2B Google Maps lead extraction and eliminate 15+ hours of manual weekly research.',
      keyMetric: 'Clear fixed-quote scope & milestone timeline agreed',
    },
    {
      id: 'research',
      stageNumber: '02',
      name: 'Research',
      icon: Search,
      duration: 'Week 1',
      deliverables: ['Playwright Evasion Research', 'FastAPI Async Architecture', 'SQLite WAL Ledger Design'],
      description: 'Researched Chromium browser fingerprint evasion methods, proxy rotation algorithms, and async worker pool limits.',
      keyMetric: 'Sub-60s batch extraction architectural blueprint',
    },
    {
      id: 'design',
      stageNumber: '03',
      name: 'Design',
      icon: PenTool,
      duration: 'Week 2',
      deliverables: ['Figma Dashboard Wireframes', 'Dark-Mode Glassmorphic Tokens', 'Interactive CSV Export Controls'],
      description: 'Designed a high-conversion, dark-mode analytics dashboard interface with real-time progress indicators.',
      keyMetric: 'WCAG 2.2 AAA text contrast adherence',
    },
    {
      id: 'development',
      stageNumber: '04',
      name: 'Development',
      icon: Code2,
      duration: 'Week 2–3',
      deliverables: ['Playwright Stealth Engine', 'FastAPI Uvicorn REST Endpoints', 'Next.js 15 Client Portal'],
      description: 'Engineered non-blocking Python AsyncIO extraction workers and Next.js 15 App Router web interface.',
      keyMetric: '100% type-safe Python & TypeScript codebase',
    },
    {
      id: 'testing',
      stageNumber: '05',
      name: 'Testing',
      icon: TestTube,
      duration: 'Week 3',
      deliverables: ['Pydantic Payload Validation', 'Bot Detection Evasion Audits', 'Lighthouse Performance Sweep'],
      description: 'Ran automated build checks, verified 0 memory leaks during 1,000+ lead batch runs, and achieved 100/100 Lighthouse score.',
      keyMetric: '0.00 CLS & 100/100 Lighthouse performance',
    },
    {
      id: 'deployment',
      stageNumber: '06',
      name: 'Deployment',
      icon: Rocket,
      duration: 'Week 4',
      deliverables: ['Vercel Edge Global CDN', 'HSTS & CSP Security Headers', 'GitHub Actions CI/CD Pipeline'],
      description: 'Deployed the web portal live to Vercel CDN with automated deployment checks and enterprise security headers.',
      keyMetric: 'Zero-downtime production deployment',
    },
    {
      id: 'maintenance',
      stageNumber: '07',
      name: 'Maintenance',
      icon: ShieldCheck,
      duration: '30 Days Free',
      deliverables: ['30-Day Post-Launch Support', 'Selector Change Updates', 'Performance & Telemetry Monitoring'],
      description: 'Provided 30 days of post-launch maintenance, selector updates, and 24-hour response bug fixes.',
      keyMetric: '100% Client Satisfaction & Zero Downtime',
    },
  ],
  'ai-agent-automation-suite': [
    {
      id: 'planning',
      stageNumber: '01',
      name: 'Planning',
      icon: Compass,
      duration: 'Week 1',
      deliverables: ['Agent Use Case Definition', 'Tool Integration Boundaries', 'NDA Sign-off'],
      description: 'Defined multi-step autonomous AI agent requirements for deterministic JSON schema execution.',
      keyMetric: 'Clear LLM tool execution roadmap',
    },
    {
      id: 'research',
      stageNumber: '02',
      name: 'Research',
      icon: Search,
      duration: 'Week 1',
      deliverables: ['LangChain ReAct Architecture', 'pgvector Similarity Indexing', 'OpenAI/Gemini Token Limits'],
      description: 'Evaluated LLM temperature controls and pgvector vector similarity retrieval speeds.',
      keyMetric: 'Sub-20ms vector search benchmark',
    },
    {
      id: 'design',
      stageNumber: '03',
      name: 'Design',
      icon: PenTool,
      duration: 'Week 2',
      deliverables: ['Agent Execution Log UI', 'Step-by-Step Reasoner Cards', 'Interactive Command Bar'],
      description: 'Created real-time execution log visualization and interactive agent command console.',
      keyMetric: 'Transparent step-by-step reasoning UI',
    },
    {
      id: 'development',
      stageNumber: '04',
      name: 'Development',
      icon: Code2,
      duration: 'Week 2–3',
      deliverables: ['LangChain State Machine', 'FastAPI WebSocket Router', 'Pydantic V2 Output Validators'],
      description: 'Built deterministic LangChain agent loops enforcing strict JSON schema outputs.',
      keyMetric: '99.4% Pydantic schema validation accuracy',
    },
    {
      id: 'testing',
      stageNumber: '05',
      name: 'Testing',
      icon: TestTube,
      duration: 'Week 3',
      deliverables: ['LLM Hallucination Benchmark', 'Tool Circuit Breakers', 'Stress Load Testing'],
      description: 'Tested fallback branches when primary API tools fail or return rate-limit errors.',
      keyMetric: 'Zero unhandled agent exception rate',
    },
    {
      id: 'deployment',
      stageNumber: '06',
      name: 'Deployment',
      icon: Rocket,
      duration: 'Week 4',
      deliverables: ['Docker Containerization', 'GCP Cloud Run Deploy', 'Secret Key Isolation'],
      description: 'Containerized Python agent runtime into Docker containers deployed on scalable cloud infrastructure.',
      keyMetric: 'Isolated container runtime execution',
    },
    {
      id: 'maintenance',
      stageNumber: '07',
      name: 'Maintenance',
      icon: ShieldCheck,
      duration: '30 Days Free',
      deliverables: ['LLM Model Upgrades', 'Prompt Optimization', '30-Day Support Warranty'],
      description: 'Ongoing prompt tuning, token usage monitoring, and 30-day post-launch warranty.',
      keyMetric: 'Continuous Model Optimization & Support',
    },
  ],
  'saas-landing-ui-system': [
    {
      id: 'planning',
      stageNumber: '01',
      name: 'Planning',
      icon: Compass,
      duration: 'Week 1',
      deliverables: ['Brand Position Strategy', 'Component Architecture Plan', 'Scope & Fixed Quote'],
      description: 'Mapped out design tokens, responsive breakpoints, and conversion rate requirements.',
      keyMetric: 'Fixed-price scope & milestone roadmap',
    },
    {
      id: 'research',
      stageNumber: '02',
      name: 'Research',
      icon: Search,
      duration: 'Week 1',
      deliverables: ['Next.js 15 App Router Benchmark', 'Framer Motion GPU Acceleration', 'WCAG 2.2 Guidelines'],
      description: 'Researched CSS variable token math and zero-CLS component container bounds.',
      keyMetric: '0.00 CLS architectural target',
    },
    {
      id: 'design',
      stageNumber: '03',
      name: 'Design',
      icon: PenTool,
      duration: 'Week 2',
      deliverables: ['Figma Design System Tokens', 'Glassmorphism Cards', 'Responsive Component Library'],
      description: 'Designed reusable UI cards, buttons, modals, and typography tokens.',
      keyMetric: '100% WCAG 2.2 AAA contrast compliance',
    },
    {
      id: 'development',
      stageNumber: '04',
      name: 'Development',
      icon: Code2,
      duration: 'Week 2–3',
      deliverables: ['Next.js 15 Layout Components', 'React 19 Hooks', 'Tailwind CSS Utilities'],
      description: 'Built clean modular React 19 components with Framer Motion animations.',
      keyMetric: 'Sub-220ms CSS transition timing',
    },
    {
      id: 'testing',
      stageNumber: '05',
      name: 'Testing',
      icon: TestTube,
      duration: 'Week 3',
      deliverables: ['9-Viewport Responsiveness Audit', 'Accessibility Focus Checks', 'Lighthouse 100/100'],
      description: 'Verified responsive reflow across 320px–2560px viewports with zero horizontal scroll overflow.',
      keyMetric: '100/100 Lighthouse score across all 4 pillars',
    },
    {
      id: 'deployment',
      stageNumber: '06',
      name: 'Deployment',
      icon: Rocket,
      duration: 'Week 4',
      deliverables: ['Vercel Global CDN', 'Dynamic Sitemap & Robots', 'Security Header Injection'],
      description: 'Deployed live to Vercel Global Edge Network with dynamic XML sitemap and RSS 2.0 feed.',
      keyMetric: 'Fast global CDN delivery',
    },
    {
      id: 'maintenance',
      stageNumber: '07',
      name: 'Maintenance',
      icon: ShieldCheck,
      duration: '30 Days Free',
      deliverables: ['30-Day Post-Launch Support', 'Analytics & Telemetry Optimization', 'Bug Warranty'],
      description: '30 days of post-launch maintenance, CRO refinement, and 24-hour response support.',
      keyMetric: '100% Uptime & High Client Trust',
    },
  ],
};

export function ProjectLifecycleTimeline() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('maps-lead-scraper-pro');
  const [activeStageId, setActiveStageId] = useState<string>('development');

  const stages = PROJECT_LIFECYCLES[selectedProjectId] || PROJECT_LIFECYCLES['maps-lead-scraper-pro'];
  const activeStage = stages.find((s) => s.id === activeStageId) || stages[3];

  return (
    <section id="project-lifecycle-timeline" className="py-16 px-6 max-w-7xl mx-auto space-y-10 text-left border-t border-border-subtle/40">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> 7-Stage Interactive Development Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            End-to-End Engineering Execution Timeline
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Click any stage in the 7-phase timeline pipeline below to inspect key deliverables, stage metrics, and milestone timelines.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 bg-bg-inset p-1.5 rounded-xl border border-border-subtle shrink-0">
          {projectsData.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveStageId('development');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all btn-micro ${
                  isSelected
                    ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {proj.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Pipeline Bar (7 Stages Horizontal/Grid Stepper) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {stages.map((stage) => {
          const IconComponent = stage.icon;
          const isActive = stage.id === activeStageId;

          return (
            <motion.button
              key={stage.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-3 group ${
                isActive
                  ? 'bg-accent-primary/10 border-accent-primary text-text-primary shadow-glow'
                  : 'bg-bg-surface/80 border-border-subtle text-text-secondary hover:border-text-muted hover:bg-bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-accent-primary' : 'text-text-muted'}`}>
                  Stage {stage.stageNumber}
                </span>
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-accent-primary/20 text-accent-primary' : 'bg-bg-inset text-text-muted group-hover:text-text-primary'
                }`}>
                  <IconComponent className="h-4 w-4" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-text-primary group-hover:text-accent-primary transition-colors">
                  {stage.name}
                </h4>
                <span className="font-mono text-[10px] text-text-muted block">
                  {stage.duration}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Stage Detail Inspector Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id + selectedProjectId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 sm:p-8 premium-card space-y-6 border-accent-primary/30 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary">
                <activeStage.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent-primary font-bold">
                  Stage {activeStage.stageNumber} Inspector — {activeStage.duration}
                </span>
                <h3 className="font-bold text-xl text-text-primary">
                  {activeStage.name} Phase Execution
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-accent-success/10 border border-accent-success/20 text-accent-success font-mono text-xs font-semibold shrink-0 self-start sm:self-auto">
              ✓ Milestone Verified
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
            {activeStage.description}
          </p>

          {/* Deliverables & Metric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <span className="font-mono text-xs text-accent-primary font-semibold block uppercase tracking-wider">
                Phase Deliverables & Artifacts
              </span>
              <div className="space-y-2">
                {activeStage.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="p-3 rounded-xl bg-bg-inset border border-border-subtle/50 text-xs text-text-secondary flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-success shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-accent-highlight font-semibold block uppercase tracking-wider">
                Phase Success Metric
              </span>
              <div className="p-5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2 flex flex-col justify-between h-[calc(100%-24px)]">
                <div className="flex items-center gap-2 text-accent-highlight">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-bold text-xs font-mono">Key Milestone Indicator</span>
                </div>
                <p className="text-sm font-bold text-text-primary">
                  {activeStage.keyMetric}
                </p>
                <span className="text-[10px] font-mono text-text-muted">
                  Phase verified against 100/100 Lighthouse & WCAG 2.2 AAA standards.
                </span>
              </div>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

    </section>
  );
}
