'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Sparkles, ExternalLink, Github, ArrowUpRight, Code, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@animations/presets';
import { usePortfolio } from '@context/PortfolioContext';
import { ProjectItem } from '@config/portfolio';
import { CaseStudyTemplate } from './CaseStudyTemplate';

const iconMap = {
  cpu: Cpu,
  layers: Layers,
  sparkles: Sparkles,
};

export function Projects() {
  const { projectsData } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI & Automation', 'Full Stack', 'Infrastructure'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border-subtle/40">
      {/* Header section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-3 sm:space-y-4 mb-10 sm:mb-12 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
          Featured Software Projects
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] max-w-2xl">
          Real-World Systems & Case Studies
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm max-w-lg">
          Explore production-ready software, AI automation pipelines, and open-source design systems.
        </p>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 sm:mb-10 border-b border-border-subtle/30 pb-4 overflow-x-auto min-h-[44px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-full text-xs font-mono transition-all focus-ring shrink-0 min-h-[44px] flex items-center ${
              selectedCategory === cat
                ? 'bg-accent-gradient text-text-primary font-semibold shadow-glow'
                : 'bg-bg-surface/50 text-text-secondary hover:text-text-primary border border-border-subtle'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const IconComponent = iconMap[project.iconName] || Cpu;
            const projectStatus = project.metrics.find(m => m.label === 'Status')?.value || 'Portfolio Project';

            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between premium-card premium-card-hover group overflow-hidden shadow-md text-left"
              >
                {/* Visual Header Mock */}
                <div className={`relative h-44 w-full bg-gradient-to-br flex items-center justify-center border-b border-border-subtle/50 ${project.imageColor}`}>
                  <div className="p-4 rounded-full bg-bg-base/80 border border-border-subtle shadow-md">
                    <IconComponent className="h-8 w-8 text-text-primary" />
                  </div>
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase bg-bg-base border border-border-subtle text-accent-primary font-bold">
                    {project.category || 'Details coming soon.'}
                  </span>

                  {/* Status Badge (Live / In Progress / Personal Project) */}
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase bg-accent-success/10 border border-accent-success/30 text-accent-success font-semibold">
                    {projectStatus}
                  </span>
                </div>

                {/* Details Container */}
                <div className="p-5 sm:p-6 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                        {project.title || 'Details coming soon.'}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted mt-1 block">
                        {project.industry || 'Details coming soon.'}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {project.overview || 'Details coming soon.'}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle/30 font-mono text-[10px]">
                      {project.tech && project.tech.length > 0 ? (
                        project.tech.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-bg-inset border border-border-subtle/50 text-accent-primary">
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-text-muted">Details coming soon.</span>
                      )}
                    </div>
                  </div>

                  {/* Actions Row (GitHub, Live Demo, Case Study) */}
                  <div className="pt-4 border-t border-border-subtle/30 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 min-h-[44px] text-xs font-semibold text-accent-primary hover:text-text-primary transition-colors py-1"
                      >
                        <span>View Case Studies</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="font-mono text-[10px] text-text-muted hover:text-accent-primary transition-colors underline underline-offset-4 min-h-[44px] flex items-center"
                      >
                        View Projects
                      </button>

                      <div className="flex items-center gap-2">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-bg-inset border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        ) : (
                          <span className="text-[9px] font-mono text-text-muted">No Code</span>
                        )}

                        {project.demo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-bg-inset border border-border-subtle text-text-secondary hover:text-accent-primary transition-colors"
                            aria-label="Live Demo Link"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <span className="text-[9px] font-mono text-text-muted">Details coming soon.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal Portal */}
      {selectedProject && (
        <CaseStudyTemplate
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
