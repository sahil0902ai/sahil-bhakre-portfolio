import { unstable_cache } from 'next/cache';
import { createServerClient } from '@lib/supabase/server';

export interface SiteSettingsData {
  id: string;
  hero_heading: string;
  hero_subtitle: string;
  about_bio: string;
  services_config: Array<{ title: string; description: string }>;
  skills_config: Array<{ category: string; items: string[] }>;
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

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  id: 'global',
  hero_heading: 'Senior Full Stack & AI Systems Engineer',
  hero_subtitle: 'Specializing in high-concurrency data pipelines, Next.js 15 web applications, and autonomous AI agents.',
  about_bio: 'Sahil Bhakre is a Senior Full Stack Engineer specializing in Web Architecture, B2B Lead Scraping, and AI Agent Automation.',
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
  footer_text: '© 2026 Sahil Bhakre. All rights reserved. Architected with Next.js 15 & Supabase.',
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

/**
 * Next.js 15 Server Component Cached Data Fetcher
 * Utilizes unstable_cache with tag 'site-settings' for instant 0ms cached reads.
 */
export const getCachedSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    try {
      const supabase = createServerClient(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global')
        .single();

      if (!error && data && typeof data === 'object') {
        const raw = data as Record<string, any>;
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...raw,
          social_links: { ...DEFAULT_SITE_SETTINGS.social_links, ...(raw.social_links || {}) },
          contact_info: { ...DEFAULT_SITE_SETTINGS.contact_info, ...(raw.contact_info || {}) },
          announcement_banner: { ...DEFAULT_SITE_SETTINGS.announcement_banner, ...(raw.announcement_banner || {}) },
        };
      }
    } catch (err) {
      console.warn('Cached Site Settings fetch warning (using default fallback):', err);
    }
    return DEFAULT_SITE_SETTINGS;
  },
  ['site-settings'],
  { revalidate: 3600, tags: ['site-settings'] }
);
