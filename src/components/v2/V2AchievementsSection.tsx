'use client';

import React, { useState } from 'react';
import { Trophy, Building2, Landmark, Award, Sparkles, X, Maximize2, Camera } from 'lucide-react';
import { V2IslandPanel } from './V2IslandPanel';

interface Achievement {
  id: string;
  year: string;
  badge: string;
  badgeColor: string;
  title: string;
  organization: string;
  description: string;
  project: string;
  primaryImage: string;
  fallbackSvg: string;
  imageHint: string;
  impactQuote: string;
  icon: React.ElementType;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'sparklab',
    year: '2025',
    badge: '1ST PLACE CHAMPION',
    badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-400/40',
    title: 'SparkLAB Hackathon 2025',
    organization: 'SparkLAB Innovation & Startup Hackathon',
    description:
      'Awarded first place among competing regional startup teams for UNITE—pitching and demonstrating real-time blood unit inventory allocation and emergency donor dispatch under live judging.',
    project: 'UNITE',
    primaryImage: '/images/achievements/sparklab.jpg',
    fallbackSvg: '/images/achievements/sparklab.svg',
    imageHint: 'public/images/achievements/sparklab.jpg',
    impactQuote: 'Recognized for solving critical blood bank stockouts and reducing dispatch latency across rural and provincial hospitals.',
    icon: Trophy,
  },
  {
    id: 'bmc',
    year: '2025 – 2026',
    badge: 'INSTITUTIONAL PARTNERSHIP',
    badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40',
    title: 'Bicol Medical Center (BMC) Collaboration',
    organization: 'Largest Blood Bank Provider in Camarines Sur & Camarines Norte',
    description:
      'Actively collaborating with regional transfusion medicine leaders to validate UNITE’s live blood component tracking, donor attribution pipelines, and mobile blood donation drives.',
    project: 'UNITE',
    primaryImage: '/images/achievements/bmc.jpg',
    fallbackSvg: '/images/achievements/bmc.svg',
    imageHint: 'public/images/achievements/bmc.jpg',
    impactQuote: 'Clinical workflow integration directly with transfusion staff, guaranteeing data models meet actual regional hospital requirements.',
    icon: Building2,
  },
  {
    id: 'magis-tbi',
    year: '2025',
    badge: 'INCUBATION GRADUATE',
    badgeColor: 'text-blue-300 bg-blue-500/20 border-blue-400/40',
    title: 'ADNU MAGIS TBI Incubation',
    organization: 'Ateneo de Naga University — Technology Business Incubator',
    description:
      'Completed comprehensive startup venture acceleration, customer discovery, legal governance, and technical architecture scaling under university mentors.',
    project: 'UNITE',
    primaryImage: '/images/achievements/magis.jpg',
    fallbackSvg: '/images/achievements/magis.svg',
    imageHint: 'public/images/achievements/magis.jpg',
    impactQuote: 'Refined business model viability and statutory compliance frameworks under expert university incubation leadership.',
    icon: Landmark,
  },
  {
    id: 'ceeli-unc',
    year: '2025',
    badge: 'TOP 8 FINALIST',
    badgeColor: 'text-purple-300 bg-purple-500/20 border-purple-400/40',
    title: 'CEELI UNC FLIP Startup Competition',
    organization: 'Center for Entrepreneurship & Innovation (UNC)',
    description:
      'Recognized as one of the top 8 high-potential startup ventures in the university-wide innovation program for healthtech impact in the Bicol region.',
    project: 'UNITE',
    primaryImage: '/images/achievements/ceeli.jpg',
    fallbackSvg: '/images/achievements/ceeli.svg',
    imageHint: 'public/images/achievements/ceeli.jpg',
    impactQuote: 'Selected from across regional collegiate and early-stage startup ventures for demonstrable social health impact.',
    icon: Award,
  },
  {
    id: 'idea2startup',
    year: '2026',
    badge: 'SEMI-FINALIST',
    badgeColor: 'text-indigo-300 bg-indigo-500/20 border-indigo-400/40',
    title: 'Idea2Startup Naga City',
    organization: 'City Government of Naga & Startup Ecosystem Partners',
    description:
      'Advanced to the semi-final rounds in Naga City’s premier startup development initiative supporting high-impact technology ventures.',
    project: 'UNITE',
    primaryImage: '/images/achievements/idea2startup.jpg',
    fallbackSvg: '/images/achievements/idea2startup.svg',
    imageHint: 'public/images/achievements/idea2startup.jpg',
    impactQuote: 'Backed by municipal innovation programs to scale municipal blood distribution and digital health connectivity.',
    icon: Sparkles,
  },
];

/**
 * Resilient Image renderer:
 * Tries loading user's uploaded JPEG/PNG first; if not found, gracefully falls back to branded SVG placeholder.
 */
function AchievementCardImage({
  item,
  className = '',
}: {
  item: Achievement;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState<string>(item.primaryImage);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#060a18] ${className}`}>
      <img
        src={hasError ? item.fallbackSvg : imgSrc}
        alt={item.title}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc(item.fallbackSvg);
          }
        }}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Photo replacement hint tag */}
      <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/70 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Camera className="w-3 h-3 text-blue-400" />
        <span>Drop photo: {item.imageHint}</span>
      </div>
    </div>
  );
}

export function V2AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const featured = ACHIEVEMENTS.slice(0, 2);
  const secondary = ACHIEVEMENTS.slice(2);

  return (
    <V2IslandPanel id="achievements" className="my-8">
      {/* Section Eyebrow & Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">
        <span>(03) — ACHIEVEMENTS &amp; MILESTONES</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Validated by <em className="font-serif-italic text-blue-400 font-normal">institutions</em> and competition.
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light mt-2 max-w-2xl">
            Real startup traction, clinical partnerships, and hackathon championships backing my engineering. Click any card to inspect the evidence.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 uppercase shrink-0 flex items-center gap-2">
          <span>5 Verified Milestones</span>
        </div>
      </div>

      {/* TIER 1: Featured Flagship Milestones (SparkLAB Champion & BMC Collaboration) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {featured.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAchievement(item)}
              className="bg-white/[0.04] rounded-3xl border border-white/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-white/25 hover:bg-white/[0.07] transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container with 16:10 aspect */}
                <div className="aspect-[16/10] w-full border-b border-white/10 relative">
                  <AchievementCardImage item={item} className="w-full h-full" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider border font-medium bg-black/80 backdrop-blur-md shadow-sm ${item.badgeColor}`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.badge}</span>
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-full text-xs font-mono border border-white/10">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                    {item.organization}
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 italic">
                    &ldquo;{item.impactQuote}&rdquo;
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 md:px-8 py-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-500">Platform:</span>
                  <strong className="text-white font-semibold">{item.project}</strong>
                </span>
                <span className="text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Inspect evidence <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* TIER 2: Incubation, Finalists & Startup Accelerators (3-Col Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {secondary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAchievement(item)}
              className="bg-white/[0.04] rounded-3xl border border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-white/25 hover:bg-white/[0.07] transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="aspect-[16/10] w-full border-b border-white/10 relative">
                  <AchievementCardImage item={item} className="w-full h-full" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider border font-medium bg-black/80 backdrop-blur-md shadow-sm ${item.badgeColor}`}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      <span>{item.badge}</span>
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white/90 px-2 py-0.5 rounded-full text-[11px] font-mono border border-white/10">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[11px] font-mono text-blue-400 uppercase tracking-wider mb-1 truncate">
                    {item.organization}
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{item.project}</span>
                <span className="text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Evidence Inspection Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="bg-[#060a18] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close Button */}
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors flex items-center justify-center cursor-pointer border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Display */}
            <div className="aspect-[16/10] w-full bg-[#060a18] relative border-b border-white/10">
              <AchievementCardImage item={selectedAchievement} className="w-full h-full" />
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider border font-medium bg-black/80 backdrop-blur-md shadow-sm ${selectedAchievement.badgeColor}`}
                >
                  <span>{selectedAchievement.badge}</span>
                </span>
              </div>
            </div>

            {/* Modal Details */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">
                <span>{selectedAchievement.organization}</span>
                <span className="text-slate-400">{selectedAchievement.year}</span>
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
                {selectedAchievement.title}
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                {selectedAchievement.description}
              </p>

              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 leading-relaxed mb-6">
                <strong className="font-semibold block mb-1 text-blue-300">Impact &amp; Verification:</strong>
                {selectedAchievement.impactQuote}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <div>
                  Replace image asset: <code className="text-blue-400">{selectedAchievement.imageHint}</code>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </V2IslandPanel>
  );
}
