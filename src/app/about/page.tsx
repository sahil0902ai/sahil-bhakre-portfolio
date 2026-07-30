import type { Metadata } from 'next';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { About } from '@components/sections/About';

export const metadata: Metadata = {
  title: 'About — Sahil Bhakre | AI Engineer & Full-Stack Developer',
  description: 'Learn about Sahil Bhakre, a B.Tech Data Science student and AI Engineer specializing in Playwright lead extraction, FastAPI microservices, and Next.js 15 apps.',
  alternates: {
    canonical: 'https://sahilbhakre.com/about',
  },
  openGraph: {
    title: 'About — Sahil Bhakre | AI Engineer & Full-Stack Developer',
    description: 'Learn about Sahil Bhakre, a B.Tech Data Science student and AI Engineer specializing in Playwright lead extraction, FastAPI microservices, and Next.js 15 apps.',
    url: 'https://sahilbhakre.com/about',
    type: 'profile',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow pt-10">
        <About />
      </main>
      <Footer />
    </div>
  );
}
