'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ArrowUpRight, Download, Menu, X } from 'lucide-react';

const MOBILE_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Milestones' },
  { id: 'certificates', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function V2TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('front');

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    let observer: IntersectionObserver | null = null;
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          const isPast = !entry.isIntersecting;
          setPastHero(isPast);
          if (isPast) setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
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
          className="brand inline-flex items-center min-h-[44px] text-[#0a122a] hover:opacity-85 transition-opacity"
        >
          PATRICK
        </Link>

        {/* Desktop & Tablet Inline Nav */}
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-5 lg:gap-7 list-none m-0 p-0">
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('about')}
                className="mono inline-flex items-center min-h-[44px] px-1 hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[12px] tracking-[0.14em] uppercase"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('work')}
                className="mono inline-flex items-center min-h-[44px] px-1 hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[12px] tracking-[0.14em] uppercase"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('skills')}
                className="mono inline-flex items-center min-h-[44px] px-1 hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[12px] tracking-[0.14em] uppercase"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('experience')}
                className="mono inline-flex items-center min-h-[44px] px-1 hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[12px] tracking-[0.14em] uppercase"
              >
                Experience
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('achievements')}
                className="mono inline-flex items-center min-h-[44px] px-1 hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[12px] tracking-[0.14em] uppercase"
              >
                Milestones
              </button>
            </li>
            <li>
              <button
                type="button"
                tabIndex={pastHero ? -1 : 0}
                onClick={() => scrollTo('contact')}
                className="mono inline-flex items-center min-h-[44px] px-1 hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none text-[12px] tracking-[0.14em] uppercase"
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
                  className="mono inline-flex items-center gap-1.5 pl-3.5 pr-2.5 min-h-[44px] text-[11px] tracking-[0.12em] uppercase text-white hover:text-blue-300 transition-colors"
                  title="View CV in new tab"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-300" />
                  <span className="font-medium">CV</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <span className="w-px h-4 bg-white/20" aria-hidden="true" />
                <a
                  href="/cv.pdf"
                  download="Patrick_CV.pdf"
                  tabIndex={pastHero ? -1 : 0}
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-slate-300 hover:text-white transition-colors"
                  title="Download CV (PDF)"
                  aria-label="Download CV PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </li>
          </ul>
        </nav>

        {/* Mobile Compact Actions (>=44x44px touch targets, >=8px gap) */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={pastHero ? -1 : 0}
            className="mono inline-flex items-center gap-1.5 px-3.5 min-h-[44px] rounded-full bg-[#0a122a] text-white text-[11px] tracking-[0.12em] uppercase shadow-xs"
            title="View CV in new tab"
          >
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-medium">CV</span>
          </a>
          <button
            type="button"
            tabIndex={pastHero ? -1 : 0}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/15 bg-white/85 backdrop-blur-md text-[#0a122a] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Sheet */}
      {mobileMenuOpen && !pastHero && (
        <div className="md:hidden wrap mt-2">
          <nav
            aria-label="Mobile Sections"
            className="rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl shadow-xl p-2 grid grid-cols-2 gap-2"
          >
            {MOBILE_SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="mono min-h-[44px] px-3 rounded-xl text-left text-[11px] tracking-[0.12em] uppercase text-[#0a122a] hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/cv.pdf"
              download="Patrick_CV.pdf"
              className="mono min-h-[44px] px-3 rounded-xl flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-blue-700 bg-blue-50/80 hover:bg-blue-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save CV</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
