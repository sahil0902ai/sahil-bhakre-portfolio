export interface KnowledgeTopic {
  id: string;
  category: 'services' | 'tech' | 'projects' | 'process' | 'experience' | 'recommendation';
  keywords: string[];
  title: string;
  content: string;
}

export const portfolioKnowledgeBase: KnowledgeTopic[] = [
  {
    id: 'services-overview',
    category: 'services',
    keywords: ['services', 'offer', 'service', 'what can you build', 'capabilities', 'do', 'help'],
    title: 'Core Engineering Services',
    content: `Sahil Bhakre offers 4 core software engineering services:

1. **AI Agent Systems & Automation**: Custom LLM workflows, LangChain autonomous pipelines, Pydantic JSON schema validation, and vector database embeddings (pgvector/SQLite).
2. **Playwright Stealth Lead Scraping**: Automated web extraction microservices with proxy rotation, anti-detect headers, and sub-60s batch data ingestion into FastAPI backends.
3. **Full-Stack Next.js 15 Web Apps**: Modern React 19 web applications with TypeScript, Tailwind CSS, 100/100 Lighthouse performance, and Server Component architectures.
4. **FastAPI & REST Backend Microservices**: High-concurrency Python REST APIs built with Uvicorn, AsyncIO, PostgreSQL/SQLite schemas, and OpenAPI documentation.`,
  },
  {
    id: 'tech-stack',
    category: 'tech',
    keywords: ['technologies', 'tech stack', 'tools', 'languages', 'frameworks', 'python', 'nextjs', 'fastapi', 'react', 'typescript'],
    title: 'Production Tech Stack',
    content: `Sahil's production-tested engineering matrix:

- **AI & Data Engineering**: Python, FastAPI, LangChain, OpenAI / Gemini APIs, Playwright Stealth, pgvector, SQLite, Pandas.
- **Frontend Architecture**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3, Zod, TanStack Query.
- **Backend & Databases**: Node.js, REST APIs, PostgreSQL, SQLite, Uvicorn, JSON Schemas, AsyncIO, HTTPX.
- **Design & Tooling**: Figma, UI/UX Design, Graphic Design, Git / GitHub, VS Code, Postman, Vercel.`,
  },
  {
    id: 'projects-summary',
    category: 'projects',
    keywords: ['projects', 'case studies', 'maps lead scraper', 'ai agent', 'saas design system', 'work', 'built', 'portfolio'],
    title: 'Production Projects & Open-Source Work',
    content: `Sahil has engineered 3 major production case studies:

1. **Maps Lead Scraper Pro**: Open-source B2B Google Maps lead extraction engine using Playwright stealth automation, FastAPI backend, and Next.js 15 dashboard. Achieves sub-60s extraction speed with CSV/JSON exports. [View Code](https://github.com/sahilbhakre/maps-lead-scraper).
2. **Autonomous AI Agent Suite**: LangChain deterministic multi-step AI agent pipeline with Pydantic JSON schema validation, pgvector semantic search, and FastAPI microservice API. Achieves 99.4% schema validation accuracy.
3. **SaaS Design System**: Full-stack Next.js 15 landing page & component system built with React 19, Tailwind CSS, and Framer Motion. Achieves 100/100 Lighthouse performance scores and sub-220ms CSS transitions.`,
  },
  {
    id: 'development-process',
    category: 'process',
    keywords: ['process', 'development process', 'workflow', 'how do you work', 'steps', 'methodology', 'sprints'],
    title: '4-Step Engineering Process',
    content: `Sahil follows a disciplined 4-step agile engineering methodology:

1. **Discovery & Goals Alignment**: Clarifying core business objectives, technical requirements, project timeline, and success metrics.
2. **Architecture & Wireframing**: Mapping out system architecture, database schema, and high-conversion wireframes in Figma.
3. **Agile Engineering & Sprints**: Building the application using clean, type-safe Next.js 15, FastAPI, or Playwright code with regular progress demos.
4. **Testing, Launch & Handoff**: Automated build checks, performance tuning, security audits, and production deployment with 30 days of post-launch warranty.`,
  },
  {
    id: 'tech-comparison',
    category: 'tech',
    keywords: ['compare', 'fastapi vs node', 'nextjs vs react', 'playwright vs selenium', 'python vs javascript', 'vs'],
    title: 'Technology Comparison Insights',
    content: `Architectural comparison insights:

- **Next.js 15 vs Standard React**: Next.js 15 provides Server Components, automatic SSG/ISR page generation, zero-bundle routing, and built-in SEO metadata, yielding 100/100 Lighthouse scores compared to standard SPA React bundles.
- **FastAPI vs Node/Express**: FastAPI leverages Python's AsyncIO for high-concurrency API microservices with native Pydantic type validation and automatic OpenAPI documentation.
- **Playwright vs Selenium**: Playwright stealth mode bypasses modern bot protections natively with headless Chromium context isolation, sub-60s extraction times, and zero memory leaks.`,
  },
  {
    id: 'solution-recommendated',
    category: 'recommendation',
    keywords: ['recommend', 'solution', 'business', 'fit', 'best for my business', 'help my business', 'which service'],
    title: 'Custom Solution Recommendation Engine',
    content: `Recommendation guidance for your business:

- **If you need B2B lead generation or data extraction**: Recommend **Playwright Lead Scraping Microservice** + FastAPI backend to automate manual research and feed your CRM.
- **If you need workflow automation or LLM features**: Recommend **Autonomous AI Agent Suite** to handle multi-step reasoning, document summarization, or automated support under strict JSON schemas.
- **If you need a new web application or SaaS landing page**: Recommend **Next.js 15 Full-Stack Web Engineering** for a high-converting, 100/100 Lighthouse score web presence with mobile responsiveness.`,
  },
  {
    id: 'experience-summary',
    category: 'experience',
    keywords: ['experience', 'background', 'education', 'degree', 'btech', 'data science', 'who is sahil', 'bio', 'about'],
    title: 'Professional Background & Education',
    content: `Sahil Bhakre is an **AI Engineer, Full-Stack Developer, and B.Tech Data Science Student** based in India.

Key highlights:
- **Education**: B.Tech in Data Science (Undergraduate Degree, University in India) specializing in machine learning, database optimization, and software development.
- **Specialization**: Playwright stealth lead scrapers, FastAPI microservices, LangChain AI agents, and Next.js 15 web applications.
- **Client Guarantees**: 100% Mutual NDA protection, transparent fixed-price quotes, 30 days of post-launch maintenance, and 24-hour strategy response turnaround.`,
  },
];
