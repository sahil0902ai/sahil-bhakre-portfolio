import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, budget, message } = body;

    // Validate required inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Initialize Supabase Server Client
    const supabase = createServerClient(true);

    const leadPayload = {
      name,
      email,
      company: company || null,
      phone: phone || null,
      budget: budget || '$3,000 – $6,000',
      message,
      status: 'New' as const,
    };

    // Insert record into Supabase leads table
    const { data: lead, error: dbError } = await (supabase
      .from('leads') as any)
      .insert([leadPayload])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase DB Insert Error:', dbError);
      return NextResponse.json(
        { error: 'Database record creation failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      leadId: lead?.id,
    });
  } catch (err: any) {
    console.error('Contact API handler error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
