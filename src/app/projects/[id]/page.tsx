import { notFound } from 'next/navigation';
import { projectsData } from '@config/portfolio';
import { ProjectPageLayout } from '@components/sections/ProjectPageLayout';
import { JsonLdSchema } from '@components/shared/JsonLdSchema';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Case Study | Sahil Bhakre`,
      description: project.overview,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLdSchema
        type="Project"
        projectData={{
          title: project.title,
          description: project.overview,
          category: project.category,
          slug: project.id,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/#projects' },
          { name: project.title, url: `/projects/${project.id}` },
        ]}
      />
      <ProjectPageLayout project={project} />
    </>
  );
}
