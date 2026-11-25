import React from 'react';
import { V2TopNav } from '@/components/v2/V2TopNav';
import { V2HeroSection } from '@/components/v2/V2HeroSection';
import { V2AboutSection } from '@/components/v2/V2AboutSection';
import { V2WorkSection } from '@/components/v2/V2WorkSection';
import { V2ToolkitSection } from '@/components/v2/V2ToolkitSection';
import { V2ExperienceSection } from '@/components/v2/V2ExperienceSection';
import { V2AchievementsSection } from '@/components/v2/V2AchievementsSection';
import { V2CertificatesSection } from '@/components/v2/V2CertificatesSection';
import { V2TechStackSection } from '@/components/v2/V2TechStackSection';
import { V2AvailabilitySection } from '@/components/v2/V2AvailabilitySection';
import { V2ContactSection } from '@/components/v2/V2ContactSection';
import { ClientEnhancements } from '@/components/v2/ClientEnhancements';
import { MobileViewModeProvider } from '@/components/v2/MobileViewModeContext';

export default function PortfolioPage() {
  return (
    <MobileViewModeProvider>
    <div className="relative min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 bg-white text-[#0a122a]">
      {/* Hero Topbar (visible in hero, hides when scrolled past hero) */}
      <V2TopNav />

      <main className="relative z-10">
        {/* 1. Hero Section (Immediate SSR HTML for LCP) */}
        <V2HeroSection />

        {/* 2. About Me */}
        <V2AboutSection />

        {/* 3. Projects */}
        <V2WorkSection />

        {/* 4. Skills & Disciplines */}
        <V2ToolkitSection />

        {/* 5. Work Experience */}
        <V2ExperienceSection />

        {/* 6. Achievements & Milestones */}
        <V2AchievementsSection />

        {/* 7. Certifications */}
        <V2CertificatesSection />

        {/* 8. Technical Arsenal & Stack */}
        <V2TechStackSection />

        {/* 9. Work & Internship Availability */}
        <V2AvailabilitySection />

        {/* 10. Direct Contact */}
        <V2ContactSection />
      </main>

      {/* Minimal Editorial Footer */}
      <footer className="relative z-10 site-footer border-t border-[rgba(10,18,42,0.1)] pt-10 px-4 sm:px-6 md:px-12 text-center text-xs font-mono text-slate-500 pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Patrick · Built with Next.js 16 &amp; Tailwind CSS</div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <a
              href="https://github.com/temqest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] px-2.5 hover:text-black transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/patrick-villamer-15267b36a"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] px-2.5 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/patrick.kurt.127"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] px-2.5 hover:text-black transition-colors"
            >
              Facebook
            </a>
            <a
              href="#front"
              className="inline-flex items-center min-h-[44px] px-2.5 hover:text-blue-600 transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Client-only interactive enhancements (Grid Canvas, Custom Cursor, Bottom Dock, Lenis) */}
      <ClientEnhancements />
    </div>
    </MobileViewModeProvider>
  );
}
