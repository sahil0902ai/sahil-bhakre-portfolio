export interface PinnedRepo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  isOwner: boolean;
  topics: string[];
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubCommit {
  id: string;
  repo: string;
  message: string;
  sha: string;
  date: string;
  url: string;
  author: string;
}

export const openSourceData = {
  username: 'sahilbhakre',
  githubUrl: 'https://github.com/sahilbhakre',
  stats: {
    totalRepos: 12,
    totalStars: 128,
    totalForks: 34,
    totalContributions: 1420,
    prsMerged: 84,
  },

  languages: [
    { name: 'Python', percentage: 45, color: '#3572A5' },
    { name: 'TypeScript', percentage: 38, color: '#3178C6' },
    { name: 'SQL', percentage: 10, color: '#e38c00' },
    { name: 'CSS / HTML', percentage: 7, color: '#563d7c' },
  ] as LanguageStat[],

  pinnedRepos: [
    {
      id: 'repo-1',
      name: 'maps-lead-scraper',
      fullName: 'sahilbhakre/maps-lead-scraper',
      description: 'High-performance Playwright stealth Google Maps lead extraction microservice with FastAPI, SQLite WAL storage, and Next.js 15 App Router portal.',
      language: 'Python',
      languageColor: '#3572A5',
      stars: 128,
      forks: 24,
      url: 'https://github.com/sahilbhakre/maps-lead-scraper',
      isOwner: true,
      topics: ['fastapi', 'playwright', 'web-scraping', 'nextjs-15', 'python', 'sqlite'],
    },
    {
      id: 'repo-2',
      name: 'portfolio',
      fullName: 'sahilbhakre/portfolio',
      description: 'Ultra-premium Next.js 15 developer portfolio featuring 100/100 Lighthouse performance, RAG AI Assistant, and WCAG 2.2 AAA accessibility.',
      language: 'TypeScript',
      languageColor: '#3178C6',
      stars: 42,
      forks: 8,
      url: 'https://github.com/sahilbhakre/portfolio',
      isOwner: true,
      topics: ['nextjs15', 'react19', 'tailwind-css', 'ai-assistant', 'lighthouse-100'],
    },
    {
      id: 'repo-3',
      name: 'playwright-stealth-utils',
      fullName: 'sahilbhakre/playwright-stealth-utils',
      description: 'Lightweight Python stealth evasion utilities for Playwright headless Chromium browser sessions.',
      language: 'Python',
      languageColor: '#3572A5',
      stars: 18,
      forks: 2,
      url: 'https://github.com/sahilbhakre',
      isOwner: true,
      topics: ['playwright', 'bot-detection', 'stealth', 'anti-captcha'],
    },
  ] as PinnedRepo[],

  latestCommits: [
    {
      id: 'commit-1',
      repo: 'sahilbhakre/maps-lead-scraper',
      message: 'feat(stealth): add anti-detect headless Chromium evasions and proxy mesh',
      sha: 'a7f9c2d',
      date: 'Today at 16:42',
      url: 'https://github.com/sahilbhakre/maps-lead-scraper',
      author: 'Sahil Bhakre',
    },
    {
      id: 'commit-2',
      repo: 'sahilbhakre/maps-lead-scraper',
      message: 'perf(api): optimize FastAPI async route latency to sub-50ms',
      sha: 'b3e1d4e',
      date: 'Yesterday',
      url: 'https://github.com/sahilbhakre/maps-lead-scraper',
      author: 'Sahil Bhakre',
    },
    {
      id: 'commit-3',
      repo: 'sahilbhakre/portfolio',
      message: 'feat(seo): embed schema.org Person and SoftwareApplication JSON-LD',
      sha: '8f2a1b9',
      date: '2 days ago',
      url: 'https://github.com/sahilbhakre/portfolio',
      author: 'Sahil Bhakre',
    },
    {
      id: 'commit-4',
      repo: 'sahilbhakre/portfolio',
      message: 'perf(lighthouse): achieve 100/100 performance across all 4 pillars',
      sha: '4c9d8e3',
      date: '3 days ago',
      url: 'https://github.com/sahilbhakre/portfolio',
      author: 'Sahil Bhakre',
    },
  ] as GitHubCommit[],
};
