'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Download, ArrowUp, LayoutGrid, X } from 'lucide-react';

interface V2BottomNavProps {
  onScrollToTop?: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About', className: '' },
  { id: 'work', label: 'Projects', className: '' },
  { id: 'skills', label: 'Skills', className: 'hidden md:inline-block' },
  { id: 'experience', label: 'Experience', className: 'hidden sm:inline-block' },
  { id: 'achievements', label: 'Milestones', className: 'hidden lg:inline-block' },
  { id: 'contact', label: 'Contact', className: '' },
];

const SHEET_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Milestones' },
  { id: 'certificates', label: 'Certifications' },
  { id: 'availability', label: 'Availability' },
  { id: 'contact', label: 'Contact' },
];

export function V2BottomNav({ onScrollToTop }: V2BottomNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('front');

    let observer: IntersectionObserver | null = null;
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          const visible = !entry.isIntersecting;
          setIsVisible(visible);
          if (!visible) setSheetOpen(false);
        },
        {
          root: null,
          rootMargin: '-80px 0px 0px 0px',
          threshold: 0,
        }
      );
      observer.observe(heroEl);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    setSheetOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setSheetOpen(false);
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Floating Section Navigation"
      aria-hidden={!isVisible}
      className={`fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-24px)] select-none transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Mobile Quick-Jump Sheet */}
      {sheetOpen && isVisible && (
        <div className="md:hidden mb-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_16px_40px_rgba(10,18,42,0.18)] p-2 grid grid-cols-2 gap-2">
          {SHEET_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="mono min-h-[44px] px-3 rounded-xl text-left text-[11px] tracking-[0.12em] uppercase text-[#0a122a] hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1.5 sm:gap-3 bg-white/92 backdrop-blur-xl border border-black/10 px-2 sm:px-4 py-1 rounded-full shadow-[0_12px_36px_rgba(10,18,42,0.14)] text-[#0a122a] overflow-hidden">
        {/* Desktop/Tablet Inline Section Links */}
        <nav aria-label="Bottom Sections" className="hidden sm:block">
          <ul className="flex items-center gap-3 md:gap-4 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className={item.className}>
                <button
                  type="button"
                  tabIndex={isVisible ? 0 : -1}
                  onClick={() => scrollTo(item.id)}
                  className="mono inline-flex items-center min-h-[44px] px-1.5 text-[#5b6684] hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[11px] tracking-[0.12em] uppercase whitespace-nowrap"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden sm:block w-px h-5 bg-black/10" aria-hidden="true" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            tabIndex={isVisible ? 0 : -1}
            onClick={() => setSheetOpen((prev) => !prev)}
            aria-expanded={sheetOpen}
            aria-label={sheetOpen ? 'Close all sections' : 'Browse all sections'}
            className="sm:hidden w-11 h-11 rounded-full flex items-center justify-center text-slate-700 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            {sheetOpen ? <X className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>

          {/* Mobile Direct Contact Action */}
          <button
            type="button"
            tabIndex={isVisible ? 0 : -1}
            onClick={() => scrollTo('contact')}
            className="sm:hidden min-h-[40px] px-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Contact me
          </button>

          <div className="flex items-center rounded-full border border-slate-900/15 bg-[#0a122a] text-white shadow-xs hover:border-blue-600 transition-colors shrink-0">
            <a
              href="/Patrick_Kurt_Villamer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isVisible ? 0 : -1}
              className="mono inline-flex items-center gap-1.5 px-3 min-h-[40px] sm:min-h-[44px] text-[11px] tracking-[0.12em] uppercase text-white hover:text-blue-300 transition-colors"
              title="View CV in new tab"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span className="font-medium">CV</span>
              <ArrowUpRight className="hidden sm:inline w-3 h-3 text-slate-400" />
            </a>
            <span className="hidden sm:inline-block w-px h-4 bg-white/20" aria-hidden="true" />
            <a
              href="/Patrick_Kurt_Villamer_Resume.pdf"
              download="Patrick_Kurt_Villamer_Resume.pdf"
              tabIndex={isVisible ? 0 : -1}
              className="hidden sm:inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-slate-300 hover:text-white transition-colors"
              title="Download CV (PDF)"
              aria-label="Download CV PDF"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            tabIndex={isVisible ? 0 : -1}
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Back to top"
            className="w-11 h-11 rounded-full flex items-center justify-center text-slate-600 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
