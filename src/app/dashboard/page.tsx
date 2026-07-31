'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  TrendingUp, Mail, User, ShieldCheck, LogOut, Settings, Inbox, 
  Clock, ArrowUpRight, Activity, DollarSign, Database, CheckCircle2, RefreshCw
} from 'lucide-react';
import { supabaseClient } from '@lib/supabase/client';

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) {
        router.push('/login?redirect=/dashboard');
        return;
      }
      setUserEmail(user.email || 'Admin');

      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads || []);
        setSubscribersCount((data.subscribers || []).length);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [router]);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const contactedLeadsCount = leads.filter((l) => l.status === 'Contacted').length;

  return (
    <main className="min-h-screen bg-bg-base py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Top Navbar for Protected Admin Portal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle/50 font-mono">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Authenticated Admin • {userEmail}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Executive Performance Dashboard
          </h1>
        </div>

        {/* Global Admin Navigation Tabs & Logout */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl bg-accent-primary/20 text-accent-primary border border-accent-primary/30 font-bold flex items-center gap-1.5"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin"
            className="px-3.5 py-2 rounded-xl bg-bg-inset border border-border-subtle text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
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
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl border border-accent-highlight/30 bg-accent-highlight/10 text-accent-highlight hover:bg-accent-highlight/20 transition-all font-bold flex items-center gap-1.5 btn-micro ml-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="uppercase font-semibold">Total Inquiries</span>
            <Mail className="h-4 w-4 text-accent-primary" />
          </div>
          <div className="text-3xl font-bold text-text-primary">{leads.length}</div>
          <p className="text-[10px] text-accent-success">Live Supabase Database Sync</p>
        </div>

        <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="uppercase font-semibold">Pending New Leads</span>
            <Clock className="h-4 w-4 text-accent-highlight" />
          </div>
          <div className="text-3xl font-bold text-accent-primary">{newLeadsCount}</div>
          <p className="text-[10px] text-text-muted">Awaiting SLA Response</p>
        </div>

        <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="uppercase font-semibold">Active Outreach</span>
            <CheckCircle2 className="h-4 w-4 text-accent-success" />
          </div>
          <div className="text-3xl font-bold text-accent-success">{contactedLeadsCount}</div>
          <p className="text-[10px] text-text-muted">In Negotiations</p>
        </div>

        <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl space-y-2">
          <div className="flex items-center justify-between text-text-muted text-xs">
            <span className="uppercase font-semibold">Subscribers</span>
            <User className="h-4 w-4 text-accent-primary" />
          </div>
          <div className="text-3xl font-bold text-text-primary">{subscribersCount}</div>
          <p className="text-[10px] text-accent-success">Active Audience</p>
        </div>
      </div>

      {/* Main Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border border-border-subtle bg-bg-surface space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle/40 pb-3">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent-primary" />
              Recent Customer Inquiries
            </h3>
            <Link href="/admin" className="text-xs font-mono text-accent-primary hover:underline flex items-center gap-1">
              View All Inbox <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center font-mono text-xs text-text-muted">Fetching dashboard analytics...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-text-muted">No inquiries recorded yet.</div>
          ) : (
            <div className="divide-y divide-border-subtle/40 font-mono text-xs">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-text-primary">{lead.name}</div>
                    <div className="text-[11px] text-text-muted">{lead.email} • {lead.budget}</div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    lead.status === 'New'
                      ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                      : 'bg-accent-success/20 border-accent-success text-accent-success'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Operations Box */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-bg-surface space-y-4 text-xs font-mono">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Database className="h-5 w-5 text-accent-primary" />
            Admin Quick Actions
          </h3>

          <div className="space-y-3 pt-2">
            <Link
              href="/admin"
              className="w-full p-3 rounded-xl bg-bg-inset border border-border-subtle hover:border-accent-primary flex items-center justify-between text-text-primary transition-colors block"
            >
              <span>Manage & Reply to Leads</span>
              <ArrowUpRight className="h-4 w-4 text-accent-primary" />
            </Link>

            <Link
              href="/settings"
              className="w-full p-3 rounded-xl bg-bg-inset border border-border-subtle hover:border-accent-primary flex items-center justify-between text-text-primary transition-colors block"
            >
              <span>System & Auth Settings</span>
              <ArrowUpRight className="h-4 w-4 text-accent-primary" />
            </Link>

            <button
              onClick={loadDashboardData}
              className="w-full p-3 rounded-xl border border-border-subtle bg-bg-inset text-text-secondary hover:text-text-primary flex items-center justify-between transition-colors"
            >
              <span>Refresh Metrics Cache</span>
              <RefreshCw className="h-4 w-4 text-accent-primary" />
            </button>
          </div>
        </div>

      </div>

    </main>
  );
}
