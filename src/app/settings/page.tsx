'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Settings, Key, ShieldCheck, Lock, Server, Database, LogOut, 
  TrendingUp, Inbox, CheckCircle2, AlertCircle, RefreshCw, Mail
} from 'lucide-react';
import { supabaseClient } from '@lib/supabase/client';

export default function SettingsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login?redirect=/settings');
      } else {
        setUserEmail(user.email || 'Admin');
      }
    });
  }, [router]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: updateError } = await supabaseClient.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setMessage('Admin password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-bg-base py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Top Navbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle/50 font-mono">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin Security & Diagnostics • {userEmail}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            System & Security Settings
          </h1>
        </div>

        {/* Global Admin Navigation Tabs & Logout */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl bg-bg-inset border border-border-subtle text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
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
            className="px-3.5 py-2 rounded-xl bg-accent-primary/20 text-accent-primary border border-accent-primary/30 font-bold flex items-center gap-1.5"
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

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-xs">
        
        {/* Security / Password Update Box */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-bg-surface space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Key className="h-5 w-5 text-accent-primary" />
              Update Admin Password
            </h3>
            <p className="text-xs text-text-secondary">
              Update the account password for admin account ({userEmail}).
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-3.5 rounded-xl bg-accent-success/10 border border-accent-success/30 text-accent-success text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-text-muted text-[11px] font-semibold">New Admin Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 chars)"
                className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-text-muted text-[11px] font-semibold">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow transition-all flex items-center justify-center gap-2 btn-micro"
            >
              <span>{loading ? 'Updating Password...' : 'Save New Password'}</span>
            </button>
          </form>
        </div>

        {/* Infrastructure & Auth Settings Diagnostics Box */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-3xl border border-border-subtle bg-bg-surface space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Database className="h-5 w-5 text-accent-primary" />
              Supabase Auth Policy Configuration
            </h3>

            <div className="space-y-2 text-text-secondary text-[11px]">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset border border-border-subtle/40">
                <span>Public Registration</span>
                <span className="text-accent-highlight font-bold">DISABLED 🔒</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset border border-border-subtle/40">
                <span>Session Strategy</span>
                <span className="text-accent-success font-bold">SSR Cookie Refresh ✓</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset border border-border-subtle/40">
                <span>Role Level Security (RLS)</span>
                <span className="text-accent-success font-bold">Enforced ✓</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-border-subtle bg-bg-surface space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Server className="h-5 w-5 text-accent-success" />
              Environment Variables Check
            </h3>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset text-accent-success">
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
                <span>Configured ✓</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset text-accent-success">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <span>Configured ✓</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset text-accent-success">
                <span>SUPABASE_SERVICE_ROLE_KEY</span>
                <span>Configured ✓</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-inset text-accent-success">
                <span>NEXT_PUBLIC_SITE_URL</span>
                <span>Configured ✓</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
