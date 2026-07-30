-- ====================================================
-- SAHIL BHAKRE PORTFOLIO - SUPABASE INITIAL SCHEMA MIGRATION
-- Migration Date: 2026-07-29
-- ====================================================

-- 1. Create Custom ENUM Types
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Closed');
CREATE TYPE subscriber_status AS ENUM ('Active', 'Unsubscribed');
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'visitor');

-- 2. Create Public Profiles Table (Linked to Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'visitor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Contact Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    budget TEXT NOT NULL DEFAULT '$3,000 – $6,000',
    message TEXT NOT NULL,
    status lead_status NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    status subscriber_status NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Create Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    target_path TEXT NOT NULL,
    device_type TEXT NOT NULL DEFAULT 'Desktop',
    country_code TEXT DEFAULT 'Unknown',
    user_agent TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS) across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 7. RLS Helper Function to Check Admin Privileges
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Row Level Security Policies
-- Leads: Public can INSERT, Admin can ALL
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage leads" ON public.leads FOR ALL TO authenticated USING (public.is_admin());

-- Newsletter: Public can INSERT, Admin can ALL
CREATE POLICY "Public insert newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage newsletter" ON public.newsletter_subscribers FOR ALL TO authenticated USING (public.is_admin());

-- Analytics: Public can INSERT, Admin can ALL
CREATE POLICY "Public insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view analytics" ON public.analytics_events FOR SELECT TO authenticated USING (public.is_admin());

-- Profiles: Users view own profile, Admin can ALL
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin manage profiles" ON public.profiles FOR ALL TO authenticated USING (public.is_admin());

-- 9. Storage Buckets Initialization
INSERT INTO storage.buckets (id, name, public) VALUES 
('project-screenshots', 'project-screenshots', true),
('documents', 'documents', true),
('og-assets', 'og-assets', true),
('blog-assets', 'blog-assets', true),
('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public read storage assets" ON storage.objects FOR SELECT USING (bucket_id IN ('project-screenshots', 'documents', 'og-assets', 'blog-assets', 'logos'));
CREATE POLICY "Admin insert storage assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admin delete storage assets" ON storage.objects FOR DELETE TO authenticated USING (public.is_admin());
