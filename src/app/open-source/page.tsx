'use client';

import { motion } from 'framer-motion';
import { 
  Github, Star, GitFork, GitCommit, ExternalLink, 
  Folder, Sparkles, FolderGit2
} from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { openSourceData } from '@config/openSource';

export default function OpenSourcePage() {
  const { username, githubUrl, pinnedRepos } = openSourceData;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 text-left">
        
        {/* Page Hero & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5 font-bold">
              <Github className="h-4 w-4" /> Open Source Codebases
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
              Open Source Repositories & Activity
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Public code repositories, Python stealth utilities, and Next.js 15 starter templates built for full transparency.
            </p>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all btn-micro shrink-0 self-start md:self-auto min-h-[48px]"
          >
            <Github className="h-4 w-4" />
            <span>Follow @{username} on GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Pinned Repositories Grid or Empty State */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold flex items-center gap-2">
              <FolderGit2 className="h-4 w-4" /> Public Code Repositories
            </h2>
            <span className="font-mono text-[10px] text-text-muted">Open Access Code</span>
          </div>

          {pinnedRepos && pinnedRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pinnedRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl border border-border-subtle bg-bg-surface flex flex-col justify-between space-y-4 hover:border-accent-primary/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent-primary font-bold">{repo.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bg-inset border border-border-subtle text-text-muted">
                        {repo.language}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      {repo.description}
                    </p>

                    <div className="flex flex-wrap gap-1 font-mono text-[9px] pt-2">
                      {repo.topics.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-bg-inset text-text-muted">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-subtle/40 flex items-center justify-between text-xs font-mono">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:underline flex items-center gap-1 font-semibold min-h-[44px]"
                    >
                      <span>View Code</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-border-subtle bg-bg-surface space-y-3">
              <FolderGit2 className="h-8 w-8 text-accent-primary mx-auto" />
              <h3 className="text-base font-bold text-text-primary">Open-source repositories will be published here.</h3>
              <p className="text-xs text-text-muted max-w-md mx-auto">
                Currently organizing public repositories for community release. Check back soon or visit GitHub directly.
              </p>
            </div>
          )}
        </div>

        {/* Intentional Polished Empty State Banner */}
        <div className="p-8 text-center rounded-2xl border border-border-subtle/60 bg-bg-surface/60 space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold block">
            Public Code Transparency
          </span>
          <p className="text-sm font-medium text-text-primary">
            Open-source repositories will be published here.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
