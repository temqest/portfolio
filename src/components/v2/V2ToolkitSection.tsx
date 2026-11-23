'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KineticGridCanvas } from '@/components/canvas/KineticGridCanvas';

interface DisciplineTab {
  id: string;
  num: string;
  shortName: string;
  title: string;
  subtitle: string;
  description: string;
  proof: string;
}

const DISCIPLINES: DisciplineTab[] = [
  {
    id: 'offline-first',
    num: '01',
    shortName: 'Offline-First',
    title: 'Resilience',
    subtitle: 'From zero-connectivity dead zones to instant local commit.',
    description:
      'Local SQLite and in-memory outbox mutation engines that commit clinical records in under 4ms and sync silently when cellular signal returns.',
    proof: 'Proven in ap-silang (Municipal Maternal EMR)',
  },
  {
    id: 'relational-integrity',
    num: '02',
    shortName: 'Integrity',
    title: 'Security',
    subtitle: 'Statutory clinical privacy and zero dropped records.',
    description:
      'Strict relational schemas with database-level Row-Level Security, multi-tenant clinic isolation, and immutable legal audit trails.',
    proof: 'Compliant with RA 10173 & DOH 28-Year Record Mandate',
  },
  {
    id: 'real-time-logistics',
    num: '03',
    shortName: 'Logistics',
    title: 'Real-Time',
    subtitle: 'When emergency surgery at 2 a.m. cannot wait for phone trees.',
    description:
      'Live WebSocket pipelines and automated SMS triggers that reserve hospital blood inventory atomically and mobilize verified donors in seconds.',
    proof: 'Validated in collaboration with Bicol Medical Center (BMC)',
  },
  {
    id: 'architecture',
    num: '04',
    shortName: 'Architecture',
    title: 'Systems',
    subtitle: 'Zero-fault domain boundaries and resilient micro-engines.',
    description:
      'Idempotent mutation handlers, optimistic state reconciliation, and decoupled backend services that endure network failures without UI freezes.',
    proof: 'Production Next.js 16 & TypeScript Primitives',
  },
  {
    id: 'performance',
    num: '05',
    shortName: 'Performance',
    title: 'Velocity',
    subtitle: 'Sub-100ms response and streamlined memory footprints.',
    description:
      'Zero-bundle bloat, memory-efficient data structures, and edge-cached queries that eliminate loading spinners forever.',
    proof: 'Turbopack · Sub-4ms Local Commits',
  },
  {
    id: 'design',
    num: '06',
    shortName: 'Design',
    title: 'Design',
    subtitle: 'From the first mock-up to the last API call.',
    description:
      'Figma layouts and custom design systems with spring physics, disciplined typography, and micro-interactions that already know how they will be built.',
    proof: 'Tactile Systems Design System',
  },
];

export function V2ToolkitSection() {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const outerTrackRef = useRef<HTMLDivElement | null>(null);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoSnappingRef = useRef<boolean>(false);

  const activeTab = DISCIPLINES[activeTabIdx];

  // Continuous Native Scroll with Sequential Step-Gating and Auto-Snap Centering
  const handleScroll = useCallback(() => {
    if (!outerTrackRef.current) return;
    const rect = outerTrackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;

    if (totalDist <= 0) return;

    // Track scroll offset within this section
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDist));
    setScrollProgress(progress);

    // Map continuous scroll progress to target discipline index (0 to 5)
    const numTabs = DISCIPLINES.length;
    const targetIdx = Math.min(numTabs - 1, Math.max(0, Math.floor(progress * numTabs)));

    setActiveTabIdx((current) => (current !== targetIdx ? targetIdx : current));

    // Debounced Snap-to-Step:
    // When the user pauses scrolling, smoothly center on the active step so human scroll speed
    // (weak or strong) never leaves the user stranded at 25% or 75%
    if (!isAutoSnappingRef.current && progress > 0.02 && progress < 0.98) {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        if (!outerTrackRef.current) return;
        const currentRect = outerTrackRef.current.getBoundingClientRect();
        const currentTotalDist = currentRect.height - window.innerHeight;
        const currentScrollY = window.scrollY || window.pageYOffset;
        const containerTop = currentScrollY + currentRect.top;

        // Exact center of the active tab segment
        const tabCenterProgress = (targetIdx + 0.5) / numTabs;
        const targetScrollY = containerTop + tabCenterProgress * currentTotalDist;

        if (Math.abs(currentScrollY - targetScrollY) > 25) {
          isAutoSnappingRef.current = true;
          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isAutoSnappingRef.current = false;
          }, 450);
        }
      }, 220);
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

  // Click on a timeline tab smoothly scrolls the page to that tab's segment
  const handleTabClick = (targetIdx: number) => {
    setActiveTabIdx(targetIdx);
    if (!outerTrackRef.current) return;

    const rect = outerTrackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;
    const currentScrollY = window.scrollY || window.pageYOffset;
    const containerTop = currentScrollY + rect.top;

    // Position at the exact center of that tab's scroll segment
    const targetProgress = (targetIdx + 0.5) / DISCIPLINES.length;
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
      const next = (activeTabIdx + 1) % DISCIPLINES.length;
      handleTabClick(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prev = (activeTabIdx - 1 + DISCIPLINES.length) % DISCIPLINES.length;
      handleTabClick(prev);
    }
  };

  return (
    // Outer scroll track: 420vh creates generous scroll travel distance for 6 disciplines
    <section
      id="skills"
      ref={outerTrackRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full outline-none select-none bg-white"
      style={{ height: '420vh' }}
    >
      <div id="stack" className="absolute top-0 pointer-events-none" />
      {/* Pinned Sticky Viewport: Remains locked to the screen while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-white text-[#0a122a] px-6 md:px-12 lg:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto w-full py-6 sm:py-8 space-y-8 sm:space-y-12">
          {/* Top Header Eyebrow Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono tracking-widest uppercase text-black/50 border-b border-black/10 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span>(03) SKILLS &amp; DISCIPLINES</span>
              <span className="text-black/25">/</span>
              <span className="text-blue-600 font-medium">ENGINEERING BLUEPRINTS</span>
            </div>
            <div className="flex items-center gap-3 text-black/40">
              <span className="hidden sm:inline">Scroll down to explore</span>
              <span className="text-blue-600 font-bold animate-pulse">↓</span>
              <span className="text-slate-500 font-medium">0{activeTabIdx + 1} / 06</span>
            </div>
          </div>

          {/* Master Two-Column Grid: Typographic Narrative + Kinetic Particle Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column (45%): Pure, Disciplined Typography */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              {/* Lead Kicker Subtitle */}
              <div className="text-sm sm:text-base font-mono text-black/60 tracking-tight min-h-[1.5rem] transition-opacity duration-300">
                {activeTab.subtitle}
              </div>

              {/* Massive Display Title */}
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#0a122a] tracking-tight leading-[0.96] min-h-[4rem] sm:min-h-[5.5rem] lg:min-h-[6.5rem] flex items-center transition-all duration-300">
                {activeTab.title}
              </h2>

              {/* 2-Line Concise Thesis */}
              <p className="text-base sm:text-lg text-black/75 font-normal leading-relaxed max-w-md min-h-[4.5rem] transition-opacity duration-300">
                {activeTab.description}
              </p>

              {/* Proven Context Badge */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-black/50">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>{activeTab.proof}</span>
              </div>
            </div>

            {/* Right Column (55%): The Kinetic Stippled Particle Grid Canvas */}
            <div className="lg:col-span-7 flex justify-center items-center">
              {/* Transparent, borderless container floating directly on section background */}
              <div className="w-full relative flex justify-center items-center">
                <KineticGridCanvas
                  activeTab={activeTabIdx}
                  accentColor="#5b5fe0"
                  className="w-full"
                />

                {/* Interactive Cue Hint */}
                <div className="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-widest text-black/35 pointer-events-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/60" />
                  <span>Interactive Field · Scroll to morph</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Horizontal Timeline Navigation Rail */}
          <div className="pt-6 border-t border-black/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {DISCIPLINES.map((tab, idx) => {
                const isActive = idx === activeTabIdx;
                const isPast = idx < activeTabIdx;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(idx)}
                    className="pt-3 text-left transition-all duration-300 cursor-pointer group relative block"
                  >
                    {/* Underlying Track Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/15" />

                    {/* Active Fill Line */}
                    <div
                      className="absolute top-0 left-0 h-[2px] transition-all duration-300 ease-out"
                      style={{
                        width: isPast || isActive ? '100%' : '0%',
                        backgroundColor: isActive || isPast ? '#0a122a' : 'transparent',
                      }}
                    />

                    <div className="text-[11px] font-mono tracking-widest mb-1 flex items-center justify-between">
                      <span className={isActive ? 'text-[#0a122a] font-bold' : 'text-black/40'}>
                        {tab.num}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      )}
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-medium tracking-tight truncate ${
                        isActive
                          ? 'text-[#0a122a] font-semibold'
                          : 'text-black/45 group-hover:text-black/80'
                      }`}
                    >
                      {tab.shortName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Metabar Navigation */}
            <div className="mt-6 flex items-center justify-between text-xs font-mono text-black/45">
              <a
                href="#work"
                className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Skip scrollytelling to flagship work</span>
                <span>↘</span>
              </a>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-black/50">
                  Disciplines {activeTabIdx + 1} of {DISCIPLINES.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
