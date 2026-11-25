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
      <div className="flex items-center justify-between text-xs font-mono text-blue-400 uppercase tracking-widest mb-5 lg:mb-8 border-b border-white/10 pb-3.5 lg:pb-4">
        <span>(08) — AVAILABILITY</span>
        <span className="text-slate-400">OPEN FOR ROLES</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-14 items-start">
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

          {/* Action CTAs (>= 44px touch targets) */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/temqest"
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-xs font-mono uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Right Column: Compact Horizontal Snap Cards (Mobile) / Stacked Proof (Desktop) */}
        <div className="lg:col-span-7 flex lg:block gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-4 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:divide-y lg:divide-white/10 lg:border-b lg:border-white/10">
          {/* Point 1 */}
          <div className="snap-start shrink-0 w-[78vw] sm:w-[60vw] lg:w-auto rounded-2xl lg:rounded-none border border-white/12 lg:border-0 bg-white/[0.04] lg:bg-transparent p-4 lg:p-0 lg:py-6 lg:first:pt-0">
            <div className="flex items-center gap-2 text-[11px] lg:text-xs font-mono text-blue-400 mb-1">
              <span>01</span>
              <span>/</span>
              <span>PRODUCTION EXPERIENCE</span>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-white mb-1.5">
              Real systems, not tutorial clones.
            </h3>
            <p className="text-xs lg:text-sm text-slate-300 font-light leading-relaxed line-clamp-3 lg:line-clamp-none">
              Architect of <span className="text-white font-normal">ap-silang</span> (offline-first maternal EMR with sub-4ms sync) and co-founder of <span className="text-white font-normal">UNITE</span> (blood logistics with BMC).
            </p>
          </div>

          {/* Point 2 */}
          <div className="snap-start shrink-0 w-[78vw] sm:w-[60vw] lg:w-auto rounded-2xl lg:rounded-none border border-white/12 lg:border-0 bg-white/[0.04] lg:bg-transparent p-4 lg:p-0 lg:py-6">
            <div className="flex items-center gap-2 text-[11px] lg:text-xs font-mono text-blue-400 mb-1">
              <span>02</span>
              <span>/</span>
              <span>DEFENSIVE MINDSET</span>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-white mb-1.5">
              Built for when connections drop.
            </h3>
            <p className="text-xs lg:text-sm text-slate-300 font-light leading-relaxed line-clamp-3 lg:line-clamp-none">
              Strict TypeScript, database Row-Level Security, and outbox queues built for dropped signals and concurrent reservations.
            </p>
          </div>

          {/* Point 3 */}
          <div className="snap-start shrink-0 w-[78vw] sm:w-[60vw] lg:w-auto rounded-2xl lg:rounded-none border border-white/12 lg:border-0 bg-white/[0.04] lg:bg-transparent p-4 lg:p-0 lg:py-6 lg:last:pb-0">
            <div className="flex items-center gap-2 text-[11px] lg:text-xs font-mono text-blue-400 mb-1">
              <span>03</span>
              <span>/</span>
              <span>TEAM FIT</span>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-white mb-1.5">
              Low ego, high agency.
            </h3>
            <p className="text-xs lg:text-sm text-slate-300 font-light leading-relaxed line-clamp-3 lg:line-clamp-none">
              Atomic Git PRs, fast iteration on code reviews, and self-directed debugging through docs before escalating.
            </p>
          </div>
        </div>
      </div>
    </V2IslandPanel>
  );
}
