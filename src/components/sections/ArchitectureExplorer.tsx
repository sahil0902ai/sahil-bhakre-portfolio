'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, GitBranch, Server, Database, Brain, Workflow, Cloud, 
  ArrowDown, CheckCircle2, ChevronRight, Sparkles, Layers 
} from 'lucide-react';
import { projectsData } from '@config/portfolio';

export interface ArchLayer {
  id: string;
  name: string;
  category: 'Frontend' | 'API' | 'Backend' | 'Database' | 'AI Layer' | 'Automation' | 'Deployment';
  icon: any;
  tech: string;
  description: string;
  details: string[];
  snippet: string;
}

const LAYER_PRESETS: Record<string, ArchLayer[]> = {
  'maps-lead-scraper-pro': [
    {
      id: 'frontend',
      name: 'Next.js 15 Client Portal',
      category: 'Frontend',
      icon: Monitor,
      tech: 'Next.js 15 • React 19 • Tailwind CSS • Framer Motion',
      description: 'Responsive dark-mode analytics portal with live progress monitoring and export triggers.',
      details: ['100/100 Lighthouse Performance', 'Client-side sub-150ms table search', 'Interactive 3-step CSV/JSON export'],
      snippet: 'export function ScrapingDashboard() { const { data } = useSWR("/api/scrape"); ... }',
    },
    {
      id: 'api',
      name: 'FastAPI Async REST Gateway',
      category: 'API',
      icon: GitBranch,
      tech: 'FastAPI • Uvicorn • Pydantic V2 • CORS Rules',
      description: 'High-throughput async REST API endpoints routing task requests to background workers.',
      details: ['Sub-50ms API routing latency', 'Automatic OpenAPI / Swagger documentation', 'Pydantic request payload validation'],
      snippet: '@app.post("/api/scrape") async def start_scrape(payload: ScrapeRequest): return await queue.enqueue(payload)',
    },
    {
      id: 'backend',
      name: 'Python Async Microservice',
      category: 'Backend',
      icon: Server,
      tech: 'Python 3.12 • AsyncIO • HTTPX • Multiprocessing',
      description: 'Non-blocking async task execution engine handling queue scheduling and payload parsing.',
      details: ['Concurrent worker pools', 'Automatic retry logic with exponential backoff', 'Memory-efficient stream processing'],
      snippet: 'async def worker_loop(): while True: task = await queue.get(); await process(task)',
    },
    {
      id: 'database',
      name: 'SQLite / PostgreSQL Ledger',
      category: 'Database',
      icon: Database,
      tech: 'SQLite3 • PostgreSQL • Indexed Columns • WAL Mode',
      description: 'Structured relational storage ledger for extracted business records and scraping history.',
      details: ['Indexed phone/website deduplication', 'Sub-10ms query execution time', 'Transaction Write-Ahead Logging'],
      snippet: 'CREATE TABLE leads (id TEXT PRIMARY KEY, name TEXT, phone TEXT, rating REAL);',
    },
    {
      id: 'ai',
      name: 'Data Extraction Sanitizer',
      category: 'AI Layer',
      icon: Brain,
      tech: 'Python Regex • Heuristic Parsing • Entity Resolution',
      description: 'Smart entity extraction layer normalizing unstructured Google Maps DOM strings into clean schema models.',
      details: ['Phone format internationalization', 'Email regex validation', 'Social media handle extraction'],
      snippet: 'def sanitize_lead(raw: dict) -> LeadSchema: return LeadSchema(**parse_heuristics(raw))',
    },
    {
      id: 'automation',
      name: 'Playwright Stealth Cluster',
      category: 'Automation',
      icon: Workflow,
      tech: 'Playwright • Chromium Headless • Stealth Proxy Mesh',
      description: 'Headless browser automation engine extracting business details without bot detection blocks.',
      details: ['Sub-60s batch execution speed', 'User-Agent & viewport fingerprint randomization', 'Auto-scroll & DOM element hydration waits'],
      snippet: 'page = await context.new_page(); await page.goto(url, wait_until="networkidle")',
    },
    {
      id: 'deployment',
      name: 'Vercel & Cloud Infrastructure',
      category: 'Deployment',
      icon: Cloud,
      tech: 'Vercel Edge • Docker Container • GitHub Actions',
      description: 'Continuous deployment pipeline serving static assets on Vercel with automated build checks.',
      details: ['Zero-downtime rolling deploys', 'HSTS security header enforcement', 'Automated GitHub Actions CI/CD checks'],
      snippet: 'name: CI/CD Pipeline -> on: push -> run: npm run build && pytest',
    },
  ],
  'ai-agent-automation-suite': [
    {
      id: 'frontend',
      name: 'Agent Command Center UI',
      category: 'Frontend',
      icon: Monitor,
      tech: 'Next.js 15 • React 19 • Tailwind CSS',
      description: 'Interactive execution log console rendering real-time AI reasoning steps and tool calls.',
      details: ['Streaming message renderer', 'Step-by-step reasoning transparency', 'JSON schema output preview'],
      snippet: '<AgentConsole logs={agentLogs} status={isProcessing ? "active" : "idle"} />',
    },
    {
      id: 'api',
      name: 'LangChain REST Router',
      category: 'API',
      icon: GitBranch,
      tech: 'FastAPI • WebSockets • JSON Schemas',
      description: 'WebSocket & REST streaming API broadcasting agent thoughts and tool invocations to clients.',
      details: ['Real-time token streaming', 'Session memory persistence', 'Rate-limited endpoint guards'],
      snippet: '@websocket("/ws/agent") async def agent_stream(websocket: WebSocket): await agent.run_stream(websocket)',
    },
    {
      id: 'backend',
      name: 'LangChain Agent Core',
      category: 'Backend',
      icon: Server,
      tech: 'Python • LangChain • Pydantic V2',
      description: 'Deterministic state machine orchestrating tool selection, memory updates, and fallback strategies.',
      details: ['ReAct reasoning loop', 'Strict Pydantic response validation', 'Fallback tool execution branches'],
      snippet: 'agent = create_structured_chat_agent(llm, tools, prompt); executor = AgentExecutor(agent=agent)',
    },
    {
      id: 'database',
      name: 'pgvector Embeddings Index',
      category: 'Database',
      icon: Database,
      tech: 'PostgreSQL • pgvector • HNSW Index',
      description: 'Vector database storing high-dimensional document embeddings for semantic similarity search.',
      details: ['Sub-20ms vector retrieval', 'Cosine similarity distance metrics', 'HNSW index graph optimization'],
      snippet: 'SELECT content FROM doc_vectors ORDER BY embedding <=> query_vector LIMIT 5;',
    },
    {
      id: 'ai',
      name: 'OpenAI / Gemini LLM Layer',
      category: 'AI Layer',
      icon: Brain,
      tech: 'GPT-4o • Gemini Pro • Text-Embedding-3',
      description: 'Language model reasoning engine generating structured JSON responses and tool parameters.',
      details: ['99.4% schema validation accuracy', 'Temperature control (0.0 for deterministic code)', 'Context window token management'],
      snippet: 'llm = ChatOpenAI(model="gpt-4o", temperature=0.0).with_structured_output(ResultSchema)',
    },
    {
      id: 'automation',
      name: 'Async Tool Executor',
      category: 'Automation',
      icon: Workflow,
      tech: 'Python AsyncIO • Celery Workers',
      description: 'Background worker pool executing web search, database lookup, and document conversion tools.',
      details: ['Parallel tool execution', 'Timeout safety circuit breakers', 'Structured tool output validation'],
      snippet: '@tool async def query_database(sql: str) -> str: return await db.execute_raw(sql)',
    },
    {
      id: 'deployment',
      name: 'Docker & Cloud Container',
      category: 'Deployment',
      icon: Cloud,
      tech: 'Docker • AWS ECS / GCP Cloud Run',
      description: 'Containerized agent runtime environment with autoscaling CPU/memory instances.',
      details: ['Isolated container sandboxing', 'Environment variable secret management', 'Healthcheck probe monitoring'],
      snippet: 'FROM python:3.12-slim -> COPY . /app -> CMD ["uvicorn", "main:app", "--port", "8000"]',
    },
  ],
  'saas-landing-ui-system': [
    {
      id: 'frontend',
      name: 'Dark-Mode UI System',
      category: 'Frontend',
      icon: Monitor,
      tech: 'Next.js 15 • React 19 • Tailwind CSS • Framer Motion',
      description: 'Sleek dark-mode component design system with glassmorphism and smooth CSS hover sheens.',
      details: ['100/100 Lighthouse target score', '0.00 Cumulative Layout Shift', 'Sub-220ms CSS transition timing'],
      snippet: '<div className="p-6 premium-card hover:border-accent-primary transition-all">...</div>',
    },
    {
      id: 'api',
      name: 'Next.js App Router APIs',
      category: 'API',
      icon: GitBranch,
      tech: 'Next.js Route Handlers • Zod Schemas',
      description: 'Lightweight Serverless route handlers handling form submissions and sitemap/RSS generation.',
      details: ['Edge runtime compatibility', 'Type-safe Zod payload parsing', 'Security header injection'],
      snippet: 'export async function POST(req: Request) { const body = await req.json(); ... }',
    },
    {
      id: 'backend',
      name: 'Node.js Serverless Layer',
      category: 'Backend',
      icon: Server,
      tech: 'Node.js 20 • Vercel Functions',
      description: 'Event-driven serverless functions processing contact briefs and dynamic RSS feeds.',
      details: ['Sub-100ms cold start timing', 'Automatic scaling on demand', 'Stateless execution model'],
      snippet: 'export default async handler(req, res) { return res.status(200).json({ ok: true }); }',
    },
    {
      id: 'database',
      name: 'Edge KV & Cache Storage',
      category: 'Database',
      icon: Database,
      tech: 'Vercel KV • Redis Cache',
      description: 'Low-latency key-value store for session states and rate limiting counters.',
      details: ['Sub-5ms edge cache lookup', 'Automatic TTL key expiration', 'Global multi-region replication'],
      snippet: 'await kv.set("rate:ip:127.0.0.1", count, { ex: 60 });',
    },
    {
      id: 'ai',
      name: 'Dynamic UX Personalization',
      category: 'AI Layer',
      icon: Brain,
      tech: 'Tailwind CSS Variables • HSL Color Math',
      description: 'Algorithmic color token system adapting theme gradients dynamically based on user contrast preferences.',
      details: ['WCAG 2.2 AAA contrast adherence', 'System theme auto-detection', 'Dynamic CSS variable injection'],
      snippet: 'document.documentElement.style.setProperty("--accent-primary", "#00F2FE");',
    },
    {
      id: 'automation',
      name: 'Automated Build Checks',
      category: 'Automation',
      icon: Workflow,
      tech: 'GitHub Actions • ESLint • TypeScript Compiler',
      description: 'Continuous integration pipeline verifying type validity and code formatting on every commit.',
      details: ['Automated Next.js static build checks', 'Zero TypeScript compiler warnings', 'Pre-commit linting rules'],
      snippet: 'name: Build Check -> run: npm run build && npm run lint',
    },
    {
      id: 'deployment',
      name: 'Global Vercel Edge Network',
      category: 'Deployment',
      icon: Cloud,
      tech: 'Vercel Global CDN • Anycast DNS',
      description: 'Global CDN distribution serving static HTML assets from 300+ edge locations worldwide.',
      details: ['99.99% uptime guarantee', 'Brotli/Gzip compression enabled', 'HSTS & CSP security header enforcement'],
      snippet: 'vercel deploy --prod -> Output: https://saas-ui.vercel.app',
    },
  ],
};

export function ArchitectureExplorer() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('maps-lead-scraper-pro');
  const [activeLayerId, setActiveLayerId] = useState<string>('frontend');

  const layers = LAYER_PRESETS[selectedProjectId] || LAYER_PRESETS['maps-lead-scraper-pro'];
  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[0];
  const activeProject = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <section id="architecture-explorer" className="py-16 px-6 max-w-7xl mx-auto space-y-10 text-left border-t border-border-subtle/40">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <Layers className="h-4 w-4" /> Interactive Architecture Explorer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            7-Layer System Architecture Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Click any architecture layer node below to inspect data flows, technology choices, technical metrics, and code snippets.
          </p>
        </div>

        {/* Project Selector Dropdown / Tabs */}
        <div className="flex items-center gap-2 bg-bg-inset p-1.5 rounded-xl border border-border-subtle shrink-0">
          {projectsData.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveLayerId('frontend');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all btn-micro ${
                  isSelected
                    ? 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {proj.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Flow Nodes (7 Layers) vs Right Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 7 Animated Vector Nodes (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-3 relative">
          {layers.map((layer, idx) => {
            const IconComp = layer.icon;
            const isActive = layer.id === activeLayerId;
            const isLast = idx === layers.length - 1;

            return (
              <div key={layer.id} className="relative">
                {/* Clickable Layer Node Card */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-accent-primary/10 border-accent-primary text-text-primary shadow-glow'
                      : 'bg-bg-surface/80 border-border-subtle text-text-secondary hover:border-text-muted hover:bg-bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                      isActive
                        ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                        : 'bg-bg-inset border-border-subtle text-text-muted group-hover:text-text-primary'
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent-primary font-semibold">
                          Layer 0{idx + 1} — {layer.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                        {layer.name}
                      </h4>
                      <p className="text-[11px] font-mono text-text-muted line-clamp-1">
                        {layer.tech}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`h-5 w-5 transition-transform shrink-0 ${
                    isActive ? 'text-accent-primary translate-x-1' : 'text-text-muted group-hover:translate-x-0.5'
                  }`} />
                </motion.button>

                {/* Animated Flow Connecting Arrow Vector */}
                {!isLast && (
                  <div className="flex items-center justify-center py-1.5 relative">
                    <svg className="w-6 h-6 text-accent-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Layer Inspector Drawer (lg:col-span-5) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id + selectedProjectId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 premium-card space-y-5 border-accent-primary/30 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary">
                    <activeLayer.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent-primary font-bold">
                      {activeLayer.category} Layer Inspector
                    </span>
                    <h3 className="font-bold text-lg text-text-primary">
                      {activeLayer.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-text-secondary leading-relaxed">
                {activeLayer.description}
              </p>

              {/* Technology Stack Tags */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                  Layer Tech Stack
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-bg-inset border border-border-subtle font-mono text-xs text-accent-primary">
                  {activeLayer.tech}
                </span>
              </div>

              {/* Technical Indicators */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                  Technical Metrics & Indicators
                </span>
                <div className="space-y-2">
                  {activeLayer.details.map((detail, dIdx) => (
                    <div key={dIdx} className="p-2.5 rounded-lg bg-bg-inset border border-border-subtle/50 text-xs text-text-secondary flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-success shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Inspector */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
                  <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-accent-primary" /> Code Snippet Preview</span>
                  <span>TypeScript / Python</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-inset border border-border-subtle/60 font-mono text-[11px] text-accent-primary overflow-x-auto">
                  <code>{activeLayer.snippet}</code>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
