'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight, Tag } from 'lucide-react';
import { BlogPost } from '@config/blog';

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

export function BlogCard({ post, isFeatured }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`premium-card premium-card-hover group relative flex flex-col justify-between p-6 sm:p-8 space-y-6 ${
        isFeatured ? 'md:col-span-2 border-accent-primary/30 bg-accent-primary/5' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle/40 pb-4">
          <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-[11px] border border-accent-primary/20">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-text-secondary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-accent-primary" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 text-left">
          <Link href={`/blog/${post.slug}`} className="block group">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent-primary transition-colors leading-snug">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-text-secondary line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-inset border border-border-subtle text-[10px] font-mono text-text-secondary"
            >
              <Tag className="h-2.5 w-2.5 text-accent-primary" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Author & Link */}
      <div className="flex items-center justify-between border-t border-border-subtle/40 pt-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center font-mono text-xs font-bold text-accent-primary">
            {post.author.avatar}
          </div>
          <div className="text-xs text-left">
            <span className="font-semibold text-text-primary block leading-none">{post.author.name}</span>
            <span className="text-[10px] text-text-muted leading-none">{post.author.role}</span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-primary group-hover:text-text-primary transition-colors"
        >
          Read Article
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}
