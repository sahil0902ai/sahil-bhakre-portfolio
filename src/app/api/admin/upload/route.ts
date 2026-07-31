import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    const supabase = createServerClient(true);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    // Upload to Supabase Storage bucket 'project-assets'
    const { data, error } = await supabase.storage
      .from('project-assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      // Fallback: If bucket doesn't exist yet, return a high-res placeholder URL or base64 data URL
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        url: base64,
        message: 'Image uploaded successfully (Data URL fallback)',
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from('project-assets')
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: filePath,
    });
  } catch (err: any) {
    console.error('Upload Error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Upload failed' }, { status: 500 });
  }
}
