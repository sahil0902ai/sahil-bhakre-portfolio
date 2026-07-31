'use client';

import { useState, useEffect } from 'react';
import { 
  FolderPlus, Edit, Trash2, Eye, EyeOff, Star, ExternalLink, 
  Github, Plus, Check, X, Sparkles, Image, Code, FileText, Search
} from 'lucide-react';
import { ProjectModel } from '@/app/api/admin/projects/route';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectModel | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Web Architecture');
  const [formStatus, setFormStatus] = useState('Production');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formTechStack, setFormTechStack] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formLiveUrl, setFormLiveUrl] = useState('');
  const [formCaseStudy, setFormCaseStudy] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPublished, setFormPublished] = useState(true);
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDescription, setFormSeoDescription] = useState('');
  const [formSeoKeywords, setFormSeoKeywords] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      } else {
        throw new Error(data.error || 'Failed to load projects');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormSlug('');
    setFormDescription('');
    setFormCategory('Web Architecture');
    setFormStatus('Production');
    setFormCoverImage('');
    setFormTechStack('Next.js 15, TypeScript, Tailwind CSS');
    setFormGithubUrl('');
    setFormLiveUrl('');
    setFormCaseStudy('');
    setFormFeatured(false);
    setFormPublished(true);
    setFormSeoTitle('');
    setFormSeoDescription('');
    setFormSeoKeywords('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectModel) => {
    setEditingProject(proj);
    setFormTitle(proj.title);
    setFormSlug(proj.slug);
    setFormDescription(proj.description);
    setFormCategory(proj.category || 'Web Architecture');
    setFormStatus(proj.status || 'Production');
    setFormCoverImage(proj.cover_image || '');
    setFormTechStack(Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : '');
    setFormGithubUrl(proj.github_url || '');
    setFormLiveUrl(proj.live_url || '');
    setFormCaseStudy(proj.case_study || '');
    setFormFeatured(proj.featured || false);
    setFormPublished(proj.published !== false);
    setFormSeoTitle(proj.seo_title || proj.title);
    setFormSeoDescription(proj.seo_description || proj.description);
    setFormSeoKeywords(proj.seo_keywords || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const techArray = formTechStack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...(editingProject ? { id: editingProject.id } : {}),
      title: formTitle,
      slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formDescription,
      category: formCategory,
      status: formStatus,
      cover_image: formCoverImage,
      tech_stack: techArray,
      github_url: formGithubUrl,
      live_url: formLiveUrl,
      case_study: formCaseStudy,
      featured: formFeatured,
      published: formPublished,
      seo_title: formSeoTitle || formTitle,
      seo_description: formSeoDescription || formDescription,
      seo_keywords: formSeoKeywords,
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: editingProject ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save project');
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert(`Save Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (proj: ProjectModel) => {
    try {
      setProjects((prev) =>
        prev.map((p) => (p.id === proj.id ? { ...p, published: !p.published } : p))
      );

      await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proj.id, published: !proj.published }),
      });
    } catch (err) {
      console.error(err);
      fetchProjects();
    }
  };

  const toggleFeature = async (proj: ProjectModel) => {
    try {
      setProjects((prev) =>
        prev.map((p) => (p.id === proj.id ? { ...p, featured: !p.featured } : p))
      );

      await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proj.id, featured: !proj.featured }),
      });
    } catch (err) {
      console.error(err);
      fetchProjects();
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
      fetchProjects();
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-accent-primary" />
            <span>Projects CMS Manager</span>
          </h2>
          <p className="text-xs text-text-muted font-mono">
            Manage, publish, edit, and feature portfolio projects without touching code.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-mono font-bold flex items-center gap-2 shadow-glow hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3.5 top-3 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects by title, category, or stack..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-accent-primary font-mono"
        />
      </div>

      {/* Projects List Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-text-muted">
          Loading projects from database...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-bg-surface border border-border-subtle text-xs font-mono text-text-muted">
          No projects found. Click &quot;Create New Project&quot; to add one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-bg-surface border border-border-subtle overflow-hidden flex flex-col justify-between hover:border-border-subtle/80 transition-all shadow-xl"
            >
              {/* Cover Image Preview */}
              <div className="h-44 w-full bg-bg-inset relative overflow-hidden group">
                <img
                  src={proj.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => toggleFeature(proj)}
                    title={proj.featured ? 'Featured Project (Click to unfeature)' : 'Mark as Featured'}
                    className={`p-1.5 rounded-full border backdrop-blur-md transition-all ${
                      proj.featured
                        ? 'bg-amber-500/30 border-amber-400 text-amber-300'
                        : 'bg-black/60 border-white/20 text-white/60 hover:text-white'
                    }`}
                  >
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => togglePublish(proj)}
                    title={proj.published ? 'Published (Click to unpublish)' : 'Unpublished (Draft)'}
                    className={`p-1.5 rounded-full border backdrop-blur-md transition-all ${
                      proj.published
                        ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300'
                        : 'bg-black/60 border-white/20 text-text-muted'
                    }`}
                  >
                    {proj.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/70 border border-white/10 backdrop-blur-md text-accent-highlight">
                    {proj.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-primary line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2 mt-1 font-mono">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {Array.isArray(proj.tech_stack) &&
                    proj.tech_stack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-bg-inset border border-border-subtle/50 text-[10px] font-mono text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 4 && (
                    <span className="text-[10px] font-mono text-text-muted pl-1">
                      +{proj.tech_stack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-border-subtle/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {proj.github_url && (
                      <a
                        href={proj.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-muted hover:text-accent-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-inset text-[11px] font-mono text-text-primary hover:border-accent-primary transition-colors flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-surface border border-border-subtle rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent-highlight" />
                <span>{editingProject ? 'Edit Project' : 'Create New Project'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingProject) {
                        setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      }
                    }}
                    placeholder="e.g. Google Maps Lead Scraper Pro"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="maps-lead-scraper-pro"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    <option value="Web Architecture">Web Architecture</option>
                    <option value="Data Engineering">Data Engineering</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Frontend Engineering">Frontend Engineering</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  >
                    <option value="Production">Production</option>
                    <option value="In Development">In Development</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-text-muted font-bold block">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Short impact summary of the project..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                />
              </div>

              {/* Cover Image & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Cover Image URL</label>
                  <input
                    type="url"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={formTechStack}
                    onChange={(e) => setFormTechStack(e.target.value)}
                    placeholder="Next.js 15, React 19, Tailwind CSS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>
              </div>

              {/* GitHub & Live URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={formGithubUrl}
                    onChange={(e) => setFormGithubUrl(e.target.value)}
                    placeholder="https://github.com/sahil0902ai/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-text-muted font-bold block">Live Demo URL</label>
                  <input
                    type="url"
                    value={formLiveUrl}
                    onChange={(e) => setFormLiveUrl(e.target.value)}
                    placeholder="https://my-demo-app.vercel.app"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                </div>
              </div>

              {/* Case Study Content */}
              <div className="space-y-1">
                <label className="text-text-muted font-bold block">Case Study (Markdown / Rich Text)</label>
                <textarea
                  rows={5}
                  value={formCaseStudy}
                  onChange={(e) => setFormCaseStudy(e.target.value)}
                  placeholder="# Case Study Overview&#10;&#10;Detailed architecture write-up..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                />
              </div>

              {/* Flags: Featured & Published */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded bg-bg-inset border-border-subtle text-accent-primary focus:ring-0"
                  />
                  <span className="font-bold text-text-primary">Featured Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="rounded bg-bg-inset border-border-subtle text-accent-primary focus:ring-0"
                  />
                  <span className="font-bold text-text-primary">Published (Live on Portfolio)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border-subtle/50">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border-subtle bg-bg-inset text-text-muted hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-accent-gradient text-text-primary font-bold shadow-glow hover:brightness-110 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
