-- ====================================================
-- SUPABASE MIGRATION: PROJECTS CMS TABLE
-- Schema for Project Model & Dashboard CMS Management
-- ====================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web Architecture',
  status TEXT NOT NULL DEFAULT 'Production',
  cover_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  github_url TEXT,
  live_url TEXT,
  case_study TEXT,
  featured BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can view published projects
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

-- Service Role / Admin full access
CREATE POLICY "Service Role full access on projects"
  ON public.projects FOR ALL
  USING (true)
  WITH CHECK (true);
