'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface V2TopNavProps {
  mode?: 'site' | 'story';
  onSwitchMode?: (mode: 'site' | 'story') => void;
}

export function V2TopNav({ mode = 'site', onSwitchMode }: V2TopNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When in story mode, V2StoryExperience provides its dedicated immersive header
  if (mode === 'story') {
    return null;
  }

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`} data-on="light">
      <div className="wrap">
        <Link
          href="/v2#front"
          className="brand text-[#0a122a] hover:opacity-85 transition-opacity"
        >
          PATRICK
        </Link>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-[24px] sm:gap-[34px] list-none m-0 p-0">
            <li>
              <button
                type="button"
                onClick={() => scrollTo('about')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                Work
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollTo('process')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                Process
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="mono hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[12px] tracking-[0.14em] uppercase"
              >
                Contact
              </button>
            </li>
            {onSwitchMode && (
              <li>
                <button
                  type="button"
                  onClick={() => onSwitchMode('story')}
                  className="mono flex items-center px-3 py-1 rounded-full border border-blue-600/30 bg-blue-50/70 hover:bg-blue-600 text-blue-700 hover:text-white transition-all text-[11px] tracking-[0.12em] uppercase cursor-pointer"
                  title="Switch to Story Mode"
                >
                  Story
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
