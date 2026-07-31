import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, budget, message } = body;

    // 1. Validation (Zod equivalent inline check)
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // 2. Initialize Supabase Server Client
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

    // 3. Store in Supabase leads table
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

    // 4. Send Email Notification via Resend API (if RESEND_API_KEY is provided)
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Leads <onboarding@resend.dev>',
            to: ['sahilbhakre8@gmail.com'],
            subject: `🚀 New Project Inquiry from ${name}`,
            html: `
              <h2>New Project Lead Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Budget:</strong> ${budget}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #6366f1; font-family: monospace;">
                ${message.replace(/\n/g, '<br/>')}
              </blockquote>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn('Resend email notification warning:', emailErr);
      }
    }

    // 5. Return success payload for Admin Dashboard & Toast UI
    return NextResponse.json({
      success: true,
      message: 'Inquiry received and saved successfully.',
      leadId: lead?.id,
      lead,
    });
  } catch (err: any) {
    console.error('Contact API handler error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
