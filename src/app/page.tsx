'use client';

import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { Hero } from '@components/sections/Hero';
import { TrustedTechnologies } from '@components/sections/TrustedTechnologies';
import { About } from '@components/sections/About';
import { Services } from '@components/sections/Services';
import { Projects } from '@components/sections/Projects';
import { CodeShowcase } from '@components/sections/CodeShowcase';
import { DeveloperDashboard } from '@components/sections/DeveloperDashboard';
import { Technology } from '@components/sections/Technology';
import { Process } from '@components/sections/Process';
import { Testimonials } from '@components/sections/Testimonials';
import { Trust } from '@components/sections/Trust';
import { EngineeringStandards } from '@components/sections/EngineeringStandards';
import { Faq } from '@components/sections/Faq';
import { Contact } from '@components/sections/Contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustedTechnologies />
        <About />
        <Services />
        <Projects />
        <CodeShowcase />
        <DeveloperDashboard />
        <Technology />
        <Process />
        <Testimonials />
        <Trust />
        <EngineeringStandards />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
