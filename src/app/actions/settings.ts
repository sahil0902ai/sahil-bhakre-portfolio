'use server';

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@lib/supabase/server';
import { SiteSettingsModel } from '@/app/api/admin/settings/route';

export async function updateSiteSettingsAction(settings: Partial<SiteSettingsModel>) {
  try {
    const supabase = createServerClient(true);
    const payload = {
      ...settings,
      id: 'global',
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase
      .from('site_settings') as any)
      .upsert([payload], { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.warn('Supabase Settings Upsert Warning:', error.message);
    }

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/services');
    revalidatePath('/contact');
    revalidatePath('/admin');

    return { success: true, settings: data || payload };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update site settings' };
  }
}
