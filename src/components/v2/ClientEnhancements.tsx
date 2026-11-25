'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { V2BottomNav } from '@/components/v2/V2BottomNav';
import { useLenisScroll } from '@/hooks/useLenisScroll';

const CursorGridCanvas = dynamic(
  () => import('@/components/v2/CursorGridCanvas').then((m) => m.CursorGridCanvas),
  { ssr: false }
);
const V2CustomCursor = dynamic(
  () => import('@/components/v2/V2CustomCursor').then((m) => m.V2CustomCursor),
  { ssr: false }
);
const TelemetryDrawer = dynamic(
  () => import('@/components/easter-eggs/TelemetryDrawer').then((m) => m.TelemetryDrawer),
  { ssr: false }
);

export function ClientEnhancements() {
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const { scrollTo } = useLenisScroll();

  return (
    <>
      <CursorGridCanvas
        className="!fixed inset-0 z-0 pointer-events-none"
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

      <V2CustomCursor />

      <V2BottomNav onScrollToTop={() => scrollTo(0)} />

      <TelemetryDrawer
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />
    </>
  );
}
