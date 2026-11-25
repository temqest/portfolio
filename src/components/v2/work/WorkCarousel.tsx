'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SecondaryProject {
  id: string;
  category: string;
  location: string;
  title: string;
  tags: string[];
  image: string;
  badge?: string;
  link?: string;
  hidden?: boolean;
}

const SECONDARY_PROJECTS: SecondaryProject[] = [
  {
    id: 'medvault-rls',
    category: 'STATUTORY HEALTH SECURITY',
    location: 'PHILIPPINES',
    title: 'MedVault RLS',
    tags: ['POSTGRESQL', 'ROW-LEVEL SECURITY', 'AUDIT ENGINE'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
    badge: 'LIVE',
    link: '/detail/1',
    hidden: true,
  },
  {
    id: 'bmc-blood-portal',
    category: 'MOBILE COMMUNITY HEALTH',
    location: 'NAGA CITY',
    title: 'BMC Blood Drive Portal',
    tags: ['REACT NATIVE', 'SUPABASE', 'PUSH ALERTS'],
    image: '/assets/projects/unite.png',
    badge: 'LIVE',
    link: '/detail/1',
    hidden: true,
  },
  {
    id: 'naga-rapid-triage',
    category: 'EMERGENCY INTAKE SYSTEMS',
    location: 'CAMARINES SUR',
    title: 'Naga Rapid Triage',
    tags: ['WEBSOCKETS', 'NODE.JS', 'REDIS QUEUE'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop',
    badge: 'PILOT',
    link: '/detail/2',
    hidden: true,
  },
  {
    id: 'ruralrx-sync',
    category: 'OFFLINE PHARMACEUTICAL EMR',
    location: 'RURAL HEALTH UNITS',
    title: 'RuralRx Sync Engine',
    tags: ['DEXIE.JS', 'SQLITE', 'OUTBOX PATTERN'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
    badge: 'LIVE',
    link: '/detail/2',
    hidden: true,
  },
  {
    id: 'sparklab-platform',
    category: 'STARTUP EVALUATION ENGINE',
    location: 'SPARKLAB 2025',
    title: 'SparkLAB Arena',
    tags: ['NEXT.JS 16', 'TYPESCRIPT', 'REALTIME STATS'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop',
    badge: 'CHAMPION',
    link: '/detail/1',
    hidden: true,
  },
];

const VISIBLE_SECONDARY_PROJECTS = SECONDARY_PROJECTS.filter((project) => !project.hidden);

export function WorkCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollBounds();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollBounds, { passive: true });
      window.addEventListener('resize', checkScrollBounds);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 420;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (VISIBLE_SECONDARY_PROJECTS.length === 0) {
    return null;
  }

  return (
    <div className="w-full pt-20 border-t border-black/10">
      {/* Carousel Header with Navigation Arrows */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1">
            SELECTED LABS &amp; CLIENT SYSTEMS
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold text-[#0a122a] tracking-tight">
            More Production Deployments
          </h3>
        </div>

        {/* Circular Arrow Buttons matching Image 3 in Light Theme */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className={`w-11 h-11 rounded-full border border-black/10 bg-white flex items-center justify-center transition-all cursor-pointer shadow-sm ${
              canScrollLeft
                ? 'text-[#0a122a] hover:bg-slate-100 hover:border-black/25 hover:scale-105 active:scale-95'
                : 'text-slate-300 border-black/5 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className={`w-11 h-11 rounded-full border border-black/10 bg-white flex items-center justify-center transition-all cursor-pointer shadow-sm ${
              canScrollRight
                ? 'text-[#0a122a] hover:bg-slate-100 hover:border-black/25 hover:scale-105 active:scale-95'
                : 'text-slate-300 border-black/5 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {VISIBLE_SECONDARY_PROJECTS.map((item) => (
          <Link
            key={item.id}
            href={item.link || `/detail/1`}
            className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] group block snap-start"
          >
            {/* Card Thumbnail matching Image 3 */}
            <div className="relative aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 border border-black/10 group-hover:border-black/25 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Top-Right Badge matching Image 3 */}
              <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono font-medium text-white flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{item.badge || 'LIVE'}</span>
              </div>
            </div>

            {/* Project Details Below Thumbnail matching Image 3 */}
            <div className="pt-4 space-y-2">
              <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase truncate">
                {item.category} · {item.location}
              </div>
              <h4 className="text-xl font-semibold text-[#0a122a] tracking-tight group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{item.title}</span>
                <span className="text-sm opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600">
                  ↗
                </span>
              </h4>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-slate-100 border border-black/5 text-[10px] font-mono text-slate-700 font-medium uppercase tracking-wider group-hover:border-black/15 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
