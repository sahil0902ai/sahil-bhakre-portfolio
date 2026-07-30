'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, ExternalLink, Bookmark, Cpu, Code2, Terminal, Sparkles, 
  BookOpen, FileCode, Wrench, ShieldCheck, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { resourcesData, resourceCategories } from '@config/resources';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredResources = resourcesData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredResources = resourcesData.filter((item) => item.isFeatured);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 text-left">
        
        {/* Page Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <Bookmark className="h-4 w-4" /> Curated Developer & Designer Vault
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Engineering & Architecture Resources
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            A production-ready library of AI prompts, Next.js 15 guides, Playwright stealth automation templates, UI design tokens, recommended reading, and business contracts. CMS-ready architecture for seamless content management integration.
          </p>
        </div>

        {/* Featured Top Resources Grid */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-wider text-accent-primary font-semibold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Featured Architecture Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.map((res) => (
                <div key={res.id} className="p-6 premium-card space-y-4 flex flex-col justify-between border-accent-primary/30">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-mono font-semibold text-accent-primary">
                        {res.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-bg-inset border border-border-subtle text-[9px] font-mono text-text-muted">
                        Type: {res.type}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-subtle/40 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {res.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-text-muted">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={res.url}
                      target={res.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-accent-primary hover:underline shrink-0"
                    >
                      <span>Access</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Controls & Search Bar */}
        <div className="space-y-6 border-t border-border-subtle/40 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI, Next.js, Automation, Prompts, Books..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus-ring transition-all"
              />
            </div>

            {/* Total Results Counter */}
            <span className="font-mono text-xs text-text-muted shrink-0">
              Showing {filteredResources.length} of {resourcesData.length} resources
            </span>
          </div>

          {/* 10 Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 btn-micro ${
                  selectedCategory === cat
                    ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary shadow-sm'
                    : 'bg-bg-inset border border-border-subtle/50 text-text-muted hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border border-border-subtle bg-bg-surface/70 hover:border-text-muted transition-all space-y-4 flex flex-col justify-between group text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-accent-primary font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-bg-inset text-[9px] font-mono text-text-muted">
                    {item.type}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle/30 flex items-center justify-between text-xs font-mono">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] text-text-muted">
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  href={item.url}
                  target={item.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-primary hover:underline font-semibold"
                >
                  <span>Open</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="p-12 rounded-2xl border border-border-subtle bg-bg-inset text-center space-y-3">
            <p className="text-sm font-mono text-text-muted">
              No resources found matching "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-mono text-accent-primary font-semibold hover:bg-accent-primary/20 transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
