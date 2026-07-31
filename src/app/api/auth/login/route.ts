import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kbjjxbqgwmzwgzxgzicr.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    let response = NextResponse.json(
      {
        success: true,
        message: 'Authentication successful',
      },
      { status: 200 }
    );

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json({ success: false, error: error?.message || 'Invalid credentials' }, { status: 401 });
    }

    return response;
  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
