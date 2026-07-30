import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

export function createServerClient(useServiceRole: boolean = false) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const key = useServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createSupabaseClient<Database>(supabaseUrl, key);
}
