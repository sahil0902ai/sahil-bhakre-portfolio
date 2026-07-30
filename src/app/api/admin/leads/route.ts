import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServerClient(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin leads:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leads: data || [] }, { status: 200 });
  } catch (err: any) {
    console.error('Server error in GET /api/admin/leads:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing required parameters (id, status)' }, { status: 400 });
    }

    const supabase = createServerClient(true);
    const { data, error } = await (supabase
      .from('leads') as any)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating lead status in Supabase:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data?.[0] || null }, { status: 200 });
  } catch (err: any) {
    console.error('Server error in PATCH /api/admin/leads:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
