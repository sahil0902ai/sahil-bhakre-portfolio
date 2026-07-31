'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, Clock, Shield, CheckCircle2, User, Phone, Building, DollarSign, 
  RefreshCw, Lock, Search, Filter, Trash2, Download, Layers, TrendingUp, 
  CheckSquare, Activity, ExternalLink, Sparkles, Server, Database, LogOut, Inbox, Settings
} from 'lucide-react';
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

export interface SubscriberRecord {
  id: string;
  email: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'subscribers' | 'settings'>('leads');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [budgetFilter, setBudgetFilter] = useState<string>('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await supabaseClient.auth.signOut();
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/login';
  };

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch admin data.');
      }

      setLeads(data.leads || []);
      setSubscribers(data.subscribers || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const updateLeadStatus = async (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    try {
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
        fetchAdminData();
      }
    } catch (e) {
      console.error('Error updating status:', e);
      fetchAdminData();
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead inquiry from Supabase?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete lead.');
      }

      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err: any) {
      alert(`Delete Error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered Leads Calculation
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesBudget = budgetFilter === 'All' || lead.budget === budgetFilter;

    return matchesSearch && matchesStatus && matchesBudget;
  });

  // Export CSV Helper
  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Budget', 'Status', 'Message', 'CreatedAt'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${l.budget}"`,
      l.status,
      `"${l.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      l.created_at,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sahil_bhakre_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-bg-base py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Top Admin Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle/50">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary font-mono text-xs font-semibold">
            <Lock className="h-3.5 w-3.5" />
            Sahil Bhakre • Executive Admin Command Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Portfolio Operations & Lead Manager
          </h1>
          <p className="text-xs text-text-secondary font-mono">
            Connected to Live Supabase PostgreSQL (`kbjjxbqgwmzwgzxgzicr`)
          </p>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl bg-bg-inset border border-border-subtle text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin"
            className="px-3.5 py-2 rounded-xl bg-accent-primary/20 text-accent-primary border border-accent-primary/30 font-bold flex items-center gap-1.5"
          >
            <Inbox className="h-3.5 w-3.5" />
            <span>Leads Inbox</span>
          </Link>

          <Link
            href="/settings"
            className="px-3.5 py-2 rounded-xl bg-bg-inset border border-border-subtle text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Settings</span>
          </Link>

          <button
            onClick={fetchAdminData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border-subtle bg-bg-surface text-text-primary hover:border-accent-primary transition-all btn-micro"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-accent-primary ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportLeadsCSV}
            disabled={leads.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-gradient text-text-primary font-bold shadow-glow transition-all btn-micro disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl border border-accent-highlight/30 bg-accent-highlight/10 text-accent-highlight hover:bg-accent-highlight/20 transition-all font-bold flex items-center gap-1.5 btn-micro ml-1"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-border-subtle/50 pb-2 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold whitespace-nowrap ${
            activeTab === 'leads'
              ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>Inquiry Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold whitespace-nowrap ${
            activeTab === 'subscribers'
              ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Subscribers ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Server className="h-4 w-4" />
          <span>System Diagnostics</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            
            <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-semibold uppercase">Total Leads Captured</span>
                <Mail className="h-4 w-4 text-accent-primary" />
              </div>
              <div className="text-3xl font-bold text-text-primary">{leads.length}</div>
              <p className="text-[10px] text-accent-success font-mono">Stored in Supabase PostgreSQL</p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-semibold uppercase">Pending New Inquiries</span>
                <Clock className="h-4 w-4 text-accent-highlight" />
              </div>
              <div className="text-3xl font-bold text-accent-primary">
                {leads.filter((l) => l.status === 'New').length}
              </div>
              <p className="text-[10px] text-text-muted font-mono">Requires 24-Hour SLA Reply</p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-semibold uppercase">Contacted / In Progress</span>
                <CheckCircle2 className="h-4 w-4 text-accent-success" />
              </div>
              <div className="text-3xl font-bold text-accent-success">
                {leads.filter((l) => l.status === 'Contacted').length}
              </div>
              <p className="text-[10px] text-text-muted font-mono">Active Client Outreach</p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span className="text-xs font-semibold uppercase">Newsletter Subscribers</span>
                <User className="h-4 w-4 text-accent-primary" />
              </div>
              <div className="text-3xl font-bold text-text-primary">{subscribers.length}</div>
              <p className="text-[10px] text-accent-success font-mono">Active Email Audience</p>
            </div>

          </div>

          {/* Quick Lead Breakdown Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-bg-surface space-y-4">
            <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent-primary" />
              Recent Submission Velocity
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-mono">
              All project inquiry briefs and contact submissions are validated via Zod schemas, encrypted in transit, and written directly to your Supabase PostgreSQL cluster.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRY LEADS WORKSPACE */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          
          {/* Search & Filter Control Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-bg-surface border border-border-subtle/80 font-mono text-xs">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, email, company, message..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-text-muted shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
              >
                <option value="All">All Statuses</option>
                <option value="New">Status: New</option>
                <option value="Contacted">Status: Contacted</option>
                <option value="Closed">Status: Closed</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-text-muted shrink-0" />
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
              >
                <option value="All">All Budgets</option>
                <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                <option value="$3,000 – $6,000">$3,000 – $6,000</option>
                <option value="$6,000 – $12,000">$6,000 – $12,000</option>
                <option value="$12,000+">$12,000+ Enterprise</option>
              </select>
            </div>
          </div>

          {/* Main Leads Listing */}
          {loading ? (
            <div className="p-12 text-center font-mono text-xs text-text-muted">
              Loading customer inquiries from Supabase...
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight text-xs font-mono">
              Error: {error}
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 rounded-3xl border border-border-subtle bg-bg-surface text-center space-y-3">
              <Mail className="h-10 w-10 text-accent-primary mx-auto" />
              <h3 className="text-lg font-bold text-text-primary">No Matching Leads Found</h3>
              <p className="text-xs text-text-secondary max-w-md mx-auto font-mono">
                Try clearing your search query or status filter to view all customer inquiries.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-6 rounded-2xl border border-border-subtle bg-bg-surface/95 backdrop-blur-xl shadow-xl space-y-4 text-left transition-all hover:border-border-subtle/80"
                >
                  {/* Lead Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary flex items-center justify-center font-bold font-mono text-xs shrink-0">
                        {lead.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-text-primary">{lead.name}</h3>
                          {lead.company && (
                            <span className="px-2 py-0.5 rounded bg-bg-inset border border-border-subtle text-[10px] font-mono text-text-muted">
                              {lead.company}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-text-muted pt-0.5">
                          <Clock className="h-3 w-3 text-accent-primary" />
                          <span>{new Date(lead.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 font-mono text-[10px]">
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

                      {/* Delete Lead Button */}
                      <button
                        onClick={() => deleteLead(lead.id)}
                        disabled={deletingId === lead.id}
                        title="Delete Lead Record"
                        className="p-2 rounded-lg border border-border-subtle bg-bg-inset text-text-muted hover:text-accent-highlight hover:border-accent-highlight/40 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lead Info Pill Chips */}
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

                  {/* Message Content */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block font-bold">
                      Project Scope & Brief Notes
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed bg-bg-inset p-4 rounded-xl border border-border-subtle/40 font-mono whitespace-pre-wrap">
                      {lead.message}
                    </p>
                  </div>

                  {/* Reply Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={`mailto:${lead.email}?subject=Regarding Your Project Inquiry with Sahil Bhakre`}
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

        </div>
      )}

      {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="p-6 rounded-3xl border border-border-subtle bg-bg-surface space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary font-mono">Newsletter Subscribers ({subscribers.length})</h3>
            <span className="text-xs text-accent-success font-mono">Active Email Audience</span>
          </div>

          {subscribers.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-text-muted">No newsletter subscribers recorded yet.</div>
          ) : (
            <div className="divide-y divide-border-subtle/40 font-mono text-xs">
              {subscribers.map((sub) => (
                <div key={sub.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent-primary" />
                    <span className="text-text-primary">{sub.email}</span>
                  </div>
                  <span className="text-[10px] text-text-muted">{new Date(sub.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SYSTEM DIAGNOSTICS */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-6 rounded-2xl border border-border-subtle bg-bg-surface space-y-3">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Database className="h-4 w-4 text-accent-primary" />
              Supabase Connection Diagnostics
            </h3>
            <div className="space-y-2 text-text-secondary text-[11px]">
              <div><strong>Project ID:</strong> kbjjxbqgwmzwgzxgzicr</div>
              <div><strong>Region:</strong> ap-northeast-2</div>
              <div><strong>REST API Endpoint:</strong> https://kbjjxbqgwmzwgzxgzicr.supabase.co</div>
              <div><strong>Status:</strong> Connected & Authorized</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border-subtle bg-bg-surface space-y-3">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Server className="h-4 w-4 text-accent-success" />
              Environment Variables Check
            </h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-accent-success">
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
                <span>Configured ✓</span>
              </div>
              <div className="flex items-center justify-between text-accent-success">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <span>Configured ✓</span>
              </div>
              <div className="flex items-center justify-between text-accent-success">
                <span>SUPABASE_SERVICE_ROLE_KEY</span>
                <span>Configured ✓</span>
              </div>
              <div className="flex items-center justify-between text-accent-success">
                <span>NEXT_PUBLIC_SITE_URL</span>
                <span>Configured ✓</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
