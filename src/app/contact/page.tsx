import type { Metadata } from 'next';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { Contact } from '@components/sections/Contact';

export const metadata: Metadata = {
  title: 'Project Inquiry Wizard & Contact — Sahil Bhakre',
  description: 'Submit your project scope, budget, and timeline to initiate an AI automation or full-stack Next.js 15 web engineering project with Sahil Bhakre.',
  alternates: {
    canonical: 'https://sahilbhakre.com/contact',
  },
  openGraph: {
    title: 'Project Inquiry Wizard & Contact — Sahil Bhakre',
    description: 'Submit your project scope, budget, and timeline to initiate an AI automation or full-stack Next.js 15 web engineering project with Sahil Bhakre.',
    url: 'https://sahilbhakre.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow pt-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
