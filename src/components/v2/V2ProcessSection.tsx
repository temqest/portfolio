'use client';

import React from 'react';

export function V2ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Failure-Mode & Workflow Audit',
      desc: 'Before touching any code, we examine where your current systems break: network dead zones, manual spreadsheet bottlenecks, and regulatory compliance standards.',
    },
    {
      num: '02',
      title: 'Defensive Staging & Weekly Demos',
      desc: 'Every week, your team tests a live, clickable build on your actual field devices. We intentionally simulate dropped connections, rapid double-clicks, and dirty inputs.',
    },
    {
      num: '03',
      title: 'Turnkey Launch & Direct Access',
      desc: 'Seamless database cutover with automated backups and staff onboarding. You receive complete codebase ownership and direct access to me for ongoing maintenance.',
    },
  ];

  return (
    <section id="process" className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a]">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(07) — HOW WE&apos;LL WORK TOGETHER</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a] leading-tight">
            Engineering for <em className="font-serif-italic text-blue-600 font-normal">predictable</em> delivery.
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light mt-2 max-w-2xl">
            No months of radio silence, no surprise billing hours, and no theoretical code that collapses when real users and messy field data enter the picture.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 uppercase shrink-0">3-Stage Lifecycle</span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Horizontal connector line on desktop */}
        <div className="hidden md:block absolute top-7 left-14 right-14 h-[1px] bg-gradient-to-r from-[#0a122a] via-blue-600 to-slate-300 z-0" />

        {steps.map((step) => (
          <div key={step.num} className="relative z-10 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full border border-black/15 bg-white flex items-center justify-center font-mono font-bold text-sm text-[#0a122a] shadow-sm mb-6">
              {step.num}
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-[#0a122a] mb-2">
              {step.title}
            </h3>
            <p className="text-sm font-light leading-relaxed text-slate-600 max-w-sm">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Engineering Motto / Story Accent */}
      <div className="p-8 md:p-10 rounded-3xl bg-[#0a122a] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2">
            The 2 A.M. Reality
          </span>
          <p className="text-xl sm:text-2xl font-light text-slate-100 leading-snug">
            &ldquo;Good code is invisible. Until it breaks. Then I fix it.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-2">
            I spend most of my architecture time making sure edge cases and dropped connections behave so quietly that users assume nothing complicated is happening.
          </p>
        </div>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Start a project</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
