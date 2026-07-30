'use client';

import { useState } from 'react';
import { ProjectDiscoveryForm } from '@components/sections/ProjectDiscoveryForm';
import { Mail, MessageSquare, Instagram, Clock, ShieldCheck, CheckCircle2, Calendar, Send, Sparkles, User, Phone, DollarSign } from 'lucide-react';
import { socialLinks } from '@config/portfolio';

export function Contact() {
  const [activeTab, setActiveTab] = useState<'quick' | 'wizard'>('quick');
  const [quickForm, setQuickForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '$3,000 – $6,000',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quickForm),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to record inquiry.');
      }

      setSubmitted(true);
      setQuickForm({
        name: '',
        email: '',
        phone: '',
        budget: '$3,000 – $6,000',
        message: '',
      });
    } catch (err: any) {
      console.error('Error submitting quick inquiry form:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again or WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 sm:space-y-12 text-left border-t border-border-subtle/40">
      
      {/* Section Header */}
      <div className="text-center space-y-3.5 max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold flex items-center justify-center gap-1.5">
          <Mail className="h-4 w-4" /> Get in Touch
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
          Start a Conversation
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Have a project in mind or want to discuss an idea? Send a direct inquiry below or connect via WhatsApp and email.
        </p>

        {/* Response Time Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-subtle text-accent-primary font-mono text-[11px] font-semibold mt-1">
          <Clock className="h-3.5 w-3.5 text-accent-success" />
          <span>Usually within 24 hours.</span>
        </div>
      </div>

      {/* Direct Contact Buttons */}
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

      {/* Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <ShieldCheck className="h-5 w-5 text-accent-primary mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">100% NDA Protected</span>
          <span className="text-[10px] text-text-muted">Privacy First</span>
        </div>

        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <CheckCircle2 className="h-5 w-5 text-accent-success mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">Clear Milestones</span>
          <span className="text-[10px] text-text-muted">Structured Delivery</span>
        </div>

        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <Calendar className="h-5 w-5 text-accent-highlight mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">Fast Turnaround</span>
          <span className="text-[10px] text-text-muted">Direct Communication</span>
        </div>

        <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle/50 text-center space-y-1">
          <ShieldCheck className="h-5 w-5 text-accent-primary mx-auto" />
          <span className="font-mono text-xs font-bold text-text-primary block">30-Day Warranty</span>
          <span className="text-[10px] text-text-muted">Post-Launch Support</span>
        </div>
      </div>

      {/* Form Mode Toggle Header */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={() => setActiveTab('quick')}
          className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'quick'
              ? 'bg-accent-gradient text-text-primary shadow-glow'
              : 'bg-bg-inset border border-border-subtle text-text-muted hover:text-text-primary'
          }`}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Quick Inquiry (30 Sec)</span>
        </button>

        <button
          onClick={() => setActiveTab('wizard')}
          className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'wizard'
              ? 'bg-accent-gradient text-text-primary shadow-glow'
              : 'bg-bg-inset border border-border-subtle text-text-muted hover:text-text-primary'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>10-Step Discovery Wizard</span>
        </button>
      </div>

      {/* Form Content Area */}
      {activeTab === 'quick' ? (
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="p-8 sm:p-10 rounded-3xl border border-accent-success/30 bg-bg-surface text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-accent-success/20 border border-accent-success/40 text-accent-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Inquiry Sent Successfully!</h3>
              <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed font-mono">
                Thank you! Your details have been received and saved. Sahil Bhakre will review your project brief and reply within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-full border border-border-subtle bg-bg-inset text-xs font-mono text-accent-primary hover:bg-bg-surface transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="p-6 sm:p-10 rounded-3xl border border-border-subtle bg-bg-surface/90 backdrop-blur-2xl shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-text-primary tracking-tight">Direct Project Inquiry</h3>
                <p className="text-xs text-text-secondary font-mono">
                  Fill in your details below. Your submission will immediately save to the database inbox.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-mono text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-accent-primary" /> Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                    placeholder="e.g. Sahil Bhakre"
                    className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-accent-primary" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={quickForm.email}
                    onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-mono text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-accent-success" /> Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                    placeholder="+91 9823511929"
                    className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-accent-highlight" /> Estimated Budget
                  </label>
                  <select
                    value={quickForm.budget}
                    onChange={(e) => setQuickForm({ ...quickForm, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                  >
                    <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                    <option value="$3,000 – $6,000">$3,000 – $6,000</option>
                    <option value="$6,000 – $12,000">$6,000 – $12,000</option>
                    <option value="$12,000+">$12,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-mono text-text-muted text-[11px] font-semibold block">Project Details & Requirements *</label>
                <textarea
                  required
                  rows={4}
                  value={quickForm.message}
                  onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                  placeholder="Tell me about your project goals, technical needs, or timelines..."
                  className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2 btn-micro"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Submitting Inquiry...' : 'Send Inquiry Now'}</span>
              </button>

            </form>
          )}
        </div>
      ) : (
        <ProjectDiscoveryForm />
      )}

    </section>
  );
}
