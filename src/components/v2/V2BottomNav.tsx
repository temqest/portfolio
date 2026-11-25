'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Download, ArrowUp } from 'lucide-react';

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

export function V2BottomNav({ onScrollToTop }: V2BottomNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('front');

    const updateFromScroll = () => {
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsVisible(rect.bottom <= 80);
      } else {
        setIsVisible(window.scrollY > window.innerHeight * 0.75);
      }
    };

    updateFromScroll();

    let observer: IntersectionObserver | null = null;
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '-80px 0px 0px 0px',
          threshold: 0,
        }
      );
      observer.observe(heroEl);
    }

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', updateFromScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw] select-none transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2.5 sm:gap-4 bg-white/88 backdrop-blur-xl border border-black/10 px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_12px_36px_rgba(10,18,42,0.12)] text-[#0a122a]">
        <nav aria-label="Bottom Sections">
          <ul className="flex items-center gap-2.5 sm:gap-4 md:gap-5 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className={item.className}>
                <button
                  type="button"
                  tabIndex={isVisible ? 0 : -1}
                  onClick={() => scrollTo(item.id)}
                  className="mono text-[#5b6684] hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase whitespace-nowrap"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-px h-4 bg-black/10" aria-hidden="true" />

        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-full border border-slate-900/15 bg-[#0a122a] text-white shadow-xs hover:border-blue-600 transition-colors">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isVisible ? 0 : -1}
              className="mono inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-white hover:text-blue-300 transition-colors"
              title="View CV in new tab"
            >
              <FileText className="w-3 h-3 text-slate-300" />
              <span className="font-medium">CV</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
            <span className="w-px h-3 bg-white/20" aria-hidden="true" />
            <a
              href="/cv.pdf"
              download="Patrick_CV.pdf"
              tabIndex={isVisible ? 0 : -1}
              className="p-1 pr-2 text-slate-300 hover:text-white transition-colors"
              title="Download CV (PDF)"
              aria-label="Download CV PDF"
            >
              <Download className="w-3 h-3" />
            </a>
          </div>

          <button
            type="button"
            tabIndex={isVisible ? 0 : -1}
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Back to top"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
