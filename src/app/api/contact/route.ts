import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';
import { contactFormSchema } from '@lib/validations/contact';

// Simple in-memory sliding window rate limiter (5 submissions per 15 minutes per IP)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  const MAX_LIMIT = 5;

  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_LIMIT - 1 };
  }

  if (record.count >= MAX_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_LIMIT - record.count };
}

export async function POST(request: Request) {
  try {
    // 1. Extract IP & Rate Limiting Check
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const { allowed } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many contact requests from this IP. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Anti-Spam Honeypot Verification
    if (body.website_hp && body.website_hp.length > 0) {
      // Silently accept but do not process spam submission
      return NextResponse.json({ success: true, message: 'Inquiry received.' }, { status: 200 });
    }

    // 3. Strict Zod Schema Validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors.map((e) => e.message).join(', ');
      return NextResponse.json({ error: `Validation failed: ${errorMsg}` }, { status: 400 });
    }

    const { name, email, company, phone, budget, message } = validationResult.data;

    // 4. Initialize Supabase Service Role Client
    const supabase = createServerClient(true);

    const leadPayload = {
      name,
      email,
      company: company || null,
      phone: phone || null,
      budget: budget || '$3,000 – $6,000',
      message,
      status: 'Unread' as const,
    };

    // 5. Store Submission in Supabase leads Table
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

    // 6. Resend Email Notification
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
              <h2>New Project Inquiry Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
              <p><strong>Status:</strong> Unread</p>
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

    // 7. Return Success Response
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
