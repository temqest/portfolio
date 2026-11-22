'use client';

import React, { useState, useEffect } from 'react';
import { CursorGridCanvas } from './CursorGridCanvas';

export function V2HeroSection() {
  const [timeStr, setTimeStr] = useState<string>('MNL --:--:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTimeStr(`MNL ${formatter.format(now)}`);
      } catch {
        setTimeStr('MNL 22:26:24');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="front"
      className="front relative min-h-[100svh] min-h-screen flex flex-col justify-end pb-14 overflow-hidden bg-white text-[#0a122a]"
      data-theme="light"
    >
      {/* Interactive Cursor Grid Canvas (Follows mouse, lights up squares, responds to clicks) */}
      <CursorGridCanvas
        cellSize={70}
        color="#0A122A"
        radius={140}
        gridOpacity={0.06}
        fillOpacity={0}
        clickPulse={true}
        pulseSpeed={600}
        holdTime={400}
        fadeDuration={800}
      />

      {/* Atmospheric Cold Sky Aura */}
      <div className="front-aura" aria-hidden="true" />

      {/* Hero Inner Wrap */}
      <div className="wrap front-inner relative z-10 w-full pointer-events-none">
        {/* Telemetry metadata header bar */}
        <div className="front-meta border-t border-[rgba(10,18,42,0.1)] pt-[18px] mb-[28px] flex justify-between items-center text-[12px] font-mono tracking-[0.14em] uppercase text-[#5b6684]">
          <span className="mono">Web developer</span>
          <span className="mono hidden sm:inline">Systems for small businesses</span>
          <span className="mono hidden md:inline">Based in the Philippines</span>
          <span className="mono font-semibold text-[#0a122a]">{timeStr}</span>
        </div>

        {/* Colossal Oughter Headline */}
        <h1
          className="name select-none flex justify-between w-full m-0 uppercase pointer-events-none"
          aria-label="ANGHEL"
        >
          {['A', 'N', 'G', 'H', 'E', 'L'].map((letter, i) => (
            <span key={i} className="mask overflow-hidden inline-block pt-[0.08em]">
              <span className="inline-block transform hover:-translate-y-2 transition-transform duration-300">
                {letter}
              </span>
            </span>
          ))}
        </h1>

        {/* Bottom split: Editorial Tagline & Action Pills */}
        <div className="front-bottom grid grid-cols-1 md:grid-cols-[1.1fr_1fr] items-end gap-10 mt-[44px]">
          <p className="front-tagline m-0 font-light tracking-[-0.015em] text-[#0a122a] pointer-events-auto">
            I build web{' '}
            <em className="font-serif-italic not-italic text-[#2e4fc7]">
              systems
            </em>{' '}
            for small businesses that hold up with real users.
          </p>

          <div className="front-cta flex justify-start md:justify-end items-center gap-3 pr-0 md:pr-[150px] pointer-events-auto">
            <a
              href="#work"
              className="btn"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="btn primary"
            >
              <span>Start a project</span>
              <span className="arr text-lg leading-none">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
