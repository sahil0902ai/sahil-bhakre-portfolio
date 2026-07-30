'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error captured:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl border border-border-subtle bg-bg-surface/90 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="w-12 h-12 rounded-full bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight flex items-center justify-center mx-auto">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Something Went Wrong</h2>
          <p className="text-xs text-text-secondary leading-relaxed font-mono">
            An unexpected error occurred while loading this page. Please try refreshing or return home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-accent-gradient text-text-primary text-xs font-bold shadow-glow flex items-center justify-center gap-2 btn-micro"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-border-subtle bg-bg-inset text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2 btn-micro"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
