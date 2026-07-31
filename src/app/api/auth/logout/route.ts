import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kbjjxbqgwmzwgzxgzicr.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    let response = NextResponse.json({ success: true, message: 'Logged out successfully' }, { status: 200 });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get('cookie') || '';
          return cookieHeader.split('; ').map((c) => {
            const [name, ...val] = c.split('=');
            return { name: name.trim(), value: val.join('=') };
          }).filter((c) => c.name);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.signOut();

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Logout error' }, { status: 500 });
  }
}
