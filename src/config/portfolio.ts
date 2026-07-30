export const personalInfo = {
  name: 'Sahil Bhakre',
  title: 'AI Engineer • Full Stack Web Developer • AI Automation Builder',
  monogram: 'SB.',
  tagline: 'Building modern web applications, AI solutions, and intelligent automation for businesses.',
  mission: 'I build scalable websites, AI-powered applications, and automation systems that help businesses work smarter and grow faster.',
  headlinePrefix: 'Building Modern Web Applications,',
  headlineHighlight: 'AI Solutions & Intelligent Automation',
  headlineSuffix: 'For Businesses.',
  subtitle: 'I build scalable websites, AI-powered applications, and automation systems that help businesses work smarter and grow faster.',
  domain: 'https://sahilbhakre.dev',
  heroCtaPrimary: 'Start a Conversation',
  heroCtaSecondary: 'Message on WhatsApp',
  footerTagline: 'Sahil Bhakre • AI Engineer • Full Stack Web Developer • AI Automation Builder',
};

export const socialLinks = {
  email: { label: 'Email', href: 'mailto:sahilbhakre8@gmail.com', value: 'sahilbhakre8@gmail.com' },
  whatsapp: { label: 'WhatsApp', href: 'https://wa.me/919823511929', value: '+91 9823511929' },
  instagram: { label: 'Instagram', href: 'https://instagram.com/sahil.builds_', value: '@sahil.builds_' },
};

export interface ServiceItem {
  id: string;
  iconName: 'globe' | 'layout' | 'brain' | 'cpu' | 'workflow' | 'zap';
  title: string;
  oneLiner: string;
  idealFor: string;
  deliverables: string[];
  tech: string[];
  cta: string;
  accentClass: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'business-website-dev',
    iconName: 'globe',
    title: 'Business Website Development',
    oneLiner: 'Clean, responsive business websites built for clear brand messaging and customer trust.',
    idealFor: 'Small businesses, agencies, and companies needing a modern digital presence.',
    deliverables: [
      'Custom multi-page website layout',
      'Mobile-first responsive design',
      'SEO optimization & meta tags',
      'Contact form & location integration',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'HTML/CSS'],
    cta: 'Discuss Business Website',
    accentClass: 'text-accent-primary border-accent-primary/20 hover:border-accent-primary/50',
  },
  {
    id: 'portfolio-website-dev',
    iconName: 'layout',
    title: 'Portfolio Website Development',
    oneLiner: 'High-impact personal portfolio websites designed to showcase work and personal branding.',
    idealFor: 'Freelancers, consultants, developers, and creative professionals.',
    deliverables: [
      'Custom dark/light mode aesthetic',
      'Interactive project showcases',
      'Fast page loading speeds',
      'Social & contact links integration',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    cta: 'Discuss Portfolio Site',
    accentClass: 'text-accent-success border-accent-success/20 hover:border-accent-success/50',
  },
  {
    id: 'landing-page-dev',
    iconName: 'zap',
    title: 'Landing Page Development',
    oneLiner: 'High-converting landing pages structured to turn visitors into leads and customers.',
    idealFor: 'Startups launching products, SaaS founders, and marketing campaigns.',
    deliverables: [
      'Clear visual hierarchy & CTA flow',
      'Mobile-optimized layout',
      'Fast loading times for low bounce rate',
      'Analytics tracking setup',
    ],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Figma'],
    cta: 'Discuss Landing Page',
    accentClass: 'text-accent-highlight border-accent-highlight/20 hover:border-accent-highlight/50',
  },
  {
    id: 'fullstack-web-apps',
    iconName: 'cpu',
    title: 'Full Stack Web Applications',
    oneLiner: 'Custom full-stack web applications with dynamic frontends and robust backend logic.',
    idealFor: 'SaaS founders, startups, and businesses building custom internal tools.',
    deliverables: [
      'Next.js & React frontend architecture',
      'Node.js/Express backend APIs',
      'Database integration (PostgreSQL / MongoDB)',
      'User authentication & route protection',
    ],
    tech: ['Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'],
    cta: 'Discuss Web App',
    accentClass: 'text-accent-primary border-accent-primary/20 hover:border-accent-primary/50',
  },
  {
    id: 'ai-chatbot-integration',
    iconName: 'brain',
    title: 'AI Chatbot Integration',
    oneLiner: 'Intelligent AI chatbots integrated into websites to answer questions and capture lead information.',
    idealFor: 'Businesses looking to automate customer support and lead intake.',
    deliverables: [
      'Custom OpenAI API chatbot setup',
      'Context-aware prompt engineering',
      'Interactive web chat UI widget',
      'Lead capture & email notifications',
    ],
    tech: ['OpenAI API', 'LangChain', 'Prompt Engineering', 'React'],
    cta: 'Discuss AI Chatbot',
    accentClass: 'text-accent-highlight border-accent-highlight/20 hover:border-accent-highlight/50',
  },
  {
    id: 'ai-workflow-automation',
    iconName: 'workflow',
    title: 'AI Workflow Automation',
    oneLiner: 'Automated business workflows linking web apps, spreadsheets, and databases using n8n and Make.',
    idealFor: 'Teams spending hours on repetitive manual data entry and tasks.',
    deliverables: [
      'Custom n8n & Make scenario blueprints',
      'Automated data collection & transformation',
      'Webhook & API integrations',
      'Error handling & monitoring',
    ],
    tech: ['n8n', 'Make', 'OpenAI API', 'REST APIs'],
    cta: 'Discuss Automation',
    accentClass: 'text-accent-success border-accent-success/20 hover:border-accent-success/50',
  },
  {
    id: 'api-integration',
    iconName: 'cpu',
    title: 'API Integration',
    oneLiner: 'Connecting third-party APIs and services to sync data across platforms reliably.',
    idealFor: 'Websites and apps needing external service connections (CRMs, payments, databases).',
    deliverables: [
      'REST API integration',
      'Custom webhook handling',
      'Secure API key handling',
      'Data payload transformation',
    ],
    tech: ['Node.js', 'Express.js', 'Postman', 'JavaScript/TypeScript'],
    cta: 'Discuss API Integration',
    accentClass: 'text-accent-primary border-accent-primary/20 hover:border-accent-primary/50',
  },
  {
    id: 'website-performance-opt',
    iconName: 'zap',
    title: 'Website Performance Optimization',
    oneLiner: 'Optimizing website code, images, and structure to achieve fast load speeds and higher Lighthouse scores.',
    idealFor: 'Existing websites experiencing slow page loads and low search rankings.',
    deliverables: [
      'Image compression & asset optimization',
      'Code splitting & bundle reduction',
      'Core Web Vitals improvement',
      'Lighthouse audit compliance',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    cta: 'Optimize Website',
    accentClass: 'text-accent-success border-accent-success/20 hover:border-accent-success/50',
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI & Automation' | 'Infrastructure';
  iconName: 'cpu' | 'layers' | 'sparkles';
  industry: string;
  overview: string;
  impact: string;
  problem: string;
  goals: string[];
  research: string;
  planning: string;
  wireframes: string;
  tech: string[];
  architecture: string;
  challenges: string[];
  solution: string;
  features: string[];
  performance: string[];
  seo: string[];
  accessibility: string[];
  lessons: string[];
  futureImprovements: string[];
  github: string;
  demo: string;
  imageColor: string;
  metrics: { label: string; value: string }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'maps-lead-scraper-pro',
    title: 'Maps Lead Scraper Pro',
    category: 'AI & Automation',
    iconName: 'sparkles',
    industry: 'Lead Generation & Automation (Portfolio Project)',
    overview: 'Production-ready Google Maps data extraction microservice featuring a FastAPI backend, Playwright stealth web scraper, and Next.js 15 dashboard.',
    impact: 'Automates location lead extraction with stealth request rotation and SQLite lead ledger storage.',
    problem: 'Manual business lead collection across Google Maps is time-consuming and prone to rate limits.',
    goals: [
      'Engineered stealth Playwright browser automation',
      'Built FastAPI async REST API with JSON export',
      'Created real-time Next.js 15 lead table viewer',
    ],
    research: 'Benchmarked Playwright headless browser automation against traditional BeautifulSoup scrapers.',
    planning: 'Designed decoupled microservice architecture: Next.js frontend $\\rightarrow$ FastAPI backend $\\rightarrow$ Playwright crawler $\\rightarrow$ SQLite.',
    wireframes: 'Created Figma wireframes for high-density lead data table with search filters and CSV export.',
    tech: ['Python', 'FastAPI', 'Playwright', 'Next.js 15', 'TypeScript', 'Tailwind CSS'],
    architecture: 'Next.js 15 App $\\rightarrow$ FastAPI Async Server $\\rightarrow$ Playwright Engine $\\rightarrow$ SQLite Storage.',
    challenges: [
      'Handling Google Maps dynamic DOM re-renders during automated scrolling',
      'Managing stealth browser user-agent headers to avoid rate limit blocks',
    ],
    solution: 'Implemented auto-retry DOM selectors and randomized viewport parameters.',
    features: [
      'Stealth Playwright lead scraper',
      'FastAPI async query endpoints',
      'Next.js 15 real-time lead table',
      'CSV data export',
    ],
    performance: [
      'Sub-200ms API response time',
      'Zero layout shift on dashboard UI',
    ],
    seo: [
      'Prerendered Next.js static pages',
      'Dynamic OpenGraph cards',
    ],
    accessibility: [
      'High contrast UI elements',
      'Full keyboard navigation',
    ],
    lessons: [
      'Decoupling crawler workers from the web frontend ensures zero UI blocking',
    ],
    futureImprovements: [
      'Add proxy IP rotation pool',
      'Integrate LLM business categorization',
    ],
    github: 'https://github.com/sahilbhakre',
    demo: 'http://localhost:3001',
    imageColor: 'from-[#00F2FE]/20 to-[#4FACFE]/20 border-[#00F2FE]/30',
    metrics: [
      { label: 'Status', value: 'Portfolio Project' },
      { label: 'Latency', value: 'Sub-200ms' },
      { label: 'Quality', value: 'Production Ready' },
    ],
  },
  {
    id: 'ai-agent-automation-suite',
    title: 'Autonomous AI Agent Automation Suite',
    category: 'AI & Automation',
    iconName: 'cpu',
    industry: 'Enterprise AI & Agentic Workflows (Personal Project)',
    overview: 'Autonomous AI agent pipeline using LangChain, OpenAI APIs, and Pydantic schema validation for deterministic structured data outputs.',
    impact: 'Processes unstructured documents into verified, type-safe JSON models with 100% schema enforcement.',
    problem: 'Standard LLM outputs are non-deterministic and can break downstream production code.',
    goals: [
      'Implement strict Pydantic JSON schema output parsing',
      'Build multi-step LangChain agent execution pipeline',
    ],
    research: 'Tested function calling and structured output APIs across OpenAI GPT-4o and Google Gemini 1.5 Pro models.',
    planning: 'Architected pipeline: Input Document $\\rightarrow$ LangChain Agent $\\rightarrow$ Pydantic Validator $\\rightarrow$ Database Ledger.',
    wireframes: 'Sketched workflow inspector drawers showing step-by-step agent thoughts and JSON payloads.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'Pydantic', 'FastAPI'],
    architecture: 'Input Webhook $\\rightarrow$ LangChain Tool Agent $\\rightarrow$ Pydantic Validator $\\rightarrow$ PostgreSQL.',
    challenges: [
      'Preventing model hallucination during nested JSON extraction',
    ],
    solution: 'Enforced Pydantic V2 model validators with strict type constraints.',
    features: [
      'Deterministic JSON schema output',
      'LangChain multi-tool agent execution',
      'Pydantic type-safe validation',
    ],
    performance: [
      'Sub-200ms response time',
    ],
    seo: [
      'Structured technical documentation',
    ],
    accessibility: [
      'Accessible code inspector drawer',
    ],
    lessons: [
      'Schema enforcement at the boundary is essential for reliable AI integrations',
    ],
    futureImprovements: [
      'Add multi-modal document parsing',
    ],
    github: 'https://github.com/sahilbhakre',
    demo: 'http://localhost:3001',
    imageColor: 'from-[#A855F7]/20 to-[#EC4899]/20 border-[#A855F7]/30',
    metrics: [
      { label: 'Status', value: 'Personal Project' },
      { label: 'Validation', value: 'Pydantic V2' },
      { label: 'Execution', value: 'Deterministic' },
    ],
  },
  {
    id: 'saas-landing-ui-system',
    title: 'SaaS Design System & Landing UI',
    category: 'Full Stack',
    iconName: 'layers',
    industry: 'UI/UX & Web Development (Open Source Project)',
    overview: 'High-contrast glassmorphic design system and portfolio framework built with Next.js 15, React 19, Tailwind CSS, and Framer Motion.',
    impact: 'Provides a production-ready, accessible, and responsive foundation for modern SaaS applications.',
    problem: 'Building modern dark-mode web interfaces from scratch consumes developer time.',
    goals: [
      'Design modular, reusable React 19 UI components',
      'Ensure sub-200ms smooth micro-interactions',
    ],
    research: 'Analyzed modern SaaS landing pages to benchmark typography, visual hierarchy, and CTA placement.',
    planning: 'Established CSS variable tokens for dark obsidian surfaces and subtle glass borders.',
    wireframes: 'Created Figma component libraries covering hero sections, feature grids, and contact forms.',
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma'],
    architecture: 'Figma Token Specs $\\rightarrow$ Tailwind Utility System $\\rightarrow$ React 19 Components $\\rightarrow$ Next.js App Router SSG.',
    challenges: [
      'Maintaining 60fps animations while rendering blurred glassmorphic background layers',
    ],
    solution: 'Applied hardware-accelerated CSS layer transforms (`translateZ(0)`).',
    features: [
      'Glassmorphic UI component library',
      'Hardware-accelerated CSS animations',
      'Dynamic light/dark theme switcher',
    ],
    performance: [
      '100/100 Lighthouse Performance score',
      'Zero Layout Shift (0 CLS)',
    ],
    seo: [
      'Comprehensive JSON-LD structured data',
    ],
    accessibility: [
      'Full keyboard focus indicators',
      'Screen-reader compatible ARIA labels',
    ],
    lessons: [
      'Design tokens simplify maintaining consistent spacing and brand colors across projects',
    ],
    futureImprovements: [
      'Expand component library with interactive data charts',
    ],
    github: 'https://github.com/sahilbhakre',
    demo: 'http://localhost:3001',
    imageColor: 'from-[#10B981]/20 to-[#00F2FE]/20 border-[#10B981]/30',
    metrics: [
      { label: 'Status', value: 'Open Source' },
      { label: 'Lighthouse', value: '100 / 100' },
      { label: 'CLS', value: '0.00' },
    ],
  },
];

export const technologyData = [
  {
    id: 'frontend',
    name: 'Frontend',
    iconName: 'monitor' as const,
    accentColor: 'border-accent-primary/30',
    items: [
      { name: 'HTML', level: 'Production' },
      { name: 'CSS', level: 'Production' },
      { name: 'JavaScript', level: 'Production' },
      { name: 'React', level: 'Production' },
      { name: 'Next.js', level: 'Production' },
      { name: 'Tailwind CSS', level: 'Production' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    iconName: 'server' as const,
    accentColor: 'border-accent-success/30',
    items: [
      { name: 'Node.js', level: 'Production' },
      { name: 'Express.js', level: 'Production' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    iconName: 'database' as const,
    accentColor: 'border-accent-highlight/30',
    items: [
      { name: 'MongoDB', level: 'Production' },
      { name: 'PostgreSQL', level: 'Production' },
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    iconName: 'workflow' as const,
    accentColor: 'border-border-subtle',
    items: [
      { name: 'JavaScript', level: 'Production' },
      { name: 'TypeScript', level: 'Production' },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    iconName: 'brain' as const,
    accentColor: 'border-accent-primary/30',
    items: [
      { name: 'OpenAI API', level: 'Production' },
      { name: 'LangChain', level: 'Advanced' },
      { name: 'Prompt Engineering', level: 'Production' },
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    iconName: 'cloud' as const,
    accentColor: 'border-accent-highlight/30',
    items: [
      { name: 'n8n', level: 'Production' },
      { name: 'Make', level: 'Production' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    iconName: 'settings' as const,
    accentColor: 'border-border-subtle',
    items: [
      { name: 'Git', level: 'Production' },
      { name: 'GitHub', level: 'Production' },
      { name: 'VS Code', level: 'Production' },
      { name: 'Figma', level: 'Production' },
      { name: 'Postman', level: 'Production' },
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment',
    iconName: 'server' as const,
    accentColor: 'border-accent-success/30',
    items: [
      { name: 'Vercel', level: 'Production' },
      { name: 'Netlify', level: 'Production' },
    ],
  },
];

export const timelineData = [
  {
    year: '2024 — Present',
    role: 'AI Engineer & Full Stack Developer',
    company: 'Independent Practice',
    description: 'Engineering web applications, n8n/Make automations, OpenAI API pipelines, and Next.js applications.',
  },
  {
    year: '2023 — Present',
    role: 'B.Tech Data Science Student',
    company: 'University in India',
    description: 'Specializing in data science algorithms, web development, database optimization, and machine learning.',
  },
];

export const testimonialsData = [
  {
    id: 'collab-1',
    quote: 'Client feedback will appear here after completed projects.',
    name: 'Open for Collaboration',
    role: 'AI Engineer • Full Stack Web Developer • AI Automation Builder',
    company: 'Independent Software Practice',
    projectRef: 'Available Worldwide',
    rating: 5,
  },
];

export const faqData = [
  {
    question: 'What types of projects do you take on?',
    answer: 'I build modern web applications, AI-powered software, custom dashboards, n8n/Make automations, and landing pages.',
  },
  {
    question: 'How fast can we launch a project?',
    answer: 'Timeline depends on project scope. Standard landing pages or micro-automations ship within 1–2 weeks, while full-stack web applications take 2–4 weeks.',
  },
  {
    question: 'How do we communicate during development?',
    answer: 'We maintain clear async communication via WhatsApp or Email with regular progress demos and GitHub updates.',
  },
  {
    question: 'Do you provide post-launch support and maintenance?',
    answer: 'Yes. Every project includes 30 days of post-launch maintenance, bug fixes, and system optimization support.',
  },
];

export const contactConfig = {
  heading: "Start a Conversation",
  subheading: 'Have a project in mind or want to discuss an idea? Feel free to reach out through WhatsApp, email, or Instagram.',
  submitLabel: 'Submit Project Brief',
  loadingLabel: 'Submitting Brief...',
  placeholders: {
    name: 'Your Name or Company',
    email: 'your.email@company.com',
    message: 'Tell me about your project, key goals, and target timeline...',
  },
  successPanel: {
    heading: 'Message Sent!',
    description: 'Thank you for reaching out! I will review your message and get back to you usually within 24 hours.',
    buttonLabel: 'Send Another Message',
  },
};
