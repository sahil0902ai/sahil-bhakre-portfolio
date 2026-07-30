export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: 'AI & Machine Learning' | 'Web Architecture' | 'System Design' | 'DevOps & Tooling';
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  toc: TocItem[];
  coverGradient: string;
  isFeatured?: boolean;
}

export const blogCategories = [
  'All Posts',
  'AI & Machine Learning',
  'Web Architecture',
  'System Design',
  'DevOps & Tooling',
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'architecting-stealth-scraping-pipelines-fastapi-playwright',
    title: 'Architecting Stealth Scraping Pipelines with FastAPI and Playwright',
    description: 'A deep dive into building production-grade, anti-detection web scraping engines using Python async loops, user-agent pools, and Next.js state management.',
    date: 'July 24, 2026',
    readingTime: '6 min read',
    category: 'AI & Machine Learning',
    tags: ['Python', 'FastAPI', 'Playwright', 'Web Scraping', 'AsyncIO'],
    author: {
      name: 'Sahil Bhakre',
      role: 'AI Engineer & Full-Stack Developer',
      avatar: 'SB',
    },
    isFeatured: true,
    coverGradient: 'from-[#00F2FE]/20 via-[#4FACFE]/20 to-purple-600/20 border-[#00F2FE]/30',
    toc: [
      { id: 'introduction', title: '1. Introduction to Stealth Scraping', level: 2 },
      { id: 'browser-pool-architecture', title: '2. Browser Pool Architecture', level: 2 },
      { id: 'fastapi-async-queue', title: '3. FastAPI Async Event Queues', level: 2 },
      { id: 'bypassing-rate-limits', title: '4. Bypassing Bot Limits & Captchas', level: 2 },
      { id: 'conclusion', title: '5. Production Key Takeaways', level: 2 },
    ],
    content: `
## 1. Introduction to Stealth Scraping {#introduction}

Modern web applications use sophisticated anti-bot detectors like Cloudflare, Akamai, and Datadome. Traditional HTTP clients (\`requests\` or \`axios\`) get blocked instantly due to missing TLS fingerprints and browser behavior signals.

To overcome this, we architect an asynchronous **Playwright Stealth worker pool** managed by Python's \`asyncio\` event loop and exposed via **FastAPI** REST endpoints.

## 2. Browser Pool Architecture {#browser-pool-architecture}

Rather than launching a new browser process for every incoming request, we maintain a persistent pool of initialized browser contexts:

\`\`\`python
import asyncio
from playwright.async_api import async_playwright

class StealthBrowserPool:
    def __init__(self, pool_size=5):
        self.pool_size = pool_size
        self.browsers = []

    async def initialize(self):
        self.playwright = await async_playwright().start()
        for _ in range(self.pool_size):
            browser = await self.playwright.chromium.launch(
                headless=True,
                args=["--no-sandbox", "--disable-setuid-sandbox"]
            )
            self.browsers.append(browser)
\`\`\`

## 3. FastAPI Async Event Queues {#fastapi-async-queue}

FastAPI provides native support for background worker tasks via Python's \`BackgroundTasks\` and Windows Proactor event loop handling:

\`\`\`python
from fastapi import FastAPI, BackgroundTasks

app = FastAPI(title="Stealth Scraping Engine API")

@app.post("/api/scrape")
async def trigger_scrape(query: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(run_scrape_worker, query)
    return {"status": "queued", "message": f"Scrape job initiated for {query}"}
\`\`\`

## 4. Bypassing Bot Limits & Captchas {#bypassing-rate-limits}

Key strategies for zero-detection execution:
- Rotating HTTP header User-Agent strings.
- Injecting navigator webdriver evasion scripts (\`navigator.webdriver = undefined\`).
- Introducing randomized Human-like delays (\`asyncio.sleep(random.uniform(0.5, 1.8))\`).

## 5. Production Key Takeaways {#conclusion}

By decoupling Playwright scraping tasks from the client UI via FastAPI microservices, we maintain sub-100ms dashboard speeds while extracting data continuously.
    `,
  },
  {
    slug: 'nextjs-15-app-router-performance-optimization-guide',
    title: 'Next.js 15 App Router: Advanced Performance Optimization Guide',
    description: 'Learn how to optimize Server Components, dynamic imports, and Framer Motion spring presets to achieve sub-100ms LCP and 100/100 Lighthouse scores.',
    date: 'July 18, 2026',
    readingTime: '8 min read',
    category: 'Web Architecture',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Performance', 'Lighthouse'],
    author: {
      name: 'Sahil Bhakre',
      role: 'AI Engineer & Full-Stack Developer',
      avatar: 'SB',
    },
    coverGradient: 'from-[#A855F7]/20 via-[#4FACFE]/20 to-emerald-500/20 border-[#A855F7]/30',
    toc: [
      { id: 'rsc-architecture', title: '1. React Server Component Bundles', level: 2 },
      { id: 'gpu-acceleration', title: '2. Hardware GPU Layering in Tailwind', level: 2 },
      { id: 'static-prerendering', title: '3. SSG & generateStaticParams', level: 2 },
    ],
    content: `
## 1. React Server Component Bundles {#rsc-architecture}

Next.js 15 defaults all components in the \`app/\` directory to React Server Components (RSC). By keeping data fetching logic on the server, zero client JavaScript bundle size is required for data rendering.

## 2. Hardware GPU Layering in Tailwind {#gpu-acceleration}

Complex backdrop-blur animations can cause layout jank on mobile viewports. By applying GPU hardware layer acceleration (\`transform-gpu\` and \`will-change: transform\`), rendering is offloaded to the GPU hardware:

\`\`\`css
.premium-card {
  will-change: transform;
  transform: translateZ(0);
}
\`\`\`

## 3. SSG & generateStaticParams {#static-prerendering}

Utilizing \`generateStaticParams()\` allows Next.js 15 to prebuild dynamic routes into static HTML at build time, resulting in instant CDN delivery.
    `,
  },
  {
    slug: 'building-deterministic-ai-agents-with-langchain-json-schemas',
    title: 'Building Deterministic AI Agents with LangChain & Structured JSON Schemas',
    description: 'How to prevent LLM hallucinations by forcing deterministic JSON schema outputs with OpenAI tool calling and FastAPI validation queues.',
    date: 'July 10, 2026',
    readingTime: '5 min read',
    category: 'System Design',
    tags: ['AI Agents', 'LangChain', 'Python', 'JSON Schema', 'OpenAI'],
    author: {
      name: 'Sahil Bhakre',
      role: 'AI Engineer & Full-Stack Developer',
      avatar: 'SB',
    },
    coverGradient: 'from-[#10B981]/20 via-[#00F2FE]/20 to-purple-600/20 border-[#10B981]/30',
    toc: [
      { id: 'the-hallucination-problem', title: '1. The Hallucination Problem', level: 2 },
      { id: 'structured-output-schemas', title: '2. Enforcing JSON Schemas', level: 2 },
      { id: 'fastapi-zod-integration', title: '3. Validation & Recovery', level: 2 },
    ],
    content: `
## 1. The Hallucination Problem {#the-hallucination-problem}

When integrating Large Language Models into enterprise software, raw text responses are unusable for database insertion. LLMs often omit fields, wrap output in Markdown code blocks, or invent missing parameters.

## 2. Enforcing JSON Schemas {#structured-output-schemas}

By utilizing OpenAI function calling and Pydantic schemas, we force the LLM to output valid JSON matching our exact type structure:

\`\`\`python
from pydantic import BaseModel, Field

class LeadData(BaseModel):
    company_name: str = Field(description="Name of the business")
    email: str = Field(description="Verified email address")
    rating: float = Field(description="Average customer rating from 1 to 5")
\`\`\`

## 3. Validation & Recovery {#fastapi-zod-integration}

If validation fails, the Pydantic parser automatically feeds the validation error back into the LLM prompt for self-correction.
    `,
  },
];
