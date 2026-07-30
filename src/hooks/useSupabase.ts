'use client';

import { useState, useCallback } from 'react';
import { submitLead, subscribeNewsletter, LeadInsert } from '@lib/supabase/queries';

export function useSupabaseLeadSubmit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(async (lead: LeadInsert) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitLead(lead);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleSubmit, loading, error, success };
}

export function useSupabaseNewsletter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubscribe = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await subscribeNewsletter(email);
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe to newsletter.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleSubscribe, loading, error, success };
}
