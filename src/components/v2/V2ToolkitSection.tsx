'use client';

import React from 'react';

interface DisciplineStory {
  id: string;
  num: string;
  discipline: string;
  headline: string;
  italicWord: string;
  story: string;
  clientValue: string;
  projectProof: string;
}

const STORIES: DisciplineStory[] = [
  {
    id: 'resilience',
    num: '01',
    discipline: 'OFFLINE-FIRST RESILIENCE',
    headline: 'Software that',
    italicWord: 'never freezes.',
    story:
      'In rural clinics and dead zones, cellular connections cut out without warning. A midwife examining a patient in labor cannot wait for a loading spinner.',
    clientValue:
      'I engineer applications that commit data to local device memory in under 4ms and sync silently in the background when connectivity returns. Zero frozen screens, zero lost records.',
    projectProof: 'Proven in ap-silang (Municipal Maternal EMR)',
  },
  {
    id: 'integrity',
    num: '02',
    discipline: 'RELATIONAL INTEGRITY & PRIVACY',
    headline: 'Zero dropped',
    italicWord: 'records.',
    story:
      'Maternal clinical records and transfusion histories carry legal and medical weight. Lost entries lead to misdiagnoses, and data leaks violate statutory healthcare law.',
    clientValue:
      'I design strict relational schemas with database-level Row-Level Security, guaranteeing patient data remains strictly isolated between clinics and backed by immutable audit trails.',
    projectProof: 'Compliant with RA 10173 & DOH 28-Year Record Mandate',
  },
  {
    id: 'logistics',
    num: '03',
    discipline: 'REAL-TIME COORDINATION',
    headline: 'Instant emergency',
    italicWord: 'dispatch.',
    story:
      'When an emergency surgery needs blood at 2 a.m., manual phone trees between hospitals waste precious hours.',
    clientValue:
      'I build live WebSocket event pipelines and automated SMS triggers that reserve hospital blood inventory atomically and mobilize verified donors in seconds.',
    projectProof: 'Validated in collaboration with Bicol Medical Center (BMC)',
  },
];

export function V2ToolkitSection() {
  return (
    <section id="stack" className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-[#0a122a]">
      {/* Editorial Eyebrow */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(02) — ARCHITECTURAL DISCIPLINES</span>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-black/10 pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a] leading-tight">
            Engineering for <em className="font-serif-italic text-blue-600 font-normal">high-stakes</em> reality.
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light mt-2 max-w-xl">
            What I build for clients: resilient, zero-fault systems where downtime isn&apos;t an option.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider shrink-0">
          Scroll to explore 3 disciplines ↓
        </span>
      </div>

      {/* Vertical Stacking Cards Stream: Scroll Down Experience */}
      <div className="relative space-y-10 pb-16">
        {STORIES.map((item, idx) => {
          // Dynamic sticky top offsets so each card peeks cleanly when stacked
          const stickyTopClass =
            idx === 0
              ? 'top-24 md:top-28 z-10'
              : idx === 1
              ? 'top-28 md:top-36 z-20'
              : 'top-32 md:top-44 z-30';

          return (
            <div
              key={item.id}
              className={`sticky ${stickyTopClass} bg-white rounded-3xl border border-black/10 p-8 sm:p-12 md:p-16 shadow-xl transition-all duration-300 relative overflow-hidden`}
            >
              {/* Massive Subtle Background Numeral */}
              <span className="absolute -bottom-8 -right-4 text-[130px] sm:text-[180px] md:text-[220px] font-mono font-bold text-black/[0.03] select-none pointer-events-none leading-none">
                {item.num}
              </span>

              {/* Card Header: Category & Counter */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-medium">
                  {item.discipline}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  0{idx + 1} / 0{STORIES.length}
                </span>
              </div>

              {/* Headline */}
              <div className="max-w-2xl relative z-10 my-2">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-light text-[#0a122a] tracking-tight mb-6 leading-tight">
                  {item.headline}{' '}
                  <em className="font-serif-italic text-blue-600 font-normal">
                    {item.italicWord}
                  </em>
                </h3>

                {/* Ground Story */}
                <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed mb-5">
                  {item.story}
                </p>

                {/* Direct Client Value */}
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed border-l-2 border-blue-600/40 pl-4 py-1">
                  {item.clientValue}
                </p>
              </div>

              {/* Card Footer: Real Proven Ground Context */}
              <div className="pt-8 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-slate-500 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{item.projectProof}</span>
                </div>
                <span className="text-slate-400 hidden sm:inline">Production Primitive</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}