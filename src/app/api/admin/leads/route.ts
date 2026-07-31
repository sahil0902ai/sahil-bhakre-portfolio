import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServerClient(true);
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (leadsError) {
      console.error('Error fetching admin leads:', leadsError);
      return NextResponse.json({ success: false, error: leadsError.message }, { status: 500 });
    }

    const { data: subscribers, error: subError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    return NextResponse.json(
      {
        success: true,
        leads: leads || [],
        subscribers: subscribers || [],
      },
      { status: 200 }
    );
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing lead id parameter' }, { status: 400 });
    }

    const supabase = createServerClient(true);
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead from Supabase:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('Server error in DELETE /api/admin/leads:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
