'use client';

import { ProjectDiscoveryForm } from '@components/sections/ProjectDiscoveryForm';
import { Mail, MessageSquare, Instagram, Clock, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { socialLinks } from '@config/portfolio';

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 sm:space-y-12 text-left border-t border-border-subtle/40">
      
      {/* Section Header (Real Contact Information) */}
      <div className="text-center space-y-3.5 max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold flex items-center justify-center gap-1.5">
          <Mail className="h-4 w-4" /> Get in Touch
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
          Start a Conversation
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Have a project in mind or want to discuss an idea? Feel free to reach out through WhatsApp, email, or Instagram. I'd be happy to connect and explore how we can build something great together.
        </p>

        {/* Response Time Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-subtle text-accent-primary font-mono text-[11px] font-semibold mt-1">
          <Clock className="h-3.5 w-3.5 text-accent-success" />
          <span>Usually within 24 hours.</span>
        </div>
      </div>

      {/* Preferred Contact Touch Buttons: Email, WhatsApp, Instagram */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto font-mono">
        <a
          href={socialLinks.email.href}
          className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-bg-inset border border-border-subtle hover:border-accent-primary/60 text-xs font-bold text-text-primary min-h-[54px] transition-all btn-micro"
        >
          <Mail className="h-4.5 w-4.5 text-accent-primary shrink-0" />
          <span>{socialLinks.email.value}</span>
        </a>

        <a
          href={socialLinks.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow min-h-[54px] transition-all btn-micro"
        >
          <MessageSquare className="h-4.5 w-4.5 shrink-0" />
          <span>Message on WhatsApp</span>
        </a>

        <a
          href={socialLinks.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-bg-inset border border-border-subtle hover:border-accent-highlight/60 text-xs font-bold text-text-primary min-h-[54px] transition-all btn-micro"
        >
          <Instagram className="h-4.5 w-4.5 text-accent-highlight shrink-0" />
          <span>{socialLinks.instagram.value}</span>
        </a>
      </div>

      {/* Trust & Communication Guarantees */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <ShieldCheck className="h-5 w-5 text-accent-primary mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">100% NDA Protected</span>
          <span className="text-[10px] text-text-muted">Strict Privacy First</span>
        </div>

        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <CheckCircle2 className="h-5 w-5 text-accent-success mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">Clear Milestones</span>
          <span className="text-[10px] text-text-muted">Structured Updates</span>
        </div>

        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <Calendar className="h-5 w-5 text-accent-highlight mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">Fast Turnaround</span>
          <span className="text-[10px] text-text-muted">Direct Communication</span>
        </div>

        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <ShieldCheck className="h-5 w-5 text-accent-primary mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">30-Day Support</span>
          <span className="text-[10px] text-text-muted">Post-Launch Warranty</span>
        </div>
      </div>

      {/* Project Discovery Form Container */}
      <ProjectDiscoveryForm />

    </section>
  );
}
