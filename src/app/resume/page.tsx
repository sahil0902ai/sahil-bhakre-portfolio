'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, Download, Mail, MapPin, Globe, Search, X, CheckCircle2, 
  Sparkles, Briefcase, GraduationCap, Award, Cpu, Code2, ShieldCheck, 
  Terminal, FileCode, Layers, ExternalLink, Github 
} from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { personalInfo, socialLinks, projectsData, timelineData, technologyData } from '@config/portfolio';
import { trackResumeDownload } from '@lib/analytics';

export default function ResumePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'experience' | 'skills' | 'projects' | 'education'>('all');

  const handlePrint = () => {
    trackResumeDownload('pdf');
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const normalizedQuery = searchQuery.toLowerCase().trim();

  // Filter Functions
  const filterMatch = (text: string) => {
    if (!normalizedQuery) return true;
    return text.toLowerCase().includes(normalizedQuery);
  };

  const filteredTimeline = timelineData.filter(
    (t) => filterMatch(t.role) || filterMatch(t.company) || filterMatch(t.description) || filterMatch(t.year)
  );

  const filteredProjects = projectsData.filter(
    (p) => filterMatch(p.title) || filterMatch(p.overview) || filterMatch(p.category) || p.tech.some(t => filterMatch(t))
  );

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <div className="no-print">
        <Header />
      </div>

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 text-left">
        
        {/* Action Controls & Interactive Search Bar Top Section */}
        <div className="no-print space-y-6 border-b border-border-subtle/50 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-accent-primary block">
                Interactive Curriculum Vitae
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Sahil Bhakre — Resume
              </h1>
            </div>

            {/* Action Download / Print Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all btn-micro"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF / Print</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors btn-micro"
              >
                <Printer className="h-4 w-4" />
                <span>Print View</span>
              </button>
            </div>
          </div>

          {/* Interactive Search Bar & Filter Chips */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, timeline, projects, or degree (e.g. Python, Next.js, Data Science)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus-ring transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-3 text-text-muted hover:text-text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto shrink-0 pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Sections' },
                { id: 'experience', label: 'Timeline' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all btn-micro shrink-0 ${
                    activeCategory === tab.id
                      ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary shadow-sm'
                      : 'bg-bg-inset text-text-muted hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Printable & Interactive Resume Container */}
        <div className="print-area p-6 sm:p-12 rounded-2xl border border-border-subtle bg-bg-surface/60 backdrop-blur-md shadow-2xl space-y-10">
          
          {/* Header & Contact Info */}
          <div className="space-y-4 border-b border-border-subtle/50 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                  {personalInfo.name}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-accent-primary font-medium mt-1">
                  AI Engineer & Full-Stack Developer | B.Tech Data Science Student
                </p>
              </div>

              <div className="text-xs space-y-1 font-mono text-text-secondary sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                  <span>India</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                  <a href={socialLinks.email.href} className="hover:text-accent-primary">{socialLinks.email.value}</a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-accent-primary shrink-0" />
                  <a href={personalInfo.domain} target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary">{personalInfo.domain}</a>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Professional Summary */}
          {(activeCategory === 'all' || activeCategory === 'experience') && (
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <Sparkles className="h-4 w-4" />
                1. Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Enthusiastic AI Engineer and Full-Stack Developer currently pursuing a B.Tech in Data Science in India. Proven track record in engineering automated AI agent pipelines, Playwright stealth web scraping microservices, FastAPI REST backends, and responsive Next.js 15 web applications with 100/100 Lighthouse performance scores.
              </p>
            </div>
          )}

          {/* 2. Work & Career Timeline */}
          {(activeCategory === 'all' || activeCategory === 'experience') && (
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <Briefcase className="h-4 w-4" />
                2. Career & Experience Timeline
              </h2>

              <div className="relative border-l border-border-subtle/50 ml-3 space-y-6">
                {filteredTimeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6 space-y-1.5">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-primary" />
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                      <span className="font-bold text-text-primary text-sm">{item.role}</span>
                      <span className="text-accent-primary">{item.year}</span>
                    </div>
                    <div className="text-xs font-semibold text-text-secondary font-mono">{item.company}</div>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Skills Matrix */}
          {(activeCategory === 'all' || activeCategory === 'skills') && (
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <Cpu className="h-4 w-4" />
                3. Technical Skills Matrix
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologyData.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-3">
                    <h3 className="font-bold text-xs font-mono text-text-primary uppercase tracking-wider border-b border-border-subtle/30 pb-1.5">
                      {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, iIdx) => (
                        <span key={iIdx} className="px-2.5 py-1 rounded bg-bg-surface border border-border-subtle font-mono text-[10px] text-accent-primary">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Featured Projects */}
          {(activeCategory === 'all' || activeCategory === 'projects') && (
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <Code2 className="h-4 w-4" />
                4. Major Case Studies & Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-accent-primary uppercase block">{p.category}</span>
                      <h4 className="font-bold text-xs text-text-primary">{p.title}</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3">{p.overview}</p>
                    </div>

                    <div className="pt-2 border-t border-border-subtle/30 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-accent-success">{p.impact.slice(0, 25)}...</span>
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary flex items-center gap-1">
                        <Github className="h-3 w-3" /> Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Education */}
          {(activeCategory === 'all' || activeCategory === 'education') && (
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <GraduationCap className="h-4 w-4" />
                5. Academic Education
              </h2>

              <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                  <span className="font-bold text-text-primary text-sm">Bachelor of Technology (B.Tech) in Data Science</span>
                  <span className="text-accent-primary">2023 — 2027</span>
                </div>
                <div className="text-xs font-semibold text-text-secondary font-mono">University in India</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Specializing in machine learning algorithms, statistical data modeling, database query optimization, neural networks, and full-stack software development.
                </p>
              </div>
            </div>
          )}

          {/* 6. Measurable Achievements & Metrics */}
          {(activeCategory === 'all' || activeCategory === 'experience') && (
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <Award className="h-4 w-4" />
                6. Measurable Engineering Achievements
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs space-y-1">
                  <span className="font-mono text-[10px] text-accent-success font-semibold block">Performance</span>
                  <p className="text-text-secondary text-[11px]">Achieved 100/100 Lighthouse performance scores across all static pages.</p>
                </div>
                <div className="p-3 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs space-y-1">
                  <span className="font-mono text-[10px] text-accent-primary font-semibold block">Automation Velocity</span>
                  <p className="text-text-secondary text-[11px]">Sub-60s batch execution speed on Playwright lead extractions.</p>
                </div>
                <div className="p-3 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs space-y-1">
                  <span className="font-mono text-[10px] text-accent-highlight font-semibold block">Validation Rigor</span>
                  <p className="text-text-secondary text-[11px]">99.4% Pydantic JSON schema accuracy on autonomous AI agent outputs.</p>
                </div>
              </div>
            </div>
          )}

          {/* 7. Certifications & Specializations */}
          {(activeCategory === 'all' || activeCategory === 'skills') && (
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider text-accent-primary flex items-center gap-2 border-b border-border-subtle/30 pb-2">
                <ShieldCheck className="h-4 w-4" />
                7. Certifications & Specializations
              </h2>

              <div className="flex flex-wrap gap-2">
                {[
                  'Data Science & Machine Learning Specialization',
                  'FastAPI REST Microservices Architecture',
                  'Next.js 15 App Router Full-Stack Engineering',
                  'Playwright Stealth Web Automation',
                ].map((cert, cIdx) => (
                  <span key={cIdx} className="px-3 py-1.5 rounded-lg bg-bg-inset border border-border-subtle text-xs font-mono text-text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-success" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
