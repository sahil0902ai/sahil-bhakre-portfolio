import type { Metadata } from 'next';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { Services } from '@components/sections/Services';

export const metadata: Metadata = {
  title: 'Engineering Services — AI Automation, Next.js Apps & Scraping',
  description: 'Explore custom software engineering services provided by Sahil Bhakre: AI Agent Systems, Playwright Lead Extraction, FastAPI REST Backends, and Next.js 15 Web Apps.',
  alternates: {
    canonical: 'https://sahilbhakre.com/services',
  },
  openGraph: {
    title: 'Engineering Services — AI Automation, Next.js Apps & Scraping',
    description: 'Explore custom software engineering services provided by Sahil Bhakre: AI Agent Systems, Playwright Lead Extraction, FastAPI REST Backends, and Next.js 15 Web Apps.',
    url: 'https://sahilbhakre.com/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow pt-10">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
