'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2, Cpu, 
  Layers, Zap, AlertCircle, Sparkles, Monitor, Smartphone, Tablet,
  Database, GitBranch, ShieldCheck, Search, Lightbulb, Compass, Award
} from 'lucide-react';
import { ProjectItem, projectsData } from '@config/portfolio';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { ArchitectureExplorer } from '@components/sections/ArchitectureExplorer';
import { ProjectLifecycleTimeline } from '@components/sections/ProjectLifecycleTimeline';

interface ProjectPageLayoutProps {
  project: ProjectItem;
}

export function ProjectPageLayout({ project }: ProjectPageLayoutProps) {
  // Find current project index for Next/Previous navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const relatedProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <Header />

      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-16 text-left">
        
        {/* Back Link */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent-primary transition-colors btn-micro"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Projects
          </Link>
        </div>

        {/* 1. Hero Section & Live Demo / GitHub Links */}
        <div className="space-y-6 border-b border-border-subtle/50 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-xs border border-accent-primary/20">
              {project.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-border-subtle" />
            <span className="font-mono text-xs text-text-secondary">
              {project.industry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-text-secondary max-w-3xl leading-relaxed">
            {project.overview}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gradient text-text-primary text-sm font-semibold hover:shadow-glow transition-all btn-micro"
              >
                <ExternalLink className="h-4 w-4" />
                Launch Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-subtle bg-bg-surface text-text-primary text-sm font-semibold hover:border-text-primary transition-colors btn-micro"
            >
              <Github className="h-4 w-4" />
              View Source Code
            </a>
          </div>
        </div>

        {/* 2. Hero Image & Live Preview Container */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
              Live Preview & Responsive Viewport Mock
            </span>
            <div className="flex items-center gap-3 text-text-muted text-xs font-mono">
              <span className="flex items-center gap-1"><Monitor className="h-3.5 w-3.5" /> Desktop</span>
              <span className="flex items-center gap-1"><Tablet className="h-3.5 w-3.5" /> Tablet</span>
              <span className="flex items-center gap-1"><Smartphone className="h-3.5 w-3.5" /> Mobile</span>
            </div>
          </div>

          <div className={`relative w-full h-80 sm:h-96 rounded-2xl border border-border-subtle bg-gradient-to-br ${project.imageColor} p-6 sm:p-10 flex flex-col justify-between overflow-hidden group shadow-2xl`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-text-muted">{project.id}.app</span>
            </div>

            <div className="space-y-3 max-w-xl">
              <span className="font-mono text-xs text-accent-primary uppercase tracking-widest block">Featured Hero Image & Layout Mock</span>
              <h3 className="text-xl sm:text-3xl font-bold text-text-primary">{project.title} Interface System</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{project.impact}</p>
            </div>
          </div>
        </div>

        {/* 3. Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 premium-card space-y-4 border-red-500/20">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">1. Business Problem</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
          </div>

          <div className="p-8 premium-card space-y-4 border-accent-success/20">
            <div className="flex items-center gap-2 text-accent-success">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">2. Engineered Solution</h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* 4. Interactive Architecture Explorer */}
        <ArchitectureExplorer />

        {/* 5. 7-Stage Interactive Development Lifecycle Timeline */}
        <ProjectLifecycleTimeline />
        <div className="space-y-6">
          <div className="p-8 premium-card space-y-6">
            <div className="flex items-center gap-2 text-accent-secondary">
              <Layers className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">3. System Architecture & API Flow Sequence</h3>
            </div>

            <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 font-mono text-xs text-accent-primary overflow-x-auto">
              {project.architecture}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2">
                <span className="font-mono text-xs text-accent-primary font-semibold flex items-center gap-1.5">
                  <Database className="h-4 w-4" /> Database Schema & Ledger Storage
                </span>
                <p className="text-xs text-text-secondary">
                  SQLite / PostgreSQL relational database schema with indexed columns for sub-100ms pagination and query filtering.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2">
                <span className="font-mono text-xs text-accent-primary font-semibold flex items-center gap-1.5">
                  <GitBranch className="h-4 w-4" /> Async API Event Flow
                </span>
                <p className="text-xs text-text-secondary">
                  FastAPI REST endpoints receiving requests, delegating async tasks to background workers, and streaming JSON payloads.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Technology Stack & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-8 premium-card space-y-4">
            <div className="flex items-center gap-2 text-accent-primary">
              <Cpu className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">4. Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-bg-inset border border-border-subtle text-accent-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 premium-card space-y-4">
            <div className="flex items-center gap-2 text-accent-highlight">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">5. Technical Challenges</h3>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              {project.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-highlight shrink-0 mt-1.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6. Performance, SEO & Accessibility Rigor */}
        <div className="p-8 premium-card space-y-6">
          <div className="flex items-center gap-2 text-accent-primary">
            <Zap className="h-5 w-5" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold">6. Performance, SEO & Accessibility Metrics</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-accent-success font-semibold block">Performance</span>
              {project.performance.map((p, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs text-text-secondary flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-success shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-accent-primary font-semibold block">SEO Optimization</span>
              {project.seo.map((s, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs text-text-secondary flex items-start gap-2">
                  <Search className="h-4 w-4 text-accent-primary shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-accent-highlight font-semibold block">Accessibility</span>
              {project.accessibility.map((a, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs text-text-secondary flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent-highlight shrink-0 mt-0.5" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Lessons Learned & Future Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 premium-card space-y-4">
            <div className="flex items-center gap-2 text-accent-primary">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">7. Lessons Learned</h3>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              {project.lessons.map((l, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0 mt-1.5" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 premium-card space-y-4">
            <div className="flex items-center gap-2 text-accent-highlight">
              <Compass className="h-5 w-5" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold">8. Future Roadmap</h3>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              {project.futureImprovements.map((fi, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-highlight shrink-0 mt-1.5" />
                  <span>{fi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 8. Related Projects Section */}
        <div className="space-y-6 border-t border-border-subtle/50 pt-12">
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent-primary">Related Case Studies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/projects/${rel.id}`}
                className="p-6 premium-card premium-card-hover space-y-3 block group"
              >
                <span className="font-mono text-xs text-accent-primary">{rel.category}</span>
                <h4 className="text-xl font-bold group-hover:text-accent-primary transition-colors">{rel.title}</h4>
                <p className="text-xs text-text-secondary line-clamp-2">{rel.overview}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 9. Next/Previous Project Navigation */}
        <div className="flex items-center justify-between border-t border-border-subtle/50 pt-8">
          <Link
            href={`/projects/${prevProject.id}`}
            className="inline-flex items-center gap-2 p-4 rounded-xl border border-border-subtle bg-bg-surface hover:border-accent-primary transition-colors btn-micro text-xs font-semibold text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous: {prevProject.title}
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="inline-flex items-center gap-2 p-4 rounded-xl border border-border-subtle bg-bg-surface hover:border-accent-primary transition-colors btn-micro text-xs font-semibold text-text-secondary hover:text-text-primary"
          >
            Next: {nextProject.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
