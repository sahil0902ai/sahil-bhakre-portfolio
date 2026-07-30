'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Printer, CheckCircle2, Sparkles, ShieldCheck, 
  DollarSign, Clock, User, Building, Edit3, Lock, Globe, ArrowRight 
} from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';

export interface ProposalServiceOption {
  id: string;
  name: string;
  defaultPrice: number;
  description: string;
}

const AVAILABLE_SERVICES: ProposalServiceOption[] = [
  {
    id: 'ai-agents',
    name: 'Autonomous AI Agent & LangChain Integration',
    defaultPrice: 3500,
    description: 'Deterministic multi-step AI agents with Pydantic JSON schema output validation.',
  },
  {
    id: 'stealth-scraping',
    name: 'Playwright Stealth Web Scraping Pipeline',
    defaultPrice: 2500,
    description: 'Python AsyncIO Playwright extraction microservice with anti-bot evasion & proxy rotation.',
  },
  {
    id: 'fullstack-saas',
    name: 'Next.js 15 & FastAPI Full-Stack Web Application',
    defaultPrice: 4500,
    description: 'Production Next.js 15 App Router web application backed by FastAPI & PostgreSQL.',
  },
  {
    id: 'ui-design-system',
    name: 'Dark-Mode Glassmorphic UI/UX Design System',
    defaultPrice: 2000,
    description: 'Responsive Figma design system tokens, micro-animations, and WCAG 2.2 AAA contrast.',
  },
  {
    id: 'lighthouse-opt',
    name: '100/100 Lighthouse Performance & SEO Audit',
    defaultPrice: 1200,
    description: 'Sub-600ms page load speeds, 0.00 CLS, schema.org JSON-LD, and SWC optimizations.',
  },
];

export default function ProposalGeneratorPage() {
  const [clientName, setClientName] = useState('Acme Corp');
  const [clientContact, setClientContact] = useState('John Doe (CEO)');
  const [budget, setBudget] = useState('5000');
  const [timeline, setTimeline] = useState('2 Weeks');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['ai-agents', 'stealth-scraping']);
  const [customNotes, setCustomNotes] = useState(
    'Includes 100% Mutual NDA Protection, Fixed-Price Milestone Billing, 30-Day Post-Launch Warranty, and 24-Hour Response SLA.'
  );

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds(selectedServiceIds.filter((sId) => sId !== id));
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const selectedServices = AVAILABLE_SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const estimatedTotal = selectedServices.reduce((sum, s) => sum + s.defaultPrice, 0);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <div className="no-print">
        <Header />
      </div>

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 text-left">
        
        {/* Page Header */}
        <div className="no-print space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <FileText className="h-4 w-4" /> B2B Client Proposal Generator
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Interactive Project Proposal Engine
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Customize project scope, select engineering services, set target budgets, and export a branded, print-ready PDF proposal.
          </p>
        </div>

        {/* Generator Controls Grid vs Live PDF Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Form Controls (lg:col-span-5) */}
          <div className="no-print lg:col-span-5 space-y-6">
            <div className="p-6 premium-card space-y-5 border-accent-primary/30">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold block border-b border-border-subtle/40 pb-2">
                1. Client & Project Details
              </span>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-text-muted text-[11px] font-semibold">Client Company Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-text-muted text-[11px] font-semibold">Client Contact Person</label>
                  <input
                    type="text"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus-ring"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-text-muted text-[11px] font-semibold">Target Budget ($USD)</label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus-ring font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-text-muted text-[11px] font-semibold">Target Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus-ring font-mono"
                    >
                      <option value="1 Week">1 Week Sprint</option>
                      <option value="2 Weeks">2 Weeks Sprint</option>
                      <option value="4 Weeks">4 Weeks Sprint</option>
                      <option value="Custom">Custom Timeline</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="p-6 premium-card space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-highlight font-bold block border-b border-border-subtle/40 pb-2">
                2. Select Included Engineering Services
              </span>

              <div className="space-y-2.5">
                {AVAILABLE_SERVICES.map((srv) => {
                  const isChecked = selectedServiceIds.includes(srv.id);

                  return (
                    <button
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-accent-primary/10 border-accent-primary/50 text-text-primary'
                          : 'bg-bg-inset border-border-subtle/50 text-text-secondary hover:border-text-muted'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs">{srv.name}</h4>
                        <p className="text-[10px] text-text-muted leading-tight">{srv.description}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-accent-primary shrink-0">
                        ${srv.defaultPrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guarantee Notes */}
            <div className="p-6 premium-card space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-success font-bold block border-b border-border-subtle/40 pb-2">
                3. Guarantees & Terms
              </span>

              <textarea
                rows={3}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary leading-relaxed focus-ring font-mono"
              />
            </div>
          </div>

          {/* Right Column: Branded Printable Proposal Preview (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Export Button Bar */}
            <div className="no-print flex items-center justify-between bg-bg-inset p-4 rounded-2xl border border-border-subtle">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-primary" />
                <span className="font-mono text-xs text-text-primary font-bold">Live Branded Document Preview</span>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all btn-micro"
              >
                <Download className="h-4 w-4" />
                <span>Export PDF / Print</span>
              </button>
            </div>

            {/* Branded PDF Document Box */}
            <div className="print-area p-8 sm:p-10 rounded-2xl border border-border-subtle bg-bg-surface/80 backdrop-blur-md shadow-2xl space-y-8 text-left border-l-4 border-l-accent-primary">
              
              {/* Proposal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/50 pb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-primary font-bold block">
                    Engineering Project Proposal
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                    Sahil Bhakre — AI & Web Engineer
                  </h2>
                  <p className="text-xs font-mono text-text-muted">India • sahilbhakre.dev</p>
                </div>

                <div className="text-xs font-mono space-y-1 sm:text-right text-text-secondary">
                  <div className="text-accent-primary font-bold">PREPARED FOR:</div>
                  <div className="font-bold text-text-primary">{clientName}</div>
                  <div>Attn: {clientContact}</div>
                  <div className="text-text-muted">Date: July 25, 2026</div>
                </div>
              </div>

              {/* Proposal Summary */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold">
                  Executive Summary
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  This formal engineering proposal outlines the scope, technical deliverables, and fixed milestone pricing for building scalable, high-performance web systems for <strong className="text-text-primary">{clientName}</strong>.
                </p>
              </div>

              {/* Included Services Breakdown */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold border-b border-border-subtle/30 pb-1.5">
                  Scope of Work & Line-Item Deliverables
                </h3>

                <div className="space-y-2">
                  {selectedServices.map((service, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-bg-inset border border-border-subtle/50 flex items-start justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent-success shrink-0" />
                          <span className="font-bold text-text-primary">{service.name}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary leading-relaxed pl-6">{service.description}</p>
                      </div>
                      <span className="font-mono font-bold text-accent-primary shrink-0">${service.defaultPrice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline & Investment Table */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-text-muted uppercase block">Target Timeline</span>
                  <span className="font-bold text-text-primary text-sm">{timeline} Execution</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-text-muted uppercase block">Estimated Investment</span>
                  <span className="font-bold text-accent-primary text-sm">${estimatedTotal.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Terms & Guarantees */}
              <div className="space-y-2 text-xs">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-accent-success font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-accent-success" />
                  Client Guarantees & Terms
                </h3>
                <p className="text-[11px] text-text-secondary leading-relaxed font-mono p-3 rounded-xl bg-bg-inset border border-border-subtle/40">
                  {customNotes}
                </p>
              </div>

              {/* Sign-off Block */}
              <div className="pt-6 border-t border-border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
                <div className="space-y-1 w-full sm:w-auto">
                  <div className="border-b border-text-muted/40 w-48 h-8" />
                  <span className="text-[10px] text-text-muted">Sahil Bhakre (Lead Engineer)</span>
                </div>

                <div className="space-y-1 w-full sm:w-auto">
                  <div className="border-b border-text-muted/40 w-48 h-8" />
                  <span className="text-[10px] text-text-muted">Client Acceptance ({clientName})</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
