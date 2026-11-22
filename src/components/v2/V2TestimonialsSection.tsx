'use client';

import React, { useState } from 'react';
import { V2IslandPanel } from './V2IslandPanel';

export function V2TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote:
        '“The check-in system has completely upgraded our front desk. Members can check in on their own in seconds, which keeps lines moving and gives our team more time to help people. It’s faster, simpler, and far easier to manage every day.”',
      author: 'Sarah T.',
      role: 'Owner, Fitness Gym',
    },
    {
      id: 2,
      quote:
        '“Patrick delivered our evaluation platform ahead of schedule. The administrative dashboard gave our faculty instant clarity on department performance metrics that previously took weeks of manual compilation.”',
      author: 'Dr. Ramon C.',
      role: 'Academic Dean, NwSSU',
    },
  ];

  return (
    <V2IslandPanel id="testimonials" className="my-8">
      <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">
        <span>(06) — KIND WORDS</span>
      </div>

      <div className="max-w-4xl">
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed tracking-tight text-white mb-10">
          {testimonials[activeIdx].quote}
        </blockquote>

        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div>
            <div className="text-lg font-semibold text-white">
              {testimonials[activeIdx].author}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {testimonials[activeIdx].role}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {testimonials.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIdx === idx
                    ? 'w-8 bg-blue-500'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Show quote ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </V2IslandPanel>
  );
}
