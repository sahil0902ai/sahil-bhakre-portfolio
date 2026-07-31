'use client';

import { useState, useEffect, useOptimistic, useTransition } from 'react';
import { 
  FolderPlus, Edit, Trash2, Eye, EyeOff, Star, ExternalLink, 
  Github, Plus, X, Sparkles, Image, Code, FileText, Search,
  ChevronLeft, ChevronRight, Upload, CheckCircle2, AlertCircle, FileCode, Layers
} from 'lucide-react';
import { ProjectModel } from '@/app/api/admin/projects/route';
import { 
  createProjectAction, updateProjectAction, togglePublishAction, 
  toggleFeatureAction, deleteProjectAction 
} from '@/app/actions/projects';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [isPending, startTransition] = useTransition();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectModel | null>(null);
  const [caseStudyTab, setCaseStudyTab] = useState<'write' | 'preview'>('write');

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('Web Architecture');
  const [formStatus, setFormStatus] = useState('Production');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formTechStack, setFormTechStack] = useState<string[]>(['Next.js 15', 'TypeScript', 'Tailwind CSS']);
  const [tagInput, setTagInput] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formLiveUrl, setFormLiveUrl] = useState('');
  const [formCaseStudy, setFormCaseStudy] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPublished, setFormPublished] = useState(true);
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDescription, setFormSeoDescription] = useState('');
  const [formSeoKeywords, setFormSeoKeywords] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Projects List
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

  // Tech Stack Tag Helpers
  const addTechTag = () => {
    if (tagInput.trim() && !formTechStack.includes(tagInput.trim())) {
      setFormTechStack([...formTechStack, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTechTag = (tag: string) => {
    setFormTechStack(formTechStack.filter((t) => t !== tag));
  };

  // Image Upload Helper via Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Image upload failed');
      }

      setFormCoverImage(data.url);
    } catch (err: any) {
      alert(`Upload Error: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  // Open Modals
  const openCreateModal = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormSlug('');
    setFormDescription('');
    setFormCategory('Web Architecture');
    setFormStatus('Production');
    setFormCoverImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop');
    setFormTechStack(['Next.js 15', 'TypeScript', 'Tailwind CSS']);
    setTagInput('');
    setFormGithubUrl('');
    setFormLiveUrl('');
    setFormCaseStudy('');
    setFormFeatured(false);
    setFormPublished(true);
    setFormSeoTitle('');
    setFormSeoDescription('');
    setFormSeoKeywords('');
    setCaseStudyTab('write');
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
    setFormTechStack(Array.isArray(proj.tech_stack) ? proj.tech_stack : []);
    setTagInput('');
    setFormGithubUrl(proj.github_url || '');
    setFormLiveUrl(proj.live_url || '');
    setFormCaseStudy(proj.case_study || '');
    setFormFeatured(proj.featured || false);
    setFormPublished(proj.published !== false);
    setFormSeoTitle(proj.seo_title || proj.title);
    setFormSeoDescription(proj.seo_description || proj.description);
    setFormSeoKeywords(proj.seo_keywords || '');
    setCaseStudyTab('write');
    setIsModalOpen(true);
  };

  // Optimistic Toggle Actions via Server Actions
  const handleTogglePublish = (proj: ProjectModel) => {
    const nextState = !proj.published;
    // Optimistic UI Update
    setProjects((prev) =>
      prev.map((p) => (p.id === proj.id ? { ...p, published: nextState } : p))
    );

    startTransition(async () => {
      await togglePublishAction(proj.id, nextState);
    });
  };

  const handleToggleFeature = (proj: ProjectModel) => {
    const nextState = !proj.featured;
    // Optimistic UI Update
    setProjects((prev) =>
      prev.map((p) => (p.id === proj.id ? { ...p, featured: nextState } : p))
    );

    startTransition(async () => {
      await toggleFeatureAction(proj.id, nextState);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    // Optimistic UI Update
    setProjects((prev) => prev.filter((p) => p.id !== id));

    startTransition(async () => {
      await deleteProjectAction(id);
    });
  };

  // Submit Form Action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: Partial<ProjectModel> = {
      title: formTitle,
      slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formDescription,
      category: formCategory,
      status: formStatus,
      cover_image: formCoverImage,
      tech_stack: formTechStack,
      github_url: formGithubUrl,
      live_url: formLiveUrl,
      case_study: formCaseStudy,
      featured: formFeatured,
      published: formPublished,
      seo_title: formSeoTitle || formTitle,
      seo_description: formSeoDescription || formDescription,
      seo_keywords: formSeoKeywords,
    };

    if (editingProject) {
      // Optimistic Update
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...payload } as ProjectModel) : p))
      );

      await updateProjectAction(editingProject.id, payload);
    } else {
      const result = await createProjectAction(payload);
      if (result.success && result.project) {
        setProjects([result.project as ProjectModel, ...projects]);
      }
    }

    setSubmitting(false);
    setIsModalOpen(false);
  };

  // Filtered & Paginated Calculation
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.tech_stack) && p.tech_stack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (filterMode === 'published') return matchesSearch && p.published;
    if (filterMode === 'draft') return matchesSearch && !p.published;
    if (filterMode === 'featured') return matchesSearch && p.featured;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent-primary" />
            <span>Production-Ready Projects CMS</span>
          </h2>
          <p className="text-xs text-text-muted font-mono">
            Zero-code project management: Supabase Storage, Rich Text, Draft &amp; Publish modes, Optimistic UI.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-accent-gradient text-text-primary text-xs font-mono font-bold flex items-center gap-2 shadow-glow hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono text-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3.5 top-3 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search projects by title, category, description, or technology tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bg-inset border border-border-subtle/60">
          {(['all', 'published', 'draft', 'featured'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setFilterMode(mode);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg capitalize text-[11px] font-bold transition-all ${
                filterMode === mode
                  ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-text-muted">
          Loading production projects from database...
        </div>
      ) : paginatedProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-bg-surface border border-border-subtle text-xs font-mono text-text-muted space-y-2">
          <AlertCircle className="h-6 w-6 text-accent-highlight mx-auto" />
          <p>No projects match your current search or filter query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-2xl bg-bg-surface border overflow-hidden flex flex-col justify-between transition-all shadow-xl ${
                !proj.published ? 'border-amber-500/40 opacity-90' : 'border-border-subtle hover:border-border-subtle/80'
              }`}
            >
              {/* Cover Image Preview */}
              <div className="h-44 w-full bg-bg-inset relative overflow-hidden group">
                <img
                  src={proj.cover_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleFeature(proj)}
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
                    onClick={() => handleTogglePublish(proj)}
                    title={proj.published ? 'Published (Click to unpublish)' : 'Draft Mode (Click to publish)'}
                    className={`p-1.5 rounded-full border backdrop-blur-md transition-all ${
                      proj.published
                        ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300'
                        : 'bg-amber-500/40 border-amber-400 text-amber-200'
                    }`}
                  >
                    {proj.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/70 border border-white/10 backdrop-blur-md text-accent-highlight">
                    {proj.category}
                  </span>
                  {!proj.published && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-500/80 border border-amber-300 text-black">
                      Draft Mode
                    </span>
                  )}
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

                {/* Technology Tags Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {Array.isArray(proj.tech_stack) &&
                    proj.tech_stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-bg-inset border border-border-subtle/50 text-[10px] font-mono text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {/* Card Footer Controls */}
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
                      onClick={() => handleDelete(proj.id)}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border-subtle/40 font-mono text-xs text-text-muted">
          <span>
            Page {currentPage} of {totalPages} ({filteredProjects.length} total projects)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-border-subtle bg-bg-surface disabled:opacity-30 hover:border-accent-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-border-subtle bg-bg-surface disabled:opacity-30 hover:border-accent-primary transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-bg-surface border border-border-subtle rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
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

              {/* Image Upload & Cover Image URL */}
              <div className="space-y-1">
                <label className="text-text-muted font-bold block">Cover Image (Supabase Storage Upload)</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or uploaded image URL"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
                  />

                  <label className="px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-inset hover:border-accent-primary text-text-primary font-bold cursor-pointer transition-colors flex items-center justify-center gap-2 shrink-0">
                    <Upload className="h-4 w-4 text-accent-primary" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Technology Tags Input Manager */}
              <div className="space-y-2">
                <label className="text-text-muted font-bold block">Technology Tags</label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-bg-inset border border-border-subtle min-h-[44px]">
                  {formTechStack.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-accent-primary/20 border border-accent-primary/40 text-accent-primary font-bold flex items-center gap-1.5"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechTag();
                        }
                      }}
                      placeholder="Type tag & press Enter..."
                      className="bg-transparent border-none outline-none text-text-primary px-2 text-xs w-full"
                    />
                    <button
                      type="button"
                      onClick={addTechTag}
                      className="p-1 rounded bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/40 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
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

              {/* Case Study Rich Text / Markdown Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-text-muted font-bold block">Case Study (Rich Markdown Editor)</label>
                  <div className="flex items-center gap-1 bg-bg-inset p-1 rounded-lg border border-border-subtle">
                    <button
                      type="button"
                      onClick={() => setCaseStudyTab('write')}
                      className={`px-3 py-1 rounded text-[10px] font-bold ${
                        caseStudyTab === 'write' ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-muted'
                      }`}
                    >
                      Write Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseStudyTab('preview')}
                      className={`px-3 py-1 rounded text-[10px] font-bold ${
                        caseStudyTab === 'preview' ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-muted'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {caseStudyTab === 'write' ? (
                  <textarea
                    rows={6}
                    value={formCaseStudy}
                    onChange={(e) => setFormCaseStudy(e.target.value)}
                    placeholder="# Case Study Overview&#10;&#10;### Technical Challenges & Architecture&#10;- High-concurrency Playwright scraping&#10;- Distributed Redis queue management"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary font-mono"
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-bg-inset border border-border-subtle text-text-primary font-mono whitespace-pre-wrap min-h-[140px] text-xs">
                    {formCaseStudy || 'No case study content written yet.'}
                  </div>
                )}
              </div>

              {/* Flags: Featured & Published / Draft Mode */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded bg-bg-inset border-border-subtle text-accent-primary focus:ring-0"
                  />
                  <span className="font-bold text-text-primary">Featured Showcase</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="rounded bg-bg-inset border-border-subtle text-accent-primary focus:ring-0"
                  />
                  <span className="font-bold text-text-primary">Published (Uncheck for Draft Mode)</span>
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
