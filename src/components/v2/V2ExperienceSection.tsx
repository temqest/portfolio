'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { WaveMeshCanvas } from '@/components/canvas/WaveMeshCanvas';
import { V2IslandPanel } from './V2IslandPanel';
import { ChevronRight } from 'lucide-react';

interface CareerMilestone {
  id: string;
  year: string;
  role: string;
  company: string;
  companyType: string;
  location: string;
  link?: string;
}

const MILESTONES: CareerMilestone[] = [
  {
    id: 'research',
    year: '2022',
    role: 'Systems Developer & Technical Researcher',
    company: 'Academic & Open-Source Research',
    companyType: 'Applied Systems Engineering',
    location: 'Philippines',
  },
  {
    id: 'freelance',
    year: '2023',
    role: 'Freelance Full-Stack Engineer & Consultant',
    company: 'Independent Client Engagements',
    companyType: 'Small Business Tooling',
    location: 'Remote · Regional Clients',
  },
  {
    id: 'ap-silang',
    year: '2024',
    role: 'Lead Systems Architect & Full-Stack Developer',
    company: 'ap-silang (Municipal Maternal EMR)',
    companyType: 'Municipal Healthcare Platform (Capstone Flagship)',
    location: 'Rural Health Units & Health Stations',
    link: '/detail/2',
  },
  {
    id: 'unite-sparklab',
    year: '2025',
    role: 'Startup Co-Founder & Lead Systems Architect',
    company: 'UNITE',
    companyType: 'Regional Blood Logistics Network',
    location: 'Naga City & Provincial Bicol',
    link: '/detail/1',
  },
  {
    id: 'unite-bmc',
    year: '2026',
    role: 'Lead Systems Architect & Co-Founder',
    company: 'UNITE & Bicol Medical Center (BMC)',
    companyType: 'Institutional Clinical Transfusion Partnership',
    location: 'Camarines Sur & Camarines Norte',
    link: '/detail/1',
  },
];

// Generous vertical slot height per milestone (creates ample breathing room)
const SLOT_HEIGHT = 260;
const FOCAL_HEIGHT = 520;
const CONTENT_HEIGHT = 540;
const INITIAL_TOP_PADDING = 36;
const SETTLE_THRESHOLD = 0.10;

export function V2ExperienceSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [settleFactor, setSettleFactor] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(800);

  const outerTrackRef = useRef<HTMLDivElement | null>(null);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoSnappingRef = useRef<boolean>(false);

  // Keep track of window dimensions for responsive true centering
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map scroll progress through the track to active milestone index (0 to 4)
  // and calculate smooth settleFactor (0 -> 1) as entrance section scrolls away
  const handleScroll = useCallback(() => {
    if (!outerTrackRef.current) return;
    const rect = outerTrackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;

    if (totalDist <= 0) return;

    // Track scroll offset within this track
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDist));
    setScrollProgress(progress);

    // Calculate settleFactor: starts at 0 (tucked close to entrance at top),
    // and as user scrolls down through the first 10% of track, smoothly glides down into center
    if (scrolled <= 0) {
      setSettleFactor(0);
    } else {
      const settleProgress = Math.min(1, Math.max(0, progress / SETTLE_THRESHOLD));
      // Smoothstep easing (3p^2 - 2p^3)
      const eased = settleProgress * settleProgress * (3 - 2 * settleProgress);
      setSettleFactor(eased);
    }

    // Map progress to active milestone index:
    // When progress < SETTLE_THRESHOLD: milestone 0 is active while settling
    // When progress >= SETTLE_THRESHOLD: remaining progress is partitioned across milestones 0-4
    const count = MILESTONES.length;
    let targetIdx = 0;
    if (progress > SETTLE_THRESHOLD) {
      const historyProgress = (progress - SETTLE_THRESHOLD) / (1 - SETTLE_THRESHOLD);
      targetIdx = Math.min(count - 1, Math.max(0, Math.floor(historyProgress * count)));
    }

    setActiveIdx((current) => (current !== targetIdx ? targetIdx : current));

    // Debounced auto-snap to center on active milestone segment when user pauses
    if (!isAutoSnappingRef.current && progress > 0.04 && progress < 0.98) {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        if (!outerTrackRef.current) return;
        const currentRect = outerTrackRef.current.getBoundingClientRect();
        const currentTotalDist = currentRect.height - window.innerHeight;
        const currentScrollY = window.scrollY || window.pageYOffset;
        const containerTop = currentScrollY + currentRect.top;

        const segmentProgress =
          SETTLE_THRESHOLD + (targetIdx + 0.5) * ((1 - SETTLE_THRESHOLD) / count);
        const targetScrollY = containerTop + segmentProgress * currentTotalDist;

        if (Math.abs(currentScrollY - targetScrollY) > 30) {
          isAutoSnappingRef.current = true;
          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isAutoSnappingRef.current = false;
          }, 450);
        }
      }, 240);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [handleScroll]);

  // Click on a timeline item scrolls directly to that year's focal segment
  const handleMilestoneClick = (targetIdx: number) => {
    setActiveIdx(targetIdx);
    if (!outerTrackRef.current) return;

    const rect = outerTrackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;
    const currentScrollY = window.scrollY || window.pageYOffset;
    const containerTop = currentScrollY + rect.top;

    const count = MILESTONES.length;
    const targetProgress =
      SETTLE_THRESHOLD + (targetIdx + 0.5) * ((1 - SETTLE_THRESHOLD) / count);
    const targetScrollY = containerTop + targetProgress * totalDist;

    isAutoSnappingRef.current = true;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
    setTimeout(() => {
      isAutoSnappingRef.current = false;
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const next = (activeIdx + 1) % MILESTONES.length;
      handleMilestoneClick(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prev = (activeIdx - 1 + MILESTONES.length) % MILESTONES.length;
      handleMilestoneClick(prev);
    }
  };

  // Settle vertical distance needed to glide from top position into true vertical center
  const centerShift = Math.max(
    0,
    Math.round((windowHeight - CONTENT_HEIGHT) / 2 - INITIAL_TOP_PADDING)
  );
  const settleTranslateY = Math.round(settleFactor * centerShift);

  // Active milestone is ALWAYS placed in the exact vertical center of the focal area (260px)
  const timelineTranslateY =
    FOCAL_HEIGHT / 2 - (activeIdx * SLOT_HEIGHT + SLOT_HEIGHT / 2);

  return (
    <V2IslandPanel id="experience" className="my-8">
      {/* =========================================================================
          PHASE 1: THE EDITORIAL ENTRANCE SUBSECTION (Matching Image 1)
          Compact bottom padding to seamlessly connect with History below
          ========================================================================= */}
      <div className="pb-8 md:pb-10 border-b border-white/10 mb-6">
        {/* Top Header Eyebrow Bar */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-slate-400 border-b border-white/10 pb-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-blue-400">(05)</span>
            <span>EXPERIENCE</span>
          </div>
          <span className="text-slate-500">Since 2022</span>
        </div>

        {/* Entrance Two-Column: Statement on Left + 3D Wave Mesh Canvas on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Editorial Thesis Statement */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.14] mb-6">
              Since <strong className="font-bold text-white">2022</strong> I&apos;ve been engineering{' '}
              <strong className="font-bold text-white">resilient web systems</strong>, clinical healthcare
              platforms, and offline-first architectures for institutions and startups across the
              Philippines and beyond.
            </h2>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
              >
                <span>Full CV on LinkedIn</span>
                <span>↗</span>
              </a>

              <span className="text-white/20 text-xs font-mono">·</span>

              <span className="text-xs font-mono text-slate-400">
                Scroll down to inspect history ↓
              </span>
            </div>
          </div>

          {/* Right Column: 3D Undulating Particle Wave Mesh */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[400px] aspect-[4/3] flex items-center justify-center">
              <WaveMeshCanvas width={400} height={300} className="w-full h-full object-contain" />
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(circle at center, rgba(46,79,199,0.2), transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PHASE 2: THE SCROLL-DRIVEN YEAR ODOMETER & HISTORY TIMELINE
          - Starts at top close to entrance statement (no massive void)
          - On scroll down, glides from top to center and settles in vertical center
          - Colossal Year size in sans-serif with tight tracking (never clipped)
          - Generous distance between experiences (SLOT_HEIGHT = 260px)
          - Zero pill badges, zero tech pills (pure clean typography)
          ========================================================================= */}
      <div
        ref={outerTrackRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="relative w-full outline-none select-none"
        style={{ height: '420vh' }}
      >
        {/* Sticky 100vh Viewport Stage */}
        <div
          className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden text-white"
          style={{ paddingTop: `${INITIAL_TOP_PADDING}px` }}
        >
          {/* Synchronized Grid Container: glides smoothly from top to center as user scrolls */}
          <div
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateY(${settleTranslateY}px)` }}
          >
            {/* -------------------------------------------------------------
                LEFT COLUMN (50%): Colossal Year Display
                Centered inside FOCAL_HEIGHT container to match Right Timeline
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              {/* Header Eyebrow space matching Right side */}
              <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-slate-400 border-b border-white/10 pb-3 mb-4">
                <span>TIMELINE</span>
                <span className="text-slate-500">{MILESTONES[activeIdx]?.year}</span>
              </div>

              {/* Focal container matching exact height of Right Focal Window (520px) */}
              <div
                className="relative w-full flex flex-col justify-center"
                style={{ height: `${FOCAL_HEIGHT}px` }}
              >
                <div>
                  {/* Massive Rolling Odometer Window */}
                  <div className="relative h-[6.5rem] sm:h-[8.5rem] md:h-[10.5rem] lg:h-[11.5rem] overflow-hidden w-full">
                    <div
                      className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ transform: `translateY(-${activeIdx * (100 / MILESTONES.length)}%)` }}
                    >
                      {MILESTONES.map((m) => (
                        <div
                          key={m.id}
                          className="h-[6.5rem] sm:h-[8.5rem] md:h-[10.5rem] lg:h-[11.5rem] flex items-center font-black tracking-tighter text-white font-sans leading-none select-none whitespace-nowrap pr-4"
                          style={{ fontSize: 'clamp(5rem, 11vw, 10.5rem)' }}
                        >
                          {m.year}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ordinal Career Year Subtitle */}
                  <div className="text-xl sm:text-2xl md:text-3xl font-light text-slate-400 font-sans tracking-tight mt-3">
                    Year {activeIdx + 1}
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN (50%): Continuous History Timeline Rail
                Active experience is ALWAYS vertically centered in view
                ------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              {/* Timeline Header Eyebrow with White Accent Node on Rail Axis */}
              <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-slate-400 border-b border-white/10 pb-3 mb-4 pl-14">
                <div className="relative flex items-center">
                  <div className="absolute -left-[44px] w-6 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block shadow-[0_0_8px_white]" />
                  </div>
                  <span>HISTORY</span>
                </div>
                <span>
                  0{activeIdx + 1} / 0{MILESTONES.length}
                </span>
              </div>

              {/* Clipped Focal Window for Vertical Centering (520px) with Generous Rail Padding */}
              <div
                className="relative overflow-hidden pl-14"
                style={{ height: `${FOCAL_HEIGHT}px` }}
              >
                {/* Continuous Vertical Hairline Rail - Crisp and Visible */}
                <div className="absolute left-[12px] top-0 bottom-0 w-[1px] bg-white/25 z-0" />

                {/* Top & Bottom Subtle Fade Gradients */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#060a18] to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060a18] to-transparent pointer-events-none z-20" />

                {/* Moving Timeline Track that centers the active milestone */}
                <div
                  className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateY(${timelineTranslateY}px)` }}
                >
                  {MILESTONES.map((item, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleMilestoneClick(idx)}
                        style={{ height: `${SLOT_HEIGHT}px` }}
                        className={`relative cursor-pointer transition-all duration-500 group select-none flex flex-col justify-center ${
                          isActive
                            ? 'opacity-100 scale-100'
                            : 'opacity-25 hover:opacity-50 scale-[0.97]'
                        }`}
                      >
                        {/* Active / Inactive Bullet Marker precisely riding ON the Vertical Rail */}
                        <div className="absolute -left-[56px] top-1/2 -translate-y-1/2 w-6 flex items-center justify-center z-10 pointer-events-none">
                          <div
                            className={`transition-all duration-300 ${
                              isActive
                                ? 'w-3.5 h-3.5 rounded-full bg-[#5b5fe0] shadow-[0_0_14px_#5b5fe0]'
                                : 'w-2 h-2 rounded-full border border-white/40 bg-[#060a18] group-hover:border-white'
                            }`}
                          />
                        </div>

                        {/* Milestone Year Header */}
                        <div className="text-xs font-mono tracking-widest uppercase mb-1.5">
                          <span className={isActive ? 'text-blue-400 font-semibold' : 'text-slate-400'}>
                            {item.year}
                          </span>
                        </div>

                        {/* Role Title */}
                        <h3
                          className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 transition-colors ${
                            isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`}
                        >
                          {item.role}
                        </h3>

                        {/* Metadata Line: Company · Location · Engagement */}
                        <div className="text-xs sm:text-sm font-mono text-slate-400 flex flex-wrap items-center gap-1.5">
                          <span className="text-slate-300">{item.company}</span>
                          <span className="text-white/20">·</span>
                          <span>{item.location}</span>
                          <span className="text-white/20">·</span>
                          <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                            {item.companyType}
                          </span>
                          {item.link && isActive && (
                            <>
                              <span className="text-white/20">·</span>
                              <Link
                                href={item.link}
                                className="inline-flex items-center gap-0.5 text-xs font-mono text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors ml-1"
                              >
                                <span>Case Study</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </V2IslandPanel>
  );
}
