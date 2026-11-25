'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Lock,
  Trophy,
  ShieldCheck,
  Building2,
  ExternalLink,
  QrCode,
  Database,
} from 'lucide-react';
import StackIcon from 'tech-stack-icons';
import {
  TypeScriptIcon,
  JavaScriptIcon,
  PythonIcon,
  PostgresIcon,
  SqliteIcon,
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  WebSocketIcon,
  NodeIcon,
  SupabaseIcon,
  DockerIcon,
  GitIcon,
} from '@/components/v2/TechIcons';
import { CaseStudy, getAllCaseStudies } from '@/data/case-studies';
import { CursorGridCanvas } from '@/components/v2/CursorGridCanvas';
import { V2CustomCursor } from '@/components/v2/V2CustomCursor';
import { V2IslandPanel } from '@/components/v2/V2IslandPanel';
import { useLenisScroll } from '@/hooks/useLenisScroll';

interface CaseStudyViewProps {
  study: CaseStudy;
}

function getTechIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('next')) return <NextjsIcon size={22} />;
  if (lower.includes('react native') || lower.includes('react')) return <ReactIcon size={22} />;
  if (lower.includes('typescript')) return <TypeScriptIcon size={22} />;
  if (lower.includes('node') || lower.includes('express')) return <NodeIcon size={22} />;
  if (lower.includes('supabase')) return <SupabaseIcon size={22} />;
  if (lower.includes('postgres')) return <PostgresIcon size={22} />;
  if (lower.includes('docker')) return <DockerIcon size={22} />;
  if (lower.includes('tailwind')) return <TailwindIcon size={22} />;
  if (lower.includes('sqlite') || lower.includes('dexie')) return <SqliteIcon size={22} />;
  if (lower.includes('websocket') || lower.includes('socket')) return <WebSocketIcon size={22} />;
  if (lower.includes('python')) return <PythonIcon size={22} />;
  if (lower.includes('git')) return <GitIcon size={22} />;
  if (lower.includes('qr')) return <QrCode className="w-5 h-5 text-blue-600" />;
  if (lower.includes('registry') || lower.includes('database')) return <Database className="w-5 h-5 text-blue-600" />;
  try {
    return <StackIcon name={lower.replace(/[^a-z0-9]/g, '')} style={{ width: 22, height: 22 }} />;
  } catch {
    return <span className="text-[10px] font-mono font-bold text-slate-700">{name.slice(0, 3)}</span>;
  }
}

export function CaseStudyView({ study }: CaseStudyViewProps) {
  // Initialize Lenis smooth inertia scrolling
  useLenisScroll();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [visibleBuiltCount, setVisibleBuiltCount] = useState<number>(1);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [pastHero, setPastHero] = useState<boolean>(false);
  const [readProgress, setReadProgress] = useState<number>(0);
  const [canScrollCarouselLeft, setCanScrollCarouselLeft] = useState<boolean>(false);
  const [canScrollCarouselRight, setCanScrollCarouselRight] = useState<boolean>(false);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const builtItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const otherStudies = getAllCaseStudies().filter((s) => s.id !== study.id);

  const updateCarouselBounds = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollCarouselLeft(el.scrollLeft > 8);
    setCanScrollCarouselRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateCarouselBounds();
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateCarouselBounds, { passive: true });
      window.addEventListener('resize', updateCarouselBounds);
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateCarouselBounds);
      window.removeEventListener('resize', updateCarouselBounds);
    };
  }, [study.id]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.max(320, el.clientWidth * 0.75);
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Track active steps, hero visibility, reading progress & visible deliverables during scroll
  useEffect(() => {
    const heroEl = document.getElementById('hero');

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - windowHeight;

      setScrolled(scrollY > 32);
      setReadProgress(docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0);

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setPastHero(rect.bottom <= 80);
      } else {
        setPastHero(scrollY > windowHeight * 0.75);
      }

      // Track Approach steps
      stepsRef.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.15) {
          setActiveStep(index);
        }
      });

      // Track What We Built deliverables smoothly
      let reached = 0;
      builtItemsRef.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.72) {
          reached = index + 1;
        }
      });
      setVisibleBuiltCount(Math.max(1, reached));
    };

    let observer: IntersectionObserver | null = null;
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          setPastHero(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '-80px 0px 0px 0px',
          threshold: 0,
        }
      );
      observer.observe(heroEl);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const progressPercent = Math.min(
    100,
    Math.max(16, ((activeStep + 1) / study.approachSteps.length) * 100)
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0a122a] selection:bg-blue-100 selection:text-blue-900 font-sans relative overflow-x-clip">
      {/* Precision Difference-Blend Cursor (Identical to Base Page) */}
      <V2CustomCursor />

      {/* Interactive Cursor Grid Canvas (subtle blue reaction on light canvas) */}
      <CursorGridCanvas
        cellSize={70}
        color="#2563eb"
        radius={140}
        gridOpacity={0.06}
        fillOpacity={0.03}
        clickPulse={true}
        pulseSpeed={600}
        holdTime={400}
        fadeDuration={800}
      />

      {/* Atmospheric Subtle Cold Blue Sky Radial Aura */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.06),transparent_70%)]"
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* 1. SIGNATURE TOPBAR (Editorial Portfolio Header + Progress)    */}
      {/* ============================================================== */}
      <header
        aria-hidden={pastHero}
        className={`topbar transition-all duration-300 ${
          scrolled
            ? 'scrolled bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_8px_30px_rgba(10,18,42,0.06)]'
            : 'bg-[#fafbfc]/70 backdrop-blur-md border-b border-transparent'
        } ${
          pastHero ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
        data-on="light"
      >
        <div className="wrap">
          {/* Left: Brand Mark + Case Study Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link
              href="/#front"
              className="brand text-[#0a122a] hover:opacity-80 transition-opacity shrink-0"
            >
              PATRICK
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-slate-300/90" aria-hidden="true" />
            <div className="hidden sm:flex items-center gap-2 min-w-0">
              <span className="mono text-[11px] tracking-[0.14em] uppercase text-blue-600 font-semibold shrink-0">
                {study.num}
              </span>
              <span className="text-slate-300 text-xs shrink-0">/</span>
              <span className="mono text-[11px] tracking-[0.12em] uppercase text-slate-600 truncate max-w-[180px] lg:max-w-[240px]">
                {study.name}
              </span>
            </div>
          </div>

          {/* Center: Editorial Section Anchors (Desktop) */}
          <nav aria-label="Case study sections" className="hidden lg:flex items-center gap-7">
            {[
              { label: 'Overview', href: '#hero' },
              { label: 'Challenge', href: '#challenge' },
              { label: 'Approach', href: '#approach' },
              { label: 'Deliverables', href: '#built' },
              { label: 'More', href: '#more' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mono text-[11px] tracking-[0.14em] uppercase text-slate-500 hover:text-[#0a122a] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Return to Work & Signature Dark Next Pill */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <Link
              href="/#work"
              className="mono inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-slate-600 hover:text-[#0a122a] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
              <span>Work</span>
            </Link>

            <Link
              href={`/detail/${study.nextStudyId}`}
              className="mono inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-900/15 bg-[#0a122a] hover:bg-blue-600 text-white text-[11px] tracking-[0.12em] uppercase transition-colors shadow-xs group"
              title={`Next: ${study.nextStudyName}`}
            >
              <span className="hidden sm:inline">Next Case</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Reading Progress Hairline */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Main Content Wrap */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-24 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 space-y-20 sm:space-y-28">
        {/* ============================================================== */}
        {/* 2. HERO SECTION (Title, Summary, Tech & Scope)                 */}
        {/* ============================================================== */}
        <section id="hero" className="min-h-[calc(100svh-6rem)] flex flex-col justify-center gap-8 sm:gap-10 py-6">
          <div className="space-y-5 sm:space-y-6">
            {/* Case Study Eyebrow */}
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
              <span className="text-blue-600 font-semibold">{study.num}</span>
              <span className="text-slate-300">·</span>
              <span>{study.category}</span>
            </div>

            {/* Hero Title & Tagline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight text-[#0a122a] leading-[0.96] max-w-5xl">
              {study.name}
              <span className="block text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-slate-600 mt-3 leading-[1.15] tracking-normal max-w-4xl">
                <em className="font-serif-italic not-italic bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800 bg-clip-text text-transparent font-normal">
                  {study.tagline}
                </em>
              </span>
            </h1>

            {/* Lead Summary */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl tracking-tight">
              {study.executiveSummary}
            </p>

            {/* Technology Icons Stack (Icons Only, Tooltip on Hover) */}
            <div className="pt-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-2.5 font-semibold">
                Engineered With
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {study.meta.stack.map((tech) => (
                  <div
                    key={tech}
                    className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-md hover:scale-105 transition-all p-2 cursor-default"
                    title={tech}
                  >
                    {getTechIcon(tech)}
                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrated Institutional Scope Strip */}
          <div id="client" className="border-t border-slate-200/90 pt-6 sm:pt-7">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              <div>
                <dt className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.16em] mb-1">
                  Institution / Partner
                </dt>
                <dd className="text-sm sm:text-base font-semibold text-[#0a122a] leading-snug">
                  {study.clientFacts.name}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.16em] mb-1">
                  Sector &amp; Domain
                </dt>
                <dd className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                  {study.clientFacts.industry}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.16em] mb-1">
                  Jurisdiction
                </dt>
                <dd className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                  {study.clientFacts.location}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.16em] mb-1">
                  Role &amp; Timeline
                </dt>
                <dd className="text-sm sm:text-base font-medium text-[#0a122a] leading-snug">
                  {study.meta.role} · {study.meta.timeline}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. THE CHALLENGE (Clean High-Contrast Problem Cards)           */}
        {/* ============================================================== */}
        <section id="challenge" className="space-y-10">
          <div className="flex items-end justify-between border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a122a]">
                The <span className="font-serif-italic text-blue-600 font-normal">challenge.</span>
              </h2>
              <p className="text-sm text-slate-500 font-light mt-1.5">
                The core operational friction points we set out to eliminate.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
              0{study.challenges.length} Core Problems
            </span>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none m-0 p-0">
            {study.challenges.map((c) => (
              <li
                key={c.no}
                className="relative rounded-2xl sm:rounded-3xl p-7 sm:p-8 bg-white border border-slate-200/90 shadow-xs hover:border-[#0a122a]/25 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-blue-600 pt-1">
                      Problem {c.no}
                    </span>
                    <span className="text-5xl sm:text-6xl font-black tracking-tighter leading-none text-slate-200/85 group-hover:text-blue-200 transition-colors select-none">
                      {c.no}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0a122a] mb-3 tracking-tight leading-snug">
                    {c.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 font-normal leading-relaxed mt-4 pt-4 border-t border-slate-100">
                  {c.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ============================================================== */}
        {/* 5. OUR APPROACH: STICKY SCROLLYTELLING (Colossal Number Style)  */}
        {/* ============================================================== */}
        <section id="approach" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative items-start">
          {/* Sticky Left Column: Stays Glued in Viewport as Right Column Scrolls */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a122a] leading-tight">
              Our approach.
            </h2>

            {/* Colossal Dynamic Number (Matching User Reference) */}
            <div className="text-[100px] sm:text-[140px] md:text-[170px] lg:text-[190px] font-bold font-sans tracking-tighter leading-none text-[#0a122a] select-none py-1 sm:py-2">
              {String(activeStep + 1).padStart(2, '0')}
            </div>

            {/* Minimalist Progress Track Line (Matching Reference) */}
            <div className="w-48 sm:w-60 h-[3px] bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed max-w-xs pt-2">
              Key engineering decisions engineered for clinical reliability, zero data loss, and sub-second regional sync.
            </p>
          </div>

          {/* Right Column: Scrolling White Step Cards */}
          <ol className="lg:col-span-7 space-y-6 list-none m-0 p-0">
            {study.approachSteps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <li
                  key={step.no}
                  ref={(el) => {
                    stepsRef.current[idx] = el;
                  }}
                  className={`rounded-2xl sm:rounded-3xl p-8 sm:p-10 border transition-all duration-500 ${
                    isActive
                      ? 'bg-white border-blue-500 ring-4 ring-blue-500/10 shadow-lg scale-[1.01]'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        isActive ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    >
                      STEP {step.no}
                    </span>
                    {step.tag && (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600 uppercase tracking-widest font-medium">
                        {step.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0a122a] mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ============================================================== */}
        {/* 6. THE WORK: DESKTOP SHOWCASE (Toggle Removed per User Request) */}
        {/* ============================================================== */}
        <section id="the-work" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a122a]">
                The <span className="font-serif-italic text-blue-600 font-normal">work.</span>
              </h2>
              <p className="text-sm text-slate-500 font-light mt-1">
                Explore the verified interface across production viewports.
              </p>
            </div>

            {study.meta.liveUrl && study.meta.liveUrl !== '#' && (
              <a
                href={study.meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono uppercase tracking-wider text-slate-700 transition-all flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
              >
                <span>Live Portal</span>
                <ExternalLink className="w-3 h-3 text-blue-600" />
              </a>
            )}
          </div>

          {/* Clean macOS Device Frame (Desktop Only) */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-300 shadow-xl">
            {/* Window Chrome Header Bar */}
            <div className="px-5 py-3.5 bg-slate-200/80 border-b border-slate-300 flex items-center justify-between">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>

              {/* URL Bar */}
              <div className="px-4 py-1.5 rounded-md bg-white border border-slate-300/80 text-xs font-mono text-slate-600 flex items-center gap-2 max-w-sm w-full justify-center shadow-2xs">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span className="truncate">{study.deviceShowcase.urlDisplay}</span>
              </div>

              <div className="w-12 text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:inline font-semibold">
                  PROD
                </span>
              </div>
            </div>

            {/* Device Screen View (Uncropped Natural Aspect Ratio) */}
            <div className="p-3 sm:p-6 bg-slate-100 flex justify-center">
              <div className="w-full max-w-5xl aspect-[21/10] overflow-hidden rounded-xl border border-slate-300 shadow-lg bg-white">
                <img
                  src={study.deviceShowcase.desktopImage}
                  alt={`${study.name} production interface`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-200/60 border-t border-slate-300 text-center text-xs font-mono text-slate-500">
              Verified production deployment snapshot · Full uncropped viewport
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. PLATFORM INTERFACES / SYSTEM VIEWS                          */}
        {/* ============================================================== */}
        {study.systemViews && study.systemViews.length > 0 && (
          <section id="views" className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a122a]">
                  Platform <span className="font-serif-italic text-blue-600 font-normal">views.</span>
                </h2>
                <p className="text-sm text-slate-500 font-light mt-1">
                  Core operational modules engineered for hospital transfusion technicians, municipal coordinators, and mobile donors.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
                0{study.systemViews.length} Production Views
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {study.systemViews.map((view, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col group"
                >
                  {/* macOS Chrome Header */}
                  <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    </div>

                    <div className="px-3 py-1 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs shadow-2xs">
                      <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{view.urlDisplay}</span>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-semibold px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
                      {view.category}
                    </span>
                  </div>

                  {/* High-Resolution Viewport Frame */}
                  <div className="p-3 sm:p-5 bg-slate-50 flex items-center justify-center">
                    <div className="w-full aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 shadow-xs bg-white relative">
                      <img
                        src={view.image}
                        alt={view.title}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-6 border-t border-slate-100 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="text-lg font-bold text-[#0a122a] group-hover:text-blue-600 transition-colors">
                        {view.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mt-1">
                        {view.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* 8. WHAT WE BUILT: STICKY TITLE & DELIVERABLES CARD             */}
        {/* ============================================================== */}
        <section id="built" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative items-start">
          {/* Sticky Left Column: Title Stays Pinned in View as Reader Scrolls */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-4 will-change-transform">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a122a] leading-tight">
              What we built.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed max-w-sm">
              Concrete architectural components, security layers, and client deliverables shipped to production.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>{visibleBuiltCount} of {study.whatWeBuilt.length} Components Shipped</span>
              </span>
            </div>
          </div>

          {/* Right Column: High-End Deliverables Checklist Card */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-10">
            <ul className="divide-y divide-slate-100 list-none m-0 p-0">
              {study.whatWeBuilt.map((item, idx) => {
                const isReached = idx < visibleBuiltCount;

                return (
                  <li
                    key={idx}
                    ref={(el) => {
                      builtItemsRef.current[idx] = el;
                    }}
                    className={`py-4.5 first:pt-0 last:pb-0 flex items-start gap-4 text-sm sm:text-base leading-relaxed transition-all duration-500 ease-out ${
                      isReached
                        ? 'text-[#0a122a] font-medium translate-x-1'
                        : 'text-slate-400 font-light'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-500 ease-out ${
                        isReached
                          ? 'bg-blue-600 border border-blue-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 border border-slate-200 text-slate-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span className="transition-colors duration-500">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. TESTIMONIAL & COLLABORATOR VALIDATION                        */}
        {/* ============================================================== */}
        <section id="testimonial">
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-100 shadow-sm relative overflow-hidden">
            {/* Giant Watermark Quotation Mark */}
            <span
              className="absolute -top-10 -left-6 text-[180px] font-serif text-blue-600/10 pointer-events-none select-none"
              aria-hidden="true"
            >
              “
            </span>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Quote & Speaker Info */}
              <div className={study.testimonial.image ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6 max-w-4xl'}>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold block">
                  Institutional Partner Endorsement
                </span>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-800 leading-relaxed font-serif-italic">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </blockquote>

                <div className="pt-2 flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-base shadow-2xs">
                    {study.testimonial.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-[#0a122a]">
                      {study.testimonial.author}
                    </p>
                    <p className="text-xs font-mono text-slate-500">
                      {study.testimonial.role} · {study.testimonial.organization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Clinical Collaboration Photo */}
              {study.testimonial.image && (
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 group">
                    <img
                      src={study.testimonial.image}
                      alt="Clinical collaboration validation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {study.testimonial.imageCaption && (
                    <p className="text-xs text-slate-500 font-light text-center mt-2.5 px-2">
                      {study.testimonial.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. MILESTONES & CHAMPIONSHIP AWARDS BENTO                      */}
        {/* ============================================================== */}
        {study.milestones && study.milestones.length > 0 && (
          <section id="milestones" className="space-y-10">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a122a]">
                Championships &amp; <span className="font-serif-italic text-blue-600 font-normal">validation.</span>
              </h2>
              <p className="text-sm text-slate-500 font-light mt-1">
                Authentic photographic proof from live hackathons, incubations, and institutional partnerships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {study.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-blue-300 transition-all shadow-sm hover:shadow-md flex flex-col group"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-mono text-slate-800 flex items-center gap-1.5 border border-slate-200 shadow-xs">
                      <Trophy className="w-3 h-3 text-amber-500" />
                      <span>{m.honor}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-mono text-slate-600 border border-slate-200 shadow-xs">
                      {m.year}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 block mb-1 font-semibold">
                        {m.organization}
                      </span>
                      <h4 className="text-base font-bold text-[#0a122a] mb-2 leading-snug">
                        {m.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 font-light leading-relaxed pt-3 border-t border-slate-100">
                      {m.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* 10. MORE PROJECTS CAROUSEL (Dark Editorial Grid & Grayscale Hover) */}
        {/* ============================================================== */}
      </main>

      <V2IslandPanel id="more" className="my-8 mb-12 relative z-10">
        <div className="space-y-10 sm:space-y-12">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
                MORE CASE STUDIES
              </span>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none">
                <span className="text-white">More </span>
                <span className="font-serif-italic text-blue-400 font-normal">projects.</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className="px-5 py-2.5 rounded-full border border-white/15 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                ← Return to Portfolio
              </Link>

              {(canScrollCarouselLeft || canScrollCarouselRight) && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    disabled={!canScrollCarouselLeft}
                    aria-label="Previous project"
                    className={`w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-all ${
                      canScrollCarouselLeft
                        ? 'bg-white/10 text-white hover:bg-blue-600 hover:border-blue-500 cursor-pointer'
                        : 'bg-white/5 text-white/25 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    disabled={!canScrollCarouselRight}
                    aria-label="Next project"
                    className={`w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-all ${
                      canScrollCarouselRight
                        ? 'bg-white/10 text-white hover:bg-blue-600 hover:border-blue-500 cursor-pointer'
                        : 'bg-white/5 text-white/25 cursor-not-allowed'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Horizontal Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-6 sm:gap-7 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {otherStudies.map((item) => (
              <Link
                key={item.id}
                href={`/detail/${item.routeId}`}
                className="group flex-shrink-0 w-[290px] sm:w-[350px] lg:w-[390px] snap-start flex flex-col"
              >
                {/* Grayscale-to-Color Thumbnail */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0a122a] border border-white/10 group-hover:border-blue-400/50 transition-colors duration-300 shadow-lg">
                  <img
                    src={item.deviceShowcase.desktopImage}
                    alt={item.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                  />
                </div>

                {/* Clean Editorial Metadata Below Thumbnail */}
                <div className="pt-4 space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-blue-400 block truncate">
                    {item.category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between gap-2">
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-400 transition-all shrink-0" />
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed line-clamp-2">
                    {item.executiveSummary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </V2IslandPanel>

      {/* ============================================================== */}
      {/* 11. SIMPLIFIED FLOATING BOTTOM NAVBAR (Matches V2BottomNav)    */}
      {/* ============================================================== */}
      <aside
        aria-label="Floating Case Study Navigation"
        aria-hidden={!pastHero}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw] select-none transition-all duration-300 ease-out ${
          pastHero
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-4 bg-white/88 backdrop-blur-xl border border-black/10 px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_12px_36px_rgba(10,18,42,0.12)] text-[#0a122a]">
          <Link
            href="/#work"
            tabIndex={pastHero ? 0 : -1}
            className="mono inline-flex items-center gap-1 text-[#5b6684] hover:text-[#0a122a] transition-colors text-[10px] sm:text-[11px] tracking-[0.14em] uppercase whitespace-nowrap"
          >
            <ArrowLeft className="w-3 h-3 text-blue-600" />
            <span>Work</span>
          </Link>

          <div className="w-px h-4 bg-black/10 hidden sm:block" aria-hidden="true" />

          <nav aria-label="Bottom Case Study Sections" className="hidden sm:block">
            <ul className="flex items-center gap-3 md:gap-4 list-none m-0 p-0">
              {[
                { id: 'challenge', label: 'Challenge', className: '' },
                { id: 'approach', label: 'Approach', className: '' },
                { id: 'built', label: 'Built', className: 'hidden md:inline-block' },
                { id: 'more', label: 'More', className: '' },
              ].map((item) => (
                <li key={item.id} className={item.className}>
                  <button
                    type="button"
                    tabIndex={pastHero ? 0 : -1}
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="mono text-[#5b6684] hover:text-[#0a122a] transition-colors cursor-pointer bg-transparent border-none p-0 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-px h-4 bg-black/10" aria-hidden="true" />

          <div className="flex items-center gap-1.5">
            <Link
              href={`/detail/${study.nextStudyId}`}
              tabIndex={pastHero ? 0 : -1}
              className="mono inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-900/15 bg-[#0a122a] hover:bg-blue-600 text-white text-[10px] sm:text-[11px] tracking-[0.12em] uppercase transition-colors shadow-xs"
              title={`Next: ${study.nextStudyName}`}
            >
              <span>Next Case</span>
              <ArrowRight className="w-3 h-3 text-slate-300" />
            </Link>

            <button
              type="button"
              tabIndex={pastHero ? 0 : -1}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Back to top"
              aria-label="Back to top"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
