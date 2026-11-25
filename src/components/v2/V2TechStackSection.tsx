'use client';

import React, { useState } from 'react';
import {
  TypeScriptIcon,
  JavaScriptIcon,
  ReactIcon,
  NextjsIcon,
  TailwindIcon,
  NodeIcon,
  PostgresIcon,
  SqliteIcon,
  PythonIcon,
  DockerIcon,
  GitIcon,
  SupabaseIcon,
  PostmanIcon,
  LinuxIcon,
  WebSocketIcon,
  ClaudeIcon,
  CodexIcon,
  AntigravityIcon,
  N8nIcon,
  PlaywrightIcon,
  JestIcon,
  CypressIcon,
} from './TechIcons';


interface TechLogoItem {
  id: string;
  name: string;
  context: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface TechCategory {
  title: string;
  tag: string;
  items: TechLogoItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Languages & Core',
    tag: 'FOUNDATION',
    items: [
      {
        id: 'ts',
        name: 'TypeScript',
        context: 'Strict typing, domain interfaces & zero-any codebase',
        icon: TypeScriptIcon,
      },
      {
        id: 'js',
        name: 'JavaScript',
        context: 'Modern ESNext standards & async event loops',
        icon: JavaScriptIcon,
      },
      {
        id: 'python',
        name: 'Python',
        context: 'Data pipelines, validation & automation scripts',
        icon: PythonIcon,
      },
      {
        id: 'sql',
        name: 'SQL',
        context: 'Relational schemas, queries & indexing',
        icon: PostgresIcon,
      },
    ],
  },
  {
    title: 'Frontend & UI Architecture',
    tag: 'CLIENT-SIDE',
    items: [
      {
        id: 'nextjs',
        name: 'Next.js 16',
        context: 'App Router, Server Actions & Partial Prerendering',
        icon: NextjsIcon,
      },
      {
        id: 'react',
        name: 'React 19',
        context: 'Component trees, custom hooks & optimistic UI',
        icon: ReactIcon,
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        context: 'Design tokens, tactile animations & responsive UI',
        icon: TailwindIcon,
      },
      {
        id: 'ws',
        name: 'WebSockets',
        context: 'Sub-second real-time hospital alerts & live feeds',
        icon: WebSocketIcon,
      },
    ],
  },
  {
    title: 'Backend, Database & Storage',
    tag: 'SYSTEMS',
    items: [
      {
        id: 'node',
        name: 'Node.js',
        context: 'High-throughput async backend microservices',
        icon: NodeIcon,
      },
      {
        id: 'postgres-db',
        name: 'PostgreSQL',
        context: 'Row-Level Security, multi-tenant schemas & ACID',
        icon: PostgresIcon,
      },
      {
        id: 'sqlite',
        name: 'SQLite',
        context: 'Embedded offline-first mutation outbox (<4ms)',
        icon: SqliteIcon,
      },
      {
        id: 'supabase',
        name: 'Supabase',
        context: 'Postgres auth, real-time listeners & storage',
        icon: SupabaseIcon,
      },
    ],
  },
  {
    title: 'DevOps, Tooling & Workflow',
    tag: 'DEV-WORKFLOW',
    items: [
      {
        id: 'docker',
        name: 'Docker',
        context: 'Reproducible containerization & sandbox dev',
        icon: DockerIcon,
      },
      {
        id: 'git',
        name: 'Git & GitHub',
        context: 'Atomic commits, rebase & team PR code reviews',
        icon: GitIcon,
      },
      {
        id: 'postman',
        name: 'Postman',
        context: 'REST API contracts & mock endpoint testing',
        icon: PostmanIcon,
      },
      {
        id: 'linux',
        name: 'Linux / Bash',
        context: 'CLI automation, shell scripts & server ops',
        icon: LinuxIcon,
      },
    ],
  },
  {
    title: 'QA, Testing & Automation',
    tag: 'VERIFICATION',
    items: [
      {
        id: 'n8n',
        name: 'n8n',
        context: 'Workflow orchestration, webhooks & event automation',
        icon: N8nIcon,
      },
      {
        id: 'playwright',
        name: 'Playwright',
        context: 'Cross-browser E2E testing & automated test suites',
        icon: PlaywrightIcon,
      },
      {
        id: 'jest',
        name: 'Jest',
        context: 'Unit testing, mocking harnesses & assertion suites',
        icon: JestIcon,
      },
      {
        id: 'cypress',
        name: 'Cypress',
        context: 'Component testing, regression checks & browser QA',
        icon: CypressIcon,
      },
    ],
  },
];

// Featured AI & Autonomous Engineering Stack
const AI_TECH_ITEMS: TechLogoItem[] = [
  {
    id: 'claude',
    name: 'Claude',
    context: 'Anthropic · Architecture & RFC Reviews',
    icon: ClaudeIcon,
  },
  {
    id: 'codex',
    name: 'Codex',
    context: 'OpenAI · Scaffolding & Code Synthesis',
    icon: CodexIcon,
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    context: 'Google AGY · Autonomous Multi-Turn Agents',
    icon: AntigravityIcon,
  },
];

export function V2TechStackSection() {
  const [activeItem, setActiveItem] = useState<TechLogoItem | null>(null);

  const baseCount = TECH_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const totalLogos = baseCount + AI_TECH_ITEMS.length;

  return (
    <section
      id="tech-stack"
      className="scroll-mt-28 py-12 md:py-24 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a]"
    >
      {/* Anchor fallbacks for #stack and #process links */}
      <div id="tech" className="relative -top-24" />
      <div id="process" className="relative -top-24" />

      {/* ============================================================== */}
      {/* SECTION HEADER                                                 */}
      {/* ============================================================== */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 md:mb-4">
        <span>(07) — TECHNICAL ARSENAL</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-4 mb-8 md:mb-16 border-b border-black/10 pb-6 md:pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a] leading-tight">
            Tools chosen for <em className="font-serif-italic text-blue-600 font-normal">reliability</em>, not hype.
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light mt-2 max-w-2xl leading-relaxed">
            The production-tested languages, runtimes, and engineering infrastructure I use daily to build resilient, offline-first web applications and zero-fault backends.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{totalLogos} Technologies &amp; AI Stack</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE (< 768px): HORIZONTAL SNAP CAROUSEL + TAP CONTEXT BAR   */}
      {/* ============================================================== */}
      <div className="md:hidden space-y-4 mb-6">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-slate-400">
          <span>6 STACK CATEGORIES</span>
          <span className="text-blue-600 font-semibold">SWIPE →</span>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-5 no-scrollbar -mx-4 px-5 pb-2">
          {TECH_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="snap-start shrink-0 w-[82vw] p-4 rounded-2xl border border-black/10 bg-white shadow-xs flex flex-col justify-between"
            >
              <div className="mb-3 pb-2 border-b border-black/5 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-[#0a122a] truncate">{category.title}</h3>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{category.tag}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {category.items.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = activeItem?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveItem(isSelected ? null : item)}
                      className={`min-h-[82px] p-3 rounded-xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                          : 'border-black/8 bg-slate-50/70'
                      }`}
                    >
                      <IconComponent size={32} />
                      <span className="text-xs font-medium text-slate-800 mt-2">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* AI & Agentic Systems Card in Carousel */}
          <div className="snap-start shrink-0 w-[82vw] p-4 rounded-2xl border border-black/10 bg-white shadow-xs space-y-2.5">
            <div className="pb-2 border-b border-black/5 flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-[#0a122a]">AI &amp; Agentic Systems</h3>
              <span className="text-[10px] font-mono text-blue-600 shrink-0">AI STACK</span>
            </div>
            {AI_TECH_ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isSelected = activeItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveItem(isSelected ? null : item)}
                  className={`w-full min-h-[56px] p-2.5 rounded-xl border text-left flex items-center gap-3 cursor-pointer ${
                    isSelected ? 'border-blue-600 bg-blue-50/70' : 'border-black/8 bg-slate-50/70'
                  }`}
                >
                  <IconComponent size={28} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#0a122a]">{item.name}</div>
                    <div className="text-[11px] font-mono text-slate-500 truncate">{item.context}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Touch Context Banner (only shown when a tool is tapped) */}
        {activeItem && (
          <div className="px-3.5 py-2.5 rounded-xl bg-[#0a122a] text-white text-xs font-mono min-h-[42px] flex items-center justify-between gap-2">
            <span>
              <strong>{activeItem.name}:</strong> {activeItem.context}
            </span>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* DESKTOP (md+): BENTO CATEGORY GRID                             */}
      {/* ============================================================== */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {TECH_CATEGORIES.map((category, idx) => {
          const isFullWidth = idx === TECH_CATEGORIES.length - 1 && TECH_CATEGORIES.length % 2 !== 0;
          return (
            <div
              key={category.title}
              className={`p-6 sm:p-7 rounded-3xl border border-black/10 bg-white shadow-[0_2px_12px_rgba(10,18,42,0.03)] flex flex-col justify-between hover:border-black/20 transition-all duration-300 ${
                isFullWidth ? 'md:col-span-2' : ''
              }`}
            >
              {/* Category Header: Clean, confident typography with no AI pills */}
              <div className="mb-5 pb-3 border-b border-black/5 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-[#0a122a]">
                  {category.title}
                </h3>
                <span className="text-xs font-mono text-slate-400">4 tools</span>
              </div>

            {/* Logo Grid: Balanced 4 Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {category.items.map((item) => {
                const IconComponent = item.icon;
                const isHovered = activeItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    data-cursor-hover
                    onMouseEnter={() => setActiveItem(item)}
                    onMouseLeave={() => setActiveItem(null)}
                    className="group relative p-3 sm:p-4 rounded-2xl border border-black/8 bg-slate-50/70 hover:bg-white hover:border-black/20 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center"
                  >
                    {/* Centered High-Res SVG Brand Logo */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shrink-0">
                      <IconComponent size={38} className="drop-shadow-xs" />
                    </div>

                    {/* Clean Tech Name */}
                    <span className="text-xs font-medium text-slate-800 group-hover:text-black tracking-tight mt-2.5 transition-colors whitespace-nowrap">
                      {item.name}
                    </span>

                    {/* Tooltip */}
                    {isHovered && (
                      <div className="hidden sm:block absolute -top-11 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap bg-[#0a122a] text-white text-[11px] font-mono px-3 py-1 rounded-full shadow-xl border border-white/10 animate-in fade-in zoom-in-95 duration-150">
                        {item.context}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a122a] rotate-45 border-r border-b border-white/10" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>

      {/* ============================================================== */}
      {/* FEATURED: AI & AGENTIC SYSTEMS BENTO CARD (Desktop md+)        */}
      {/* ============================================================== */}
      <div className="hidden md:block relative z-20 mb-8 p-6 sm:p-7 rounded-3xl border border-black/10 bg-white shadow-[0_2px_12px_rgba(10,18,42,0.03)] hover:border-black/20 transition-all duration-300 overflow-visible">
        <div className="mb-5 pb-3 border-b border-black/5">
          <h3 className="text-lg font-semibold tracking-tight text-[#0a122a]">
            AI &amp; Agentic Systems
          </h3>
        </div>

        {/* AI Logos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {AI_TECH_ITEMS.map((item, idx) => {
            const IconComponent = item.icon;
            const isHovered = activeItem?.id === item.id;

            // Smart alignment so tooltips never bleed off-screen or get clipped
            const tooltipPos =
              idx === 0
                ? 'left-0 translate-x-0'
                : idx === 2
                ? 'right-0 left-auto translate-x-0'
                : 'left-1/2 -translate-x-1/2';

            const arrowPos =
              idx === 0
                ? 'left-8'
                : idx === 2
                ? 'right-8 left-auto'
                : 'left-1/2 -translate-x-1/2';

            return (
              <div
                key={item.id}
                data-cursor-hover
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                className="group relative p-4 rounded-2xl border border-black/8 bg-slate-50/70 hover:bg-white hover:border-black/20 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex items-center gap-4"
              >
                {/* Visual Icon */}
                <div className="w-12 h-12 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shrink-0">
                  <IconComponent size={40} className="drop-shadow-xs" />
                </div>

                {/* Name & Context */}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-[#0a122a] tracking-tight flex items-center gap-1.5">
                    <span>{item.name}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 leading-tight mt-0.5">
                    {item.id === 'claude' && 'Anthropic · Architecture & RFCs'}
                    {item.id === 'codex' && 'OpenAI · Scaffolding & Synthesis'}
                    {item.id === 'antigravity' && 'Google AGY · Autonomous Agents'}
                  </div>
                </div>

                {/* Desktop Tooltip with high z-index and safe viewport alignment */}
                {isHovered && (
                  <div
                    className={`hidden sm:block absolute -top-11 ${tooltipPos} z-50 pointer-events-none whitespace-nowrap bg-[#0a122a] text-white text-[11px] font-mono px-3.5 py-1.5 rounded-full shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-150`}
                  >
                    {item.context}
                    <div
                      className={`absolute -bottom-1 ${arrowPos} w-2 h-2 bg-[#0a122a] rotate-45 border-r border-b border-white/20`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Secondary Tech & Ecosystem Strip (Desktop md+ only) */}
      <div className="hidden md:flex px-6 py-4 rounded-2xl border border-black/8 bg-slate-50/50 flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <span className="uppercase tracking-widest text-slate-400 font-medium text-[11px]">
          Also experienced with:
        </span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-700 text-xs font-medium">
          {['Prisma ORM', 'Figma Tokens', 'REST & OpenAPI', 'TanStack Query', 'Turbopack', 'Vercel Edge', 'Vitest'].map(
            (tech, idx, arr) => (
              <span key={tech} className="flex items-center gap-3">
                <span>{tech}</span>
                {idx < arr.length - 1 && <span className="text-slate-300">·</span>}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
