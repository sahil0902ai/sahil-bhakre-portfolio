import { supabaseClient } from './client';
import { Database, LeadStatus } from './types';

export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type NewsletterInsert = Database['public']['Tables']['newsletter_subscribers']['Insert'];
export type AnalyticsEventInsert = Database['public']['Tables']['analytics_events']['Insert'];

/**
 * Submit a project lead to the Supabase database
 */
export async function submitLead(lead: LeadInsert) {
  const { data, error } = await (supabaseClient
    .from('leads') as any)
    .insert([lead])
    .select()
    .single();

  if (error) {
    console.error('Error submitting lead to Supabase:', error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Subscribe an email to the newsletter
 */
export async function subscribeNewsletter(email: string) {
  const { data, error } = await (supabaseClient
    .from('newsletter_subscribers') as any)
    .insert([{ email, status: 'Active' }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return { success: true, message: 'Email is already subscribed.' };
    }
    console.error('Error subscribing to newsletter:', error);
    throw new Error(error.message);
  }

  return { success: true, data };
}

/**
 * Track an analytics event
 */
export async function trackAnalyticsEvent(event: AnalyticsEventInsert) {
  const { data, error } = await (supabaseClient
    .from('analytics_events') as any)
    .insert([event]);

  if (error) {
    console.warn('Analytics event logging warning:', error.message);
  }

  return data;
}

/**
 * Get public asset URL from Supabase Storage bucket
 */
export function getStoragePublicUrl(bucket: string, path: string): string {
  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
