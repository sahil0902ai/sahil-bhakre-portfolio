'use client';

import { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { BlogCard } from '@components/blog/BlogCard';
import { NewsletterSignup } from '@components/blog/NewsletterSignup';
import { blogPosts, blogCategories } from '@config/blog';

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Posts');

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All Posts' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((p) => p.isFeatured) || blogPosts[0];

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 text-left">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-border-subtle/50 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-xs border border-accent-primary/20 font-bold">
            <BookOpen className="h-3.5 w-3.5" />
            Engineering & Technical Writing
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Technical Insights & System Architecture
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Deep-dive articles on autonomous AI agents, web scraping architecture, Next.js 15 performance optimization, and full-stack system design.
          </p>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, or technologies..."
                className="w-full min-h-[44px] pl-11 pr-4 rounded-xl bg-bg-surface border border-border-subtle text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-colors shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 font-semibold'
                      : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post Banner */}
        {selectedCategory === 'All Posts' && !searchQuery && featuredPost && (
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold block">
              Featured Article Spotlight
            </span>
            <BlogCard post={featuredPost} isFeatured={true} />
          </div>
        )}

        {/* Blog Post Grid or Intentional Empty State */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle/40 pb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold">
              Articles ({filteredPosts.length})
            </h3>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-border-subtle bg-bg-surface space-y-3">
              <BookOpen className="h-8 w-8 text-accent-primary mx-auto" />
              <h4 className="text-base font-bold text-text-primary">Technical articles coming soon.</h4>
              <p className="text-xs text-text-muted max-w-md mx-auto">
                Articles on Next.js 15, FastAPI, and Playwright automation are currently in draft.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />

      </main>

      <Footer />
    </div>
  );
}
