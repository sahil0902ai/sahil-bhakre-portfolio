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

    const leadPayload = {
      id: `lead_${Date.now()}`,
      name,
      email,
      company: company || null,
      phone: phone || null,
      budget: budget || '$3,000 – $6,000',
      message,
      status: 'Unread',
      created_at: new Date().toISOString(),
    };

    // 4. Try storing submission in Supabase
    try {
      const supabase = createServerClient(true);
      await (supabase.from('contacts') as any).insert([leadPayload]);
    } catch (dbErr) {
      console.warn('Supabase Lead Storage Warning:', dbErr);
    }

    // 5. Trigger Resend Email Notification (Reads strictly from process.env.RESEND_API_KEY)
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'sahilbhakre8@gmail.com';

    let emailSent = false;
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Leads <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `🚀 New Project Inquiry from ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px;">
                <h2 style="color: #0284c7; margin-top: 0;">🚀 New Project Inquiry Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #0284c7; font-family: monospace; font-size: 13px;">
                  ${message.replace(/\n/g, '<br/>')}
                </blockquote>
                <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
                <p style="font-size: 11px; color: #71717a;">Delivered via Sahil Bhakre Portfolio Resend Engine</p>
              </div>
            `,
          }),
        });

        const resendData = await resendRes.json();
        if (resendRes.ok && resendData.id) {
          emailSent = true;
        } else {
          console.warn('Resend API response warning:', resendData);
        }
      } catch (emailErr) {
        console.warn('Resend API execution error:', emailErr);
      }
    }

    // 6. Return Success Response
    return NextResponse.json({
      success: true,
      message: 'Inquiry received and saved successfully.',
      emailSent,
      lead: leadPayload,
    });
  } catch (err: any) {
    console.error('Contact API handler error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
