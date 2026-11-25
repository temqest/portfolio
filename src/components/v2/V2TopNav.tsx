'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ArrowUpRight, Download } from 'lucide-react';

export function V2TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('front');

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setPastHero(rect.bottom <= 80);
      } else {
        setPastHero(window.scrollY > window.innerHeight * 0.75);
      }
    };

    handleScroll();

    let observer: IntersectionObserver | null = null;
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          setPastHero(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '-80px 0px 0px 0px',
          threshold: 0,
        }
      );
      observer.observe(heroEl);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      aria-hidden={pastHero}
      className={`topbar ${scrolled ? 'scrolled' : ''} ${
        pastHero ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}
      data-on="light"
    >
      <div className="wrap">
        <Link
          href="/#front"
          tabIndex={pastHero ? -1 : 0}
          className="brand text-[#0a122a] hover:opacity-85 transition-opacity"
        >
          PATRICK
        </Link>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-2.5 sm:gap-5 md:gap-6 lg:gap-8 list-none m-0 p-0">
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('about')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[11px] sm:text-[12px] tracking-[0.14em] uppercase"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('work')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[11px] sm:text-[12px] tracking-[0.14em] uppercase"
              >
                Projects
              </button>
            </li>
            <li className="hidden md:inline-block">
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('skills')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                Skills
              </button>
            </li>
            <li className="hidden sm:inline-block">
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('experience')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                Experience
              </button>
            </li>
            <li className="hidden sm:inline-block">
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('achievements')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                Milestones
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('contact')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[11px] sm:text-[12px] tracking-[0.14em] uppercase"
              >
                Contact
              </button>
            </li>
            <li>
              <div className="flex items-center rounded-full border border-slate-900/15 bg-[#0a122a] text-white shadow-xs hover:border-blue-600 transition-colors">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={pastHero ? -1 : 0}
                  className="mono inline-flex items-center gap-1.5 pl-3 pr-2 py-1 text-[11px] tracking-[0.12em] uppercase text-white hover:text-blue-300 transition-colors"
                  title="View CV in new tab"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-300" />
                  <span className="font-medium">CV</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <span className="w-px h-3.5 bg-white/20 -ml-0.5" aria-hidden="true" />
                <a
                  href="/cv.pdf"
                  download="Patrick_CV.pdf"
                  tabIndex={pastHero ? -1 : 0}
                  className="p-1 pr-2.5 text-slate-300 hover:text-white transition-colors"
                  title="Download CV (PDF)"
                  aria-label="Download CV PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
