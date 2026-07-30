'use client';

import { MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowUp, Mail, MessageSquare, Instagram } from 'lucide-react';
import { personalInfo, socialLinks } from '@config/portfolio';

export function Footer() {
  const handleScrollTop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  const navLinks = [
    { label: 'Solutions', href: '#capabilities' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-border-subtle/50 bg-bg-surface/80 backdrop-blur-xl py-12 px-4 sm:px-6 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Top Footer Row: Logo, Short Tagline & Back-to-Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border-subtle/40">
          
          {/* Logo & Tagline */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Link
                href="/"
                className="font-display font-bold text-xl tracking-tight text-text-primary hover:text-accent-primary transition-colors focus-ring"
              >
                {personalInfo.monogram}
              </Link>
              <span className="h-4 w-px bg-border-subtle" />
              <span className="font-bold text-text-primary text-sm">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-text-secondary font-mono">
              AI Engineer • Full-Stack Developer • Automation Specialist
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-bg-inset text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-primary/40 transition-all min-h-[44px] w-fit"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Middle Footer Row: Primary Navigation & Real Social Icons (Email, WhatsApp, Instagram ONLY) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-border-subtle/40">
          
          {/* 6 Primary Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-text-secondary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-accent-primary transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Contact Links (Email, WhatsApp, Instagram ONLY) */}
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.email.href}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-bg-inset border border-border-subtle text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="Email"
              title="Email: sahilbhakre8@gmail.com"
            >
              <Mail className="h-4 w-4" />
            </a>

            <a
              href={socialLinks.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-bg-inset border border-border-subtle text-text-secondary hover:text-accent-success transition-colors"
              aria-label="WhatsApp"
              title="WhatsApp: +91 9823511929"
            >
              <MessageSquare className="h-4 w-4" />
            </a>

            <a
              href={socialLinks.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-bg-inset border border-border-subtle text-text-secondary hover:text-accent-highlight transition-colors"
              aria-label="Instagram"
              title="Instagram: @sahil.builds_"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Footer Row: Copyright Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-text-muted">
          <span>© {new Date().getFullYear()} Sahil Bhakre. All rights reserved.</span>
          <span className="text-accent-success font-semibold">● Production Ready Software</span>
        </div>

      </div>
    </footer>
  );
}
