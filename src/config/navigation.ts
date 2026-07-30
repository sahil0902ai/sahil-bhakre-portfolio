export interface NavItem {
  label: string;
  href: string;
}

export interface SecondaryNavGroup {
  title: string;
  items: {
    label: string;
    href: string;
    description: string;
    icon: string;
  }[];
}

export const primaryNavItems: NavItem[] = [
  { label: 'Solutions', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export const secondaryNavGroups: SecondaryNavGroup[] = [
  {
    title: 'Tools & Engineering',
    items: [
      { label: 'Resume', href: '/resume', description: 'Interactive CV & Experience Timeline', icon: 'FileText' },
      { label: 'Open Source', href: '/open-source', description: 'GitHub Repositories & Star Metrics', icon: 'Github' },
      { label: 'Resources', href: '/resources', description: 'AI Prompts, Next.js Guides & Vault', icon: 'Bookmark' },
      { label: 'Uses', href: '/uses', description: 'Workspace Hardware & IDE Setup', icon: 'Wrench' },
    ],
  },
  {
    title: 'Client Workflows',
    items: [
      { label: 'Proposal Generator', href: '/proposal', description: 'Client Proposal PDF Engine', icon: 'FileCheck' },
      { label: 'Invoice Generator', href: '/invoice', description: 'Client Invoice Calculation Tool', icon: 'Receipt' },
      { label: 'Case Studies', href: '/projects', description: '18-Element Project Breakdown', icon: 'Layers' },
    ],
  },
  {
    title: 'Architecture & Standards',
    items: [
      { label: 'Engineering Standards', href: '#standards', description: '11-Domain Production Quality Matrix', icon: 'ShieldCheck' },
      { label: 'Tech Stack', href: '#technology', description: 'Architecture & Framework Matrix', icon: 'Cpu' },
      { label: 'FAQ', href: '#faq', description: 'Frequently Asked Questions', icon: 'HelpCircle' },
      { label: 'Privacy & Terms', href: '#contact', description: '100% NDA Protection & SLA Terms', icon: 'Lock' },
    ],
  },
];

// Flat export for fallback usages
export const secondaryNavItems: NavItem[] = secondaryNavGroups.flatMap(g => g.items.map(i => ({ label: i.label, href: i.href })));
export const navItems: NavItem[] = [...primaryNavItems, ...secondaryNavItems];
