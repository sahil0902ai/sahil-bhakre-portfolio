'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitCommit, Github, BookOpen, Mic, Flame, Star, GitPullRequest, 
  Eye, CheckCircle2, ArrowUpRight, TrendingUp, Layers, Terminal, Sparkles 
} from 'lucide-react';
import { developerDashboardData } from '@config/dashboard';

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'commits' | 'content' | 'learning'>('all');

  const {
    githubStats,
    latestCommits,
    blogPosts,
    openSource,
    currentFocus,
    readingList,
    learningRoadmap,
    speakingEngagements,
  } = developerDashboardData;

  return (
    <section id="developer-dashboard" className="py-20 px-6 max-w-7xl mx-auto space-y-12 text-left border-t border-border-subtle/40">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <Terminal className="h-4 w-4" /> Live Developer Activity Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Engineering Metrics & Open Activity
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Data-driven activity log tracking real GitHub contributions, recent commits, technical publications, research focus, and learning roadmap.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-bg-inset p-1.5 rounded-xl border border-border-subtle shrink-0">
          {[
            { id: 'all', label: 'All Activity' },
            { id: 'commits', label: 'Commits & GitHub' },
            { id: 'content', label: 'Publications' },
            { id: 'learning', label: 'Focus & Reading' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all btn-micro ${
                activeTab === tab.id
                  ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 premium-card space-y-2 border-accent-primary/20">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-mono text-xs uppercase tracking-wider">GitHub Contributions</span>
            <Github className="h-4 w-4 text-accent-primary" />
          </div>
          <div className="text-2xl font-bold text-text-primary font-mono">{githubStats.totalContributions}</div>
          <span className="text-[10px] text-accent-success font-mono flex items-center gap-1">
            <Flame className="h-3 w-3" /> {githubStats.currentStreak}-day active streak
          </span>
        </div>

        <div className="p-5 premium-card space-y-2 border-accent-success/20">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-mono text-xs uppercase tracking-wider">PRs & Issues Closed</span>
            <GitPullRequest className="h-4 w-4 text-accent-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary font-mono">{githubStats.pullRequests + githubStats.issuesClosed}</div>
          <span className="text-[10px] text-text-secondary font-mono">
            {githubStats.pullRequests} PRs merged • {githubStats.issuesClosed} issues resolved
          </span>
        </div>

        <div className="p-5 premium-card space-y-2 border-accent-highlight/20">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-mono text-xs uppercase tracking-wider">Article Views</span>
            <Eye className="h-4 w-4 text-accent-highlight" />
          </div>
          <div className="text-2xl font-bold text-text-primary font-mono">
            {blogPosts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
          </div>
          <span className="text-[10px] text-text-secondary font-mono"> Across 3 technical publications</span>
        </div>

        <div className="p-5 premium-card space-y-2 border-border-subtle">
          <div className="flex items-center justify-between text-text-muted">
            <span className="font-mono text-xs uppercase tracking-wider">Public Repositories</span>
            <Star className="h-4 w-4 text-accent-primary" />
          </div>
          <div className="text-2xl font-bold text-text-primary font-mono">{githubStats.publicRepos}</div>
          <span className="text-[10px] text-accent-primary font-mono flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> 100% Open Source Transparency
          </span>
        </div>
      </div>

      {/* Main Grid: Commits & GitHub Heatmap vs Focus & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Heatmap, Commits & Publications (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* GitHub Heatmap Grid */}
          {(activeTab === 'all' || activeTab === 'commits') && (
            <div className="p-6 premium-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-semibold flex items-center gap-2">
                  <Github className="h-4 w-4" /> 2026 GitHub Contribution Heatmap
                </span>
                <span className="font-mono text-[10px] text-text-muted">Longest Streak: {githubStats.longestStreak} days</span>
              </div>

              <div className="space-y-1.5 overflow-x-auto pb-2">
                {githubStats.heatmapData.map((row, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-muted w-6">{row.day}</span>
                    <div className="flex gap-1.5">
                      {row.counts.map((cnt, cIdx) => {
                        let bgClass = 'bg-bg-inset border border-border-subtle/50';
                        if (cnt > 0 && cnt <= 3) bgClass = 'bg-accent-primary/20 border border-accent-primary/30';
                        if (cnt > 3 && cnt <= 8) bgClass = 'bg-accent-primary/50 border border-accent-primary/60';
                        if (cnt > 8) bgClass = 'bg-accent-primary border border-accent-primary shadow-glow';

                        return (
                          <div
                            key={cIdx}
                            title={`${cnt} contributions`}
                            className={`w-5 h-5 rounded ${bgClass} transition-colors`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Latest Commits Feed */}
          {(activeTab === 'all' || activeTab === 'commits') && (
            <div className="p-6 premium-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-semibold flex items-center gap-2">
                  <GitCommit className="h-4 w-4" /> Latest Commit Stream
                </span>
                <span className="font-mono text-[10px] text-accent-success">Branch: main</span>
              </div>

              <div className="space-y-3">
                {latestCommits.map((commit) => (
                  <div key={commit.id} className="p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1.5 text-xs text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-accent-primary font-semibold">{commit.repo}</span>
                      <span className="font-mono text-[10px] text-text-muted">{commit.date}</span>
                    </div>
                    <p className="text-text-primary font-mono text-[11px] leading-tight">{commit.message}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-text-muted border-t border-border-subtle/30">
                      <span className="px-2 py-0.5 rounded bg-bg-surface border border-border-subtle text-accent-secondary">
                        commit #{commit.hash}
                      </span>
                      <span>branch: {commit.branch}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Posts & Publications */}
          {(activeTab === 'all' || activeTab === 'content') && (
            <div className="p-6 premium-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-highlight font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Technical Blog & Articles
                </span>
                <Link href="/blog" className="font-mono text-[10px] text-accent-primary hover:underline">
                  View All Blog Posts →
                </Link>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2 block group hover:border-accent-primary transition-all text-left"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
                      <span>{post.publishedDate}</span>
                      <span>{post.readTime} • {post.views} views</span>
                    </div>
                    <h4 className="font-bold text-xs text-text-primary group-hover:text-accent-primary transition-colors flex items-center justify-between">
                      <span>{post.title}</span>
                      <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent-primary shrink-0 ml-2" />
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Open Source, Current Focus, Reading & Speaking (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Current Focus & Research Progress */}
          {(activeTab === 'all' || activeTab === 'learning') && (
            <div className="p-6 premium-card space-y-4 border-accent-primary/30">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Current Engineering Focus
                </span>
                <span className="font-mono text-[10px] text-accent-success font-semibold">Active</span>
              </div>

              <div className="space-y-4 text-xs text-left">
                {currentFocus.map((item) => (
                  <div key={item.id} className="space-y-2 p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-text-primary">{item.topic}</span>
                      <span className="text-[10px] text-accent-primary font-semibold">{item.progress}%</span>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">{item.description}</p>
                    <div className="w-full h-1.5 rounded-full bg-bg-surface overflow-hidden">
                      <div className="h-full bg-accent-gradient" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reading List & Books */}
          {(activeTab === 'all' || activeTab === 'learning') && (
            <div className="p-6 premium-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-secondary font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Reading & Technical Papers
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-left">
                {readingList.map((book) => (
                  <div key={book.id} className="p-3 rounded-xl bg-bg-inset border border-border-subtle/50 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-text-primary text-xs">{book.title}</h5>
                      <span className="text-[10px] text-text-muted font-mono">{book.author} • {book.category}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                      book.status === 'Reading' ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30' : 'bg-accent-success/10 text-accent-success border border-accent-success/30'
                    }`}>
                      {book.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speaking & Workshops */}
          {(activeTab === 'all' || activeTab === 'content') && (
            <div className="p-6 premium-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-highlight font-semibold flex items-center gap-2">
                  <Mic className="h-4 w-4" /> Speaking & Tech Talks
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-left">
                {speakingEngagements.map((talk) => (
                  <div key={talk.id} className="p-3.5 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-accent-highlight">
                      <span>{talk.event}</span>
                      <span>{talk.date}</span>
                    </div>
                    <h5 className="font-bold text-text-primary text-xs">{talk.title}</h5>
                    <span className="inline-block px-2 py-0.5 rounded bg-bg-surface text-[9px] font-mono text-text-muted">
                      Type: {talk.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
