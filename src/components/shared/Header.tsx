'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Search, Sun, Moon, Sparkles, 
  FileText, Github, Bookmark, Wrench, FileCheck, Receipt, 
  Layers, ShieldCheck, Cpu, HelpCircle, Lock, ArrowRight 
} from 'lucide-react';
import { primaryNavItems, secondaryNavGroups } from '@config/navigation';
import { personalInfo } from '@config/portfolio';
import { useActiveSection } from '@hooks/useActiveSection';

const ICON_MAP: Record<string, any> = {
  FileText,
  Github,
  Bookmark,
  Wrench,
  FileCheck,
  Receipt,
  Layers,
  ShieldCheck,
  Cpu,
  HelpCircle,
  Lock,
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sectionIds = primaryNavItems.map((item) => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds);

  // Scroll listener for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside & Esc key listener to close More dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);

    if (href.startsWith('/')) {
      return;
    }

    if (pathname !== '/') {
      e.preventDefault();
      router.push(`/${href}`);
      return;
    }

    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === '' || targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  const triggerCommandPalette = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
    document.dispatchEvent(event);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-surface/85 backdrop-blur-2xl py-2.5 px-4 sm:px-6 border border-border-subtle shadow-2xl'
            : 'bg-bg-surface/40 backdrop-blur-md py-2.5 px-4 sm:px-6 border border-border-subtle/50'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo Monogram */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 group focus-ring rounded-md shrink-0 min-h-[44px]"
          >
            <span className="font-display font-bold text-lg tracking-tight text-text-primary group-hover:text-accent-primary transition-colors">
              {personalInfo.monogram}
            </span>
          </a>

          {/* Center Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-bg-base/50 p-1.5 rounded-full border border-border-subtle/40 backdrop-blur-md">
            {primaryNavItems.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 focus-ring ${
                    isActive
                      ? 'text-accent-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-bg-inset border border-border-subtle/60 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Secondary "More" Mega Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-1 transition-colors ${
                  moreDropdownOpen ? 'text-accent-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-accent-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-[-140px] mt-3 w-[680px] p-6 rounded-3xl bg-bg-surface/95 backdrop-blur-2xl border border-border-subtle shadow-2xl space-y-6 z-50 text-left"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {secondaryNavGroups.map((group) => (
                        <div key={group.title} className="space-y-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-accent-primary font-bold block border-b border-border-subtle/40 pb-1.5">
                            {group.title}
                          </span>
                          <div className="space-y-1">
                            {group.items.map((sec) => {
                              const IconComponent = ICON_MAP[sec.icon] || FileText;

                              return (
                                <Link
                                  key={sec.label}
                                  href={sec.href}
                                  onClick={() => setMoreDropdownOpen(false)}
                                  className="p-2.5 rounded-xl block group hover:bg-bg-inset transition-all"
                                >
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4 text-text-muted group-hover:text-accent-primary transition-colors shrink-0" />
                                    <span className="font-bold text-xs text-text-primary group-hover:text-accent-primary transition-colors">
                                      {sec.label}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-text-muted leading-tight mt-1 pl-6">
                                    {sec.description}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-border-subtle/40 flex items-center justify-between text-[10px] font-mono text-text-muted">
                      <span>Press ESC to close menu</span>
                      <span className="text-accent-primary font-semibold">100% Config-Driven</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Side Utility Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-full border border-border-subtle bg-bg-inset text-text-secondary hover:text-text-primary transition-colors btn-micro min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-accent-primary" />}
            </button>

            <button
              onClick={triggerCommandPalette}
              className="px-3.5 py-2 rounded-full border border-border-subtle bg-bg-inset text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 btn-micro min-h-[44px]"
            >
              <Search className="h-3.5 w-3.5 text-accent-primary" />
              <span className="text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded border border-border-subtle/50">⌘K</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gradient text-text-primary text-xs font-bold hover:shadow-glow transition-all btn-micro min-h-[44px]"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls: Search, Theme & Large 48px Touch Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={triggerCommandPalette}
              aria-label="Open Search Command Palette"
              className="p-2.5 rounded-xl border border-border-subtle bg-bg-inset text-text-secondary hover:text-text-primary min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <Search className="h-4 w-4 text-accent-primary" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-inset text-text-secondary hover:text-text-primary min-h-[48px] flex items-center gap-2 focus-ring"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="font-mono text-xs font-semibold">Menu</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Large 48–56px Thumb-Friendly Touch Targets) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-3 p-5 sm:p-6 rounded-3xl bg-bg-surface/95 backdrop-blur-2xl border border-border-subtle shadow-2xl space-y-5 text-left max-h-[82vh] overflow-y-auto"
          >
            {/* Simplified Mobile Primary Navigation */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-accent-primary uppercase tracking-wider font-bold block mb-1">
                Navigation
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono">
                {[
                  { label: 'Home', href: '#' },
                  { label: 'Services', href: '#capabilities' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-text-primary bg-bg-inset border border-border-subtle/60 min-h-[50px] active:scale-[0.98] transition-all"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-accent-primary" />
                  </a>
                ))}
              </div>
            </div>

            {/* Simplified Mobile "More" Section */}
            <div className="pt-3 border-t border-border-subtle/40 space-y-2.5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-bold block">
                More Pages &amp; Resources
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono">
                {[
                  { label: 'About', href: '#about', isPage: false },
                  { label: 'Blog', href: '/blog', isPage: true },
                  { label: 'Resources', href: '/resources', isPage: true },
                  { label: 'Resume', href: '/resume', isPage: true },
                  { label: 'Open Source', href: '/open-source', isPage: true },
                  { label: 'Case Studies', href: '/projects', isPage: true },
                ].map((sec) => (
                  sec.isPage ? (
                    <Link
                      key={sec.label}
                      href={sec.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3.5 py-2.5 rounded-xl bg-bg-inset/60 border border-border-subtle/40 block text-xs font-semibold text-text-secondary hover:text-text-primary min-h-[48px] flex items-center justify-between"
                    >
                      <span>{sec.label}</span>
                      <span className="text-[10px] text-text-muted">↗</span>
                    </Link>
                  ) : (
                    <a
                      key={sec.label}
                      href={sec.href}
                      onClick={(e) => handleNavClick(e, sec.href)}
                      className="px-3.5 py-2.5 rounded-xl bg-bg-inset/60 border border-border-subtle/40 block text-xs font-semibold text-text-secondary hover:text-text-primary min-h-[48px] flex items-center justify-between"
                    >
                      <span>{sec.label}</span>
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Mobile Contact Action CTA */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-accent-gradient text-text-primary text-xs font-bold shadow-glow min-h-[52px]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
