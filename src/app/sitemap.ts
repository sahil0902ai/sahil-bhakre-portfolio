import type { MetadataRoute } from 'next';
import { seoConfig } from '@config/site';
import { blogPosts } from '@config/blog';
import { projectsData } from '@config/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/blog', '/resources', '/open-source', '/uses', '/proposal', '/invoice', '/resume', '/about', '/services', '/projects', '/contact'].map((route) => ({
    url: `${seoConfig.domain}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${seoConfig.domain}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${seoConfig.domain}/projects/${project.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
