'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function V2TopNav() {
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

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`} data-on="light">
      <div className="wrap">
        <Link
          href="/v2#front"
          className="brand text-[#0a122a] hover:opacity-85 transition-opacity"
        >
          ANGHEL
        </Link>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-[34px] list-none m-0 p-0">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
