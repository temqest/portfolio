'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export interface KineticGridCanvasProps {
  activeTab: number;
  className?: string;
  accentColor?: string;
}

const PARTICLE_COUNT = 3400;

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
    duration: 300, // snappy 300ms duration
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

  // Typed Arrays for particle buffers (Zero GC overhead)
  const buffersRef = useRef<{
    liveX: Float32Array;
    liveY: Float32Array;
    originX: Float32Array;
    originY: Float32Array;
    targetX: Float32Array;
    targetY: Float32Array;
    scatterDx: Float32Array;
    scatterDy: Float32Array;
    colorR: Float32Array;
    colorG: Float32Array;
    colorB: Float32Array;
    alpha: Float32Array;
    size: Float32Array;
  } | null>(null);

  // Initialize particle buffers once
  if (!buffersRef.current) {
    const liveX = new Float32Array(PARTICLE_COUNT);
    const liveY = new Float32Array(PARTICLE_COUNT);
    const originX = new Float32Array(PARTICLE_COUNT);
    const originY = new Float32Array(PARTICLE_COUNT);
    const targetX = new Float32Array(PARTICLE_COUNT);
    const targetY = new Float32Array(PARTICLE_COUNT);
    const scatterDx = new Float32Array(PARTICLE_COUNT);
    const scatterDy = new Float32Array(PARTICLE_COUNT);
    const colorR = new Float32Array(PARTICLE_COUNT);
    const colorG = new Float32Array(PARTICLE_COUNT);
    const colorB = new Float32Array(PARTICLE_COUNT);
    const alpha = new Float32Array(PARTICLE_COUNT);
    const size = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Moderate radial scatter trajectories
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 90;
      scatterDx[i] = Math.cos(angle) * speed;
      scatterDy[i] = Math.sin(angle) * speed;

      // Default charcoal
      colorR[i] = 0.08;
      colorG[i] = 0.1;
      colorB[i] = 0.16;
      alpha[i] = 0.65;
      size[i] = 1.1;
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
      colorR,
      colorG,
      colorB,
      alpha,
      size,
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
      outB: Float32Array
    ) => {
      const padX = width * 0.08;
      const padY = height * 0.08;
      const boxW = width - padX * 2;
      const boxH = height - padY * 2;
      const cx = width / 2;
      const cy = height / 2;

      let pIdx = 0;

      // Helper: sample points along a line segment with stippling jitter
      const addLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        count: number,
        r = 0.1,
        g = 0.12,
        b = 0.18
      ) => {
        for (let k = 0; k < count && pIdx < PARTICLE_COUNT; k++) {
          const t = k / count;
          // Clean subtle micro-stippling jitter (0.8px max)
          const jitX = (Math.random() - 0.5) * 0.9;
          const jitY = (Math.random() - 0.5) * 0.9;
          outX[pIdx] = x1 + (x2 - x1) * t + jitX;
          outY[pIdx] = y1 + (y2 - y1) * t + jitY;
          outR[pIdx] = r;
          outG[pIdx] = g;
          outB[pIdx] = b;
          pIdx++;
        }
      };

      // Helper: sample points along a cubic Bezier curve with control points
      const addBezier = (
        p0: [number, number],
        p1: [number, number],
        p2: [number, number],
        p3: [number, number],
        count: number,
        r: number,
        g: number,
        b: number
      ) => {
        for (let k = 0; k < count && pIdx < PARTICLE_COUNT; k++) {
          const t = k / count;
          const u = 1 - t;
          const tt = t * t;
          const uu = u * u;
          const uuu = uu * u;
          const ttt = tt * t;

          const bx = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
          const by = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];

          outX[pIdx] = bx + (Math.random() - 0.5) * 0.8;
          outY[pIdx] = by + (Math.random() - 0.5) * 0.8;
          outR[pIdx] = r;
          outG[pIdx] = g;
          outB[pIdx] = b;
          pIdx++;
        }
      };

      // Helper: sample points forming a cluster / circle / box marker
      const addMarker = (
        mx: number,
        my: number,
        radius: number,
        isSquare: boolean,
        count: number,
        r = 0.08,
        g = 0.08,
        b = 0.08
      ) => {
        for (let k = 0; k < count && pIdx < PARTICLE_COUNT; k++) {
          let ox = 0;
          let oy = 0;
          if (isSquare) {
            ox = (Math.random() - 0.5) * radius * 2;
            oy = (Math.random() - 0.5) * radius * 2;
          } else {
            const ang = Math.random() * Math.PI * 2;
            const rad = Math.sqrt(Math.random()) * radius;
            ox = Math.cos(ang) * rad;
            oy = Math.sin(ang) * rad;
          }
          outX[pIdx] = mx + ox;
          outY[pIdx] = my + oy;
          outR[pIdx] = r;
          outG[pIdx] = g;
          outB[pIdx] = b;
          pIdx++;
        }
      };

      switch (tabIdx % 6) {
        case 0:
        default: {
          // --- SHAPE 0: Reference Bezier Coordinate Grid (Design / Offline) ---
          const cols = 12;
          const rows = 8;
          const perCol = 50;
          const perRow = 40;

          for (let c = 0; c <= cols; c++) {
            const gx = padX + (boxW / cols) * c;
            addLine(gx, padY, gx, padY + boxH, perCol);
          }
          for (let r = 0; r <= rows; r++) {
            const gy = padY + (boxH / rows) * r;
            addLine(padX, gy, padX + boxW, gy, perRow);
          }

          const p0: [number, number] = [padX + boxW * 0.08, padY + boxH * 0.88];
          const p1: [number, number] = [padX + boxW * 0.28, padY + boxH * 0.15];
          const p2: [number, number] = [padX + boxW * 0.65, padY + boxH * 0.65];
          const p3: [number, number] = [padX + boxW * 0.92, padY + boxH * 0.18];

          addBezier(p0, p1, p2, p3, 800, 0.36, 0.37, 0.88);
          addLine(p0[0], p0[1], p1[0], p1[1], 120, 0.1, 0.1, 0.1);
          addLine(p3[0], p3[1], p2[0], p2[1], 120, 0.1, 0.1, 0.1);
          addMarker(p0[0], p0[1], 8, true, 60, 0.1, 0.1, 0.1);
          addMarker(p3[0], p3[1], 8, true, 60, 0.1, 0.1, 0.1);
          addMarker(p1[0], p1[1], 6, false, 60, 0.1, 0.1, 0.1);
          addMarker(p2[0], p2[1], 6, false, 60, 0.1, 0.1, 0.1);
          break;
        }

        case 1: {
          // --- SHAPE 1: Relational Schema & Tenant Isolation Matrix (Integrity) ---
          for (let c = 0; c <= 8; c++) {
            const gx = padX + (boxW / 8) * c;
            addLine(gx, padY, gx, padY + boxH, 40, 0.18, 0.2, 0.25);
          }
          for (let r = 0; r <= 6; r++) {
            const gy = padY + (boxH / 6) * r;
            addLine(padX, gy, padX + boxW, gy, 40, 0.18, 0.2, 0.25);
          }

          const tableW = boxW * 0.26;
          const tableH = boxH * 0.38;
          const centers: [number, number][] = [
            [padX + boxW * 0.25, padY + boxH * 0.35],
            [padX + boxW * 0.75, padY + boxH * 0.35],
            [padX + boxW * 0.5, padY + boxH * 0.75],
          ];

          centers.forEach(([tx, ty]) => {
            addLine(tx - tableW / 2, ty - tableH / 2, tx + tableW / 2, ty - tableH / 2, 70, 0.1, 0.1, 0.1);
            addLine(tx + tableW / 2, ty - tableH / 2, tx + tableW / 2, ty + tableH / 2, 70, 0.1, 0.1, 0.1);
            addLine(tx + tableW / 2, ty + tableH / 2, tx - tableW / 2, ty + tableH / 2, 70, 0.1, 0.1, 0.1);
            addLine(tx - tableW / 2, ty + tableH / 2, tx - tableW / 2, ty - tableH / 2, 70, 0.1, 0.1, 0.1);
            addLine(tx - tableW / 2, ty - tableH / 2 + 20, tx + tableW / 2, ty - tableH / 2 + 20, 50, 0.1, 0.1, 0.1);

            for (let row = 1; row <= 4; row++) {
              const ry = ty - tableH / 2 + 20 + row * 16;
              addLine(tx - tableW / 2 + 10, ry, tx + tableW / 2 - 10, ry, 35, 0.36, 0.37, 0.88);
            }

            addMarker(tx, ty - tableH / 2, 6, false, 40, 0.1, 0.1, 0.1);
          });

          addLine(centers[0][0], centers[0][1], centers[2][0], centers[2][1], 160, 0.36, 0.37, 0.88);
          addLine(centers[1][0], centers[1][1], centers[2][0], centers[2][1], 160, 0.36, 0.37, 0.88);
          break;
        }

        case 2: {
          // --- SHAPE 2: Real-time Emergency Dispatch Mesh (Logistics) ---
          for (let c = 0; c <= 8; c++) {
            const gx = padX + (boxW / 8) * c;
            addLine(gx, padY, gx, padY + boxH, 40, 0.18, 0.2, 0.25);
          }
          for (let r = 0; r <= 6; r++) {
            const gy = padY + (boxH / 6) * r;
            addLine(padX, gy, padX + boxW, gy, 40, 0.18, 0.2, 0.25);
          }

          const rings = [
            { rad: boxH * 0.18, count: 280 },
            { rad: boxH * 0.34, count: 380 },
            { rad: boxH * 0.48, count: 480 },
          ];
          rings.forEach(({ rad, count }, rIdx) => {
            for (let k = 0; k < count && pIdx < PARTICLE_COUNT; k++) {
              const th = (k / count) * Math.PI * 2;
              const jit = (Math.random() - 0.5) * 0.9;
              outX[pIdx] = cx + Math.cos(th) * (rad + jit);
              outY[pIdx] = cy + Math.sin(th) * (rad + jit);
              outR[pIdx] = rIdx === 1 ? 0.36 : 0.15;
              outG[pIdx] = rIdx === 1 ? 0.37 : 0.18;
              outB[pIdx] = rIdx === 1 ? 0.88 : 0.24;
              pIdx++;
            }
          });

          const beams = 8;
          for (let b = 0; b < beams; b++) {
            const ang = (b / beams) * Math.PI * 2 + Math.PI / 8;
            const ex = cx + Math.cos(ang) * (boxH * 0.49);
            const ey = cy + Math.sin(ang) * (boxH * 0.49);
            addLine(cx, cy, ex, ey, 70, 0.36, 0.37, 0.88);
            addMarker(ex, ey, 6, true, 30, 0.1, 0.1, 0.1);
          }

          addMarker(cx, cy, 14, false, 120, 0.36, 0.37, 0.88);
          break;
        }

        case 3: {
          // --- SHAPE 3: Architecture & System Onion Layers ---
          // Background grid: 8 cols, 6 rows
          for (let c = 0; c <= 8; c++) {
            const gx = padX + (boxW / 8) * c;
            addLine(gx, padY, gx, padY + boxH, 45, 0.18, 0.2, 0.25);
          }
          for (let r = 0; r <= 6; r++) {
            const gy = padY + (boxH / 6) * r;
            addLine(padX, gy, padX + boxW, gy, 45, 0.18, 0.2, 0.25);
          }

          // 4 concentric onion layers with guaranteed 100% complete sides
          const layers = 4;
          for (let l = 1; l <= layers; l++) {
            const lw = (boxW * 0.82 * l) / layers;
            const lh = (boxH * 0.78 * l) / layers;
            const pts = 110;
            addLine(cx - lw / 2, cy - lh / 2, cx + lw / 2, cy - lh / 2, pts, 0.1, 0.12, 0.18);
            addLine(cx + lw / 2, cy - lh / 2, cx + lw / 2, cy + lh / 2, pts, 0.1, 0.12, 0.18);
            addLine(cx + lw / 2, cy + lh / 2, cx - lw / 2, cy + lh / 2, pts, 0.1, 0.12, 0.18);
            addLine(cx - lw / 2, cy + lh / 2, cx - lw / 2, cy - lh / 2, pts, 0.1, 0.12, 0.18);
          }

          // Crosshairs
          addLine(cx - boxW / 2, cy, cx + boxW / 2, cy, 220, 0.36, 0.37, 0.88);
          addLine(cx, cy - boxH / 2, cx, cy + boxH / 2, 220, 0.36, 0.37, 0.88);
          break;
        }

        case 4: {
          // --- SHAPE 4: Performance & Commit Oscilloscope ---
          const cols = 12;
          const rows = 8;
          for (let c = 0; c <= cols; c++) {
            const gx = padX + (boxW / cols) * c;
            addLine(gx, padY, gx, padY + boxH, 50, 0.15, 0.18, 0.22);
          }
          for (let r = 0; r <= rows; r++) {
            const gy = padY + (boxH / rows) * r;
            addLine(padX, gy, padX + boxW, gy, 40, 0.15, 0.18, 0.22);
          }

          addLine(padX, cy, padX + boxW, cy, 240, 0.18, 0.2, 0.25);

          const samples = 1400;
          for (let s = 0; s < samples && pIdx < PARTICLE_COUNT; s++) {
            const t = s / samples;
            const wx = padX + boxW * t;
            const env = Math.exp(-Math.pow((t - 0.45) * 6, 2));
            const wy = cy + Math.sin(t * Math.PI * 28) * (boxH * 0.36) * env;
            outX[pIdx] = wx + (Math.random() - 0.5) * 0.8;
            outY[pIdx] = wy + (Math.random() - 0.5) * 0.8;
            outR[pIdx] = 0.36;
            outG[pIdx] = 0.37;
            outB[pIdx] = 0.88;
            pIdx++;
          }
          break;
        }

        case 5: {
          // --- SHAPE 5: Design Systems (Nested Component Wireframes & Handles) ---
          for (let c = 0; c <= 8; c++) {
            const gx = padX + (boxW / 8) * c;
            addLine(gx, padY, gx, padY + boxH, 40, 0.18, 0.2, 0.25);
          }
          for (let r = 0; r <= 6; r++) {
            const gy = padY + (boxH / 6) * r;
            addLine(padX, gy, padX + boxW, gy, 40, 0.18, 0.2, 0.25);
          }

          const frameW = [boxW * 0.88, boxW * 0.6, boxW * 0.34];
          const frameH = [boxH * 0.82, boxH * 0.62, boxH * 0.44];
          frameW.forEach((fw, fIdx) => {
            const fh = frameH[fIdx];
            addLine(cx - fw / 2, cy - fh / 2, cx + fw / 2, cy - fh / 2, 90, 0.1, 0.1, 0.1);
            addLine(cx + fw / 2, cy - fh / 2, cx + fw / 2, cy + fh / 2, 90, 0.1, 0.1, 0.1);
            addLine(cx + fw / 2, cy + fh / 2, cx - fw / 2, cy + fh / 2, 90, 0.1, 0.1, 0.1);
            addLine(cx - fw / 2, cy + fh / 2, cx - fw / 2, cy - fh / 2, 90, 0.1, 0.1, 0.1);

            addMarker(cx - fw / 2, cy, 6, true, 40, 0.36, 0.37, 0.88);
            addMarker(cx + fw / 2, cy, 6, true, 40, 0.36, 0.37, 0.88);
          });

          addLine(cx - boxW * 0.44, cy, cx + boxW * 0.44, cy, 180, 0.36, 0.37, 0.88);
          addLine(cx, cy - boxH * 0.41, cx, cy + boxH * 0.41, 180, 0.36, 0.37, 0.88);
          break;
        }
      }

      // Distribute any remaining particles evenly onto the coordinate grid (no random dust, no truncated lines)
      const gridCols = 8;
      const gridRows = 6;
      let gridLine = 0;
      while (pIdx < PARTICLE_COUNT) {
        const isCol = gridLine % 2 === 0;
        const lineIdx = Math.floor(gridLine / 2);
        const t = Math.random();
        if (isCol) {
          const gx = padX + (boxW / gridCols) * (lineIdx % (gridCols + 1));
          outX[pIdx] = gx + (Math.random() - 0.5) * 0.9;
          outY[pIdx] = padY + boxH * t;
        } else {
          const gy = padY + (boxH / gridRows) * (lineIdx % (gridRows + 1));
          outX[pIdx] = padX + boxW * t;
          outY[pIdx] = gy + (Math.random() - 0.5) * 0.9;
        }
        outR[pIdx] = 0.16;
        outG[pIdx] = 0.19;
        outB[pIdx] = 0.24;
        pIdx++;
        gridLine++;
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

    // Save actual live rendered positions as transition origins to eliminate jumping/lag
    buffers.originX.set(buffers.liveX);
    buffers.originY.set(buffers.liveY);

    // Compute new target geometry
    generateShape(
      activeTab,
      width,
      height,
      buffers.targetX,
      buffers.targetY,
      buffers.colorR,
      buffers.colorG,
      buffers.colorB
    );

    // Snappy 300ms transition
    transitionRef.current = {
      fromTab: transitionRef.current.toTab,
      toTab: activeTab,
      progress: 0,
      duration: 300,
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
      if (buffers) {
        generateShape(
          activeTab,
          rect.width,
          rect.height,
          buffers.targetX,
          buffers.targetY,
          buffers.colorR,
          buffers.colorG,
          buffers.colorB
        );
        buffers.originX.set(buffers.targetX);
        buffers.originY.set(buffers.targetY);
        buffers.liveX.set(buffers.targetX);
        buffers.liveY.set(buffers.targetY);
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

      // Update transition progress (Snappy 400ms duration)
      if (trans.progress < 1) {
        const elapsed = time - trans.startTime;
        trans.progress = Math.min(1, elapsed / trans.duration);
      }

      // Smooth pointer spring easing
      pointer.currX += (pointer.targetX - pointer.currX) * 0.18;
      pointer.currY += (pointer.targetY - pointer.currY) * 0.18;
      pointer.currRadius += (pointer.targetRadius - pointer.currRadius) * 0.14;

      const t = trans.progress;
      // Scatter envelope: peaks at 0.5, completely vanishes to 0 at t=1
      const scatterEnvelope = t >= 1 ? 0 : Math.pow(Math.sin(Math.PI * t), 1.8);
      const easeT = t >= 1 ? 1 : t * t * (3 - 2 * t);

      if (buffers) {
        const {
          liveX,
          liveY,
          originX,
          originY,
          targetX,
          targetY,
          scatterDx,
          scatterDy,
          colorR,
          colorG,
          colorB,
          alpha,
          size,
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

          // Render stippled particle dot
          const pAlpha = alpha[i] * (0.55 + (1 - scatterEnvelope) * 0.45);
          const pSize = size[i];

          const r = Math.round(colorR[i] * 255);
          const g = Math.round(colorG[i] * 255);
          const b = Math.round(colorB[i] * 255);

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
          ctx.strokeStyle = 'rgba(10, 18, 42, 0.12)';
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
