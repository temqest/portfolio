"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopNav } from "@/components/navigation/TopNav";
import { FloatingDock } from "@/components/navigation/FloatingDock";
import { LeftHUD } from "@/components/navigation/LeftHUD";
import { BlueprintRuler } from "@/components/canvas/BlueprintRuler";
import { BackgroundParticles } from "@/components/canvas/BackgroundParticles";
import { StoryCanvas } from "@/components/canvas/StoryCanvas";
import { GooeyMenuButton } from "@/components/navigation/GooeyMenuButton";
import { CustomCursor } from "@/components/navigation/CustomCursor";
import { TelemetryDrawer } from "@/components/easter-eggs/TelemetryDrawer";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AppsSection } from "@/components/sections/AppsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { MottoSection } from "@/components/sections/MottoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { OffTheClockSection } from "@/components/sections/OffTheClockSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";

import { useAudioSynth } from "@/hooks/useAudioSynth";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { STORY_CHAPTERS } from "@/lib/constants";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("v") === "story" ? "story" : "site";
  const [mode, setMode] = useState<"site" | "story">(initialMode);
  const [storyChapter, setStoryChapter] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isCodeDrawerOpen, setIsCodeDrawerOpen] = useState(false);

  const { isPlaying: isAudioPlaying, toggleAudio } = useAudioSynth();
  const { scrollTo, stopScroll, startScroll } = useLenisScroll();

  // Scroll to section helper
  const handleNavigate = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        scrollTo(el, -20);
      }
    },
    [scrollTo]
  );

  // Section observer for LeftHUD
  useEffect(() => {
    if (mode !== "site") return;

    const sectionIds = [
      "hero",
      "about",
      "whatido",
      "process",
      "work",
      "apps",
      "experience",
      "motto",
      "testimonials",
      "offtheclock",
      "contact",
      "footer",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mode]);

  // Handle "Break it" physics collapse scroll lock
  const handleBreakStateChange = useCallback(
    (broken: boolean) => {
      if (broken) {
        stopScroll();
      } else {
        startScroll();
      }
    },
    [stopScroll, startScroll]
  );

  // Story Mode: Wheel & Keyboard chapter scrubbing
  useEffect(() => {
    if (mode !== "story") return;

    let wheelTimeout: NodeJS.Timeout | null = null;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelTimeout) return;

      if (e.deltaY > 25) {
        setStoryChapter((prev) => Math.min(prev + 1, STORY_CHAPTERS.length - 1));
      } else if (e.deltaY < -25) {
        setStoryChapter((prev) => Math.max(prev - 1, 0));
      }

      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 400);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setStoryChapter((prev) => Math.min(prev + 1, STORY_CHAPTERS.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setStoryChapter((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setMode("site");
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mode]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#eeece8] selection:bg-[#5b5fe0] selection:text-white">
      {/* Custom Difference Blend Cursor */}
      <CustomCursor />

      {/* Top Navigation */}
      <TopNav
        onNavigate={handleNavigate}
        mode={mode}
        onSwitchMode={(newMode) => setMode(newMode)}
      />

      {/* Mode A: Editorial "Site" Experience */}
      {mode === "site" && (
        <>
          {/* Ambient Particles in Deep Space */}
          <BackgroundParticles />

          {/* Left HUD: W. Nominee badge & vertical section scroll indicator */}
          <LeftHUD activeSection={activeSection} mode={mode} />

          {/* Right Blueprint Ruler Canvas */}
          <BlueprintRuler />

          <main id="main" className="relative z-10 w-full">
            <HeroSection
              onStartProject={() => handleNavigate("contact")}
              onExploreWork={() => handleNavigate("work")}
            />

            <AboutSection />

            <WhatIDoSection onSkipNext={() => handleNavigate("process")} />

            <ProcessSection />

            <WorkSection />

            <AppsSection />

            <ExperienceSection />

            <MottoSection
              onBreakStateChange={handleBreakStateChange}
              onOpenCodeDrawer={() => setIsCodeDrawerOpen(true)}
            />

            <TestimonialsSection />

            <OffTheClockSection />

            <ContactSection />

            <FooterSection
              onScrollToTop={() => handleNavigate("hero")}
            />
          </main>

          {/* Gooey SVG Filter "Start a project" floating button */}
          <GooeyMenuButton onStartProject={() => handleNavigate("contact")} />
        </>
      )}

      {/* Mode B: 10-Chapter "Story in Particles" Scrollytelling */}
      {mode === "story" && (
        <main className="relative z-10 w-full h-screen overflow-hidden">
          <StoryCanvas
            currentChapter={storyChapter}
            onChapterSelect={(idx) => setStoryChapter(idx)}
          />

          {/* Story Chapter Navigator Controls */}
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {STORY_CHAPTERS.map((ch, idx) => (
              <button
                key={ch.chapter}
                onClick={() => setStoryChapter(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === storyChapter
                    ? "w-6 bg-[#5b5fe0]"
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Jump to chapter ${ch.chapter}: ${ch.title}`}
              />
            ))}
          </div>
        </main>
      )}

      {/* Persistent Floating Bottom Dock */}
      <FloatingDock
        mode={mode}
        onModeChange={(newMode) => setMode(newMode)}
        onOpenCodeDrawer={() => setIsCodeDrawerOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onPrevStoryChapter={() =>
          setStoryChapter((prev) => Math.max(prev - 1, 0))
        }
        onNextStoryChapter={() =>
          setStoryChapter((prev) =>
            Math.min(prev + 1, STORY_CHAPTERS.length - 1)
          )
        }
      />

      {/* Telemetry Inspector DevTools Drawer */}
      <TelemetryDrawer
        isOpen={isCodeDrawerOpen}
        onClose={() => setIsCodeDrawerOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <PortfolioContent />
    </Suspense>
  );
}
