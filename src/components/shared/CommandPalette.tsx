'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Home, User, Briefcase, Cpu, BookOpen, FileText, 
  Mail, Github, Sun, Moon, ArrowRight, ExternalLink, Sparkles 
} from 'lucide-react';
import { usePortfolio } from '@context/PortfolioContext';
import { projectsData, socialLinks } from '@config/portfolio';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Socials';
  icon: any;
  action: () => void;
  badge?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const togglePalette = useCallback(() => {
    setIsOpen((prev) => !prev);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Global Keyboard Listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePalette]);

  const items: CommandItem[] = [
    // Navigation
    { id: 'nav-home', label: 'Go to Home Page', category: 'Navigation', icon: Home, action: () => router.push('/') },
    { id: 'nav-about', label: 'About Sahil Bhakre', category: 'Navigation', icon: User, action: () => router.push('/#about') },
    { id: 'nav-projects', label: 'Explore Projects', category: 'Navigation', icon: Briefcase, action: () => router.push('/#projects') },
    { id: 'nav-blog', label: 'Engineering Blog', category: 'Navigation', icon: BookOpen, action: () => router.push('/blog'), badge: 'New' },
    { id: 'nav-resume', label: 'Interactive Resume', category: 'Navigation', icon: FileText, action: () => router.push('/resume'), badge: 'Printable' },
    { id: 'nav-contact', label: 'Contact & Hire', category: 'Navigation', icon: Mail, action: () => router.push('/#contact') },

    // Projects
    ...projectsData.map((p) => ({
      id: `proj-${p.id}`,
      label: `Project: ${p.title}`,
      category: 'Projects' as const,
      icon: Sparkles,
      action: () => router.push(`/projects/${p.id}`),
      badge: p.category,
    })),

    // Quick Actions
    {
      id: 'action-theme',
      label: 'Toggle Dark / Light Theme Mode',
      category: 'Actions',
      icon: Sun,
      action: () => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('light');
        }
        setIsOpen(false);
      },
    },

    // Socials
    {
      id: 'social-email',
      label: 'Send Direct Email',
      category: 'Socials',
      icon: Mail,
      action: () => window.open(socialLinks.email.href, '_self'),
    },
    {
      id: 'social-whatsapp',
      label: 'Message on WhatsApp',
      category: 'Socials',
      icon: Mail,
      action: () => window.open(socialLinks.whatsapp.href, '_blank'),
    },
    {
      id: 'social-instagram',
      label: 'Follow on Instagram',
      category: 'Socials',
      icon: Mail,
      action: () => window.open(socialLinks.instagram.href, '_blank'),
    },
  ];

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Arrow Key Navigation
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredItems, selectedIndex]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
            {/* Backdrop Click */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xl bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-hidden z-10 text-left text-text-primary"
              role="dialog"
              aria-modal="true"
              aria-label="Command Palette"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 border-b border-border-subtle/50">
                <Search className="h-4 w-4 text-text-muted shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command or search..."
                  className="w-full h-14 bg-transparent px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-border-subtle bg-bg-inset text-text-muted hover:text-text-primary transition-colors text-xs font-mono"
                >
                  ESC
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, idx) => {
                    const IconComp = item.icon;
                    const isSelected = idx === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          item.action();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-colors text-left ${
                          isSelected
                            ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-inset'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className={`h-4 w-4 shrink-0 ${isSelected ? 'text-accent-primary' : 'text-text-muted'}`} />
                          <span>{item.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg-inset border border-border-subtle text-text-muted">
                              {item.badge}
                            </span>
                          )}
                          <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-accent-primary' : 'opacity-0'}`} />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-xs text-text-muted">
                    No matching commands found.
                  </div>
                )}
              </div>

              {/* Footer Shortcuts Legend */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-bg-inset/60 border-t border-border-subtle/50 font-mono text-[11px] text-text-muted">
                <div className="flex items-center gap-3">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-bg-surface border border-border-subtle">↑↓</kbd> Navigate</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-bg-surface border border-border-subtle">↵</kbd> Select</span>
                </div>
                <span>Sahil Bhakre OS</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
