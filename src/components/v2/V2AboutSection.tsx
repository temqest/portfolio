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
            <span>(01) — ABOUT</span>
          </div>

          <h2 className="text-sm font-mono uppercase tracking-wider text-blue-400 mb-6">
            HELLO! I&apos;M PATRICK
          </h2>

          <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed tracking-tight text-white/95 mb-8">
            IT student and freelance developer. Most of what I know came from shipping real systems,
            then debugging them at{' '}
            <span className="text-orange-400 font-normal">2 a.m.</span>, so the sites I build are
            made to survive real users and messy data.
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Portrait of Patrick"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a18] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-xs font-mono text-white/80 flex items-center justify-between">
              <span>Patrick</span>
              <span className="text-emerald-400">● Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 mt-16 border-t border-white/10">
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tight text-white mb-1">
            05<span className="text-blue-500 font-serif-italic">+</span>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Systems shipped
          </p>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tight text-white mb-1">
            06<span className="text-orange-400 font-serif-italic">★</span>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Certifications
          </p>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tight text-white mb-1">
            &lt;24<span className="text-blue-400 font-mono text-3xl">h</span>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Average reply time
          </p>
        </div>
      </div>
    </V2IslandPanel>
  );
}
