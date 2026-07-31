import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export interface SiteSettingsModel {
  id: string;
  hero_heading: string;
  hero_subtitle: string;
  about_bio: string;
  services_config: any[];
  skills_config: any[];
  social_links: {
    github: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
    email: string;
    twitter?: string;
  };
  contact_info: {
    email: string;
    phone: string;
    location: string;
  };
  resume_url: string;
  footer_text: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  analytics_ga_id: string;
  analytics_posthog_key: string;
  announcement_banner: {
    message: string;
    link: string;
    enabled: boolean;
  };
  availability_status: string;
  profile_photo: string;
  logo_url: string;
  updated_at: string;
}

const DEFAULT_SETTINGS: SiteSettingsModel = {
  id: 'global',
  hero_heading: 'Senior Full Stack & AI Systems Engineer',
  hero_subtitle: 'Specializing in high-concurrency data pipelines, Next.js 15 web applications, and autonomous AI agents.',
  about_bio: 'Sahil Bhakre is a Senior Full Stack Engineer with expertise in modern Web Architecture, Playwright B2B lead scraping, and autonomous AI agent workflows.',
  services_config: [
    { title: 'Full Stack Web Architecture', description: 'Next.js 15, React 19, Tailwind CSS, Supabase PostgreSQL' },
    { title: 'B2B Lead Generation Scraping', description: 'Python, Playwright, FastAPI, Proxy Rotation' },
    { title: 'AI Agent Systems & RAG', description: 'LangChain, OpenAI API, Vector Databases' }
  ],
  skills_config: [
    { category: 'Frontend', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend & Cloud', items: ['Python', 'FastAPI', 'Node.js', 'Supabase', 'PostgreSQL', 'Docker'] }
  ],
  social_links: {
    github: 'https://github.com/sahil0902ai',
    linkedin: 'https://linkedin.com/in/sahil-bhakre',
    instagram: 'https://instagram.com/sahil.builds_',
    whatsapp: 'https://wa.me/919823511929',
    email: 'sahilbhakre8@gmail.com',
    twitter: 'https://twitter.com/sahil_builds'
  },
  contact_info: {
    email: 'sahilbhakre8@gmail.com',
    phone: '+91 9823511929',
    location: 'India'
  },
  resume_url: '/Sahil_Bhakre_Resume.pdf',
  footer_text: '© 2026 Sahil Bhakre. All rights reserved. Built with Next.js 15 & Supabase.',
  seo_title: 'Sahil Bhakre | Senior Full Stack & AI Systems Engineer',
  seo_description: 'Portfolio of Sahil Bhakre, Senior Full Stack Engineer specializing in Next.js 15, B2B Lead Scraping, and AI Automation.',
  seo_keywords: 'sahil bhakre, full stack engineer, next.js 15, python, web scraping, ai agents',
  og_title: 'Sahil Bhakre | Senior Full Stack Engineer',
  og_description: 'Senior Full Stack Engineer specializing in Web Architecture & AI Systems.',
  og_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  analytics_ga_id: 'G-XXXXXXXXXX',
  analytics_posthog_key: 'phc_XXXXXXXXXX',
  announcement_banner: {
    message: '🚀 Open for Q3/Q4 Senior Contract Projects & Consulting',
    link: '/contact',
    enabled: true
  },
  availability_status: 'Available for Q3/Q4 Projects',
  profile_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  logo_url: '/logo.svg',
  updated_at: new Date().toISOString()
};

let memorySettingsStore: SiteSettingsModel = { ...DEFAULT_SETTINGS };

export async function GET() {
  try {
    const supabase = createServerClient(true);
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'global')
      .single();

    if (!error && settings) {
      return NextResponse.json({ success: true, settings: settings as SiteSettingsModel }, { status: 200 });
    }

    return NextResponse.json({ success: true, settings: memorySettingsStore }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: true, settings: memorySettingsStore }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const updates = await request.json();
    updates.id = 'global';
    updates.updated_at = new Date().toISOString();

    const supabase = createServerClient(true);
    const { data: updated, error } = await (supabase
      .from('site_settings') as any)
      .upsert([updates], { onConflict: 'id' })
      .select()
      .single();

    memorySettingsStore = { ...memorySettingsStore, ...updates };

    if (!error && updated) {
      return NextResponse.json({ success: true, settings: updated }, { status: 200 });
    }

    return NextResponse.json({ success: true, settings: memorySettingsStore }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Error updating site settings' }, { status: 500 });
  }
}
