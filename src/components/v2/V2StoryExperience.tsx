'use client';

import React, { useEffect, useRef } from 'react';
import { StoryCanvas } from '@/components/canvas/StoryCanvas';
import { PATRICK_STORY_CHAPTERS } from '@/lib/constants';

interface V2StoryExperienceProps {
  currentChapter: number;
  onChapterChange: (chapter: number) => void;
  onExit: () => void;
}

export function V2StoryExperience({
  currentChapter,
  onChapterChange,
  onExit,
}: V2StoryExperienceProps) {
  const wheelLockRef = useRef<boolean>(false);

  // Wheel and keyboard chapter scrubbing
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLockRef.current) return;

      if (e.deltaY > 25) {
        wheelLockRef.current = true;
        onChapterChange(Math.min(currentChapter + 1, PATRICK_STORY_CHAPTERS.length - 1));
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 400);
      } else if (e.deltaY < -25) {
        wheelLockRef.current = true;
        onChapterChange(Math.max(currentChapter - 1, 0));
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 400);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onChapterChange(Math.min(currentChapter + 1, PATRICK_STORY_CHAPTERS.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        onChapterChange(Math.max(currentChapter - 1, 0));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [currentChapter, onChapterChange, onExit]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#060a18] select-none text-white">
      {/* 3D Particle Morphing Canvas */}
      <StoryCanvas
        currentChapter={currentChapter}
        chapters={PATRICK_STORY_CHAPTERS}
        accentColor="#3b82f6"
      />

      {/* Top Header in Story Mode */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="font-mono font-bold tracking-wider text-base text-white">PATRICK</span>
          <span className="text-blue-400 font-mono text-xs hidden sm:inline">
            · a story in systems
          </span>
        </div>

        <button
          type="button"
          onClick={onExit}
          className="pointer-events-auto text-xs font-mono tracking-wider uppercase text-white/80 hover:text-white bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 hover:border-white/40 px-4 py-2 rounded-full cursor-pointer transition-all flex items-center gap-2 shadow-xl"
        >
          <span>Return to site</span>
          <span className="text-blue-400 font-bold">→</span>
        </button>
      </header>

      {/* Right-Side Vertical Chapter Indicator */}
      <nav
        aria-label="Story Chapters"
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pointer-events-auto"
      >
        {PATRICK_STORY_CHAPTERS.map((ch, idx) => {
          const isActive = idx === currentChapter;
          return (
            <button
              key={ch.chapter}
              type="button"
              onClick={() => onChapterChange(idx)}
              className="group flex items-center gap-3 justify-end cursor-pointer"
              title={`Chapter ${ch.chapter}: ${ch.title}`}
            >
              <span
                className={`text-[10px] font-mono tracking-widest transition-all opacity-0 group-hover:opacity-100 hidden md:inline-block ${
                  isActive ? 'text-blue-400 opacity-100 font-bold' : 'text-slate-400'
                }`}
              >
                {ch.title}
              </span>
              <span
                className={`transition-all rounded-full ${
                  isActive
                    ? 'w-3 h-8 bg-blue-500 shadow-[0_0_12px_#3b82f6]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/70'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom Keyboard Hint Bar */}
      <div className="absolute bottom-6 left-6 md:left-12 z-30 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/50 tracking-wider">
        <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
          ↑ / ↓
        </span>
        <span>Scroll to scrub</span>
        <span className="text-white/20">·</span>
        <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
          Esc
        </span>
        <span>Exit</span>
      </div>
    </div>
  );
}
