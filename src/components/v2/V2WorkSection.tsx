'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WorkCarousel } from './work/WorkCarousel';

interface FlagshipProject {
  id: string;
  num: string;
  name: string;
  tag: string;
  desc: string;
  badge: string;
  stack: string[];
  image: string;
  link: string;
}

const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'unite',
    num: '01',
    name: 'UNITE',
    tag: 'STARTUP CO-FOUNDER · EMERGENCY BLOOD LOGISTICS',
    desc: 'Centralized blood unit inventory and donor mobilization platform connecting regional hospitals, blood centers, and volunteer donors in real time. Built in active clinical collaboration with Bicol Medical Center (BMC) to eliminate emergency transfusion stockouts.',
    badge: 'LIVE',
    stack: ['Next.js 16', 'React Native', 'TypeScript', 'Supabase RLS', 'PostgreSQL'],
    image: '/assets/projects/unite.png',
    link: '/detail/1',
  },
  {
    id: 'apsilang',
    num: '02',
    name: 'ap-silang',
    tag: 'CAPSTONE LEAD ARCHITECT · OFFLINE-FIRST EMR',
    desc: 'Offline-first municipal maternal healthcare and electronic medical records platform serving Rural Health Units and mountain barangays. Features a zero-internet Dexie.js + SQLite outbox mutation sync engine and in-browser TEWS clinical risk triage.',
    badge: 'LIVE',
    stack: ['React 19 PWA', 'React Native', 'Dexie.js', 'SQLite', 'WebSockets'],
    image: '/assets/projects/silang.png',
    link: '/detail/2',
  },
  {
    id: 'klinikaos',
    num: '03',
    name: 'KlinikaOS',
    tag: 'LEAD SYSTEMS ARCHITECT · RURAL TELEHEALTH TELEMETRY',
    desc: 'Distributed municipal telehealth platform supporting low-bandwidth WebRTC encrypted video consultations, continuous maternal vital telemetry streams, and digital prescription issuance across provincial clinics.',
    badge: 'PRODUCTION',
    stack: ['Next.js 16', 'WebRTC', 'Node.js', 'PostgreSQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop',
    link: '/detail/1',
  },
];

export function V2WorkSection() {
  return (
    <section
      id="work"
      className="relative w-full bg-white text-[#0a122a] py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      {/* Anchor targets for smooth scrolling navigation */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ============================================================== */}
        {/* SECTION HEADER (Clean Editorial Light Theme)                  */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-black/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>(02) — RECENT WORK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0a122a] leading-[1.04]">
              From idea to live.
              <br />
              <span className="font-serif-italic text-blue-600 font-normal">Sites that ship.</span>
            </h2>
          </div>

          <Link
            href="/detail/1"
            className="text-sm font-mono text-slate-500 hover:text-[#0a122a] transition-colors flex items-center gap-1.5 group cursor-pointer pb-2"
          >
            <span>See all</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* PART A: STICKY STACKING FLAGSHIPS (3 Cards)                    */}
        {/* ============================================================== */}
        <div className="relative space-y-24 md:space-y-36 pb-20">
          {FLAGSHIP_PROJECTS.map((project, idx) => {
            // Sequential sticky offsets so cards stack cleanly under the topbar
            const stickyTop = 100 + idx * 28;

            return (
              <div
                key={project.id}
                className="sticky transition-all duration-300"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 10 + idx,
                }}
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-black/15 bg-slate-900 shadow-[0_24px_55px_rgba(10,18,42,0.18)] group">
                  {/* Full-Bleed UI Screenshot / Visual Preview */}
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 brightness-[0.88] group-hover:brightness-95"
                  />

                  {/* Atmospheric Vignette & Contrast Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />

                  {/* Top-Right Badge matching Image 1 & Image 2 */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-medium text-white flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{project.badge}</span>
                  </div>

                  {/* Bottom-Left Floating Glassmorphic Info Card matching Reference Images */}
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 max-w-xl p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-black/85 backdrop-blur-xl border border-white/15 text-white shadow-2xl">
                    <span className="text-[10px] sm:text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1.5 font-semibold">
                      {project.tag}
                    </span>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2.5 flex items-center justify-between group-hover:text-blue-300 transition-colors">
                      <span>{project.name}</span>
                      <Link
                        href={project.link}
                        className="text-lg sm:text-xl p-2 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white transition-all ml-3"
                        title="View Case Study"
                      >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                      <Link
                        href={project.link}
                        className="ml-auto text-xs font-mono text-blue-400 hover:text-white transition-colors flex items-center gap-1 font-medium"
                      >
                        <span>Case study</span>
                        <span>↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* PART B: HORIZONTAL CAROUSEL OF SMALLER PROJECTS (Matches Image 3) */}
        {/* ============================================================== */}
        <WorkCarousel />
      </div>
    </section>
  );
}
