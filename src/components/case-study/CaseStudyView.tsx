'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Lock,
  Monitor,
  Smartphone,
  Trophy,
  ShieldCheck,
  Building2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CaseStudy } from '@/data/case-studies';
import { CursorGridCanvas } from '@/components/v2/CursorGridCanvas';

interface CaseStudyViewProps {
  study: CaseStudy;
}

export function CaseStudyView({ study }: CaseStudyViewProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Track active step during scroll for the sticky Approach reel
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      stepsRef.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Step becomes active when top enters the upper half of screen
        if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercent = Math.min(
    100,
    Math.max(16, ((activeStep + 1) / study.approachSteps.length) * 100)
  );

  return (
    <div className="min-h-screen bg-[#060a18] text-[#f2f6fd] selection:bg-[#2e4fc7] selection:text-white font-sans relative overflow-x-hidden">
      {/* Interactive Cursor Grid Canvas (lights up squares beneath mouse) */}
      <CursorGridCanvas
        cellSize={70}
        color="#2e4fc7"
        radius={140}
        gridOpacity={0.07}
        fillOpacity={0.03}
        clickPulse={true}
        pulseSpeed={600}
        holdTime={400}
        fadeDuration={800}
      />

      {/* Atmospheric Radial Cold Sky Aura */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(46,79,199,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* 1. SIGNATURE TOPBAR (Matches Patrick's Site Identity)           */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-[#060a18]/85 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <Link
            href="/#front"
            className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors uppercase"
            style={{ fontFamily: "'ougther', 'Inter Tight', system-ui, sans-serif" }}
          >
            PATRICK
          </Link>

          {/* Center/Right Nav Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/#work"
              className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center gap-2 group shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-blue-400" />
              <span>Selected Work</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>{study.num}</span>
              <span className="text-white/20">·</span>
              <span className="text-white font-medium">{study.name}</span>
            </div>

            <Link
              href={`/detail/${study.nextStudyId}`}
              className="px-3.5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center gap-1.5 shadow-md"
              title="Next case study"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Wrap */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-32 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 space-y-24 sm:space-y-36">
        {/* ============================================================== */}
        {/* 2. HERO SECTION & BREADCRUMBS (AW Media Style)                 */}
        {/* ============================================================== */}
        <section id="hero" className="space-y-8 pt-4">
          {/* Breadcrumb Glass Chip */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-mono text-slate-400 shadow-sm"
          >
            <Link href="/#work" className="hover:text-white transition-colors">
              Work
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-blue-400 font-medium">{study.name}</span>
          </nav>

          {/* Colossal Hero Title with Metallic Accent */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[0.95] max-w-5xl">
            {study.name}
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-400 mt-3 tracking-normal">
              <em className="font-serif-italic not-italic bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent font-normal">
                {study.tagline}
              </em>
            </span>
          </h1>

          {/* Deep Narrative Lead Paragraph */}
          <p className="text-lg sm:text-2xl text-slate-300 font-light leading-relaxed max-w-4xl tracking-tight">
            {study.executiveSummary}
          </p>

          {/* Meta Tags Glass Chips with Glowing Green Live Dot */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SYSTEM</span>
            </span>

            {study.meta.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. CLIENT FACTS BAR (Full-Width Glass Bar, Matching AW Media)  */}
        {/* ============================================================== */}
        <section id="client">
          <div className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-xl p-6 sm:p-10 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7)]">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-400 mb-6 font-semibold">
              Client &amp; Institutional Scope
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <dt className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Institution / Partner
                </dt>
                <dd className="text-sm sm:text-base font-medium text-white leading-snug">
                  {study.clientFacts.name}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Sector &amp; Domain
                </dt>
                <dd className="text-sm sm:text-base font-medium text-white leading-snug">
                  {study.clientFacts.industry}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Regional Jurisdiction
                </dt>
                <dd className="text-sm sm:text-base font-medium text-white leading-snug">
                  {study.clientFacts.location}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Platform Verification
                </dt>
                <dd className="text-sm sm:text-base font-medium text-blue-400 leading-snug flex items-center gap-1 group">
                  <span className="text-white group-hover:text-blue-300 transition-colors">
                    {study.clientFacts.liveUrlLabel || 'Verified Deployment'}
                  </span>
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    →
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. THE CHALLENGE (3 Glass Tiles with Perspective & Numbers)     */}
        {/* ============================================================== */}
        <section id="challenge" className="space-y-10">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The <span className="font-serif-italic text-blue-400 font-normal">challenge.</span>
            </h2>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
              (03 Operational Constraints)
            </span>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none m-0 p-0">
            {study.challenges.map((c) => (
              <li
                key={c.no}
                className="rounded-2xl sm:rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.5)] flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-widest block mb-4 group-hover:scale-105 transition-transform inline-block">
                    {c.no}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight leading-snug">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-400 font-light leading-relaxed mt-4 pt-4 border-t border-white/5">
                  {c.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ============================================================== */}
        {/* 5. OUR APPROACH: STICKY SCROLLYTELLING (Matching AW Media)      */}
        {/* ============================================================== */}
        <section id="approach" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column: Title, Dynamic Step Reel & Animated Progress Bar */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Our <span className="font-serif-italic text-blue-400 font-normal">approach.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Every architectural decision was engineered to satisfy clinical safety, zero data loss, and sub-second regional coordination.
            </p>

            {/* Rolling Step Reel */}
            <div className="flex items-center gap-4 pt-2">
              <div className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-2xl font-mono font-bold text-blue-400">
                0{activeStep + 1}
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                of 0{study.approachSteps.length} Key Architecture Steps
              </span>
            </div>

            {/* Animated Step Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Right Column: Scrolling Glass Step Cards */}
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
                      ? 'bg-gradient-to-b from-white/[0.1] to-white/[0.04] border-blue-500/50 shadow-[0_24px_60px_-15px_rgba(46,79,199,0.3)] scale-[1.01]'
                      : 'bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 opacity-70 hover:opacity-95'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        isActive ? 'text-blue-400' : 'text-slate-500'
                      }`}
                    >
                      STEP {step.no}
                    </span>
                    {step.tag && (
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                        {step.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ============================================================== */}
        {/* 6. THE WORK: INTERACTIVE DEVICE SHOWCASE (Matching AW Media)    */}
        {/* ============================================================== */}
        <section id="the-work" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                The <span className="font-serif-italic text-blue-400 font-normal">work.</span>
              </h2>
              <p className="text-sm text-slate-400 font-light mt-1">
                Explore the verified interface across production viewports.
              </p>
            </div>

            {/* Segmented Control: [Desktop] [Mobile] + Live Link */}
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md flex items-center">
                <button
                  type="button"
                  onClick={() => setDeviceMode('desktop')}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    deviceMode === 'desktop'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeviceMode('mobile')}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    deviceMode === 'mobile'
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              {study.meta.liveUrl && study.meta.liveUrl !== '#' && (
                <a
                  href={study.meta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center gap-1.5"
                >
                  <span>Live</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              )}
            </div>
          </div>

          {/* Interactive macOS Device Frame with Natural Screenshot */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-white/15 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)]">
            {/* Window Chrome Header Bar */}
            <div className="px-5 py-3.5 bg-slate-900 border-b border-white/10 flex items-center justify-between">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* URL Bar */}
              <div className="px-4 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2 max-w-sm w-full justify-center">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="truncate">{study.deviceShowcase.urlDisplay}</span>
              </div>

              <div className="w-12 text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
                  PROD
                </span>
              </div>
            </div>

            {/* Device Screen View (Uncropped Natural Aspect Ratio) */}
            <div className="p-3 sm:p-6 bg-slate-950 flex justify-center">
              <div
                className={`transition-all duration-500 overflow-hidden rounded-xl border border-white/10 shadow-2xl ${
                  deviceMode === 'desktop'
                    ? 'w-full max-w-5xl aspect-[21/10]'
                    : 'w-full max-w-sm aspect-[9/16]'
                }`}
              >
                <img
                  src={
                    deviceMode === 'desktop'
                      ? study.deviceShowcase.desktopImage
                      : study.deviceShowcase.mobileImage || study.deviceShowcase.desktopImage
                  }
                  alt={`${study.name} ${deviceMode} interface`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-900/50 border-t border-white/5 text-center text-xs font-mono text-slate-500">
              Verified production deployment snapshot · Full uncropped viewport
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. WHAT WE BUILT: DELIVERABLE CHECKLIST (Matching AW Media)     */}
        {/* ============================================================== */}
        <section id="built" className="space-y-10">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What we <span className="font-serif-italic text-blue-400 font-normal">built.</span>
            </h2>
            <p className="text-sm text-slate-400 font-light mt-1">
              Concrete architectural components, security layers, and client deliverables shipped.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 list-none m-0 p-0">
              {study.whatWeBuilt.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-slate-200 font-light">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. THE NUMBERS: COLOSSAL METRIC STATS (Matching AW Media)       */}
        {/* ============================================================== */}
        <section id="numbers" className="space-y-10">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The <span className="font-serif-italic text-blue-400 font-normal">numbers.</span>
            </h2>
            <p className="text-sm text-slate-400 font-light mt-1">
              Measurable technical latency, statutory compliance, and institutional traction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {study.numbers.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 shadow-lg flex flex-col justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white block mb-2 group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-widest block mb-3">
                    {stat.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed pt-3 border-t border-white/5">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. TESTIMONIAL & COLLABORATOR VALIDATION                        */}
        {/* ============================================================== */}
        <section id="testimonial">
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-blue-950/40 via-white/[0.03] to-white/[0.01] border border-blue-500/20 shadow-2xl relative overflow-hidden">
            {/* Giant Watermark Quotation Mark */}
            <span
              className="absolute -top-10 -left-6 text-[180px] font-serif text-blue-500/10 pointer-events-none select-none"
              aria-hidden="true"
            >
              “
            </span>

            <div className="relative z-10 max-w-4xl space-y-6">
              <blockquote className="text-xl sm:text-3xl font-light text-slate-100 leading-relaxed font-serif-italic">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>

              <div className="pt-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold">
                  {study.testimonial.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {study.testimonial.author}
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    {study.testimonial.role} · {study.testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. MILESTONES & CHAMPIONSHIP AWARDS BENTO                      */}
        {/* ============================================================== */}
        {study.milestones && study.milestones.length > 0 && (
          <section id="milestones" className="space-y-10">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Championships &amp; <span className="font-serif-italic text-blue-400 font-normal">validation.</span>
              </h2>
              <p className="text-sm text-slate-400 font-light mt-1">
                Authentic photographic proof from live hackathons, incubations, and institutional partnerships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {study.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all shadow-lg flex flex-col group"
                >
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1.5 border border-white/10">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      <span>{m.honor}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
                      {m.year}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block mb-1">
                        {m.organization}
                      </span>
                      <h4 className="text-base font-bold text-white mb-2 leading-snug">
                        {m.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed pt-3 border-t border-white/5">
                      {m.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* 11. NEXT STORY BENTO FOOTER (Matching AW Media)                 */}
        {/* ============================================================== */}
        <footer id="more" className="pt-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-950/60 via-slate-900 to-[#060a18] border border-blue-500/30 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                Explore Next Case Study
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {study.nextStudyName}
              </h3>
              <p className="text-sm text-slate-300 font-light max-w-xl leading-relaxed">
                See how distributed edge architecture and clinical outbox sync engines were built for rural health centers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#work"
                className="px-6 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                ← Return to Portfolio
              </Link>

              <Link
                href={`/detail/${study.nextStudyId}`}
                className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-mono uppercase tracking-wider text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
