export interface CommitItem {
  id: string;
  repo: string;
  message: string;
  hash: string;
  date: string;
  branch: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  readTime: string;
  publishedDate: string;
  views: number;
  slug: string;
}

export interface OpenSourceItem {
  id: string;
  repoName: string;
  role: string;
  prsMerged: number;
  stars: number;
  url: string;
}

export interface FocusItem {
  id: string;
  topic: string;
  description: string;
  progress: number;
  status: 'In Progress' | 'Shipped' | 'Researching';
}

export interface ReadingItem {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Reading' | 'Completed';
}

export interface LearningItem {
  id: string;
  technology: string;
  level: string;
  target: string;
}

export interface SpeakingItem {
  id: string;
  event: string;
  title: string;
  date: string;
  type: 'Workshop' | 'Tech Talk' | 'Keynote';
}

export const developerDashboardData = {
  githubStats: {
    totalContributions: 1420,
    currentStreak: 18,
    longestStreak: 42,
    publicRepos: 12,
    pullRequests: 84,
    issuesClosed: 62,
    heatmapData: [
      { day: 'Mon', counts: [2, 5, 8, 4, 12, 6, 9] },
      { day: 'Tue', counts: [4, 7, 10, 6, 14, 8, 11] },
      { day: 'Wed', counts: [6, 9, 12, 8, 16, 10, 14] },
      { day: 'Thu', counts: [3, 6, 9, 5, 11, 7, 10] },
      { day: 'Fri', counts: [5, 8, 11, 7, 15, 9, 12] },
      { day: 'Sat', counts: [1, 3, 5, 2, 8, 4, 6] },
      { day: 'Sun', counts: [0, 2, 4, 1, 6, 3, 5] },
    ],
  },

  latestCommits: [
    {
      id: 'c-1',
      repo: 'sahilbhakre/maps-lead-scraper',
      message: 'feat(stealth): add anti-detect headless Chromium evasions and proxy mesh',
      hash: 'a7f9c2d',
      date: 'Today at 16:42',
      branch: 'main',
    },
    {
      id: 'c-2',
      repo: 'sahilbhakre/maps-lead-scraper',
      message: 'perf(api): optimize FastAPI async route latency to sub-50ms',
      hash: 'b3e1d4e',
      date: 'Yesterday',
      branch: 'main',
    },
    {
      id: 'c-3',
      repo: 'sahilbhakre/portfolio',
      message: 'feat(seo): embed schema.org Person and SoftwareApplication JSON-LD',
      hash: '8f2a1b9',
      date: '2 days ago',
      branch: 'main',
    },
    {
      id: 'c-4',
      repo: 'sahilbhakre/portfolio',
      message: 'perf(lighthouse): achieve 100/100 performance across all 4 pillars',
      hash: '4c9d8e3',
      date: '3 days ago',
      branch: 'main',
    },
  ] as CommitItem[],

  blogPosts: [
    {
      id: 'post-1',
      title: 'Architecting Stealth Scraping Pipelines with FastAPI & Playwright',
      readTime: '6 min read',
      publishedDate: 'July 20, 2026',
      views: 1240,
      slug: 'architecting-stealth-scraping-pipelines-fastapi-playwright',
    },
    {
      id: 'post-2',
      title: 'Next.js 15 App Router Performance Optimization Guide',
      readTime: '8 min read',
      publishedDate: 'July 15, 2026',
      views: 2180,
      slug: 'nextjs-15-app-router-performance-optimization-guide',
    },
    {
      id: 'post-3',
      title: 'Building Deterministic AI Agents with LangChain & Pydantic JSON Schemas',
      readTime: '10 min read',
      publishedDate: 'July 10, 2026',
      views: 3450,
      slug: 'building-deterministic-ai-agents-with-langchain-json-schemas',
    },
  ] as ArticleItem[],

  openSource: [
    {
      id: 'os-1',
      repoName: 'sahilbhakre/maps-lead-scraper',
      role: 'Creator & Lead Maintainer',
      prsMerged: 34,
      stars: 128,
      url: 'https://github.com/sahilbhakre/maps-lead-scraper',
    },
    {
      id: 'os-2',
      repoName: 'playwright-stealth-utils',
      role: 'Contributor',
      prsMerged: 6,
      stars: 890,
      url: 'https://github.com',
    },
  ] as OpenSourceItem[],

  currentFocus: [
    {
      id: 'f-1',
      topic: 'LangChain Agentic Memory',
      description: 'Engineering long-term vector state persistence for autonomous multi-turn AI agents.',
      progress: 85,
      status: 'In Progress',
    },
    {
      id: 'f-2',
      topic: 'FastAPI Async Worker Scaling',
      description: 'Benchmarking Uvicorn worker pool concurrency under 10,000 req/sec load.',
      progress: 92,
      status: 'In Progress',
    },
  ] as FocusItem[],

  readingList: [
    {
      id: 'r-1',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      category: 'Distributed Systems',
      status: 'Reading',
    },
    {
      id: 'r-2',
      title: 'Building Microservices (2nd Edition)',
      author: 'Sam Newman',
      category: 'Software Architecture',
      status: 'Completed',
    },
  ] as ReadingItem[],

  learningRoadmap: [
    {
      id: 'l-1',
      technology: 'Rust & WebAssembly',
      level: 'Intermediate',
      target: 'High-performance WASM browser modules',
    },
    {
      id: 'l-2',
      technology: 'pgvector Index Graph Tuning',
      level: 'Advanced',
      target: 'Sub-10ms similarity search at 1M vectors',
    },
  ] as LearningItem[],

  speakingEngagements: [
    {
      id: 's-1',
      event: 'Data Science & AI Developer Summit',
      title: 'Building Stealth Web Extraction Pipelines with Python',
      date: 'June 2026',
      type: 'Tech Talk',
    },
    {
      id: 's-2',
      event: 'Full-Stack Web Engineering Meetup',
      title: 'Next.js 15 Server Components & 100/100 Lighthouse Optimization',
      date: 'May 2026',
      type: 'Workshop',
    },
  ] as SpeakingItem[],
};
