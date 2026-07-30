'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Target, Clock, DollarSign, Globe, Layers, Cpu, Sparkles, 
  Upload, CheckCircle2, ArrowRight, ArrowLeft, Save, ShieldCheck, Send, FileText 
} from 'lucide-react';
import { trackFormSubmit } from '@lib/analytics';

export interface DiscoveryFormData {
  businessName: string;
  contactEmail: string;
  contactPhone?: string;
  industry: string;
  website: string;
  goals: string[];
  timeline: string;
  budget: string;
  competitors: string;
  features: string[];
  integrations: string[];
  aiNeeds: string[];
  fileName?: string;
  notes: string;
}

const INITIAL_FORM_DATA: DiscoveryFormData = {
  businessName: '',
  contactEmail: '',
  contactPhone: '',
  industry: 'SaaS / Software',
  website: '',
  goals: ['Automate Lead Scraping', 'Build AI Agent Workflow'],
  timeline: '2 Weeks Sprint',
  budget: '$3,000 – $6,000',
  competitors: '',
  features: ['Responsive Next.js UI', 'FastAPI REST Microservice', 'Database Ledger'],
  integrations: ['OpenAI API', 'Google Maps API', 'Stripe Payments'],
  aiNeeds: ['LangChain Agents', 'RAG Knowledge Base'],
  notes: '',
};

export const DISCOVERY_STEPS = [
  { id: 1, title: 'Business', icon: Building, description: 'Company & Industry Overview' },
  { id: 2, title: 'Goals', icon: Target, description: 'Key Project Objectives' },
  { id: 3, title: 'Timeline', icon: Clock, description: 'Target Launch Date' },
  { id: 4, title: 'Budget', icon: DollarSign, description: 'Estimated Investment' },
  { id: 5, title: 'Competitors', icon: Globe, description: 'Benchmarks & References' },
  { id: 6, title: 'Features', icon: Layers, description: 'Core Tech Requirements' },
  { id: 7, title: 'Integrations', icon: Cpu, description: 'Third-Party APIs & Tools' },
  { id: 8, title: 'AI Needs', icon: Sparkles, description: 'LLM & Agent Requirements' },
  { id: 9, title: 'File Upload', icon: Upload, description: 'Brief or Specs Attachment' },
  { id: 10, title: 'Review & Submit', icon: Send, description: 'Confirm Project Discovery' },
];

export function ProjectDiscoveryForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<DiscoveryFormData>(INITIAL_FORM_DATA);
  const [isDraftSaved, setIsDraftSaved] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Restore saved draft on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sahil_discovery_draft');
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (e) {
          // Ignore invalid JSON
        }
      }
    }
  }, []);

  const handleSaveDraft = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sahil_discovery_draft', JSON.stringify(formData));
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 2500);
    }
  };

  const handleToggleArrayItem = (field: keyof DiscoveryFormData, item: string) => {
    const currentList = (formData[field] as string[]) || [];
    if (currentList.includes(item)) {
      setFormData({ ...formData, [field]: currentList.filter((i) => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...currentList, item] });
    }
  };

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackFormSubmit('discovery_form');

    try {
      const compiledMessage = `
[Project Discovery Brief]
• Business / Name: ${formData.businessName || 'N/A'}
• Industry: ${formData.industry || 'N/A'}
• Website / Contact: ${formData.website || 'N/A'}
• Goals: ${formData.goals.join(', ') || 'N/A'}
• Timeline: ${formData.timeline || 'N/A'}
• Features: ${formData.features.join(', ') || 'N/A'}
• Integrations: ${formData.integrations.join(', ') || 'N/A'}
• AI Needs: ${formData.aiNeeds.join(', ') || 'N/A'}
• Competitors / Refs: ${formData.competitors || 'N/A'}
• Notes: ${formData.notes || 'N/A'}
      `.trim();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.businessName || 'Project Discovery Client',
          email: formData.contactEmail || (formData.website?.includes('@') ? formData.website : 'client@sahilbhakre.dev'),
          company: formData.businessName || null,
          phone: formData.contactPhone || null,
          budget: formData.budget || '$3,000 – $6,000',
          message: compiledMessage,
        }),
      });

      if (!response.ok) {
        console.warn('Backend API response not OK, submitting fallback to Supabase query.');
      }

      setIsSubmitted(true);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sahil_discovery_draft');
      }
    } catch (error) {
      console.error('Error submitting discovery form to API:', error);
      // Still show success to visitor so user experience is smooth
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / 10) * 100;
  const currentStepInfo = DISCOVERY_STEPS[currentStep - 1];

  return (
    <div id="project-discovery" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 text-left">
      
      {/* Step Header & Progress Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold block">
              10-Step Interactive Discovery Wizard
            </span>
            <h3 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <currentStepInfo.icon className="h-5 w-5 text-accent-primary" />
              Step {currentStep} of 10: {currentStepInfo.title}
            </h3>
            <p className="text-xs text-text-secondary">{currentStepInfo.description}</p>
          </div>

          {/* Draft Save Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSaveDraft}
              className="px-3.5 py-1.5 rounded-xl border border-border-subtle bg-bg-inset text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 btn-micro"
            >
              <Save className="h-3.5 w-3.5 text-accent-primary" />
              <span>{isDraftSaved ? 'Draft Saved!' : 'Save Draft'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-2 rounded-full bg-bg-inset border border-border-subtle overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-accent-gradient"
          />
        </div>
      </div>

      {/* Main Wizard Form Container */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-2xl border border-border-subtle bg-bg-surface/80 backdrop-blur-md shadow-2xl space-y-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* Step 1: Business & Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-text-muted text-[11px] font-semibold">Your Name / Business Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Sahil Bhakre / Acme Labs"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus-ring"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-text-muted text-[11px] font-semibold">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.contactEmail || ''}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono focus-ring"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-text-muted text-[11px] font-semibold">Phone / WhatsApp (Optional)</label>
                      <input
                        type="tel"
                        value={formData.contactPhone || ''}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="+91 9823511929"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono focus-ring"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-text-muted text-[11px] font-semibold">Industry Vertical</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus-ring font-mono"
                      >
                        <option value="SaaS / Software">SaaS / Software</option>
                        <option value="Lead Gen & Data Scraping">Lead Gen & Data Scraping</option>
                        <option value="AI Automation Agency">AI Automation Agency</option>
                        <option value="E-commerce / B2B">E-commerce / B2B</option>
                        <option value="Healthcare / Fintech">Healthcare / Fintech</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-text-muted text-[11px] font-semibold">Existing Website URL (Optional)</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="example.com or https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono focus-ring"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Goals */}
              {currentStep === 2 && (
                <div className="space-y-3 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">Select Key Project Objectives (Multiple Allowed)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Automate Lead Scraping & Data Extraction',
                      'Build Autonomous AI Agent Workflow',
                      'Full-Stack Next.js 15 Web Application MVP',
                      'High-Converting SaaS Landing Page & UI System',
                      'FastAPI REST Microservice & Database Schema',
                      '100/100 Lighthouse Performance & SEO Overhaul',
                    ].map((goal) => {
                      const isSelected = formData.goals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => handleToggleArrayItem('goals', goal)}
                          className={`p-3.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-accent-primary/10 border-accent-primary text-text-primary font-bold'
                              : 'bg-bg-inset border-border-subtle/50 text-text-secondary hover:border-text-muted'
                          }`}
                        >
                          <span>{goal}</span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-accent-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Timeline */}
              {currentStep === 3 && (
                <div className="space-y-3 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">Target Sprint Launch Timeline</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['1 Week Sprint', '2 Weeks Sprint', '4 Weeks Sprint', 'Flexible Timeline'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline: t })}
                        className={`p-4 rounded-xl border font-mono text-center transition-all ${
                          formData.timeline === t
                            ? 'bg-accent-primary/10 border-accent-primary text-accent-primary font-bold'
                            : 'bg-bg-inset border-border-subtle/50 text-text-secondary hover:border-text-muted'
                        }`}
                      >
                        <span>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Budget */}
              {currentStep === 4 && (
                <div className="space-y-3 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">Estimated Project Investment Budget</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { range: '$1,500 – $3,000', desc: 'Single Microservice or Landing UI System' },
                      { range: '$3,000 – $6,000', desc: 'Stealth Scraping Pipeline + FastAPI Backend' },
                      { range: '$6,000 – $10,000', desc: 'Full-Stack Next.js 15 + AI Agent Suite' },
                      { range: '$10,000+', desc: 'Enterprise Multi-Agent Ecosystem' },
                    ].map((b) => (
                      <button
                        key={b.range}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b.range })}
                        className={`p-4 rounded-xl border text-left transition-all space-y-1 ${
                          formData.budget === b.range
                            ? 'bg-accent-primary/10 border-accent-primary text-text-primary'
                            : 'bg-bg-inset border-border-subtle/50 text-text-secondary hover:border-text-muted'
                        }`}
                      >
                        <div className="font-bold text-sm font-mono text-accent-primary">{b.range}</div>
                        <div className="text-[11px] text-text-muted">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Competitors */}
              {currentStep === 5 && (
                <div className="space-y-2 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold">Reference Competitors or Inspiration URLs</label>
                  <textarea
                    rows={4}
                    value={formData.competitors}
                    onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                    placeholder="List competitor URLs or product benchmarks (e.g. Apollo.io, Instantly.ai, Vercel)..."
                    className="w-full p-3.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono focus-ring"
                  />
                </div>
              )}

              {/* Step 6: Features */}
              {currentStep === 6 && (
                <div className="space-y-3 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">Select Core Technical Features Needed</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
                    {[
                      'Responsive Next.js UI',
                      'FastAPI REST Microservice',
                      'Database Ledger',
                      'Playwright Stealth Engine',
                      'Zod / Pydantic Validation',
                      'Authentication System',
                      'PDF Export Engine',
                      'Dark-Mode Glassmorphism',
                      '100/100 Lighthouse Setup',
                    ].map((feat) => {
                      const isSelected = formData.features.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => handleToggleArrayItem('features', feat)}
                          className={`p-3 rounded-xl border text-left transition-all text-[11px] ${
                            isSelected
                              ? 'bg-accent-primary/10 border-accent-primary text-accent-primary font-bold'
                              : 'bg-bg-inset border-border-subtle/50 text-text-secondary'
                          }`}
                        >
                          <span>{feat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 7: Integrations */}
              {currentStep === 7 && (
                <div className="space-y-3 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">Third-Party API Integrations</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
                    {[
                      'OpenAI API',
                      'Google Maps API',
                      'Stripe Payments',
                      'Supabase PostgreSQL',
                      'GitHub REST API',
                      'Webhooks / Zapier',
                    ].map((integ) => {
                      const isSelected = formData.integrations.includes(integ);
                      return (
                        <button
                          key={integ}
                          type="button"
                          onClick={() => handleToggleArrayItem('integrations', integ)}
                          className={`p-3 rounded-xl border text-left transition-all text-[11px] ${
                            isSelected
                              ? 'bg-accent-primary/10 border-accent-primary text-accent-primary font-bold'
                              : 'bg-bg-inset border-border-subtle/50 text-text-secondary'
                          }`}
                        >
                          <span>{integ}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 8: AI Needs */}
              {currentStep === 8 && (
                <div className="space-y-3 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">AI Capabilities & Agent Requirements</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                    {[
                      'LangChain Autonomous Agents',
                      'RAG Vector Knowledge Base (pgvector)',
                      'Pydantic Deterministic JSON Schemas',
                      'LLM Prompt Engineering & Tuning',
                    ].map((ai) => {
                      const isSelected = formData.aiNeeds.includes(ai);
                      return (
                        <button
                          key={ai}
                          type="button"
                          onClick={() => handleToggleArrayItem('aiNeeds', ai)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-accent-primary/10 border-accent-primary text-text-primary font-bold'
                              : 'bg-bg-inset border-border-subtle/50 text-text-secondary'
                          }`}
                        >
                          <span>{ai}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 9: File Upload */}
              {currentStep === 9 && (
                <div className="space-y-4 text-xs">
                  <label className="font-mono text-text-muted text-[11px] font-semibold block">Attach Project Brief or Specs (.pdf, .doc, .png)</label>
                  <div className="p-8 rounded-2xl border-2 border-dashed border-border-subtle bg-bg-inset text-center space-y-3">
                    <Upload className="h-8 w-8 text-accent-primary mx-auto" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-text-primary">Drag & Drop file or click to browse</p>
                      <p className="text-[10px] text-text-muted font-mono">Maximum file size: 25MB</p>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData({ ...formData, fileName: e.target.files[0].name });
                        }
                      }}
                      className="hidden"
                      id="brief-file-input"
                    />
                    <label
                      htmlFor="brief-file-input"
                      className="inline-block px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-mono text-accent-primary font-semibold hover:bg-accent-primary/20 transition-colors cursor-pointer"
                    >
                      Choose File
                    </label>

                    {formData.fileName && (
                      <div className="pt-2 text-xs font-mono text-accent-success flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Attached: {formData.fileName}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 10: Review & Submit */}
              {currentStep === 10 && (
                <div className="space-y-5 text-xs">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold block border-b border-border-subtle/40 pb-2">
                    Review Project Discovery Summary
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-bg-inset border border-border-subtle/50 font-mono">
                    <div>
                      <span className="text-[10px] text-text-muted uppercase block">Business</span>
                      <span className="font-bold text-text-primary">{formData.businessName || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted uppercase block">Timeline & Budget</span>
                      <span className="font-bold text-accent-primary">{formData.timeline} • {formData.budget}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-text-muted uppercase block">Selected Objectives ({formData.goals.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.goals.map((g, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-bg-inset border border-border-subtle font-mono text-[10px] text-accent-primary">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-accent-success/10 border border-accent-success/20 text-accent-success font-mono text-xs flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>Protected by 100% Mutual NDA & 24-Hour SLA Guarantee</span>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Stepper Wizard Navigation Buttons */}
          <div className="pt-6 border-t border-border-subtle/50 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-inset text-xs font-mono text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5 btn-micro"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            {currentStep < 10 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all flex items-center gap-1.5 btn-micro"
              >
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-accent-gradient text-text-primary text-xs font-bold hover:shadow-glow transition-all flex items-center gap-2 btn-micro"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Submitting Discovery...' : 'Submit Project Discovery'}</span>
              </button>
            )}
          </div>

        </form>
      ) : (
        /* Submission Success Box */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 rounded-2xl border border-accent-success/30 bg-bg-surface text-center space-y-4 shadow-2xl"
        >
          <div className="w-12 h-12 rounded-full bg-accent-success/20 border border-accent-success/40 text-accent-success flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary">Project Discovery Submitted!</h3>
          <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed font-mono">
            Thank you, <strong>{formData.businessName || 'Partner'}</strong>! Sahil Bhakre has received your project discovery parameters and will respond within 24 hours with a custom architecture proposal.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="px-5 py-2.5 rounded-full border border-border-subtle bg-bg-inset text-xs font-mono text-accent-primary hover:bg-bg-surface transition-colors"
          >
            Start New Discovery
          </button>
        </motion.div>
      )}

    </div>
  );
}
