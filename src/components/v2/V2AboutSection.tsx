'use client';

import React from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaFacebook, FaFilePdf, FaEnvelope } from 'react-icons/fa6';
import { V2IslandPanel } from './V2IslandPanel';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/temqest',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/patrick-villamer-15267b36a',
    icon: FaLinkedin,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/patrick.kurt.127',
    icon: FaFacebook,
  },
  {
    label: 'CV / Resume',
    href: '/Patrick_Kurt_Villamer_Resume.pdf',
    icon: FaFilePdf,
  },
  {
    label: 'Email',
    href: 'mailto:patrickkurtv@gmail.com',
    icon: FaEnvelope,
  },
];

export function V2AboutSection() {
  return (
    <V2IslandPanel id="about" className="my-5 sm:my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-center">
        {/* Left Column: Narrative & Links */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-2.5 sm:mb-4">
            <span>(01) — ABOUT ME</span>
          </div>

          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-blue-400 mb-3 sm:mb-6">
            HELLO! I&apos;M PATRICK
          </h2>

          <p className="text-lg sm:text-3xl md:text-4xl font-light leading-relaxed tracking-tight text-white/95 mb-5 sm:mb-8">
            Founder and systems engineer. Co-founder of{' '}
            <span className="text-blue-400 font-normal">UNITE</span> (blood bank logistics startup)
            and lead architect of{' '}
            <span className="text-blue-400 font-normal">ap-silang</span> (offline-first municipal maternal EMR).
            I engineer reliable software for environments where failure isn&apos;t an inconvenience—it&apos;s critical.
          </p>

          {/* Social Links: Icon-only 1-row on mobile, labeled pills on sm+ */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="group w-11 h-11 sm:w-auto sm:h-auto sm:min-h-[44px] sm:px-4 sm:py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all inline-flex items-center justify-center sm:gap-2 shadow-xs"
              >
                <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white/75 group-hover:text-blue-400 md:group-hover:scale-110 transition-all duration-200" />
                <span className="hidden sm:inline">{label}</span>
                <span className="hidden sm:inline text-white/40 group-hover:text-white md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-transform text-[11px]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Portrait Card (Full face visible + docked availability bar) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[260px] sm:max-w-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] group flex flex-col">
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src="/patrick.jpg"
                alt="Portrait of Patrick"
                fill
                sizes="(max-width: 768px) 260px, 384px"
                loading="lazy"
                className="object-cover object-[50%_20%] contrast-105 md:group-hover:scale-105 transition-all duration-700"
              />
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#060a18] via-transparent to-transparent opacity-60" />
              {/* Desktop overlay banner */}
              <div className="hidden sm:flex absolute bottom-3.5 inset-x-3.5 px-3.5 py-2.5 bg-black/65 backdrop-blur-md rounded-xl border border-white/10 items-center justify-between transition-colors group-hover:border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white/90 font-mono text-[11px] tracking-tight">
                    Open for work &amp; internship
                  </span>
                </div>
                <span className="text-white/45 font-mono text-[10px] tracking-wider uppercase">
                  Available now
                </span>
              </div>
            </div>
            {/* Mobile docked status bar below portrait so face is never covered */}
            <div className="sm:hidden px-3.5 py-2.5 bg-[#0a122a] border-t border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-white/90 font-mono text-[11px] tracking-tight truncate">
                  Open for work &amp; internship
                </span>
              </div>
              <span className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase shrink-0">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </V2IslandPanel>
  );
}
