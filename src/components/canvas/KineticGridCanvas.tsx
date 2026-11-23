'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export interface KineticGridCanvasProps {
  activeTab: number;
  className?: string;
  accentColor?: string;
}

const PARTICLE_COUNT = 5200;

export function KineticGridCanvas({
  activeTab,
  className = '',
}: KineticGridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & Transition Refs
  const animFrameRef = useRef<number | null>(null);
  const transitionRef = useRef({
    fromTab: activeTab,
    toTab: activeTab,
    progress: 1, // 0 = start, 1 = complete
    duration: 320, // Snappy 320ms morph duration
    startTime: 0,
  });

  // Mouse / Pointer Interaction Refs (Gravitational Singularity)
  const pointerRef = useRef({
    targetX: 0,
    targetY: 0,
    currX: 0,
    currY: 0,
    targetRadius: 0,
    currRadius: 0,
    isHovered: false,
    maxRadius: 150,
  });

  // Typed Arrays for particle buffers (Zero GC overhead, 60fps)
  const buffersRef = useRef<{
    liveX: Float32Array;
    liveY: Float32Array;
    originX: Float32Array;
    originY: Float32Array;
    targetX: Float32Array;
    targetY: Float32Array;
    scatterDx: Float32Array;
    scatterDy: Float32Array;
    originR: Float32Array;
    originG: Float32Array;
    originB: Float32Array;
    targetR: Float32Array;
    targetG: Float32Array;
    targetB: Float32Array;
    originAlpha: Float32Array;
    targetAlpha: Float32Array;
    originSize: Float32Array;
    targetSize: Float32Array;
  } | null>(null);

  // Defensive buffer initialization guarding against Fast Refresh / Hot Reload stale ref schemas
  if (!buffersRef.current || !('targetR' in buffersRef.current) || !buffersRef.current.targetR) {
    const liveX = new Float32Array(PARTICLE_COUNT);
    const liveY = new Float32Array(PARTICLE_COUNT);
    const originX = new Float32Array(PARTICLE_COUNT);
    const originY = new Float32Array(PARTICLE_COUNT);
    const targetX = new Float32Array(PARTICLE_COUNT);
    const targetY = new Float32Array(PARTICLE_COUNT);
    const scatterDx = new Float32Array(PARTICLE_COUNT);
    const scatterDy = new Float32Array(PARTICLE_COUNT);
    const originR = new Float32Array(PARTICLE_COUNT);
    const originG = new Float32Array(PARTICLE_COUNT);
    const originB = new Float32Array(PARTICLE_COUNT);
    const targetR = new Float32Array(PARTICLE_COUNT);
    const targetG = new Float32Array(PARTICLE_COUNT);
    const targetB = new Float32Array(PARTICLE_COUNT);
    const originAlpha = new Float32Array(PARTICLE_COUNT);
    const targetAlpha = new Float32Array(PARTICLE_COUNT);
    const originSize = new Float32Array(PARTICLE_COUNT);
    const targetSize = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 85;
      scatterDx[i] = Math.cos(angle) * speed;
      scatterDy[i] = Math.sin(angle) * speed;

      originR[i] = 0.04;
      originG[i] = 0.07;
      originB[i] = 0.16;
      targetR[i] = 0.04;
      targetG[i] = 0.07;
      targetB[i] = 0.16;

      originAlpha[i] = 0.95;
      targetAlpha[i] = 0.95;
      originSize[i] = 2.4;
      targetSize[i] = 2.4;
    }

    buffersRef.current = {
      liveX,
      liveY,
      originX,
      originY,
      targetX,
      targetY,
      scatterDx,
      scatterDy,
      originR,
      originG,
      originB,
      targetR,
      targetG,
      targetB,
      originAlpha,
      targetAlpha,
      originSize,
      targetSize,
    };
  }

  // Generate coordinates for shape according to active discipline tab
  const generateShape = useCallback(
    (
      tabIdx: number,
      width: number,
      height: number,
      outX: Float32Array,
      outY: Float32Array,
      outR: Float32Array,
      outG: Float32Array,
      outB: Float32Array,
      outAlpha: Float32Array,
      outSize: Float32Array
    ) => {
      // Full canvas architectural scale (occupies ~88% width and ~84% height)
      const padX = width * 0.06;
      const padY = height * 0.06;
      const boxW = width - padX * 2;
      const boxH = height - padY * 2;
      const cx = width / 2;
      const cy = height / 2;

      let pIdx = 0;

      // Color Presets (High-contrast, elegant drafting palette matching Image 2)
      const DARK_R = 0.04;
      const DARK_G = 0.06;
      const DARK_B = 0.12; // Solid charcoal black

      const SLATE_R = 0.32;
      const SLATE_G = 0.36;
      const SLATE_B = 0.44; // Blueprint graphite

      const BLUE_R = 0.22;
      const BLUE_G = 0.38;
      const BLUE_B = 0.96; // Luminous Royal Cobalt Blue (#3861f5)

      const LIGHT_BLUE_R = 0.45;
      const LIGHT_BLUE_G = 0.65;
      const LIGHT_BLUE_B = 0.98;

      const WHITE_R = 0.96;
      const WHITE_G = 0.97;
      const WHITE_B = 0.99;

      // Helper 1: Stippled Line with Multi-Strand Jitter Envelope
      const addDenseLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        count: number,
        thickness = 2.2,
        r = DARK_R,
        g = DARK_G,
        b = DARK_B,
        alpha = 0.95,
        size = 2.5
      ) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        for (let k = 0; k < count && pIdx < PARTICLE_COUNT; k++) {
          const t = k / count;
          const strand = (Math.random() - 0.5) * thickness;
          const alongJit = (Math.random() - 0.5) * 0.8;
          outX[pIdx] = x1 + dx * t + nx * strand + (dx / len) * alongJit;
          outY[pIdx] = y1 + dy * t + ny * strand + (dy / len) * alongJit;
          outR[pIdx] = r;
          outG[pIdx] = g;
          outB[pIdx] = b;
          outAlpha[pIdx] = alpha;
          outSize[pIdx] = size;
          pIdx++;
        }
      };

      // Helper 2: Stippled Arc
      const addDenseArc = (
        acx: number,
        acy: number,
        rx: number,
        ry: number,
        startAng: number,
        endAng: number,
        count: number,
        thickness = 2.2,
        r = DARK_R,
        g = DARK_G,
        b = DARK_B,
        alpha = 0.95,
        size = 2.5
      ) => {
        for (let k = 0; k < count && pIdx < PARTICLE_COUNT; k++) {
          const t = k / count;
          const ang = startAng + (endAng - startAng) * t;
          const strand = (Math.random() - 0.5) * thickness;
          outX[pIdx] = acx + Math.cos(ang) * (rx + strand);
          outY[pIdx] = acy + Math.sin(ang) * (ry + strand);
          outR[pIdx] = r;
          outG[pIdx] = g;
          outB[pIdx] = b;
          outAlpha[pIdx] = alpha;
          outSize[pIdx] = size;
          pIdx++;
        }
      };

      // Helper 3: Rounded Card with optional solid stippled texture fill
      const addRoundedCard = (
        cx: number,
        cy: number,
        cw: number,
        ch: number,
        radius = 14,
        outlineCount = 140,
        isFilled = false,
        fillCount = 1100,
        outlineR = DARK_R,
        outlineG = DARK_G,
        outlineB = DARK_B,
        fillR = BLUE_R,
        fillG = BLUE_G,
        fillB = BLUE_B
      ) => {
        const left = cx - cw / 2;
        const right = cx + cw / 2;
        const top = cy - ch / 2;
        const bottom = cy + ch / 2;
        const r = Math.min(radius, cw / 2, ch / 2);

        const hCount = Math.floor(outlineCount * 0.28);
        const vCount = Math.floor(outlineCount * 0.22);
        const aCount = Math.floor(outlineCount * 0.12);

        addDenseLine(left + r, top, right - r, top, hCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);
        addDenseLine(left + r, bottom, right - r, bottom, hCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);
        addDenseLine(left, top + r, left, bottom - r, vCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);
        addDenseLine(right, top + r, right, bottom - r, vCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);

        addDenseArc(right - r, top + r, r, r, -Math.PI / 2, 0, aCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);
        addDenseArc(right - r, bottom - r, r, r, 0, Math.PI / 2, aCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);
        addDenseArc(left + r, bottom - r, r, r, Math.PI / 2, Math.PI, aCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);
        addDenseArc(left + r, top + r, r, r, Math.PI, Math.PI * 1.5, aCount, 2.4, outlineR, outlineG, outlineB, 0.96, 2.5);

        if (isFilled) {
          for (let k = 0; k < fillCount && pIdx < PARTICLE_COUNT; k++) {
            outX[pIdx] = left + 4 + Math.random() * (cw - 8);
            outY[pIdx] = top + 4 + Math.random() * (ch - 8);
            outR[pIdx] = fillR;
            outG[pIdx] = fillG;
            outB[pIdx] = fillB;
            outAlpha[pIdx] = 0.98;
            outSize[pIdx] = 2.5;
            pIdx++;
          }
        }
      };

      // Helper 5: Solid Dense Text Skeleton Bar (Thick, rich rectangular ink block)
      const addDenseSkeletonBar = (
        bx: number,
        by: number,
        bw: number,
        bh = 10,
        r = DARK_R,
        g = DARK_G,
        b = DARK_B,
        alpha = 0.96
      ) => {
        const rows = 2;
        const ptsPerRow = Math.floor(bw / 1.8);
        for (let row = 0; row < rows; row++) {
          const rowY = by + (bh / (rows + 1)) * (row + 1);
          for (let k = 0; k < ptsPerRow && pIdx < PARTICLE_COUNT; k++) {
            const t = k / ptsPerRow;
            outX[pIdx] = bx + t * bw + (Math.random() - 0.5) * 1.0;
            outY[pIdx] = rowY + (Math.random() - 0.5) * 1.2;
            outR[pIdx] = r;
            outG[pIdx] = g;
            outB[pIdx] = b;
            outAlpha[pIdx] = alpha;
            outSize[pIdx] = 2.6;
            pIdx++;
          }
        }
      };

      // Helper 6: Classic Angled Mouse Pointer Cursor Arrow (Matching Image 2 exactly)
      const addAngledCursor = (
        tipX: number,
        tipY: number,
        scale = 1.2,
        fillCount = 380,
        r = DARK_R,
        g = DARK_G,
        b = DARK_B
      ) => {
        const angle = -0.42; // ~-25 degrees tilt
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const rawPts: [number, number][] = [
          [0, 0],
          [0, 32 * scale],
          [8 * scale, 24 * scale],
          [15 * scale, 38 * scale],
          [20 * scale, 35 * scale],
          [13 * scale, 21 * scale],
          [23 * scale, 21 * scale],
        ];

        const pts = rawPts.map(([px, py]) => {
          const rx = px * cosA - py * sinA;
          const ry = px * sinA + py * cosA;
          return [tipX + rx, tipY + ry] as [number, number];
        });

        for (let i = 0; i < pts.length; i++) {
          const next = (i + 1) % pts.length;
          addDenseLine(pts[i][0], pts[i][1], pts[next][0], pts[next][1], 25, 2.4, r, g, b, 1.0, 2.7);
        }

        for (let k = 0; k < fillCount && pIdx < PARTICLE_COUNT; k++) {
          const u = Math.random();
          const v = Math.random();
          if (u + v <= 1.25) {
            const px = u * 20 * scale;
            const py = (u * 0.3 + v * 0.7) * 32 * scale;
            const rx = px * cosA - py * sinA;
            const ry = px * sinA + py * cosA;
            outX[pIdx] = tipX + rx;
            outY[pIdx] = tipY + ry;
            outR[pIdx] = r;
            outG[pIdx] = g;
            outB[pIdx] = b;
            outAlpha[pIdx] = 1.0;
            outSize[pIdx] = 2.6;
            pIdx++;
          }
        }
      };

      // Helper 7: Right-side drafting tick marks
      const addDraftingTicks = () => {
        const tickX = width - padX * 0.35;
        for (let tk = 0; tk < 5; tk++) {
          const ty = padY + (boxH / 4) * tk;
          addDenseLine(tickX - 8, ty, tickX, ty, 16, 1.8, SLATE_R, SLATE_G, SLATE_B, 0.45, 1.8);
        }
      };

      addDraftingTicks();

      // =========================================================================
      // Render the 6 UNIQUE, SECTION-SPECIFIC Architectural Blueprints
      // =========================================================================
      switch (tabIdx % 6) {
        case 0:
        default: {
          // =====================================================================
          // 01. RESILIENCE: Offline-First SQLite Engine & Outbox Sync (ap-silang)
          // =====================================================================
          // Left Side: Monumental Local SQLite Storage Engine (Full-scale cylinder stack)
          const cylCx = cx - boxW * 0.23;
          const cylCy = cy;
          const cylW = boxW * 0.38;
          const cylH = boxH * 0.74;
          const dw = cylW / 2;
          const dh = 24;

          const dTopY = cylCy - cylH * 0.36;
          const dMidY = cylCy - cylH * 0.04;
          const dBotY = cylCy + cylH * 0.36;

          // Cylinder Discs
          addDenseArc(cylCx, dBotY, dw, dh, 0, Math.PI, 180, 2.6, DARK_R, DARK_G, DARK_B, 0.95, 2.6);
          addDenseArc(cylCx, dMidY, dw, dh, 0, Math.PI, 180, 2.6, DARK_R, DARK_G, DARK_B, 0.95, 2.6);
          addDenseArc(cylCx, dTopY, dw, dh, 0, Math.PI * 2, 280, 2.6, DARK_R, DARK_G, DARK_B, 0.95, 2.6);

          // Vertical Cylinder Walls
          addDenseLine(cylCx - dw, dTopY, cylCx - dw, dBotY, 180, 2.6, DARK_R, DARK_G, DARK_B, 0.95, 2.6);
          addDenseLine(cylCx + dw, dTopY, cylCx + dw, dBotY, 180, 2.6, DARK_R, DARK_G, DARK_B, 0.95, 2.6);

          // Solid Royal Blue Local Commit Stratum Fill (The middle tier commits in < 4ms)
          const fillLeft = cylCx - dw + 4;
          const fillW = cylW - 8;
          const fillTop = dMidY;
          const fillH = dBotY - dMidY - 4;
          for (let k = 0; k < 1250 && pIdx < PARTICLE_COUNT; k++) {
            outX[pIdx] = fillLeft + Math.random() * fillW;
            outY[pIdx] = fillTop + Math.random() * fillH;
            outR[pIdx] = BLUE_R;
            outG[pIdx] = BLUE_G;
            outB[pIdx] = BLUE_B;
            outAlpha[pIdx] = 0.98;
            outSize[pIdx] = 2.5;
            pIdx++;
          }

          // Commit Checkmark Badge on Local Database Core
          addDenseLine(cylCx - 16, dMidY + fillH * 0.45, cylCx - 4, dMidY + fillH * 0.65, 45, 3.2, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.0);
          addDenseLine(cylCx - 4, dMidY + fillH * 0.65, cylCx + 20, dMidY + fillH * 0.35, 75, 3.2, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.0);

          // Right Side: Mutation Outbox Buffer Queue (3 stacked data cards)
          const qCx = cx + boxW * 0.25;
          const qW = boxW * 0.38;
          const qH = (cylH - 24) / 3;

          for (let q = 0; q < 3; q++) {
            const cardY = cylCy - cylH / 2 + qH / 2 + q * (qH + 12);
            addRoundedCard(qCx, cardY, qW, qH, 10, 110, false);
            // 2 Dense text skeleton bars in each outbox packet
            addDenseSkeletonBar(qCx - qW * 0.42, cardY - 6, qW * 0.76, 8);
            addDenseSkeletonBar(qCx - qW * 0.42, cardY + 8, qW * 0.46, 8);
          }

          // Center Bridge: Wireless Cellular Sync Radio Waves & Conduits
          const bridgeY = cylCy;
          addDenseArc(cx, bridgeY - 30, 24, 18, Math.PI * 1.15, Math.PI * 1.85, 60, 2.4, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.8);
          addDenseArc(cx, bridgeY - 30, 42, 32, Math.PI * 1.18, Math.PI * 1.82, 90, 2.6, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.8);
          addDenseArc(cx, bridgeY - 30, 60, 46, Math.PI * 1.22, Math.PI * 1.78, 120, 2.8, LIGHT_BLUE_R, LIGHT_BLUE_G, LIGHT_BLUE_B, 1.0, 3.0);

          // Directional Sync Conduits connecting SQLite to Outbox Queue
          addDenseLine(cylCx + dw, cylCy + 15, qCx - qW / 2, cylCy + 15, 60, 2.6, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.6);
          addDenseLine(cylCx + dw, cylCy - 30, qCx - qW / 2, cylCy - 30, 60, 2.6, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.6);
          break;
        }

        case 1: {
          // =====================================================================
          // 02. SECURITY: Grand Cryptographic Vault Fortress & RLS Schemas
          // =====================================================================
          // Center: Monumental Cryptographic Vault Padlock Core
          const vCx = cx;
          const vCy = cy + 18;
          const vW = boxW * 0.36; // Padlock body width
          const vH = boxH * 0.52; // Padlock body height
          const shackleR = vW * 0.34;
          const shackleBaseY = vCy - vH / 2;

          // Hardened Heavy Locking Shackle (U-arch)
          addDenseArc(vCx, shackleBaseY, shackleR, shackleR * 1.2, Math.PI, Math.PI * 2, 280, 3.2, DARK_R, DARK_G, DARK_B, 0.96, 2.8);
          addDenseArc(vCx, shackleBaseY, shackleR - 16, (shackleR - 16) * 1.2, Math.PI, Math.PI * 2, 220, 2.8, DARK_R, DARK_G, DARK_B, 0.96, 2.8);
          addDenseLine(vCx - shackleR, shackleBaseY, vCx - shackleR, shackleBaseY + 24, 50, 3.0, DARK_R, DARK_G, DARK_B, 0.96, 2.8);
          addDenseLine(vCx + shackleR, shackleBaseY, vCx + shackleR, shackleBaseY + 24, 50, 3.0, DARK_R, DARK_G, DARK_B, 0.96, 2.8);

          // Padlock Body Container
          addRoundedCard(vCx, vCy, vW, vH, 14, 180, false);

          // Solid Royal Blue Vault Keyhole Core (Massive glowing core)
          const coreW = vW * 0.72;
          const coreH = vH * 0.68;
          for (let k = 0; k < 1200 && pIdx < PARTICLE_COUNT; k++) {
            outX[pIdx] = vCx - coreW / 2 + Math.random() * coreW;
            outY[pIdx] = vCy - coreH / 2 + Math.random() * coreH;
            outR[pIdx] = BLUE_R;
            outG[pIdx] = BLUE_G;
            outB[pIdx] = BLUE_B;
            outAlpha[pIdx] = 0.98;
            outSize[pIdx] = 2.5;
            pIdx++;
          }

          // Vault Keyhole Silhouette in crisp white
          addDenseArc(vCx, vCy - 12, 14, 14, 0, Math.PI * 2, 90, 2.8, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.0);
          addDenseLine(vCx - 8, vCy - 12, vCx - 14, vCy + 26, 45, 3.0, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.0);
          addDenseLine(vCx + 8, vCy - 12, vCx + 14, vCy + 26, 45, 3.0, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.0);
          addDenseLine(vCx - 14, vCy + 26, vCx + 14, vCy + 26, 45, 3.0, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.0);

          // Flanking Left & Right: Multi-Tenant Relational Schema Tables
          const tW = boxW * 0.25;
          const tH = boxH * 0.72;
          const leftTx = cx - boxW * 0.35;
          const rightTx = cx + boxW * 0.35;

          // Left Table (Clinic 01 Isolation)
          addRoundedCard(leftTx, cy, tW, tH, 10, 140, false);
          for (let row = 0; row < 5; row++) {
            const ry = cy - tH / 2 + 28 + row * 34;
            addDenseSkeletonBar(leftTx - tW * 0.42, ry, tW * 0.84, 8);
          }

          // Right Table (Legal Audit Matrix)
          addRoundedCard(rightTx, cy, tW, tH, 10, 140, false);
          for (let row = 0; row < 5; row++) {
            const ry = cy - tH / 2 + 28 + row * 34;
            addDenseSkeletonBar(rightTx - tW * 0.42, ry, tW * 0.84, 8);
          }

          // Primary Key / RLS Connectors
          addDenseLine(leftTx + tW / 2, vCy, vCx - vW / 2, vCy, 60, 2.4, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.6);
          addDenseLine(rightTx - tW / 2, vCy, vCx + vW / 2, vCy, 60, 2.4, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.6);
          break;
        }

        case 2: {
          // =====================================================================
          // 03. REAL-TIME: Emergency Dispatch Radar Terminal (Bicol Medical Center)
          // =====================================================================
          // Center Radar Scope (Expansive 3-ring circular radar filling ~88% height)
          const radCx = cx;
          const radCy = cy;
          const R3 = boxH * 0.44;
          const R2 = boxH * 0.29;
          const R1 = boxH * 0.15;

          addDenseArc(radCx, radCy, R1, R1, 0, Math.PI * 2, 220, 2.2, DARK_R, DARK_G, DARK_B, 0.9, 2.5);
          addDenseArc(radCx, radCy, R2, R2, 0, Math.PI * 2, 380, 2.4, DARK_R, DARK_G, DARK_B, 0.9, 2.5);
          addDenseArc(radCx, radCy, R3, R3, 0, Math.PI * 2, 560, 2.8, DARK_R, DARK_G, DARK_B, 0.96, 2.6);

          // Azimuth Calibration Ticks around Perimeter
          for (let a = 0; a < 12; a++) {
            const ang = (a * Math.PI) / 6;
            const x1 = radCx + Math.cos(ang) * R3;
            const y1 = radCy + Math.sin(ang) * R3;
            const x2 = radCx + Math.cos(ang) * (R3 + 12);
            const y2 = radCy + Math.sin(ang) * (R3 + 12);
            addDenseLine(x1, y1, x2, y2, 20, 2.4, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.8);
          }

          // Coordinate Crosshairs (Dashed)
          addDenseLine(radCx - R3 - 8, radCy, radCx + R3 + 8, radCy, 140, 1.8, SLATE_R, SLATE_G, SLATE_B, 0.5, 2.0);
          addDenseLine(radCx, radCy - R3 - 8, radCx, radCy + R3 + 8, 140, 1.8, SLATE_R, SLATE_G, SLATE_B, 0.5, 2.0);

          // Solid Royal Blue Hospital Emergency Cross Beacon Core
          const beaconR = 38;
          for (let k = 0; k < 1200 && pIdx < PARTICLE_COUNT; k++) {
            const ang = Math.random() * Math.PI * 2;
            const rad = Math.sqrt(Math.random()) * beaconR;
            outX[pIdx] = radCx + Math.cos(ang) * rad;
            outY[pIdx] = radCy + Math.sin(ang) * rad;
            outR[pIdx] = BLUE_R;
            outG[pIdx] = BLUE_G;
            outB[pIdx] = BLUE_B;
            outAlpha[pIdx] = 0.98;
            outSize[pIdx] = 2.5;
            pIdx++;
          }

          // White Hospital Cross inside Beacon Core
          addDenseLine(radCx, radCy - 20, radCx, radCy + 20, 55, 6.0, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.4);
          addDenseLine(radCx - 20, radCy, radCx + 20, radCy, 55, 6.0, WHITE_R, WHITE_G, WHITE_B, 1.0, 3.4);

          // Sweeping Radar Vector Beam (Scanning at 42°)
          const sweepAng = 0.73;
          const sx = radCx + Math.cos(sweepAng) * R3;
          const sy = radCy - Math.sin(sweepAng) * R3;
          addDenseLine(radCx, radCy, sx, sy, 150, 3.2, BLUE_R, BLUE_G, BLUE_B, 1.0, 3.0);

          // Active Verified Donor & Blood Reserve Target Blips
          const targets = [
            [radCx + R2 * 0.78, radCy - R2 * 0.62],
            [radCx - R2 * 0.82, radCy + R2 * 0.45],
            [radCx + R1 * 1.35, radCy + R1 * 1.25],
            [radCx - R3 * 0.72, radCy - R3 * 0.58],
          ];
          targets.forEach(([tx, ty], tIdx) => {
            addDenseArc(tx, ty, 6, 6, 0, Math.PI * 2, 35, 2.4, BLUE_R, BLUE_G, BLUE_B, 1.0, 3.0);
            addDenseArc(tx, ty, 14, 14, 0, Math.PI * 2, 45, 2.0, BLUE_R, BLUE_G, BLUE_B, 0.8, 2.4);
            // Telemetry line to peripheral label
            if (tIdx === 0) {
              addDenseLine(tx, ty, tx + 40, ty - 20, 25, 2.0, BLUE_R, BLUE_G, BLUE_B, 1.0, 2.4);
              addDenseSkeletonBar(tx + 40, ty - 24, 50, 6);
            }
          });
          break;
        }

        case 3: {
          // =====================================================================
          // 04. SYSTEMS: Grand Hexagonal Distributed Micro-Engine Network
          // =====================================================================
          // Center: Large Hexagonal Core State Engine Hub
          const netCx = cx;
          const netCy = cy;
          const hexR = 52; // Center hub radius

          // Solid Royal Blue Central Hub Fill
          for (let k = 0; k < 1300 && pIdx < PARTICLE_COUNT; k++) {
            const ang = Math.random() * Math.PI * 2;
            const rad = Math.sqrt(Math.random()) * hexR;
            outX[pIdx] = netCx + Math.cos(ang) * rad;
            outY[pIdx] = netCy + Math.sin(ang) * rad;
            outR[pIdx] = BLUE_R;
            outG[pIdx] = BLUE_G;
            outB[pIdx] = BLUE_B;
            outAlpha[pIdx] = 0.98;
            outSize[pIdx] = 2.5;
            pIdx++;
          }

          // Hexagon outline & core processor matrix
          for (let h = 0; h < 6; h++) {
            const a1 = (h * Math.PI) / 3;
            const a2 = ((h + 1) * Math.PI) / 3;
            addDenseLine(
              netCx + Math.cos(a1) * hexR,
              netCy + Math.sin(a1) * hexR,
              netCx + Math.cos(a2) * hexR,
              netCy + Math.sin(a2) * hexR,
              55,
              2.6,
              WHITE_R,
              WHITE_G,
              WHITE_B,
              1.0,
              2.8
            );
          }
          addDenseLine(netCx - 22, netCy, netCx + 22, netCy, 45, 2.4, WHITE_R, WHITE_G, WHITE_B, 1.0, 2.8);
          addDenseLine(netCx, netCy - 22, netCx, netCy + 22, 45, 2.4, WHITE_R, WHITE_G, WHITE_B, 1.0, 2.8);

          // 6 Satellite Service Modules (Hexagonal Constellation)
          const R_net = boxH * 0.40;
          const satW = boxW * 0.20;
          const satH = boxH * 0.18;

          for (let s = 0; s < 6; s++) {
            const sAng = (s * Math.PI) / 3;
            const sx = netCx + Math.cos(sAng) * R_net;
            const sy = netCy + Math.sin(sAng) * R_net;

            // Module card container
            addRoundedCard(sx, sy, satW, satH, 8, 90, false);
            addDenseSkeletonBar(sx - satW * 0.4, sy - 4, satW * 0.8, 6);

            // Double-Conduit Bus Line to Central Hub
            addDenseLine(netCx, netCy, sx, sy, 70, 2.6, BLUE_R, BLUE_G, BLUE_B, 0.95, 2.6);

            // Directional Chevron pulse
            const midX = (netCx + sx) / 2;
            const midY = (netCy + sy) / 2;
            addDenseArc(midX, midY, 5, 5, 0, Math.PI * 2, 20, 2.2, BLUE_R, BLUE_G, BLUE_B, 1.0, 3.0);
          }

          // Fault-Domain Boundary Brackets [ ... ]
          const brW = boxW * 0.44;
          const brH = boxH * 0.44;
          addDenseLine(netCx - brW, netCy - brH + 30, netCx - brW, netCy - brH, 50, 2.4, BLUE_R, BLUE_G, BLUE_B, 0.9, 2.6);
          addDenseLine(netCx - brW, netCy - brH, netCx - brW + 30, netCy - brH, 50, 2.4, BLUE_R, BLUE_G, BLUE_B, 0.9, 2.6);
          addDenseLine(netCx + brW, netCy + brH - 30, netCx + brW, netCy + brH, 50, 2.4, BLUE_R, BLUE_G, BLUE_B, 0.9, 2.6);
          addDenseLine(netCx + brW, netCy + brH, netCx + brW - 30, netCy + brH, 50, 2.4, BLUE_R, BLUE_G, BLUE_B, 0.9, 2.6);
          break;
        }

        case 4: {
          // =====================================================================
          // 05. VELOCITY: Monumental 260° Tachometer & Sub-4ms Oscilloscope Wave
          // =====================================================================
          // Upper / Center: Grand 260° Speedometer Dial (Radius 165px)
          const gCx = cx;
          const gCy = cy - boxH * 0.06;
          const R_gauge = boxH * 0.40;
          const startRad = (140 * Math.PI) / 180;
          const endRad = (400 * Math.PI) / 180;

          // Dial Arcs
          addDenseArc(gCx, gCy, R_gauge, R_gauge, startRad, endRad, 440, 2.8, DARK_R, DARK_G, DARK_B, 0.96, 2.8);
          addDenseArc(gCx, gCy, R_gauge - 14, R_gauge - 14, startRad, endRad, 340, 2.0, SLATE_R, SLATE_G, SLATE_B, 0.5, 2.2);

          // Major and Minor Calibration Ticks
          for (let deg = 140; deg <= 400; deg += 15) {
            const ang = (deg * Math.PI) / 180;
            const isRedline = deg >= 340;
            const tickLen = deg % 30 === 0 ? 18 : 10;
            const x1 = gCx + Math.cos(ang) * (R_gauge - tickLen);
            const y1 = gCy + Math.sin(ang) * (R_gauge - tickLen);
            const x2 = gCx + Math.cos(ang) * R_gauge;
            const y2 = gCy + Math.sin(ang) * R_gauge;
            addDenseLine(
              x1,
              y1,
              x2,
              y2,
              18,
              2.4,
              isRedline ? BLUE_R : DARK_R,
              isRedline ? BLUE_G : DARK_G,
              isRedline ? BLUE_B : DARK_B,
              1.0,
              isRedline ? 3.0 : 2.4
            );
          }

          // Solid Royal Blue Redline Hyper-Speed Sector (from 340° to 400°)
          for (let k = 0; k < 1000 && pIdx < PARTICLE_COUNT; k++) {
            const ang = ((340 + Math.random() * 60) * Math.PI) / 180;
            const rad = R_gauge - 22 + Math.random() * 28;
            outX[pIdx] = gCx + Math.cos(ang) * rad;
            outY[pIdx] = gCy + Math.sin(ang) * rad;
            outR[pIdx] = BLUE_R;
            outG[pIdx] = BLUE_G;
            outB[pIdx] = BLUE_B;
            outAlpha[pIdx] = 0.98;
            outSize[pIdx] = 2.5;
            pIdx++;
          }

          // Massive Velocity Needle Pinned at Max Speed (365°)
          const needleAng = (365 * Math.PI) / 180;
          const tipX = gCx + Math.cos(needleAng) * (R_gauge * 0.95);
          const tipY = gCy + Math.sin(needleAng) * (R_gauge * 0.95);
          addDenseLine(gCx, gCy, tipX, tipY, 190, 4.0, BLUE_R, BLUE_G, BLUE_B, 1.0, 3.6);

          // Solid Pivot Hub
          addDenseArc(gCx, gCy, 16, 16, 0, Math.PI * 2, 90, 2.8, DARK_R, DARK_G, DARK_B, 1.0, 3.2);
          addDenseArc(gCx, gCy, 7, 7, 0, Math.PI * 2, 45, 2.4, BLUE_R, BLUE_G, BLUE_B, 1.0, 3.0);

          // Lower: Sub-4ms Oscilloscope Transient Waveform
          const waveY = cy + boxH * 0.40;
          const wLeft = cx - boxW * 0.44;
          const burstStart = cx - boxW * 0.12;
          const burstEnd = cx + boxW * 0.18;
          const wRight = cx + boxW * 0.44;

          addDenseLine(wLeft, waveY, burstStart, waveY, 100, 2.2, DARK_R, DARK_G, DARK_B, 0.7, 2.4);

          // Transient Commit Impulse Spike
          const burstCount = 450;
          for (let b = 0; b < burstCount && pIdx < PARTICLE_COUNT; b++) {
            const t = b / burstCount;
            const bx = burstStart + t * (burstEnd - burstStart);
            const osc = Math.sin(t * Math.PI * 18);
            const env = Math.exp(-t * 4.2);
            const by = waveY - osc * (boxH * 0.24) * env;
            outX[pIdx] = bx;
            outY[pIdx] = by;
            outR[pIdx] = BLUE_R;
            outG[pIdx] = BLUE_G;
            outB[pIdx] = BLUE_B;
            outAlpha[pIdx] = 1.0;
            outSize[pIdx] = 2.8;
            pIdx++;
          }

          addDenseLine(burstEnd, waveY, wRight, waveY, 100, 2.2, DARK_R, DARK_G, DARK_B, 0.7, 2.4);
          break;
        }

        case 5: {
          // =====================================================================
          // 06. DESIGN: Clean 3x2 Modular Card Grid & Solid Active Card with Cursor
          // =====================================================================
          // 3x2 Modular Card Grid Layout spanning full height
          const gridTop = padY;
          const gridH = boxH;
          const cols = 3;
          const rows = 2;
          const colGap = 16;
          const rowGap = 16;
          const cardW = (boxW - (cols - 1) * colGap) / cols;
          const cardH = (gridH - (rows - 1) * rowGap) / rows;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const cardCx = padX + cardW / 2 + c * (cardW + colGap);
              const cardCy = gridTop + cardH / 2 + r * (cardH + rowGap);
              const isActive = r === 1 && c === 1; // Center-bottom active blue card

              if (!isActive) {
                // Regular Card: Outline + 2 Dense Solid Text Skeleton Bars
                addRoundedCard(cardCx, cardCy, cardW, cardH, 14, 160, false);
                const barLeft = cardCx - cardW * 0.42;
                const barY1 = cardCy + cardH * 0.12;
                const barY2 = cardCy + cardH * 0.28;
                addDenseSkeletonBar(barLeft, barY1, cardW * 0.76, 10);
                addDenseSkeletonBar(barLeft, barY2, cardW * 0.44, 10);
              } else {
                // Active Card: SOLID FILLED ROYAL COBALT BLUE TEXTURE
                addRoundedCard(cardCx, cardCy, cardW, cardH, 14, 160, true, 1400);

                // Large crisp Classic Angled Black Mouse Pointer Cursor Arrow overlaid on active card
                addAngledCursor(cardCx + cardW * 0.06, cardCy - cardH * 0.04, 1.35, 450);
              }
            }
          }
          break;
        }
      }

      // Distribute any remaining particles cleanly onto primary contours (Zero random dust)
      let contourIdx = 0;
      const validPoints = Math.max(1, pIdx);
      while (pIdx < PARTICLE_COUNT) {
        const src = contourIdx % validPoints;
        outX[pIdx] = outX[src] + (Math.random() - 0.5) * 0.8;
        outY[pIdx] = outY[src] + (Math.random() - 0.5) * 0.8;
        outR[pIdx] = outR[src];
        outG[pIdx] = outG[src];
        outB[pIdx] = outB[src];
        outAlpha[pIdx] = outAlpha[src];
        outSize[pIdx] = outSize[src];
        pIdx++;
        contourIdx++;
      }
    },
    []
  );

  // Handle Tab Change Transition Trigger
  useEffect(() => {
    if (transitionRef.current.toTab === activeTab) return;

    const canvas = canvasRef.current;
    const buffers = buffersRef.current;
    if (!canvas || !buffers) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Save actual live rendered positions and attributes as transition origins
    buffers.originX.set(buffers.liveX);
    buffers.originY.set(buffers.liveY);
    buffers.originR.set(buffers.targetR);
    buffers.originG.set(buffers.targetG);
    buffers.originB.set(buffers.targetB);
    buffers.originAlpha.set(buffers.targetAlpha);
    buffers.originSize.set(buffers.targetSize);

    // Compute new target geometry
    generateShape(
      activeTab,
      width,
      height,
      buffers.targetX,
      buffers.targetY,
      buffers.targetR,
      buffers.targetG,
      buffers.targetB,
      buffers.targetAlpha,
      buffers.targetSize
    );

    // Snappy 320ms morph duration
    transitionRef.current = {
      fromTab: transitionRef.current.toTab,
      toTab: activeTab,
      progress: 0,
      duration: 320,
      startTime: performance.now(),
    };
  }, [activeTab, generateShape]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isRunning = true;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const buffers = buffersRef.current;
      if (buffers && buffers.targetR) {
        generateShape(
          activeTab,
          rect.width,
          rect.height,
          buffers.targetX,
          buffers.targetY,
          buffers.targetR,
          buffers.targetG,
          buffers.targetB,
          buffers.targetAlpha,
          buffers.targetSize
        );
        buffers.originX.set(buffers.targetX);
        buffers.originY.set(buffers.targetY);
        buffers.liveX.set(buffers.targetX);
        buffers.liveY.set(buffers.targetY);

        buffers.originR.set(buffers.targetR);
        buffers.originG.set(buffers.targetG);
        buffers.originB.set(buffers.targetB);
        buffers.originAlpha.set(buffers.targetAlpha);
        buffers.originSize.set(buffers.targetSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pointer events on canvas
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.targetX = e.clientX - rect.left;
      pointerRef.current.targetY = e.clientY - rect.top;
      pointerRef.current.targetRadius = pointerRef.current.maxRadius;
      pointerRef.current.isHovered = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.targetRadius = 0;
      pointerRef.current.isHovered = false;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handlePointerMove);

    const render = (time: number) => {
      if (!isRunning) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const buffers = buffersRef.current;
      const trans = transitionRef.current;
      const pointer = pointerRef.current;

      // Update transition progress
      if (trans.progress < 1) {
        const elapsed = time - trans.startTime;
        trans.progress = Math.min(1, elapsed / trans.duration);
      }

      // Smooth pointer spring easing
      pointer.currX += (pointer.targetX - pointer.currX) * 0.18;
      pointer.currY += (pointer.targetY - pointer.currY) * 0.18;
      pointer.currRadius += (pointer.targetRadius - pointer.currRadius) * 0.14;

      const t = trans.progress;
      // Scatter envelope: peaks at mid-transition (t=0.5), completely reaches 0 at t=1
      const scatterEnvelope = t >= 1 ? 0 : Math.pow(Math.sin(Math.PI * t), 1.8);
      const easeT = t >= 1 ? 1 : t * t * (3 - 2 * t);

      if (buffers && buffers.targetR) {
        const {
          liveX,
          liveY,
          originX,
          originY,
          targetX,
          targetY,
          scatterDx,
          scatterDy,
          originR,
          originG,
          originB,
          targetR,
          targetG,
          targetB,
          originAlpha,
          targetAlpha,
          originSize,
          targetSize,
        } = buffers;

        const pRadius = pointer.currRadius;
        const pRadiusSq = pRadius * pRadius;
        const coreRadius = 24;
        const px = pointer.currX;
        const py = pointer.currY;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let x = (1 - easeT) * originX[i] + easeT * targetX[i] + scatterDx[i] * scatterEnvelope;
          let y = (1 - easeT) * originY[i] + easeT * targetY[i] + scatterDy[i] * scatterEnvelope;

          // Interactive Gravitational Singularity (Warp)
          if (pRadius > 1) {
            const dx = x - px;
            const dy = y - py;
            const distSq = dx * dx + dy * dy;

            if (distSq < pRadiusSq) {
              const dist = Math.sqrt(distSq);

              if (dist < coreRadius) {
                const repelFactor = (coreRadius - dist) * 0.7;
                x += (dx / (dist || 1)) * repelFactor;
                y += (dy / (dist || 1)) * repelFactor;
              } else {
                const u = 1 - (dist - coreRadius) / (pRadius - coreRadius);
                const warp = Math.pow(u, 2) * 36;
                x += (dx / dist) * warp;
                y += (dy / dist) * warp;
              }
            }
          }

          // Save live position to eliminate animation jumping
          liveX[i] = x;
          liveY[i] = y;

          // Dynamic smooth interpolation of size, alpha, and color during morph
          const curSize = (1 - easeT) * originSize[i] + easeT * targetSize[i];
          const curAlpha = (1 - easeT) * originAlpha[i] + easeT * targetAlpha[i];
          const curR = (1 - easeT) * originR[i] + easeT * targetR[i];
          const curG = (1 - easeT) * originG[i] + easeT * targetG[i];
          const curB = (1 - easeT) * originB[i] + easeT * targetB[i];

          // Render stippled particle dot
          const pAlpha = curAlpha * (0.65 + (1 - scatterEnvelope) * 0.35);
          const pSize = curSize;

          const r = Math.round(curR * 255);
          const g = Math.round(curG * 255);
          const b = Math.round(curB * 255);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pAlpha.toFixed(2)})`;
          ctx.fillRect(x - pSize / 2, y - pSize / 2, pSize, pSize);
        }

        // Draw Gravitational Singularity Black Dot & Event Horizon
        if (pointer.currRadius > 6) {
          ctx.beginPath();
          ctx.arc(pointer.currX, pointer.currY, 6.5, 0, Math.PI * 2);
          ctx.fillStyle = '#060a18';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pointer.currX, pointer.currY, coreRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(10, 18, 42, 0.15)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerMove);
    };
  }, [activeTab, generateShape]);

  return (
    <div className={`relative w-full aspect-[16/11] max-h-[500px] select-none ${className}`}>
      {/* Seamless, borderless canvas floating directly on the section background */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair touch-none"
      />
    </div>
  );
}
