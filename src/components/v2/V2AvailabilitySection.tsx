'use client';

import React from 'react';
import { V2IslandPanel } from './V2IslandPanel';
import { ArrowUpRight } from 'lucide-react';

export function V2AvailabilitySection() {
  return (
    <V2IslandPanel id="availability" className="my-8">
      {/* Anchor fallbacks */}
      <div id="testimonials" className="relative -top-24" />
      <div id="hire" className="relative -top-24" />

      {/* Editorial Eyebrow */}
      <div className="flex items-center justify-between text-xs font-mono text-blue-400 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
        <span>(08) — AVAILABILITY</span>
        <span className="text-slate-400">OPEN FOR ROLES</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Direct Intent, Timeline & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.1] mb-5">
              Looking for my next{' '}
              <em className="font-serif-italic text-blue-400 font-normal">engineering team.</em>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
              Seeking Software Engineering Internships and Junior Developer roles. Ready to write reliable, defensive code and learn from senior engineers.
            </p>

            {/* Quick Fast Facts (No Pills) */}
            <div className="space-y-1.5 text-xs font-mono text-slate-400 mb-8 border-l border-blue-500/30 pl-4">
              <div>
                <span className="text-white">Target Roles:</span> SWE Intern · Junior Full-Stack
              </div>
              <div>
                <span className="text-white">Location:</span> Remote · Hybrid / On-site (PH)
              </div>
              <div>
                <span className="text-white">Timeline:</span> Immediate · Summer &amp; Fall 2026
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/temqest"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Right Column: 3 Fast, Direct Proof Points (No AI Cards or Icon Boxes) */}
        <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10 lg:border-t-0">
          {/* Point 1 */}
          <div className="py-6 first:pt-0">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span>01</span>
              <span>/</span>
              <span>PRODUCTION EXPERIENCE</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-1.5">
              Real systems, not tutorial clones.
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Architect of <span className="text-white font-normal">ap-silang</span> (offline-first municipal maternal EMR with sub-4ms SQLite sync) and co-founder of <span className="text-white font-normal">UNITE</span> (blood logistics network in active collaboration with Bicol Medical Center).
            </p>
          </div>

          {/* Point 2 */}
          <div className="py-6">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span>02</span>
              <span>/</span>
              <span>DEFENSIVE MINDSET</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-1.5">
              Built for when connections drop.
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Strict TypeScript types, database-level Row-Level Security, and mutation outbox queues designed for dropped signals and concurrent emergency reservations.
            </p>
          </div>

          {/* Point 3 */}
          <div className="py-6 last:pb-0">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span>03</span>
              <span>/</span>
              <span>TEAM FIT</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-1.5">
              Low ego, high agency.
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Atomic Git pull requests, rapid agility with code review feedback, and self-directed problem solving using deep documentation before escalating.
            </p>
          </div>
        </div>
      </div>
    </V2IslandPanel>
  );
}
