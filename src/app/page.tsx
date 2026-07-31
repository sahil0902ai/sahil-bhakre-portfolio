'use client';

import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';
import { Hero } from '@components/sections/Hero';
import { Services } from '@components/sections/Services';
import { Projects } from '@components/sections/Projects';
import { Trust } from '@components/sections/Trust';
import { Contact } from '@components/sections/Contact';
import { About } from '@components/sections/About';
import { CodeShowcase } from '@components/sections/CodeShowcase';
import { Process } from '@components/sections/Process';
import { EngineeringStandards } from '@components/sections/EngineeringStandards';
import { Faq } from '@components/sections/Faq';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-text-primary">
      <Header />
      <main className="flex-grow">
        {/* 1. HERO */}
        <Hero />

        {/* 2. SERVICES ("What I Can Build") */}
        <Services />

        {/* 3. FEATURED PROJECTS */}
        <Projects />

        {/* 4. WHY WORK WITH ME */}
        <Trust />

        {/* 5. CONTACT ("Let's Build Something Great") */}
        <Contact />

        {/* 6. ABOUT */}
        <About />

        {/* 7. DEVELOPMENT PROCESS */}
        <Process />

        {/* 8. BLOG & ARTICLES */}
        <CodeShowcase />

        {/* 9. ENGINEERING STANDARDS & FAQ */}
        <EngineeringStandards />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
