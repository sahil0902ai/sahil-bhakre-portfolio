'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Terminal, 
  Lock, Search, Activity, Cpu, Layers, Database, TrendingUp, Play,
  LayoutDashboard, GitMerge, Bot, ListTree, Settings, Bell, Server,
  Zap, Eye, Globe, Code, Shield, Box
} from 'lucide-react';
import { personalInfo } from '@config/portfolio';
import { trackCTAClick } from '@lib/analytics';

const TRUST_STRIP_ITEMS = [
  { label: 'AI Engineering', description: 'LangChain & OpenAI Agentic Systems', icon: Bot, color: 'text-accent-primary' },
  { label: 'Full Stack', description: 'Next.js 15, FastAPI & Python', icon: Code, color: 'text-accent-primary' },
  { label: 'Automation', description: 'Playwright Stealth Pipelines', icon: Zap, color: 'text-accent-highlight' },
  { label: 'Performance', description: 'Sub-200ms TTFB & 0.00 CLS', icon: Activity, color: 'text-accent-success' },
  { label: 'Accessibility', description: 'WCAG 2.2 AAA High-Contrast', icon: Eye, color: 'text-accent-success' },
  { label: 'SEO', description: 'Dynamic Metadata & Schema.org', icon: Globe, color: 'text-accent-primary' },
  { label: 'Type Safety', description: 'TypeScript & Pydantic Validation', icon: Shield, color: 'text-accent-highlight' },
  { label: 'Scalable Architecture', description: 'Modular Microservices & Edge', icon: Box, color: 'text-text-secondary' },
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center pt-20 sm:pt-28 pb-8 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto text-left overflow-hidden">
      
      {/* Background Depth: Reduced decorative blur on mobile for performance */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 sm:opacity-10 pointer-events-none" />
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 12-Column Grid (45% LEFT / 55% RIGHT Split) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
        
        {/* LEFT COLUMN (Headline, CTA, Status) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          {/* 1. Who I Am & Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent-success/10 border border-accent-success/20 text-accent-success font-mono text-[11px] font-semibold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-success" />
            </span>
            <span>Sahil Bhakre • Available for New Projects</span>
          </motion.div>

          {/* 2. Headline - Apple Mobile-First Scale (32px mobile / 54px desktop) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[32px] sm:text-5xl lg:text-[54px] font-extrabold tracking-tighter text-text-primary leading-[1.08]"
          >
            Building Intelligent <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-accent-gradient">AI Products</span> &amp; <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-accent-gradient">Automation</span> That Scale.
          </motion.h1>

          {/* 3. Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-lg font-normal"
          >
            I help founders, startups, and enterprises build AI software, modern web platforms, and automated pipelines that eliminate manual work.
          </motion.p>

          {/* 4. Immediately Visible CTAs (52px - 56px Apple Touch Target + WhatsApp Quick Action) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full"
          >
            <a
              href="#contact"
              onClick={() => trackCTAClick('hero_start_project', '#contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-accent-gradient text-text-primary text-base font-bold shadow-lg hover:shadow-glow transition-all active:scale-[0.98] min-h-[52px] sm:min-h-[56px] w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href="https://wa.me/919823511929?text=Hi%20Sahil,%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick('hero_whatsapp_direct', 'https://wa.me/919823511929')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-sm font-bold transition-all active:scale-[0.98] min-h-[52px] sm:min-h-[56px]"
              >
                <Zap className="h-4 w-4 fill-emerald-400" />
                <span>WhatsApp Instant</span>
              </a>

              <a
                href="#projects"
                onClick={() => trackCTAClick('hero_view_case_studies', '#projects')}
                className="inline-flex items-center justify-center px-5 py-3.5 sm:py-4 rounded-2xl sm:rounded-full border border-border-subtle bg-bg-surface text-text-primary text-sm font-semibold transition-colors active:scale-[0.98] min-h-[52px] sm:min-h-[56px]"
              >
                <span>Work</span>
              </a>
            </div>
          </motion.div>

          {/* 5. Trust Standards - Hidden on small mobile screens to fit within 1 viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="hidden sm:block pt-5 border-t border-border-subtle/30 space-y-3"
          >
            <span className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-wider block">
              Core Engineering Standards
            </span>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-left font-mono">
              {TRUST_STRIP_ITEMS.map((item) => {
                const IconComponent = item.icon;

                return (
                  <div key={item.label} className="flex items-start gap-2 group">
                    <IconComponent className={`h-3.5 w-3.5 ${item.color} shrink-0 mt-0.5`} />
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-text-primary group-hover:text-accent-primary transition-colors leading-none">
                        {item.label}
                      </div>
                      <p className="text-[10px] text-text-muted leading-tight truncate max-w-[170px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN (55% / lg:col-span-7) — SAAS PRODUCT INTERFACE (Below CTA on Mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 space-y-3 pt-4 lg:pt-0"
        >
          {/* Technology Badges - Hidden on mobile for cleaner density */}
          <div className="hidden sm:flex flex-wrap items-center justify-end gap-2 font-mono text-[10px]">
            {['Next.js 15', 'OpenAI', 'React', 'n8n', 'PostgreSQL'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-bg-surface border border-border-subtle/60 text-accent-primary font-semibold shadow-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* Premium Enterprise Browser Window */}
          <div className="rounded-2xl border border-border-subtle/60 bg-bg-surface/90 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Titlebar */}
            <div className="px-4 py-2.5 bg-bg-inset border-b border-border-subtle/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>

              <div className="px-4 py-1 rounded-full bg-bg-base border border-border-subtle/40 text-[10px] font-mono text-text-muted flex items-center gap-1.5 max-w-xs w-full justify-center">
                <Lock className="h-3 w-3 text-accent-success" />
                <span>https://app.sahilbhakre.dev/dashboard</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-accent-success font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
                <span>Operational</span>
              </div>
            </div>

            {/* SaaS Dashboard Body with Left Sidebar + Main Content */}
            <div className="flex min-h-[370px]">
              
              {/* Left Sidebar */}
              <div className="w-14 sm:w-16 bg-bg-inset border-r border-border-subtle/40 py-4 flex flex-col items-center justify-between shrink-0">
                <div className="space-y-4 text-text-muted">
                  <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <div className="p-2 rounded-xl hover:bg-bg-surface hover:text-text-primary transition-colors">
                    <GitMerge className="h-4 w-4" />
                  </div>
                  <div className="p-2 rounded-xl hover:bg-bg-surface hover:text-text-primary transition-colors">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-2 rounded-xl hover:bg-bg-surface hover:text-text-primary transition-colors">
                    <ListTree className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-2 rounded-xl text-text-muted hover:text-text-primary transition-colors">
                  <Settings className="h-4 w-4" />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-5 sm:p-6 space-y-4 text-left bg-bg-base/30 overflow-hidden">
                
                {/* App Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle/30">
                  <div>
                    <h3 className="text-xs font-bold font-mono text-text-primary">Automation Control Hub</h3>
                    <p className="text-[10px] text-text-muted font-mono">prod-us-east • Cluster Active</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-accent-success/10 border border-accent-success/20 text-accent-success text-[10px] font-mono font-semibold flex items-center gap-1">
                      <Server className="h-3 w-3" /> 99.98% Uptime
                    </span>
                  </div>
                </div>

                {/* 3 Analytics Metric Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1">
                    <span className="text-[10px] font-mono text-text-muted block">Active Pipelines</span>
                    <div className="text-xs sm:text-sm font-bold font-mono text-text-primary">4 Agents</div>
                    <span className="text-[9px] font-mono text-accent-success font-semibold">● Operational</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1">
                    <span className="text-[10px] font-mono text-text-muted block">Throughput</span>
                    <div className="text-xs sm:text-sm font-bold font-mono text-accent-primary">12.8k / day</div>
                    <span className="text-[9px] font-mono text-text-muted">Requests Processed</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1">
                    <span className="text-[10px] font-mono text-text-muted block">Avg Latency</span>
                    <div className="text-xs sm:text-sm font-bold font-mono text-accent-highlight">142ms</div>
                    <span className="text-[9px] font-mono text-text-muted">Type-Safe Response</span>
                  </div>
                </div>

                {/* Workflow Pipeline Visualization */}
                <div className="p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="uppercase text-accent-primary font-bold">Workflow Sequence</span>
                    <span className="text-text-muted">Linear Step Engine</span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono overflow-x-auto pb-1">
                    <div className="px-2.5 py-1 rounded-lg bg-bg-surface border border-border-subtle text-text-primary shrink-0">
                      Webhook Trigger
                    </div>
                    <span className="text-text-muted">→</span>
                    <div className="px-2.5 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/30 text-accent-primary font-semibold shrink-0">
                      Playwright Engine
                    </div>
                    <span className="text-text-muted">→</span>
                    <div className="px-2.5 py-1 rounded-lg bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight font-semibold shrink-0">
                      OpenAI Agent
                    </div>
                    <span className="text-text-muted">→</span>
                    <div className="px-2.5 py-1 rounded-lg bg-accent-success/10 border border-accent-success/30 text-accent-success font-semibold shrink-0">
                      PostgreSQL Ledger
                    </div>
                  </div>
                </div>

                {/* Recent Automations Log & Performance Graph */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Activity Feed */}
                  <div className="p-3 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1.5 text-[10px] font-mono">
                    <span className="text-text-muted uppercase block font-bold">Recent Executions</span>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-text-secondary">
                        <span>• Maps Lead Extraction</span>
                        <span className="text-accent-success font-semibold">Success</span>
                      </div>
                      <div className="flex items-center justify-between text-text-secondary">
                        <span>• n8n PostgreSQL Sync</span>
                        <span className="text-accent-success font-semibold">Synced</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Sparkline */}
                  <div className="p-3 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-text-muted">System Throughput</span>
                      <span className="text-accent-success font-semibold">100% Health</span>
                    </div>
                    <svg className="w-full h-7 overflow-visible" viewBox="0 0 200 30">
                      <path
                        d="M0,25 Q30,15 60,20 T120,10 T180,5 T200,2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-accent-success"
                      />
                    </svg>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
