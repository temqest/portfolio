'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  hidden?: boolean;
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
    id: 'rtc-clearance',
    num: '03',
    name: 'RTC Clearance Express',
    tag: 'PROTOTYPE ARCHITECT · IRIGA HALL OF JUSTICE',
    desc: 'Digital court clearance and citizen self-registration system prototyped for the Regional Trial Court (Iriga City). Replaces manual paper-based logbooks with a 4-step online intake, instant QR pass lookup, priority staff queue, and live 8.5" × 13" certificate printing.',
    badge: 'PROTOTYPE',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'QR Pass Engine'],
    image: '/assets/projects/rtc-clearance-hero.png',
    link: '/detail/3',
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
    hidden: true,
  },
];

const VISIBLE_FLAGSHIP_PROJECTS = FLAGSHIP_PROJECTS.filter((project) => !project.hidden);

export function V2WorkSection() {
  return (
    <section
      id="work"
      className="relative w-full bg-transparent text-[#0a122a] py-12 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16"
    >
      {/* Anchor targets for smooth scrolling navigation */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ============================================================== */}
        {/* SECTION HEADER (Clean Editorial Light Theme)                  */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-8 md:mb-16 border-b border-black/10 pb-6 md:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 md:mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>(02) — RECENT WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#0a122a] leading-[1.06]">
              From idea to live.
              <br />
              <span className="font-serif-italic text-blue-600 font-normal">Sites that ship.</span>
            </h2>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="md:hidden text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Swipe {VISIBLE_FLAGSHIP_PROJECTS.length} flagships →
            </span>
            <Link
              href="/detail/1"
              className="min-h-[44px] text-sm font-mono text-slate-500 hover:text-[#0a122a] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <span>See all</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART A: HORIZONTAL SNAP RAIL (MOBILE) / STICKY STACK (DESKTOP) */}
        {/* ============================================================== */}
        <div className="relative flex md:block gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-5 sm:scroll-px-6 no-scrollbar -mx-4 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:space-y-36 pb-4 md:pb-20">
          {VISIBLE_FLAGSHIP_PROJECTS.map((project, idx) => {
            // Sequential sticky offsets on md+ so cards stack cleanly under the topbar
            const stickyTop = 100 + idx * 28;

            return (
              <div
                key={project.id}
                className="shrink-0 w-[83vw] sm:w-[74vw] md:w-full snap-start md:sticky transition-all duration-300 md:top-[var(--sticky-top)]"
                style={
                  {
                    '--sticky-top': `${stickyTop}px`,
                    zIndex: 10 + idx,
                  } as React.CSSProperties
                }
              >
                <div className="relative w-full rounded-[24px] sm:rounded-[32px] md:rounded-[44px] overflow-hidden border border-black/15 bg-[#0b1120] shadow-[0_18px_42px_rgba(10,18,42,0.16)] group md:aspect-[21/10]">
                  {/* Full-Bleed UI Screenshot / Visual Preview */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:absolute md:inset-0 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 84vw, 1200px"
                      loading="lazy"
                      className="object-cover md:group-hover:scale-102 transition-transform duration-700 brightness-[0.9] md:group-hover:brightness-95"
                    />

                    {/* Atmospheric Vignette & Contrast Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10 md:from-black/90 md:via-black/35 md:to-black/20 pointer-events-none" />

                    {/* Top-Right Badge */}
                    <div className="absolute top-3 right-3 sm:top-6 sm:right-6 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-mono font-medium text-white flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  {/* Mobile Solid Body / Desktop Floating Glassmorphic Info Card */}
                  <div className="relative md:absolute md:bottom-8 md:left-8 md:max-w-xl p-5 sm:p-6 md:p-7 md:rounded-3xl bg-[#0b1120] md:bg-black/85 md:backdrop-blur-xl md:border md:border-white/15 text-white md:shadow-2xl">
                    <span className="text-[10px] sm:text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1 font-semibold truncate">
                      {project.tag}
                    </span>

                    <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 flex items-center justify-between md:group-hover:text-blue-300 transition-colors">
                      <span>{project.name}</span>
                      <Link
                        href={project.link}
                        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-blue-600 hover:text-white transition-all ml-3 shrink-0"
                        title="View Case Study"
                        aria-label={`View ${project.name} case study`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-3.5 line-clamp-2 md:line-clamp-3">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 border-t border-white/10">
                      {project.stack.map((t, stackIdx) => (
                        <span
                          key={t}
                          className={`${stackIdx >= 3 ? 'hidden md:inline-flex' : 'inline-flex'} px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-200`}
                        >
                          {t}
                        </span>
                      ))}
                      <Link
                        href={project.link}
                        className="ml-auto min-h-[44px] px-2 text-xs font-mono text-blue-400 hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
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
