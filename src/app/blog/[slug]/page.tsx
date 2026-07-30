import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { TableOfContents } from '@components/blog/TableOfContents';
import { ShareButtons } from '@components/blog/ShareButtons';
import { MdxRenderer } from '@components/blog/MdxRenderer';
import { BlogCard } from '@components/blog/BlogCard';
import { JsonLdSchema } from '@components/shared/JsonLdSchema';
import { blogPosts } from '@config/blog';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} — Sahil Bhakre Tech Blog`,
    description: post.description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const pageUrl = `https://sahilbhakre.dev/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <JsonLdSchema
        type="Article"
        articleData={{
          title: post.title,
          description: post.description,
          datePublished: post.date,
          slug: post.slug,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Header />

      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-12 text-left">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent-primary transition-colors btn-micro"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 border-b border-border-subtle/50 pb-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-xs border border-accent-primary/20">
              {post.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-border-subtle" />
            <span className="flex items-center gap-1 text-xs font-mono text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-border-subtle" />
            <span className="flex items-center gap-1 text-xs font-mono text-accent-primary">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {post.description}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center font-mono text-sm font-bold text-accent-primary">
              {post.author.avatar}
            </div>
            <div>
              <span className="font-semibold text-text-primary text-sm block">{post.author.name}</span>
              <span className="text-xs text-text-muted">{post.author.role}</span>
            </div>
          </div>
        </div>

        {/* Article Content & Table of Contents Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article MDX Content */}
          <article className="lg:col-span-8 space-y-8">
            <MdxRenderer content={post.content} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-border-subtle/50">
              {post.tags.map((t, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bg-surface border border-border-subtle font-mono text-xs text-text-secondary">
                  <Tag className="h-3 w-3 text-accent-primary" />
                  {t}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <ShareButtons title={post.title} url={pageUrl} />
          </article>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <TableOfContents items={post.toc} />
          </aside>
        </div>

        {/* Related Articles Section */}
        <div className="space-y-6 border-t border-border-subtle/50 pt-12">
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent-primary">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <BlogCard key={rel.slug} post={rel} />
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
