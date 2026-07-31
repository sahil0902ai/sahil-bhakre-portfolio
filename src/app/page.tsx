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
      <main className="flex-grow flex flex-col">
        
        {/* 1. MOBILE ORDER 1: HERO */}
        <div className="order-1 md:order-none">
          <Hero />
        </div>

        {/* 2. MOBILE ORDER 2: SERVICES ("What Services I Offer") */}
        <div className="order-2 md:order-none">
          <Services />
        </div>

        {/* 3. MOBILE ORDER 3: FEATURED PROJECTS ("Proof of Work") */}
        <div className="order-3 md:order-none">
          <Projects />
        </div>

        {/* 4. MOBILE ORDER 4: WHY WORK WITH ME ("Why Clients Should Trust Me") */}
        <div className="order-4 md:order-none">
          <Trust />
        </div>

        {/* 5. MOBILE ORDER 5: CONTACT ("How to Contact Me") */}
        <div className="order-5 md:order-none">
          <Contact />
        </div>

        {/* 6. MOBILE ORDER 6: ABOUT */}
        <div className="order-6 md:order-none">
          <About />
        </div>

        {/* 7. MOBILE ORDER 7: PROCESS METHODOLOGY */}
        <div className="order-7 md:order-none">
          <Process />
        </div>

        {/* 8. MOBILE ORDER 8: BLOG & ARTICLES */}
        <div className="order-8 md:order-none">
          <CodeShowcase />
        </div>

        {/* 9. MOBILE ORDER 9: ENGINEERING STANDARDS & FAQ */}
        <div className="order-9 md:order-none">
          <EngineeringStandards />
          <Faq />
        </div>

      </main>
      <Footer />
    </div>
  );
}
