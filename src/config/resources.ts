export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'AI' | 'Next.js' | 'React' | 'Automation' | 'UI Design' | 'Prompt Engineering' | 'Business' | 'Books' | 'Tools' | 'Templates';
  tags: string[];
  url: string;
  type: 'Guide' | 'Book' | 'Template' | 'Tool' | 'Snippet' | 'Documentation';
  isFeatured?: boolean;
  publishedAt: string;
}

export const resourceCategories = [
  'All',
  'AI',
  'Next.js',
  'React',
  'Automation',
  'UI Design',
  'Prompt Engineering',
  'Business',
  'Books',
  'Tools',
  'Templates',
] as const;

export const resourcesData: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Deterministic AI Agent System Prompts & Pydantic Schemas',
    description: 'A curated collection of system prompts and Pydantic V2 JSON output schemas for building zero-hallucination LangChain agents.',
    category: 'Prompt Engineering',
    tags: ['LangChain', 'Pydantic', 'GPT-4o', 'JSON Schema'],
    url: 'https://github.com/sahilbhakre/maps-lead-scraper',
    type: 'Snippet',
    isFeatured: true,
    publishedAt: '2026-07-20',
  },
  {
    id: 'res-2',
    title: 'Playwright Stealth Anti-Detection Evasion Boilerplate',
    description: 'Python AsyncIO Playwright template configured with browser fingerprint evasions, proxy rotation, and user-agent pools.',
    category: 'Automation',
    tags: ['Python', 'Playwright', 'FastAPI', 'Stealth'],
    url: 'https://github.com/sahilbhakre/maps-lead-scraper/blob/main/backend/scraper/stealth.py',
    type: 'Template',
    isFeatured: true,
    publishedAt: '2026-07-18',
  },
  {
    id: 'res-3',
    title: 'Next.js 15 App Router 100/100 Lighthouse Performance Architecture',
    description: 'Production checklist and configuration settings for achieving 100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.',
    category: 'Next.js',
    tags: ['Next.js 15', 'Lighthouse', 'SWC', 'Performance'],
    url: '/blog/nextjs-15-app-router-performance-optimization-guide',
    type: 'Guide',
    isFeatured: true,
    publishedAt: '2026-07-15',
  },
  {
    id: 'res-4',
    title: 'React 19 Server Components & Custom Hooks Toolkit',
    description: 'A collection of lightweight React 19 hooks for local storage state, window resize listeners, and micro-animations.',
    category: 'React',
    tags: ['React 19', 'TypeScript', 'Hooks'],
    url: 'https://react.dev',
    type: 'Snippet',
    publishedAt: '2026-07-10',
  },
  {
    id: 'res-5',
    title: 'Dark-Mode Glassmorphism Design System Tokens',
    description: 'Vanilla CSS variable tokens for sleek dark-mode glassmorphic cards, glowing borders, and accessible color contrast.',
    category: 'UI Design',
    tags: ['CSS', 'Design System', 'Accessibility', 'Glassmorphism'],
    url: '/about',
    type: 'Template',
    publishedAt: '2026-07-08',
  },
  {
    id: 'res-6',
    title: 'Designing Data-Intensive Applications by Martin Kleppmann',
    description: 'Essential reference guide for building scalable, fault-tolerant distributed systems, relational databases, and event logs.',
    category: 'Books',
    tags: ['Architecture', 'Distributed Systems', 'Databases'],
    url: 'https://dataintensive.net',
    type: 'Book',
    publishedAt: '2026-07-05',
  },
  {
    id: 'res-7',
    title: 'FastAPI Async Microservices Starter Template',
    description: 'Production-ready Python FastAPI repository with SQLAlchemy WAL mode database connection pool, CORS middleware, and Uvicorn server setup.',
    category: 'Templates',
    tags: ['FastAPI', 'Python', 'SQLAlchemy', 'PostgreSQL'],
    url: 'https://github.com/sahilbhakre/maps-lead-scraper',
    type: 'Template',
    publishedAt: '2026-07-01',
  },
  {
    id: 'res-8',
    title: 'B2B Client Mutual NDA & Fixed-Quote Milestone Contract Template',
    description: 'Standard enterprise agreement template guaranteeing 100% mutual NDA protection, fixed pricing, and 30-day post-launch support.',
    category: 'Business',
    tags: ['Business', 'Contracts', 'Freelance', 'SaaS'],
    url: '/contact',
    type: 'Guide',
    publishedAt: '2026-06-28',
  },
  {
    id: 'res-9',
    title: 'LangChain & pgvector Vector Search Developer Guide',
    description: 'Step-by-step documentation for initializing PostgreSQL pgvector extension and executing sub-20ms cosine similarity queries.',
    category: 'AI',
    tags: ['AI', 'LangChain', 'pgvector', 'PostgreSQL'],
    url: 'https://python.langchain.com',
    type: 'Documentation',
    publishedAt: '2026-06-25',
  },
  {
    id: 'res-10',
    title: 'Essential Chrome DevTools & Accessibility Audit Extensions',
    description: 'Curated browser developer tools for WCAG 2.2 contrast checking, DOM layout inspection, and network payload timing.',
    category: 'Tools',
    tags: ['DevTools', 'Accessibility', 'Chrome', 'Debugging'],
    url: 'https://developer.chrome.com/docs/devtools',
    type: 'Tool',
    publishedAt: '2026-06-20',
  },
];
