import type { Metadata } from 'next';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { Projects } from '@components/sections/Projects';

export const metadata: Metadata = {
  title: 'Engineering Portfolio & Case Studies — Sahil Bhakre',
  description: 'Browse production case studies in AI Agent Automations, Playwright Lead Scraping Microservices, and Next.js 15 Design Systems by Sahil Bhakre.',
  alternates: {
    canonical: 'https://sahilbhakre.com/projects',
  },
  openGraph: {
    title: 'Engineering Portfolio & Case Studies — Sahil Bhakre',
    description: 'Browse production case studies in AI Agent Automations, Playwright Lead Scraping Microservices, and Next.js 15 Design Systems by Sahil Bhakre.',
    url: 'https://sahilbhakre.com/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow pt-10">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
