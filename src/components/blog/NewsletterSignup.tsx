'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Send } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitting(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Newsletter submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-2xl border border-accent-primary/30 bg-gradient-to-br from-bg-surface via-accent-primary/5 to-bg-surface shadow-2xl space-y-6 text-left relative overflow-hidden">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-xs border border-accent-primary/20">
          <Mail className="h-3.5 w-3.5" />
          Technical Insights Newsletter
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Stay Ahead in AI & Full-Stack Engineering
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
          Get actionable breakdowns on AI agent architecture, Next.js 15 performance optimization, and autonomous web scraping pipelines delivered directly to your inbox.
        </p>
      </div>

      {submitted ? (
        <div className="p-4 rounded-xl bg-accent-success/10 border border-accent-success/30 text-accent-success flex items-center gap-3 text-sm font-semibold">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Thank you for subscribing! Check your email for confirmation.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            required
            className="flex-1 min-h-[48px] px-4 rounded-xl bg-bg-inset border border-border-subtle text-text-primary text-xs sm:text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary"
          />
          <button
            type="submit"
            className="min-h-[48px] px-6 rounded-xl bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all flex items-center justify-center gap-2 btn-micro"
          >
            <span>Subscribe</span>
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
