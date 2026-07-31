import { NextResponse } from 'next/server';
import { createServerClient } from '@lib/supabase/server';

export interface ProjectModel {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  cover_image: string;
  gallery: string[];
  tech_stack: string[];
  github_url: string;
  live_url: string;
  case_study: string;
  featured: boolean;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Initial Seed Projects Fallback
const DEFAULT_PROJECTS: ProjectModel[] = [
  {
    id: 'proj-1',
    title: 'Google Maps Lead Scraper Pro',
    slug: 'maps-lead-scraper-pro',
    description: 'High-concurrency B2B lead generation pipeline capable of extracting 50,000+ local business records daily with automated email validation.',
    category: 'Data Engineering',
    status: 'Production',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
    ],
    tech_stack: ['Python', 'FastAPI', 'Playwright', 'Redis', 'PostgreSQL', 'Docker'],
    github_url: 'https://github.com/sahil0902ai/maps-lead-scraper',
    live_url: 'https://maps-lead-scraper-demo.vercel.app',
    case_study: '# Google Maps Lead Scraper Pro\n\nArchitected a distributed web scraping cluster that bypassed Cloudflare bot detection.',
    featured: true,
    seo_title: 'Google Maps Lead Scraper Pro | Sahil Bhakre Portfolio',
    seo_description: 'High-concurrency B2B lead generation pipeline extracting 50k+ records daily.',
    seo_keywords: 'web scraping, fastapi, python, lead generation',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'Autonomous AI Agent Automation Suite',
    slug: 'ai-agent-automation-suite',
    description: 'Multi-agent orchestration framework utilizing LangChain and OpenAI to automate complex enterprise workflows and document parsing.',
    category: 'AI & Automation',
    status: 'Production',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    ],
    tech_stack: ['TypeScript', 'LangChain', 'Next.js 15', 'OpenAI', 'Pinecone'],
    github_url: 'https://github.com/sahil0902ai/ai-agent-suite',
    live_url: 'https://ai-agent-suite.vercel.app',
    case_study: '# Autonomous AI Agent Automation Suite\n\nBuilt deterministic agent workflows for enterprise customer support.',
    featured: true,
    seo_title: 'Autonomous AI Agent Automation Suite | Sahil Bhakre',
    seo_description: 'Multi-agent orchestration framework automating complex enterprise workflows.',
    seo_keywords: 'ai agents, langchain, next.js, openai',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-3',
    title: 'SaaS Design System & Landing Engine',
    slug: 'saas-landing-ui-system',
    description: 'Ultra-fast Next.js 15 template with Tailwind CSS, Framer Motion micro-interactions, dark mode, and integrated payment flows.',
    category: 'Frontend Engineering',
    status: 'Production',
    cover_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop'
    ],
    tech_stack: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Framer Motion', 'Stripe'],
    github_url: 'https://github.com/sahil0902ai/saas-landing-ui',
    live_url: 'https://saas-landing-ui.vercel.app',
    case_study: '# SaaS Design System\n\nAchieved 100/100 Lighthouse performance scores across mobile & desktop.',
    featured: true,
    seo_title: 'SaaS Design System & Landing Engine | Sahil Bhakre',
    seo_description: 'Ultra-fast Next.js 15 template with 100/100 Lighthouse scores.',
    seo_keywords: 'next.js 15, tailwind css, react 19, frontend',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Memory store fallback if table is newly created
let memoryProjectsStore: ProjectModel[] = [...DEFAULT_PROJECTS];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    const supabase = createServerClient(true);
    const { data: dbProjects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    let projectsList: ProjectModel[] = [];

    if (!error && dbProjects && dbProjects.length > 0) {
      projectsList = dbProjects as ProjectModel[];
    } else {
      projectsList = memoryProjectsStore;
    }

    if (id) {
      const single = projectsList.find((p) => p.id === id);
      return NextResponse.json({ success: true, project: single || null }, { status: 200 });
    }

    if (slug) {
      const single = projectsList.find((p) => p.slug === slug);
      return NextResponse.json({ success: true, project: single || null }, { status: 200 });
    }

    return NextResponse.json({ success: true, projects: projectsList }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: true, projects: memoryProjectsStore }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      category,
      status,
      cover_image,
      gallery,
      tech_stack,
      github_url,
      live_url,
      case_study,
      featured,
      seo_title,
      seo_description,
      seo_keywords,
      published,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ success: false, error: 'Title and description are required.' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProject: ProjectModel = {
      id: 'proj-' + Date.now(),
      title,
      slug: generatedSlug,
      description,
      category: category || 'Web Architecture',
      status: status || 'Production',
      cover_image: cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      gallery: Array.isArray(gallery) ? gallery : [],
      tech_stack: Array.isArray(tech_stack) ? tech_stack : ['Next.js', 'TypeScript', 'Tailwind CSS'],
      github_url: github_url || '',
      live_url: live_url || '',
      case_study: case_study || '',
      featured: typeof featured === 'boolean' ? featured : false,
      seo_title: seo_title || title,
      seo_description: seo_description || description,
      seo_keywords: seo_keywords || '',
      published: typeof published === 'boolean' ? published : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Try inserting into Supabase
    const supabase = createServerClient(true);
    const { data: inserted, error } = await (supabase
      .from('projects') as any)
      .insert([newProject])
      .select()
      .single();

    if (!error && inserted) {
      memoryProjectsStore.unshift(inserted as ProjectModel);
      return NextResponse.json({ success: true, project: inserted }, { status: 201 });
    }

    // Memory Store fallback
    memoryProjectsStore.unshift(newProject);
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Error creating project' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required for updates.' }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

    const supabase = createServerClient(true);
    const { data: updated, error } = await (supabase
      .from('projects') as any)
      .update(updates)
      .eq('id', id)
      .select();

    // Sync memory store
    memoryProjectsStore = memoryProjectsStore.map((p) => (p.id === id ? { ...p, ...updates } : p));

    if (!error && updated && updated.length > 0) {
      return NextResponse.json({ success: true, project: updated[0] }, { status: 200 });
    }

    const updatedItem = memoryProjectsStore.find((p) => p.id === id);
    return NextResponse.json({ success: true, project: updatedItem }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required for deletion.' }, { status: 400 });
    }

    const supabase = createServerClient(true);
    await supabase.from('projects').delete().eq('id', id);

    memoryProjectsStore = memoryProjectsStore.filter((p) => p.id !== id);

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Error deleting project' }, { status: 500 });
  }
}
