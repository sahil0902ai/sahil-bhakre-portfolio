-- ====================================================
-- SUPABASE MIGRATION: SITE SETTINGS CMS TABLE
-- Schema for Global Portfolio Configuration Management
-- ====================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  hero_heading TEXT NOT NULL DEFAULT 'Senior Full Stack & AI Systems Engineer',
  hero_subtitle TEXT NOT NULL DEFAULT 'Specializing in high-concurrency data pipelines, Next.js 15 web applications, and autonomous AI agents.',
  about_bio TEXT NOT NULL DEFAULT 'Sahil Bhakre is a Senior Full Stack Engineer specializing in Web Architecture, B2B Lead Scraping, and AI Agent Automation.',
  services_config JSONB DEFAULT '[]'::jsonb,
  skills_config JSONB DEFAULT '[]'::jsonb,
  social_links JSONB DEFAULT '{"github":"https://github.com/sahil0902ai","linkedin":"https://linkedin.com/in/sahil-bhakre","instagram":"https://instagram.com/sahil.builds_","whatsapp":"https://wa.me/919823511929","email":"sahilbhakre8@gmail.com"}'::jsonb,
  contact_info JSONB DEFAULT '{"email":"sahilbhakre8@gmail.com","phone":"+91 9823511929","location":"India"}'::jsonb,
  resume_url TEXT DEFAULT '/Sahil_Bhakre_Resume.pdf',
  footer_text TEXT DEFAULT '© 2026 Sahil Bhakre. All rights reserved. Architected with Next.js 15 & Supabase.',
  seo_title TEXT DEFAULT 'Sahil Bhakre | Senior Full Stack & AI Systems Engineer',
  seo_description TEXT DEFAULT 'Portfolio of Sahil Bhakre, Senior Full Stack Engineer specializing in Next.js 15, B2B Scraping, and AI Automation.',
  seo_keywords TEXT DEFAULT 'sahil bhakre, full stack engineer, next.js 15, python, web scraping, ai agents',
  og_title TEXT DEFAULT 'Sahil Bhakre | Senior Full Stack Engineer',
  og_description TEXT DEFAULT 'Senior Full Stack Engineer specializing in Web Architecture & AI Systems.',
  og_image TEXT DEFAULT 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  analytics_ga_id TEXT DEFAULT 'G-XXXXXXXXXX',
  analytics_posthog_key TEXT DEFAULT 'phc_XXXXXXXXXX',
  announcement_banner JSONB DEFAULT '{"message":"🚀 Open for Q3/Q4 Senior Contract Projects & Consulting","link":"/contact","enabled":true}'::jsonb,
  availability_status TEXT DEFAULT 'Available for Q3/Q4 Projects',
  profile_photo TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  logo_url TEXT DEFAULT '/logo.svg',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Admin / Service Role write access
CREATE POLICY "Service Role full access on site settings"
  ON public.site_settings FOR ALL
  USING (true)
  WITH CHECK (true);
