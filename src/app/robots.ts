import type { MetadataRoute } from 'next';
import { seoConfig } from '@config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${seoConfig.domain}/sitemap.xml`,
  };
}
