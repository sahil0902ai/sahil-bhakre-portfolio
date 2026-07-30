'use client';

import { useState, useEffect } from 'react';
import { Mail, Clock, Shield, CheckCircle2, User, Phone, Building, DollarSign, RefreshCw, Lock } from 'lucide-react';
import { supabaseClient } from '@lib/supabase/client';

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch submitted lead details.');
      }

      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch submitted lead details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLeadStatus = async (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    try {
      // Optimistic state update
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );

      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error('Error updating status in Supabase:', data.error);
        // Revert on error
        fetchLeads();
      }
    } catch (e) {
      console.error('Error updating status:', e);
      fetchLeads();
    }
  };

  return (
    <main className="min-h-screen bg-bg-base py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle/50">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary font-mono text-xs font-semibold">
            <Lock className="h-3.5 w-3.5" />
            Private Admin Lead Inbox
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Customer Inquiries & Project Briefs
          </h1>
          <p className="text-xs text-text-secondary font-mono">
            Live database records fetched from Supabase PostgreSQL (`leads` table).
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border-subtle bg-bg-surface text-xs font-mono text-text-primary hover:border-accent-primary transition-all btn-micro w-fit"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-accent-primary ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Stats Quick Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-bg-inset border border-border-subtle/60 space-y-1">
          <span className="text-[10px] text-text-muted uppercase font-semibold">Total Submitted Inquiries</span>
          <div className="text-2xl font-bold text-text-primary">{leads.length}</div>
        </div>

        <div className="p-4 rounded-2xl bg-bg-inset border border-border-subtle/60 space-y-1">
          <span className="text-[10px] text-text-muted uppercase font-semibold">New Pending Leads</span>
          <div className="text-2xl font-bold text-accent-primary">
            {leads.filter((l) => l.status === 'New').length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-bg-inset border border-border-subtle/60 space-y-1">
          <span className="text-[10px] text-text-muted uppercase font-semibold">Contacted / Closed</span>
          <div className="text-2xl font-bold text-accent-success">
            {leads.filter((l) => l.status !== 'New').length}
          </div>
        </div>
      </div>

      {/* Main Leads List */}
      {loading ? (
        <div className="p-12 text-center font-mono text-xs text-text-muted">
          Fetching submitted customer details from Supabase...
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight text-xs font-mono">
          Error: {error}
        </div>
      ) : leads.length === 0 ? (
        <div className="p-12 rounded-3xl border border-border-subtle bg-bg-surface text-center space-y-3">
          <Mail className="h-10 w-10 text-accent-primary mx-auto" />
          <h3 className="text-lg font-bold text-text-primary">No Customer Inquiries Yet</h3>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            When visitors submit the Contact Form or 10-Step Discovery Wizard, their details will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="p-6 rounded-2xl border border-border-subtle bg-bg-surface/90 backdrop-blur-xl shadow-xl space-y-4 text-left transition-all hover:border-border-subtle/80"
            >
              {/* Lead Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary flex items-center justify-center font-bold font-mono text-xs">
                    {lead.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{lead.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(lead.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <button
                    onClick={() => updateLeadStatus(lead.id, 'New')}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      lead.status === 'New'
                        ? 'bg-accent-primary/20 border-accent-primary text-accent-primary font-bold'
                        : 'bg-bg-inset border-border-subtle text-text-muted hover:text-text-primary'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      lead.status === 'Contacted'
                        ? 'bg-accent-highlight/20 border-accent-highlight text-accent-highlight font-bold'
                        : 'bg-bg-inset border-border-subtle text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => updateLeadStatus(lead.id, 'Closed')}
                    className={`px-3 py-1 rounded-full border transition-colors ${
                      lead.status === 'Closed'
                        ? 'bg-accent-success/20 border-accent-success text-accent-success font-bold'
                        : 'bg-bg-inset border-border-subtle text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>

              {/* Lead Contact Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-inset border border-border-subtle/40">
                  <Mail className="h-4 w-4 text-accent-primary shrink-0" />
                  <a href={`mailto:${lead.email}`} className="text-text-primary hover:underline truncate">
                    {lead.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-inset border border-border-subtle/40">
                  <Phone className="h-4 w-4 text-accent-success shrink-0" />
                  <span className="text-text-primary truncate">{lead.phone || 'No phone provided'}</span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-inset border border-border-subtle/40">
                  <DollarSign className="h-4 w-4 text-accent-highlight shrink-0" />
                  <span className="text-text-primary truncate">Budget: {lead.budget}</span>
                </div>
              </div>

              {/* Lead Message Body */}
              <div className="space-y-1.5 pt-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block font-bold">
                  Project Brief & Customer Message
                </span>
                <p className="text-xs text-text-secondary leading-relaxed bg-bg-inset p-4 rounded-xl border border-border-subtle/40 font-mono whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>

              {/* Quick Actions (Email / WhatsApp) */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`mailto:${lead.email}?subject=Regarding Your Project Inquiry`}
                  className="px-4 py-2 rounded-xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow inline-flex items-center gap-1.5 btn-micro"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Send Email Reply</span>
                </a>

                {lead.phone && (
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border border-border-subtle bg-bg-inset text-xs font-mono text-text-primary hover:border-accent-success transition-all inline-flex items-center gap-1.5 btn-micro"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent-success" />
                    <span>Message on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}
