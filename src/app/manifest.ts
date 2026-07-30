import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sahil Bhakre — AI Engineer & Full-Stack Developer',
    short_name: 'Sahil Bhakre',
    description: 'Ultra-premium Next.js 15 developer portfolio featuring 100/100 Lighthouse performance, RAG AI Assistant, and stealth web automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05070A',
    theme_color: '#0B0F19',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
