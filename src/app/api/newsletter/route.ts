import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient(true);

    const { data, error } = await (supabase
      .from('newsletter_subscribers') as any)
      .insert([{ email, status: 'Active' }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to the newsletter.',
        });
      }
      console.error('Supabase Newsletter Error:', error);
      return NextResponse.json(
        { error: 'Failed to record newsletter subscription.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully to technical updates!',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('Newsletter API error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing subscription.' },
      { status: 500 }
    );
  }
}
