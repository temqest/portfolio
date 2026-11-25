'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Building2,
  Landmark,
  Award,
  Sparkles,
  Camera,
  Medal,
} from 'lucide-react';

interface Achievement {
  id: string;
  num: string;
  year: string;
  honor: string;
  honorColor: string;
  title: string;
  organization: string;
  description: string;
  project: string;
  projectLink?: string;
  primaryImage: string;
  fallbackSvg: string;
  imageHint: string;
  impactQuote: string;
  quoteAuthor: string;
  icon: React.ElementType;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'sparklab',
    num: '01',
    year: '2025',
    honor: '1st Place Champion',
    honorColor: 'text-amber-600',
    title: 'SparkLAB Hackathon 2025',
    organization: 'SparkLAB Innovation & Regional Startup Hackathon',
    description:
      'Awarded first place among competing regional startup teams for UNITE—pitching and demonstrating real-time blood unit inventory allocation and emergency donor dispatch under live judging.',
    project: 'UNITE',
    projectLink: '/detail/1',
    primaryImage: '/assets/projects/hackaton-1.jpg',
    fallbackSvg: '/images/achievements/sparklab.svg',
    imageHint: 'public/assets/projects/hackaton#1.jpg',
    impactQuote:
      'Recognized for solving critical blood bank stockouts and reducing dispatch latency across rural and provincial hospitals.',
    quoteAuthor: 'SparkLAB 2025 Grand Jury',
    icon: Trophy,
  },
  {
    id: 'dict-psc',
    num: '02',
    year: '2026',
    honor: '3rd Runner Up',
    honorColor: 'text-teal-600',
    title: 'DICT Philippine Startup Challenge',
    organization: 'Department of Information and Communications Technology (DICT Region V)',
    description:
      'Awarded 3rd Runner Up at the Regional Philippine Startup Challenge for UNITE—recognized by DICT evaluators and panel judges for innovative digital healthcare logistics and public health resilience.',
    project: 'UNITE',
    projectLink: '/detail/1',
    primaryImage: '/assets/projects/startupchallengeDICT.jpg',
    fallbackSvg: '/images/achievements/dict.svg',
    imageHint: 'public/assets/projects/startupchallengeDICT.jpg',
    impactQuote:
      'Commended by DICT regional leadership for tackling vital emergency healthcare logistics through cloud and mobile systems.',
    quoteAuthor: 'DICT Philippine Startup Challenge Regional Panel',
    icon: Medal,
  },
  {
    id: 'bmc',
    num: '03',
    year: '2025 – 2026',
    honor: 'Institutional Partnership',
    honorColor: 'text-emerald-600',
    title: 'Bicol Medical Center (BMC) Collaboration',
    organization: 'Largest Blood Bank Provider in Camarines Sur & Camarines Norte',
    description:
      'Actively collaborating with regional transfusion medicine leaders to validate UNITE’s live blood component tracking, donor attribution pipelines, and mobile blood donation drives.',
    project: 'UNITE',
    projectLink: '/detail/1',
    primaryImage: '/assets/projects/bmc.png',
    fallbackSvg: '/images/achievements/bmc.svg',
    imageHint: 'public/assets/projects/bmc.png',
    impactQuote:
      'Clinical workflow integration directly with transfusion staff, guaranteeing data models meet actual regional hospital requirements.',
    quoteAuthor: 'Transfusion Medicine Department · BMC',
    icon: Building2,
  },
  {
    id: 'magis-tbi',
    num: '04',
    year: '2025 – 2026',
    honor: 'Incubation Graduate',
    honorColor: 'text-blue-600',
    title: 'ADNU MAGIS TBI Incubation',
    organization: 'Ateneo de Naga University — Technology Business Incubator',
    description:
      'Completed comprehensive startup venture acceleration, customer discovery, legal governance, and technical architecture scaling under university mentors.',
    project: 'UNITE',
    projectLink: '/detail/1',
    primaryImage: '/assets/projects/magisTBI.jpg',
    fallbackSvg: '/images/achievements/magis.svg',
    imageHint: 'public/assets/projects/magisTBI.jpg',
    impactQuote:
      'Refined business model viability and statutory compliance frameworks under expert university incubation leadership.',
    quoteAuthor: 'ADNU MAGIS TBI Directorate',
    icon: Landmark,
  },
  {
    id: 'ceeli-unc',
    num: '05',
    year: '2026',
    honor: 'Top 8 Finalist',
    honorColor: 'text-purple-600',
    title: 'CEELI UNC FLIP Startup Competition',
    organization: 'Center for Entrepreneurship & Innovation (UNC)',
    description:
      'Recognized as one of the top 8 high-potential startup ventures in the university-wide innovation program for healthtech impact in the Bicol region.',
    project: 'UNITE',
    projectLink: '/detail/1',
    primaryImage: '/assets/projects/flip.jpg',
    fallbackSvg: '/images/achievements/ceeli.svg',
    imageHint: 'public/assets/projects/flip.jpg',
    impactQuote:
      'Selected from across regional collegiate and early-stage startup ventures for demonstrable social health impact.',
    quoteAuthor: 'UNC Innovation Committee',
    icon: Award,
  },
  {
    id: 'idea2startup',
    num: '06',
    year: '2026',
    honor: 'Semi-Finalist',
    honorColor: 'text-indigo-600',
    title: 'Idea2Startup Naga City',
    organization: 'City Government of Naga & Startup Ecosystem Partners',
    description:
      'Advanced to the semi-final rounds in Naga City’s premier startup development initiative supporting high-impact technology ventures.',
    project: 'UNITE',
    projectLink: '/detail/1',
    primaryImage: '/assets/projects/idea2Startup.jpg',
    fallbackSvg: '/images/achievements/idea2startup.svg',
    imageHint: 'public/assets/projects/idea2Startup.jpg',
    impactQuote:
      'Backed by municipal innovation programs to scale municipal blood distribution and digital health connectivity.',
    quoteAuthor: 'Naga City Startup Ecosystem Partners',
    icon: Sparkles,
  },
];

export function V2AchievementsSection() {
  const [hovered, setHovered] = useState<Achievement | null>(null);
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="py-12 md:py-24 px-5 sm:px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a] relative">
      <div id="milestones" className="relative -top-24" />

      {/* ============================================================== */}
      {/* SECTION HEADER (Clean Editorial Light Theme)                   */}
      {/* ============================================================== */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 md:mb-4">
        <span>(05) — ACHIEVEMENTS &amp; MILESTONES</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-4 mb-8 md:mb-14 border-b border-black/10 pb-6 md:pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a] leading-tight">
            Validated by <em className="font-serif-italic text-blue-600 font-normal">institutions</em> and competition.
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light mt-2 max-w-2xl leading-relaxed">
            Real startup traction, clinical partnerships, and hackathon championships backing UNITE.{' '}
            <span className="hidden md:inline">Hover to preview proof; click to view details.</span>
            <span className="md:hidden">Swipe cards and tap to inspect verified proof.</span>
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500 uppercase shrink-0 flex items-center gap-2">
          <span>
            {ACHIEVEMENTS.length} Verified Milestones
            <span className="hidden md:inline"> · hover to preview</span>
            <span className="sm:hidden"> · swipe →</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE (< 640px): HORIZONTAL SNAP-SCROLL PROOF CARDS           */}
      {/* ============================================================== */}
      <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 no-scrollbar -mx-5 px-6 pb-2">
        {ACHIEVEMENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="snap-start shrink-0 w-[80vw] text-left rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm active:scale-[0.99] transition-transform cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/9] w-full bg-slate-100 border-b border-black/10 overflow-hidden">
              <img
                src={item.primaryImage}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = item.fallbackSvg;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-mono border border-black/10">
                <span className={`${item.honorColor} font-semibold`}>{item.honor}</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-full bg-black/75 text-[10px] font-mono text-white">
                {item.year}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between gap-2">
              <div>
                <div className="text-[11px] font-mono text-slate-400 mb-0.5">{item.num}</div>
                <div className="text-base font-semibold text-[#0a122a] leading-snug line-clamp-2">
                  {item.title}
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1 line-clamp-1">
                  {item.organization}
                </div>
              </div>
              <span className="inline-flex items-center min-h-[40px] text-xs font-mono text-blue-600 font-medium">
                Inspect proof ↗
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET (sm+): EDITORIAL TABLE ROWS                   */}
      {/* ============================================================== */}
      <div className="hidden sm:block divide-y divide-black/10 border-t border-b border-black/10">
        {ACHIEVEMENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full py-5 sm:py-8 px-1 sm:px-2 text-left flex items-center justify-between gap-3 sm:grid sm:grid-cols-12 sm:gap-4 group transition-colors duration-200 hover:bg-slate-50 active:bg-slate-100 relative cursor-pointer"
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(item)}
          >
            {/* Column 1: Number (Desktop) */}
            <span className="hidden sm:block sm:col-span-1 font-mono text-slate-400 text-sm">
              {item.num}
            </span>

            {/* Column 2: Title & Editorial Subtitle */}
            <div className="flex-1 sm:col-span-8 min-w-0 pr-2 sm:pr-4">
              <div className="flex items-center gap-2 mb-1 sm:hidden font-mono text-[11px] text-slate-400">
                <span>{item.num}</span>
                <span>·</span>
                <span>{item.year}</span>
              </div>
              <div className="text-lg sm:text-2xl md:text-3xl font-normal tracking-tight text-[#0a122a] group-hover:text-blue-600 transition-colors sm:truncate">
                {item.title}
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-2 gap-y-0.5 mt-1.5 text-xs font-mono">
                <span className={`${item.honorColor} font-medium shrink-0`}>
                  {item.honor}
                </span>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <span className="text-slate-500 sm:truncate">
                  {item.organization}
                </span>
              </div>
            </div>

            {/* Column 3: Year */}
            <div className="hidden sm:block sm:col-span-2 text-right font-mono text-xs text-slate-400">
              {item.year}
            </div>

            {/* Column 4: Arrow Action Button (>= 44x44px) */}
            <span className="shrink-0 sm:col-span-1 text-right flex justify-end">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/10 group-hover:bg-[#0a122a] group-hover:text-white md:group-hover:rotate-45 transition-all text-xs text-[#0a122a]">
                ↗
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* FLOATING HOVER PREVIEW CARD (Light Editorial Theme)            */}
      {/* ============================================================== */}
      {hovered && (
        <div
          className="fixed pointer-events-none z-50 w-96 md:w-[460px] lg:w-[500px] rounded-3xl overflow-hidden shadow-2xl border border-black/15 bg-white text-[#0a122a] transition-opacity duration-300 hidden md:block"
          style={{ top: '20%', right: '8%' }}
        >
          <div className="w-full aspect-[16/10] bg-slate-100 relative overflow-hidden border-b border-black/10">
            <img
              src={hovered.primaryImage}
              alt={hovered.title}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = hovered.fallbackSvg;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono border border-black/10 shadow-sm">
              <span className={`${hovered.honorColor} font-medium`}>{hovered.honor}</span>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono border border-black/10 shadow-sm">
              {hovered.year}
            </div>
          </div>
          <div className="p-5 md:p-6 bg-white">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-widest block mb-1.5">
              {hovered.organization}
            </span>
            <h4 className="text-lg md:text-xl font-semibold text-[#0a122a] mb-2 leading-tight">
              {hovered.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed line-clamp-2">
              {hovered.impactQuote}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL (Scrollable Bottom Sheet on Mobile)             */}
      {/* ============================================================== */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="max-w-2xl w-full max-h-[90dvh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-5 sm:p-8 relative border border-white/20 text-[#0a122a]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className={`${selected.honorColor} font-semibold`}>
                    {selected.honor}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{selected.year}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0a122a]">{selected.title}</h3>
                <span className="text-xs font-mono text-blue-600 uppercase">{selected.organization}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 transition-colors cursor-pointer shrink-0 inline-flex items-center justify-center"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Image Asset */}
            <div className="w-full h-64 sm:h-80 bg-slate-100 rounded-2xl overflow-hidden relative border border-black/10 mb-5">
              <img
                src={selected.primaryImage}
                alt={selected.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = selected.fallbackSvg;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-white/90 flex items-center gap-1.5 shadow-sm">
                <Camera className="w-3 h-3 text-emerald-400" />
                <span>Verified Milestone Photo</span>
              </div>
            </div>

            {/* Modal Description & Impact */}
            <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
              {selected.description}
            </p>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-900 leading-relaxed mb-5">
              <strong className="font-semibold block mb-1 text-blue-800">Impact &amp; Verification:</strong>
              &ldquo;{selected.impactQuote}&rdquo;
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-black/10 text-xs font-mono">
              <span className="text-slate-500">
                Platform: <strong className="text-[#0a122a]">{selected.project}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
