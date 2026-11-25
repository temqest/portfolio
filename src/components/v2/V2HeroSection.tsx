'use client';

import React, { useState, useEffect } from 'react';

function ManilaClock() {
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

  return <span className="mono font-semibold text-[#0a122a] whitespace-nowrap shrink-0">{timeStr}</span>;
}

export function V2HeroSection() {
  return (
    <section
      id="front"
      className="front relative min-h-[100svh] min-h-dvh flex flex-col justify-center md:justify-end overflow-hidden bg-transparent text-[#0a122a]"
      data-theme="light"
    >
      {/* Atmospheric Cold Sky Aura */}
      <div className="front-aura" aria-hidden="true" />

      {/* Hero Inner Wrap */}
      <div className="wrap front-inner relative z-10 w-full pointer-events-none">
        {/* Telemetry metadata header bar */}
        <div className="front-meta border-t border-[rgba(10,18,42,0.1)] pt-3.5 mb-4 sm:mb-7 flex justify-between items-center gap-2 text-[10px] sm:text-[12px] font-mono tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#5b6684]">
          <span className="mono truncate">Founder &amp; Systems Engineer</span>
          <span className="mono hidden sm:inline">Co-founder @ UNITE · ap-silang</span>
          <span className="mono hidden md:inline">Philippines</span>
          <ManilaClock />
        </div>

        {/* Colossal Oughter Headline */}
        <h1
          className="name select-none flex justify-between w-full m-0 uppercase pointer-events-none"
          aria-label="PATRICK"
        >
          {['P', 'A', 'T', 'R', 'I', 'C', 'K'].map((letter, i) => (
            <span key={i} className="mask overflow-hidden inline-block pt-[0.08em]">
              <span className="inline-block transform md:hover:-translate-y-2 transition-transform duration-300">
                {letter}
              </span>
            </span>
          ))}
        </h1>

        {/* Bottom split: Editorial Tagline & Action Pills */}
        <div className="front-bottom">
          <p className="front-tagline m-0 font-light tracking-[-0.015em] text-[#0a122a] pointer-events-auto">
            I engineer mission-critical{' '}
            <em className="font-serif-italic not-italic text-[#2e4fc7]">
              systems
            </em>{' '}
            and healthcare platforms where downtime isn&apos;t an option.
          </p>

          <div className="front-cta flex flex-wrap sm:flex-nowrap w-full md:w-auto justify-start md:justify-end items-center gap-2.5 sm:gap-3 pr-0 md:pr-4 pointer-events-auto">
            <a
              href="#work"
              className="btn flex-1 sm:flex-initial"
            >
              See my work
            </a>
            <a
              href="#availability"
              className="btn primary flex-1 sm:flex-initial"
            >
              <span>Hire me</span>
              <span className="arr text-base leading-none">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
