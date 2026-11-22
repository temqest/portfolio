'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CursorGridCanvas } from './CursorGridCanvas';
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react';

interface V2TactileStoryExperienceProps {
  onExit: () => void;
}

interface StoryChapterData {
  id: string;
  num: string;
  tag: string;
  titlePart1: string;
  titleItalic: string;
  titlePart2: string;
  lead: string;
  body: string;
  tags: string[];
  artifactType: 'blueprint' | 'reliability' | 'stack' | 'tactile' | 'launchpad';
}

const TACTILE_CHAPTERS: StoryChapterData[] = [
  {
    id: 'origin',
    num: '01',
    tag: 'THE SPARK · PHILIPPINES',
    titlePart1: 'Learning to engineer for the ',
    titleItalic: 'real world.',
    titlePart2: '',
    lead: 'Tutorials teach you how to write code. Building systems for real people teaches you why code breaks.',
    body: 'Starting out as an IT student in the Philippines, I quickly realized that textbook web apps collapse the moment messy data, network hiccups, or unexpected user inputs enter the picture. I shifted my focus early toward building resilient, structured architectures that stand up to actual business operations.',
    tags: ['REACT 19', 'NEXT.JS 16', 'TYPESCRIPT', 'RELATIONAL SCHEMAS'],
    artifactType: 'blueprint',
  },
  {
    id: 'philosophy',
    num: '02',
    tag: 'PRODUCTION RIGOR',
    titlePart1: 'Most of what I know came from debugging at ',
    titleItalic: '2 a.m.',
    titlePart2: '',
    lead: 'Theoretical clean architecture is only as good as its behavior under stressful peak loads.',
    body: 'When someone taps a button three times rapidly, when a local payment gateway lags, or when a retail shop loses WiFi mid-transaction—that is where true software quality shows. I build defensively: optimistic state updates, idempotent operations, and graceful offline fallbacks so the user never sees a broken screen.',
    tags: ['ZERO-DROP TRANSACTIONS', 'OPTIMISTIC UI', 'FAILSAFE RECOVERY'],
    artifactType: 'reliability',
  },
  {
    id: 'stack',
    num: '03',
    tag: 'THE CORE ENGINE',
    titlePart1: 'Full-stack precision with ',
    titleItalic: 'zero bloat.',
    titlePart2: '',
    lead: 'Selecting deliberate tools that deliver instantaneous load times and predictable maintainability.',
    body: 'My toolkit centers on modern React and Next.js for fluid rendering, TypeScript for strict type guarantees, Node.js for high-efficiency backends, and PostgreSQL for robust relational data. I avoid heavy agency frameworks in favor of clean, performant primitives that load in milliseconds.',
    tags: ['NEXT.JS 16 TURBOPACK', 'NODE.JS', 'POSTGRESQL', 'TAILWIND CSS'],
    artifactType: 'stack',
  },
  {
    id: 'tactile',
    num: '04',
    tag: 'PHYSICAL FEEL IN DIGITAL UI',
    titlePart1: 'Digital software that feels like ',
    titleItalic: 'physical hardware.',
    titlePart2: '',
    lead: 'Software should feel responsive, weighted, and tactile—not flat and indifferent.',
    body: 'I obsess over spring physics, typographic clamp scales, subtle click pulses, and micro-interactions. When an interface gives deliberate feedback to every touch and click, business tools stop feeling like bureaucratic chores and start feeling like finely tuned instruments.',
    tags: ['SPRING PHYSICS', 'MICRO-INTERACTIONS', 'TYPOGRAPHIC SCALES'],
    artifactType: 'tactile',
  },
  {
    id: 'collaborate',
    num: '05',
    tag: 'YOUR TURN',
    titlePart1: "Let's build something that ",
    titleItalic: 'holds up.',
    titlePart2: '',
    lead: 'Ready to replace fragile spreadsheets or clunky templates with an enduring web system?',
    body: 'Whether you need a full-stack business portal, an offline-first retail tool, or a high-conversion digital flagship, I bring clear communication, fixed milestones, and continuous transparency. Reach out with your project details and I will reply within 24 hours.',
    tags: ['24H REPLY PROMISE', 'SMALL BUSINESS SYSTEMS', 'FREELANCE BUILDS'],
    artifactType: 'launchpad',
  },
];

export function V2TactileStoryExperience({ onExit }: V2TactileStoryExperienceProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [interactiveCount, setInteractiveCount] = useState(0);
  const [springActive, setSpringActive] = useState(false);
  const [reliabilityView, setReliabilityView] = useState<'defensive' | 'naive'>('defensive');

  const chapter = TACTILE_CHAPTERS[currentIdx];

  const goNext = () => {
    setCurrentIdx((prev) => Math.min(prev + 1, TACTILE_CHAPTERS.length - 1));
  };

  const goPrev = () => {
    setCurrentIdx((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('patrickkurtv@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0a122a] overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 font-sans flex flex-col justify-between">
      {/* Interactive Cursor Grid Background */}
      <CursorGridCanvas
        cellSize={75}
        color="#0A122A"
        radius={150}
        gridOpacity={0.045}
        fillOpacity={0}
        clickPulse={true}
        pulseSpeed={550}
        holdTime={350}
        fadeDuration={750}
      />

      {/* Atmospheric Cold Sky Aura */}
      <div className="front-aura" aria-hidden="true" />

      {/* Monumental Watermark Numeral in Background */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[32vw] font-bold text-[#0a122a]/[0.03] leading-none transition-all duration-700 font-mono tracking-tighter"
        aria-hidden="true"
      >
        {chapter.num}
      </div>

      {/* Top Monograph Navigation Bar */}
      <header className="relative z-20 w-full border-b border-black/5 bg-white/70 backdrop-blur-md px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="font-mono font-bold text-base tracking-wider text-[#0a122a] hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-none p-0"
            >
              PATRICK
            </button>
            <span className="text-slate-400 font-mono text-xs hidden sm:inline">
              · STORY MONOGRAPH
            </span>
          </div>

          {/* Stepper Timeline Pills */}
          <nav aria-label="Story Chapters" className="flex items-center gap-1 sm:gap-2">
            {TACTILE_CHAPTERS.map((ch, idx) => {
              const isSelected = idx === currentIdx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0a122a] text-white font-semibold shadow-sm'
                      : 'text-slate-500 hover:text-black hover:bg-slate-100'
                  }`}
                >
                  <span>{ch.num}</span>
                  <span className="hidden md:inline text-[11px] uppercase tracking-wider">
                    {ch.id}
                  </span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={onExit}
            className="text-xs font-mono uppercase tracking-wider text-slate-700 hover:text-black px-4 py-1.5 rounded-full border border-black/10 hover:border-black/30 bg-white/80 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Return to site</span>
            <span className="text-[#2e4fc7] font-bold">→</span>
          </button>
        </div>
      </header>

      {/* Main Chapter Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>
                (CHAPTER {chapter.num} OF 05) — {chapter.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#0a122a] leading-[1.08] mb-6">
              {chapter.titlePart1}
              <em className="font-serif-italic not-italic text-[#2e4fc7]">
                {chapter.titleItalic}
              </em>
              {chapter.titlePart2}
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-6 max-w-2xl">
              {chapter.lead}
            </p>

            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-8 max-w-2xl">
              {chapter.body}
            </p>

            {/* Technical Chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {chapter.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full border border-black/10 bg-slate-50 text-[11px] font-mono tracking-wider text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Previous / Next Navigation Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIdx === 0}
                className={`px-5 py-2.5 rounded-full border text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  currentIdx === 0
                    ? 'border-black/5 text-slate-300 cursor-not-allowed'
                    : 'border-black/15 text-slate-700 hover:border-black/40 hover:bg-slate-50'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={currentIdx === TACTILE_CHAPTERS.length - 1 ? onExit : goNext}
                className="px-6 py-2.5 rounded-full bg-[#0a122a] hover:bg-[#2e4fc7] text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>
                  {currentIdx === TACTILE_CHAPTERS.length - 1 ? 'Explore Full Site' : 'Next Chapter'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                {currentIdx + 1} / {TACTILE_CHAPTERS.length}
              </span>
            </div>
          </div>

          {/* Right Column: Tactile Interactive Artifact Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl border border-black/10 p-6 md:p-8 shadow-[0_20px_50px_rgba(10,18,42,0.08)] relative overflow-hidden transition-all duration-500">
              {/* Artifact 1: Architecture Blueprint (Origin) */}
              {chapter.artifactType === 'blueprint' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
                    <span>BLUEPRINT // ARCHITECTURE</span>
                    <span className="text-emerald-600">● COMPILED</span>
                  </div>
                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-black/5">
                      <div className="text-blue-700 font-semibold mb-1">01. Zero-Trust Access</div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        Session validation at edge before database query execution.
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-black/5">
                      <div className="text-blue-700 font-semibold mb-1">02. Optimistic Mutate</div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        UI reflects action in 16ms with queued background reconciliation.
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-black/5">
                      <div className="text-blue-700 font-semibold mb-1">03. Normalized Store</div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        PostgreSQL ACID transactions with strict integrity constraints.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Artifact 2: Reliability Simulator (2 A.M. Philosophy) */}
              {chapter.artifactType === 'reliability' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
                    <span>STRESS LAB // FAULT DEFENSE</span>
                    <span className="text-blue-600 font-semibold">TEST BENCH</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => setReliabilityView('defensive')}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        reliabilityView === 'defensive'
                          ? 'bg-[#0a122a] text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Defensive Pattern
                    </button>
                    <button
                      type="button"
                      onClick={() => setReliabilityView('naive')}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        reliabilityView === 'naive'
                          ? 'bg-[#0a122a] text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Naive Pattern
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto border border-black/10">
                    {reliabilityView === 'defensive' ? (
                      <div>
                        <span className="text-emerald-400">// Handled edge case &amp; retry</span>
                        <br />
                        <span className="text-blue-400">try</span> &#123;
                        <br />
                        &nbsp;&nbsp;<span className="text-blue-300">await</span> executeTx(retryConfig);
                        <br />
                        &#125; <span className="text-blue-400">catch</span> (err) &#123;
                        <br />
                        &nbsp;&nbsp;queueOfflineRecovery(err);
                        <br />
                        &#125;
                      </div>
                    ) : (
                      <div>
                        <span className="text-rose-400">// Uncaught crash at 2 a.m.</span>
                        <br />
                        <span className="text-slate-400">const</span> res = <span className="text-slate-400">await</span> fetch(url);
                        <br />
                        <span className="text-slate-400">const</span> data = <span className="text-slate-400">await</span> res.json();
                        <br />
                        <span className="text-rose-400">// TypeError: data.user is undefined!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Artifact 3: Modern Stack Matrix */}
              {chapter.artifactType === 'stack' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
                    <span>STACK BENCHMARKS</span>
                    <span className="text-emerald-600 font-semibold">100% LIGHTHOUSE</span>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-black/5">
                      <span className="font-semibold text-[#0a122a]">Next.js 16 (App Router)</span>
                      <span className="text-emerald-600 font-bold">&lt; 350ms FCP</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-black/5">
                      <span className="font-semibold text-[#0a122a]">TypeScript 5 Strict</span>
                      <span className="text-blue-600 font-bold">0 Type Errors</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-black/5">
                      <span className="font-semibold text-[#0a122a]">PostgreSQL Relational</span>
                      <span className="text-slate-700 font-bold">Sub-millisecond index</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-black/5">
                      <span className="font-semibold text-[#0a122a]">Tailwind CSS + Spring</span>
                      <span className="text-blue-600 font-bold">60 / 120 FPS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Artifact 4: Interactive Tactile Micro-Interactions */}
              {chapter.artifactType === 'tactile' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
                    <span>PHYSICS TEST RIG</span>
                    <span className="text-blue-600">INTERACTIVE</span>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-xs text-slate-500 font-mono mb-4">
                      Tap to experience kinetic spring response:
                    </p>
                    <button
                      type="button"
                      onMouseDown={() => setSpringActive(true)}
                      onMouseUp={() => setSpringActive(false)}
                      onClick={() => setInteractiveCount((c) => c + 1)}
                      className={`w-full py-5 rounded-2xl bg-[#0a122a] text-white font-mono text-sm tracking-wider uppercase transition-transform duration-150 cursor-pointer shadow-lg shadow-black/10 select-none ${
                        springActive ? 'scale-95 bg-[#2e4fc7]' : 'scale-100 hover:scale-[1.02]'
                      }`}
                    >
                      Physical Spring Feedback ({interactiveCount})
                    </button>
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-6 pt-4 border-t border-black/5">
                      <span>Restitution: 0.82</span>
                      <span>Damping: 24</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Artifact 5: Launchpad & Direct Contact */}
              {chapter.artifactType === 'launchpad' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-black/5">
                    <span>LAUNCHPAD // INQUIRY</span>
                    <span className="text-emerald-600">● AVAILABLE NOW</span>
                  </div>
                  <h4 className="text-xl font-semibold text-[#0a122a] mb-2">Direct Contact</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-light">
                    Skip the agency middlemen. Talk directly to the engineer building your system.
                  </p>
                  <div className="flex items-center justify-between p-2 pl-4 rounded-full border border-black/10 bg-slate-50 mb-6">
                    <span className="text-xs font-mono text-slate-800">patrickkurtv@gmail.com</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-full bg-[#0a122a] text-white text-xs font-mono hover:bg-[#2e4fc7] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={onExit}
                    className="w-full py-3.5 rounded-xl bg-[#ff7a45] hover:bg-[#ff6426] text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    Open Contact Form on Site →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Subtle Status & Keyboard Indicator */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-6 border-t border-black/5 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>Use keyboard arrows [← / →] or Space to navigate · [Esc] to return to site</div>
          <div>© 2026 Patrick · Tactile Systems Craftsman</div>
        </div>
      </footer>
    </div>
  );
}
