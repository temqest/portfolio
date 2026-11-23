'use client';

import React from 'react';
import { V2IslandPanel } from './V2IslandPanel';

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

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'GitHub', href: 'https://github.com/pork-arie' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'Facebook', href: 'https://facebook.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center gap-1"
              >
                {link.label} <span>↗</span>
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
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-xs font-mono text-white/80 flex items-center justify-between">
              <span>Patrick</span>
              <span className="text-emerald-400">● Active</span>
            </div>
          </div>
        </div>
      </div>
    </V2IslandPanel>
  );
}
