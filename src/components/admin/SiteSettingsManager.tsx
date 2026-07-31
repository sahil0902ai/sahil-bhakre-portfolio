'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, Save, Sparkles, Image, Link as LinkIcon, Share2, 
  Search, Shield, BarChart3, Bell, User, Mail, Phone, MapPin, 
  FileText, CheckCircle2, Upload, AlertCircle
} from 'lucide-react';
import { SiteSettingsModel } from '@/app/api/admin/settings/route';
import { updateSiteSettingsAction } from '@/app/actions/settings';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSettingsModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load site settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'profile_photo' | 'logo_url' | 'og_image') => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    setUploadingField(targetField);
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

      setSettings({
        ...settings,
        [targetField]: data.url,
      });
    } catch (err: any) {
      alert(`Upload Error: ${err.message}`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Call Server Action & API
      const result = await updateSiteSettingsAction(settings);
      if (!result.success) {
        throw new Error(result.error || 'Failed to save settings.');
      }

      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      setSuccessMessage('Site Settings updated successfully! All portfolio pages revalidated.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving site settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-mono text-text-muted">
        Loading site settings CMS configuration...
      </div>
    );
  }

  if (!settings) return null;

  return (
    <form onSubmit={handleSave} className="space-y-8 font-mono text-xs max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent-primary" />
            <span>Site Settings CMS</span>
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Edit portfolio copy, hero headers, social links, SEO metadata, analytics &amp; branding without writing code.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-accent-gradient text-text-primary font-bold flex items-center gap-2 shadow-glow hover:brightness-110 disabled:opacity-50 transition-all shrink-0"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving Changes...' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* Alert Banners */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* SECTION 1: HERO & BRANDING */}
      <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 border-b border-border-subtle/50 pb-3">
          <Sparkles className="h-4 w-4 text-accent-highlight" />
          <span>Hero &amp; Profile Branding</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Hero Heading</label>
            <input
              type="text"
              value={settings.hero_heading}
              onChange={(e) => setSettings({ ...settings, hero_heading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Availability Status</label>
            <input
              type="text"
              value={settings.availability_status}
              onChange={(e) => setSettings({ ...settings, availability_status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-text-muted font-bold block">Hero Subtitle</label>
          <textarea
            rows={2}
            value={settings.hero_subtitle}
            onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
          />
        </div>

        {/* Profile Photo & Logo Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Profile Photo (URL / Upload)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={settings.profile_photo}
                onChange={(e) => setSettings({ ...settings, profile_photo: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
              />
              <label className="px-3 py-2 rounded-xl border border-border-subtle bg-bg-inset hover:border-accent-primary text-text-primary font-bold cursor-pointer shrink-0 flex items-center gap-1">
                <Upload className="h-3.5 w-3.5 text-accent-primary" />
                <span>{uploadingField === 'profile_photo' ? '...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'profile_photo')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Site Logo (URL / Upload)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={settings.logo_url}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
              />
              <label className="px-3 py-2 rounded-xl border border-border-subtle bg-bg-inset hover:border-accent-primary text-text-primary font-bold cursor-pointer shrink-0 flex items-center gap-1">
                <Upload className="h-3.5 w-3.5 text-accent-primary" />
                <span>{uploadingField === 'logo_url' ? '...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo_url')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ANNOUNCEMENT BANNER */}
      <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-border-subtle/50 pb-3">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-400" />
            <span>Announcement Banner</span>
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.announcement_banner?.enabled ?? true}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement_banner: {
                    ...settings.announcement_banner,
                    enabled: e.target.checked,
                  },
                })
              }
              className="rounded bg-bg-inset border-border-subtle text-accent-primary focus:ring-0"
            />
            <span className="font-bold text-text-primary">Enable Banner</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-text-muted font-bold block">Banner Message</label>
            <input
              type="text"
              value={settings.announcement_banner?.message || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement_banner: {
                    ...settings.announcement_banner,
                    message: e.target.value,
                  },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Banner Link URL</label>
            <input
              type="text"
              value={settings.announcement_banner?.link || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement_banner: {
                    ...settings.announcement_banner,
                    link: e.target.value,
                  },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: ABOUT BIO */}
      <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 border-b border-border-subtle/50 pb-3">
          <User className="h-4 w-4 text-accent-primary" />
          <span>About Bio &amp; Professional Summary</span>
        </h3>

        <div className="space-y-1">
          <label className="text-text-muted font-bold block">About Bio Text</label>
          <textarea
            rows={4}
            value={settings.about_bio}
            onChange={(e) => setSettings({ ...settings, about_bio: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary focus:outline-none focus:border-accent-primary"
          />
        </div>
      </div>

      {/* SECTION 4: SOCIAL & CONTACT LINKS */}
      <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 border-b border-border-subtle/50 pb-3">
          <Share2 className="h-4 w-4 text-accent-highlight" />
          <span>Social Links &amp; Contact Info</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">GitHub URL</label>
            <input
              type="text"
              value={settings.social_links?.github || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, github: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">LinkedIn URL</label>
            <input
              type="text"
              value={settings.social_links?.linkedin || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Instagram URL</label>
            <input
              type="text"
              value={settings.social_links?.instagram || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, instagram: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">WhatsApp Number / Link</label>
            <input
              type="text"
              value={settings.social_links?.whatsapp || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  social_links: { ...settings.social_links, whatsapp: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Contact Email</label>
            <input
              type="email"
              value={settings.contact_info?.email || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact_info: { ...settings.contact_info, email: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Resume PDF Path / URL</label>
            <input
              type="text"
              value={settings.resume_url}
              onChange={(e) => setSettings({ ...settings, resume_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: SEO & OPEN GRAPH */}
      <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 border-b border-border-subtle/50 pb-3">
          <Search className="h-4 w-4 text-emerald-400" />
          <span>SEO &amp; Open Graph (Social Sharing)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">SEO Meta Title</label>
            <input
              type="text"
              value={settings.seo_title}
              onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Open Graph Title</label>
            <input
              type="text"
              value={settings.og_title}
              onChange={(e) => setSettings({ ...settings, og_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">SEO Meta Description</label>
            <textarea
              rows={2}
              value={settings.seo_description}
              onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Open Graph Description</label>
            <textarea
              rows={2}
              value={settings.og_description}
              onChange={(e) => setSettings({ ...settings, og_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">SEO Keywords</label>
            <input
              type="text"
              value={settings.seo_keywords}
              onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Open Graph Image URL</label>
            <input
              type="text"
              value={settings.og_image}
              onChange={(e) => setSettings({ ...settings, og_image: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* SECTION 6: ANALYTICS & FOOTER */}
      <div className="p-6 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 border-b border-border-subtle/50 pb-3">
          <BarChart3 className="h-4 w-4 text-sky-400" />
          <span>Analytics &amp; Footer Text</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-text-muted font-bold block">Google Analytics ID (GA4)</label>
            <input
              type="text"
              value={settings.analytics_ga_id}
              onChange={(e) => setSettings({ ...settings, analytics_ga_id: e.target.value })}
              placeholder="G-XXXXXXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted font-bold block">PostHog Project Key</label>
            <input
              type="text"
              value={settings.analytics_posthog_key}
              onChange={(e) => setSettings({ ...settings, analytics_posthog_key: e.target.value })}
              placeholder="phc_XXXXXXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
            />
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-text-muted font-bold block">Footer Copyright Text</label>
          <input
            type="text"
            value={settings.footer_text}
            onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg-inset border border-border-subtle text-text-primary"
          />
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border-subtle/50">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-accent-gradient text-text-primary font-bold flex items-center gap-2 shadow-glow hover:brightness-110 disabled:opacity-50 transition-all text-xs"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving All Settings...' : 'Save All Settings'}</span>
        </button>
      </div>
    </form>
  );
}
