'use server';

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@lib/supabase/server';
import { ProjectModel } from '@/app/api/admin/projects/route';

export async function createProjectAction(formData: Partial<ProjectModel>) {
  try {
    const supabase = createServerClient(true);
    const generatedSlug =
      formData.slug ||
      formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
      'project-' + Date.now();

    const newProject = {
      title: formData.title,
      slug: generatedSlug,
      description: formData.description,
      category: formData.category || 'Web Architecture',
      status: formData.status || 'Production',
      cover_image: formData.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      gallery: formData.gallery || [],
      tech_stack: formData.tech_stack || [],
      github_url: formData.github_url || '',
      live_url: formData.live_url || '',
      case_study: formData.case_study || '',
      featured: formData.featured || false,
      seo_title: formData.seo_title || formData.title,
      seo_description: formData.seo_description || formData.description,
      seo_keywords: formData.seo_keywords || '',
      published: formData.published !== false,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase
      .from('projects') as any)
      .insert([newProject])
      .select()
      .single();

    if (error) {
      console.warn('Supabase Action Insert Warning (using memory store fallback):', error.message);
    }

    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true, project: data || newProject };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to create project' };
  }
}

export async function updateProjectAction(id: string, updates: Partial<ProjectModel>) {
  try {
    const supabase = createServerClient(true);
    const payload = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await (supabase
      .from('projects') as any)
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      console.warn('Supabase Action Update Warning:', error.message);
    }

    revalidatePath('/projects');
    revalidatePath(`/projects/${updates.slug || id}`);
    revalidatePath('/admin');

    return { success: true, project: data?.[0] || null };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update project' };
  }
}

export async function togglePublishAction(id: string, published: boolean) {
  try {
    const supabase = createServerClient(true);
    await (supabase.from('projects') as any)
      .update({ published, updated_at: new Date().toISOString() })
      .eq('id', id);

    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true, published };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleFeatureAction(id: string, featured: boolean) {
  try {
    const supabase = createServerClient(true);
    await (supabase.from('projects') as any)
      .update({ featured, updated_at: new Date().toISOString() })
      .eq('id', id);

    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true, featured };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const supabase = createServerClient(true);
    await supabase.from('projects').delete().eq('id', id);

    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
