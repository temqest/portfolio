'use client';

import React from 'react';

export function V2ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Send an inquiry',
      desc: 'Fill out the contact form below with your project idea, timeline, and requirements.',
    },
    {
      num: '02',
      title: 'Consultation & reply',
      desc: "I'll respond within 24 hours. We'll discuss your goals and align on scope and technical architecture.",
    },
    {
      num: '03',
      title: 'Execution & delivery',
      desc: 'Once we agree on the scope, I start building with regular milestone demos until final deployment.',
    },
  ];

  return (
    <section id="process" className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a]">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(05) — PROCESS</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a]">
          How we&apos;ll <em className="font-serif-italic text-blue-600 font-normal">work</em> together.
        </h2>
        <span className="text-xs font-mono text-slate-500 uppercase">3-Step Lifecycle</span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Horizontal connector line on desktop */}
        <div className="hidden md:block absolute top-7 left-14 right-14 h-[1px] bg-gradient-to-r from-[#0a122a] via-blue-600 to-[#ff7a45] z-0" />

        {steps.map((step) => (
          <div key={step.num} className="relative z-10 flex flex-col items-start">
            <div className="w-14 h-14 rounded-full border border-black/15 bg-white flex items-center justify-center font-mono font-bold text-sm text-[#0a122a] shadow-md mb-6 hover:bg-[#0a122a] hover:text-white transition-all duration-300">
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
    </section>
  );
}
