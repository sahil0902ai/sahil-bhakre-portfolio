import Link from 'next/link';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-32 text-center">
        <div className="p-8 sm:p-12 premium-card max-w-md w-full space-y-6 flex flex-col items-center">
          <div className="p-4 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary">
            <AlertCircle className="h-10 w-10 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
            <p className="text-xs text-text-secondary">
              The page or resource you are looking for does not exist or has been moved.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all"
          >
            <Home className="h-4 w-4" />
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
