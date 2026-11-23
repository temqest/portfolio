'use client';

import React from 'react';
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
    href: '/cv.pdf',
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
    <V2IslandPanel id="about" className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative & Links */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">
            <span>(01) — ABOUT ME</span>
          </div>

          <h2 className="text-sm font-mono uppercase tracking-wider text-blue-400 mb-6">
            HELLO! I&apos;M PATRICK
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed tracking-tight text-white/95 mb-8">
            Founder and systems engineer. Co-founder of{' '}
            <span className="text-blue-400 font-normal">UNITE</span> (blood bank logistics startup)
            and lead architect of{' '}
            <span className="text-blue-400 font-normal">ap-silang</span> (offline-first municipal maternal EMR).
            I engineer reliable software for environments where failure isn&apos;t an inconvenience—it&apos;s critical.
          </p>

          {/* Social Links with Official Brand Icons */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group px-3.5 py-2 rounded-full border border-white/15 bg-white/[0.03] text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all flex items-center gap-2 shadow-xs"
              >
                <Icon className="w-3.5 h-3.5 text-white/60 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-200" />
                <span>{label}</span>
                <span className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[11px]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Portrait Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] group">
            <img
              src="/patrick.jpg"
              alt="Portrait of Patrick"
              className="w-full h-full object-cover object-top contrast-105 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a18] via-transparent to-transparent opacity-60" />
            {/* Availability Banner */}
            <div className="absolute bottom-3.5 inset-x-3.5 px-3.5 py-2.5 bg-black/65 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between transition-colors group-hover:border-white/20">
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
        </div>
      </div>
    </V2IslandPanel>
  );
}
