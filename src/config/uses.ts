export interface UsesItem {
  id: string;
  name: string;
  category: 'Laptop' | 'Monitor' | 'Keyboard' | 'Mouse' | 'Chair' | 'Camera' | 'Microphone' | 'IDE' | 'Extensions' | 'AI Tools' | 'Hosting' | 'Design Tools';
  group: 'Hardware & Desk' | 'Software & IDE' | 'AI & Cloud' | 'Design Tools';
  description: string;
  spec?: string;
  url?: string;
  isDailyDriver?: boolean;
}

export const usesCategories = [
  'All',
  'Hardware & Desk',
  'Software & IDE',
  'AI & Cloud',
  'Design Tools',
] as const;

export const usesData: UsesItem[] = [
  // Hardware & Desk
  {
    id: 'use-laptop',
    name: 'Primary Workstation Laptop',
    category: 'Laptop',
    group: 'Hardware & Desk',
    description: 'High-performance multi-core machine powering local Docker containers, Playwright headless browser automation, and Next.js 15 builds.',
    spec: '32GB RAM / 1TB NVMe SSD',
    isDailyDriver: true,
  },
  {
    id: 'use-monitor',
    name: '27" 4K IPS Ergonomic Monitor',
    category: 'Monitor',
    group: 'Hardware & Desk',
    description: 'Crisp 4K display with high color accuracy for side-by-side VS Code editing and Figma design system inspection.',
    spec: '3840 x 2160 @ 60Hz / USB-C Hub',
    isDailyDriver: true,
  },
  {
    id: 'use-keyboard',
    name: 'Custom Mechanical Keyboard',
    category: 'Keyboard',
    group: 'Hardware & Desk',
    description: 'Tactile mechanical switch keyboard designed for comfortable long-duration coding sessions.',
    spec: 'Lubed Tactile Switches / PBT Keycaps',
    isDailyDriver: true,
  },
  {
    id: 'use-mouse',
    name: 'Ergonomic Precision Wireless Mouse',
    category: 'Mouse',
    group: 'Hardware & Desk',
    description: 'Ergonomic wireless mouse with fast thumb scroll wheel for rapid code & log navigation.',
    isDailyDriver: true,
  },
  {
    id: 'use-chair',
    name: 'Ergonomic Mesh Task Chair',
    category: 'Chair',
    group: 'Hardware & Desk',
    description: 'Fully adjustable lumbar support mesh chair providing 10+ hours of daily ergonomic posture support.',
    isDailyDriver: true,
  },
  {
    id: 'use-camera',
    name: '1080p HD Streaming Webcam',
    category: 'Camera',
    group: 'Hardware & Desk',
    description: '1080p 60fps HD camera used for client strategy calls, product demos, and technical video recordings.',
    spec: '1080p @ 60fps Auto-Focus',
  },
  {
    id: 'use-microphone',
    name: 'Studio USB Condenser Microphone',
    category: 'Microphone',
    group: 'Hardware & Desk',
    description: 'Cardioid studio condenser microphone mounted on an adjustable boom arm for crystal-clear client communication.',
    spec: 'USB Condenser / Cardioid Pattern',
  },

  // Software & IDE
  {
    id: 'use-ide',
    name: 'VS Code & Cursor AI IDE',
    category: 'IDE',
    group: 'Software & IDE',
    description: 'Customized VS Code / Cursor setup with One Dark Pro theme, Fira Code ligatures, and custom keybindings.',
    spec: 'One Dark Pro Theme / Fira Code Font',
    isDailyDriver: true,
  },
  {
    id: 'use-extensions',
    name: 'VS Code Essential Extension Stack',
    category: 'Extensions',
    group: 'Software & IDE',
    description: 'ESLint, Prettier, Tailwind CSS IntelliSense, Python Pylance, Playwright Test Runner, and GitLens.',
    spec: 'ESLint + Prettier + GitLens',
    isDailyDriver: true,
  },

  // AI & Cloud
  {
    id: 'use-ai-tools',
    name: 'Google Antigravity & LLM API Stack',
    category: 'AI Tools',
    group: 'AI & Cloud',
    description: 'Google Antigravity AI pair programmer, OpenAI GPT-4o API, Gemini 1.5 Pro, and LangChain Python framework.',
    spec: 'GPT-4o + Gemini 1.5 Pro + LangChain',
    isDailyDriver: true,
  },
  {
    id: 'use-hosting',
    name: 'Vercel Edge & Cloud Container Infrastructure',
    category: 'Hosting',
    group: 'AI & Cloud',
    description: 'Vercel Edge Network for Next.js static pages, AWS EC2 & Cloud Run for Python FastAPI microservices, and Supabase / SQLite databases.',
    spec: 'Vercel Global CDN + Cloud Run',
    isDailyDriver: true,
  },

  // Design Tools
  {
    id: 'use-design-tools',
    name: 'Figma & Framer Design Stack',
    category: 'Design Tools',
    group: 'Design Tools',
    description: 'Figma for wireframing, dark-mode design system token creation, component variants, and interactive UI prototypes.',
    spec: 'Figma Auto-Layout + Tokens',
    isDailyDriver: true,
  },
];
