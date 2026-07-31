'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Key, ArrowRight, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { supabaseClient } from '@lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';
  const urlError = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError === 'unauthorized' ? 'Access Denied: Admin Authorization Required.' : null
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (urlError === 'unauthorized') {
      // Clear stale unauthorized session to prevent loop
      supabaseClient.auth.signOut();
      return;
    }

    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      if (user && user.email?.toLowerCase() === 'sahilbhakre8@gmail.com') {
        router.push(redirectPath);
      }
    });
  }, [redirectPath, urlError, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (data.user) {
        setMessage('Authentication successful! Redirecting to Admin Panel...');
        // Instant hard navigation to refresh cookies & App Router state
        window.location.href = redirectPath;
      }
    } catch (err: any) {
      setError(err.message || 'Invalid admin credentials.');
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid admin email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: resetError } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?mode=update-password`,
      });

      if (resetError) {
        throw new Error(resetError.message);
      }

      setMessage('Password reset instructions sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-base flex items-center justify-center p-4 sm:p-6 text-left">
      
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl border border-border-subtle bg-bg-surface/90 backdrop-blur-2xl shadow-2xl space-y-6">
        
        {/* Header Icon */}
        <div className="w-12 h-12 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary flex items-center justify-center mx-auto">
          <Lock className="h-6 w-6" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent-primary font-bold">
            Private Admin Gateway
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            {isResetMode ? 'Reset Admin Password' : 'Admin Authentication'}
          </h1>
          <p className="text-xs text-text-secondary font-mono">
            {isResetMode
              ? 'Enter your registered admin email to receive a password reset link.'
              : 'Sign in to access your admin inbox, metrics dashboard, and settings.'}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="p-3.5 rounded-xl bg-accent-highlight/10 border border-accent-highlight/30 text-accent-highlight text-xs font-mono flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-3.5 rounded-xl bg-accent-success/10 border border-accent-success/30 text-accent-success text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form Container */}
        {!isResetMode ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-accent-primary" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sahilbhakre8@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-accent-primary" /> Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(true);
                    setError(null);
                    setMessage(null);
                  }}
                  className="text-[10px] text-accent-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2 btn-micro"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In as Admin'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-text-muted text-[11px] font-semibold flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-accent-primary" /> Registered Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sahilbhakre8@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow transition-all flex items-center justify-center gap-2 btn-micro"
            >
              <span>{loading ? 'Sending Request...' : 'Send Password Reset Email'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsResetMode(false);
                setError(null);
                setMessage(null);
              }}
              className="w-full py-2.5 rounded-xl border border-border-subtle bg-bg-inset text-text-muted text-[11px] hover:text-text-primary transition-colors text-center"
            >
              Back to Login
            </button>
          </form>
        )}

        {/* Security Notice */}
        <div className="pt-2 text-center border-t border-border-subtle/40">
          <p className="text-[10px] text-text-muted font-mono flex items-center justify-center gap-1">
            <ShieldAlert className="h-3 w-3 text-accent-primary" />
            Public Registration Disabled • Admin Authenticated Access Only
          </p>
        </div>

      </div>

    </main>
  );
}
