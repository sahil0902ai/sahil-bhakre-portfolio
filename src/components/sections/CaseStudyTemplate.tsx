'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, ExternalLink, Github, CheckCircle2, Cpu, Layers, Layout, 
  ShieldCheck, Zap, Search, Eye, AlertCircle, Sparkles, Rocket, FileCode2 
} from 'lucide-react';
import { ProjectItem } from '@config/portfolio';

interface CaseStudyTemplateProps {
  project: ProjectItem;
  onClose: () => void;
}

export function CaseStudyTemplate({ project, onClose }: CaseStudyTemplateProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'strategy' | 'engineering' | 'delivery'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-y-auto p-6 sm:p-10 space-y-8 text-left text-text-primary"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-border-subtle bg-bg-inset text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors z-10"
          aria-label="Close Case Study"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Section */}
        <div className="space-y-4 border-b border-border-subtle/50 pb-6 pr-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
              {project.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-border-subtle" />
            <span className="font-mono text-xs text-text-secondary">
              {project.industry}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
            {project.title}
          </h2>

          {/* Section 1: Project Overview */}
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
            {project.overview}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all btn-micro"
              >
                <ExternalLink className="h-4 w-4" />
                Live Product
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle bg-bg-inset text-text-primary text-xs font-semibold hover:border-text-primary transition-colors btn-micro"
            >
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </div>
        </div>

        {/* Quick Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl border border-border-subtle bg-bg-inset/40">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">{m.label}</span>
                <span className="text-lg font-bold text-accent-primary">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border-subtle/50 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors shrink-0 ${
              activeTab === 'overview'
                ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            1. Problem & Goals
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors shrink-0 ${
              activeTab === 'strategy'
                ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            2. Research & Wireframes
          </button>
          <button
            onClick={() => setActiveTab('engineering')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors shrink-0 ${
              activeTab === 'engineering'
                ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            3. Tech & Architecture
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors shrink-0 ${
              activeTab === 'delivery'
                ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            4. Quality & Lessons
          </button>
        </div>

        {/* Tab 1: Problem & Goals */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Section 2: Business Problem */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Business Problem</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
            </div>

            {/* Section 3: Goals */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-accent-primary">
                <CheckCircle2 className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Project Goals</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-secondary">
                {project.goals.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 10 & 11: Solution & Features */}
            <div className="p-6 rounded-xl border border-accent-success/20 bg-accent-success/5 space-y-4">
              <div className="flex items-center gap-2 text-accent-success">
                <Sparkles className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Engineered Solution & Key Features</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {project.features.map((f, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-bg-surface border border-border-subtle text-xs text-text-primary flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-success shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Research & Wireframes */}
        {activeTab === 'strategy' && (
          <div className="space-y-6">
            {/* Section 4: Research */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-accent-secondary">
                <Search className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Research & Discovery</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{project.research}</p>
            </div>

            {/* Section 5: Planning */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-accent-highlight">
                <Layout className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Planning & Architecture Strategy</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{project.planning}</p>
            </div>

            {/* Section 6: Wireframes & Visual Layout */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-4">
              <div className="flex items-center gap-2 text-text-primary">
                <Eye className="h-4 w-4 text-accent-primary" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Wireframes & UI Layout System</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{project.wireframes}</p>
              
              {/* Reusable Visual Wireframe Container Placeholder */}
              <div className="relative w-full h-44 rounded-xl border border-border-subtle bg-bg-inset flex flex-col items-center justify-center p-6 text-center space-y-2 overflow-hidden group">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="p-3 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                  <FileCode2 className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs text-text-primary font-semibold">UI Wireframe & Design Canvas</span>
                <span className="text-[11px] text-text-muted max-w-md">
                  Modular glassmorphic visual system designed in Figma and implemented with React 19 components.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tech & Architecture */}
        {activeTab === 'engineering' && (
          <div className="space-y-6">
            {/* Section 7: Tech Stack */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-accent-primary">
                <Cpu className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-bg-surface border border-border-subtle text-accent-primary">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 8: Architecture */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-accent-secondary">
                <Layers className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">System Architecture</h3>
              </div>
              <div className="p-4 rounded-lg bg-bg-inset font-mono text-xs text-accent-primary border border-border-subtle/50 overflow-x-auto">
                {project.architecture}
              </div>
            </div>

            {/* Section 9: Challenges */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Technical Challenges Solved</h3>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                {project.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Quality & Lessons */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            {/* Section 12, 13, 14: Performance, SEO, Accessibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-2">
                <div className="flex items-center gap-2 text-accent-primary">
                  <Zap className="h-4 w-4" />
                  <h4 className="font-mono text-xs uppercase font-semibold">Performance</h4>
                </div>
                <ul className="text-xs text-text-secondary space-y-1.5">
                  {project.performance.map((p, idx) => (
                    <li key={idx}>• {p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-2">
                <div className="flex items-center gap-2 text-accent-secondary">
                  <Search className="h-4 w-4" />
                  <h4 className="font-mono text-xs uppercase font-semibold">SEO</h4>
                </div>
                <ul className="text-xs text-text-secondary space-y-1.5">
                  {project.seo.map((s, idx) => (
                    <li key={idx}>• {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-2">
                <div className="flex items-center gap-2 text-accent-success">
                  <ShieldCheck className="h-4 w-4" />
                  <h4 className="font-mono text-xs uppercase font-semibold">Accessibility</h4>
                </div>
                <ul className="text-xs text-text-secondary space-y-1.5">
                  {project.accessibility.map((a, idx) => (
                    <li key={idx}>• {a}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 15: Lessons Learned */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-accent-highlight">
                <Rocket className="h-4 w-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Lessons Learned</h3>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                {project.lessons.map((l, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-highlight mt-1.5 shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 16: Future Improvements */}
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-inset/30 space-y-3">
              <div className="flex items-center gap-2 text-text-primary">
                <Sparkles className="h-4 w-4 text-accent-primary" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">Future Roadmap & Improvements</h3>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                {project.futureImprovements.map((fi, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                    <span>{fi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
