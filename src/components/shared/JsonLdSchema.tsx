import { seoConfig } from '@config/site';

interface JsonLdProps {
  type?: 'WebSite' | 'Article' | 'Project' | 'Person';
  articleData?: {
    title: string;
    description: string;
    datePublished: string;
    slug: string;
  };
  projectData?: {
    title: string;
    description: string;
    category: string;
    slug: string;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function JsonLdSchema({ type = 'WebSite', articleData, projectData, breadcrumbs }: JsonLdProps) {
  const graph: any[] = [
    // Person Schema
    {
      '@type': 'Person',
      '@id': `${seoConfig.domain}/#person`,
      name: seoConfig.author,
      jobTitle: 'AI Engineer & Full-Stack Developer',
      url: seoConfig.domain,
      sameAs: [
        'mailto:sahilbhakre8@gmail.com',
        'https://wa.me/919823511929',
        'https://instagram.com/sahil.builds_',
      ],
      knowsAbout: [
        'Next.js 15',
        'React 19',
        'FastAPI',
        'Python',
        'Agentic AI Systems',
        'TypeScript',
        'Playwright Stealth Scraping',
        'UI/UX Engineering',
      ],
    },
    // Organization Schema
    {
      '@type': 'Organization',
      '@id': `${seoConfig.domain}/#organization`,
      name: 'Sahil Bhakre Software Engineering Practice',
      url: seoConfig.domain,
      logo: `${seoConfig.domain}/favicon.ico`,
      founder: {
        '@id': `${seoConfig.domain}/#person`,
      },
      description: seoConfig.description,
    },
    // Professional Service Schema
    {
      '@type': 'ProfessionalService',
      '@id': `${seoConfig.domain}/#service`,
      name: `${seoConfig.author} — AI & Full-Stack Development`,
      url: seoConfig.domain,
      provider: {
        '@id': `${seoConfig.domain}/#person`,
      },
      description: seoConfig.description,
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Engineering Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Agent Pipelines & Business Automations',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full-Stack SaaS Web Applications',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Playwright Web Scraping Microservices',
            },
          },
        ],
      },
    },
  ];

  // Dynamic Article Schema
  if (articleData) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${seoConfig.domain}/blog/${articleData.slug}/#article`,
      headline: articleData.title,
      description: articleData.description,
      datePublished: articleData.datePublished,
      dateModified: articleData.datePublished,
      author: {
        '@id': `${seoConfig.domain}/#person`,
      },
      publisher: {
        '@id': `${seoConfig.domain}/#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${seoConfig.domain}/blog/${articleData.slug}`,
      },
    });
  }

  // Dynamic Project Schema
  if (projectData) {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${seoConfig.domain}/projects/${projectData.slug}/#software`,
      name: projectData.title,
      description: projectData.description,
      applicationCategory: projectData.category,
      operatingSystem: 'Web',
      author: {
        '@id': `${seoConfig.domain}/#person`,
      },
    });
  }

  // Dynamic Breadcrumb Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${seoConfig.domain}/#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${seoConfig.domain}${crumb.url}`,
      })),
    });
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
