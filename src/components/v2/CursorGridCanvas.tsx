'use client';

import React, { useRef, useEffect } from 'react';

interface CursorGridCanvasProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: 'linear' | 'smooth' | 'sharp';
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  className?: string;
}

const FALLOFF_MAP: Record<string, (e: number) => number> = {
  linear: (e: number) => e,
  smooth: (e: number) => e * e * (3 - 2 * e),
  sharp: (e: number) => e * e * e,
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const expanded = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(expanded.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function CursorGridCanvas({
  cellSize = 70,
  color = '#0A122A',
  radius = 140,
  falloff = 'smooth',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0.06,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
}: CursorGridCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
  });

  useEffect(() => {
    propsRef.current = {
      cellSize,
      color,
      radius,
      falloff,
      holdTime,
      fadeDuration,
      lineWidth,
      maxOpacity,
      fillOpacity,
      gridOpacity,
      cellRadius,
      clickPulse,
      pulseSpeed,
    };
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let cellOpacities = new Float32Array(0);
    let cellTimestamps = new Float64Array(0);
    let width = 0;
    let height = 0;
    const pulses: { x: number; y: number; t0: number }[] = [];
    let lastTime = 0;
    let isLooping = false;
    let animId = 0;

    const resize = () => {
      const p = propsRef.current;
      width = container.offsetWidth;
      height = container.offsetHeight;

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / p.cellSize) + 1;
      rows = Math.ceil(height / p.cellSize) + 1;
      offsetX = (width - cols * p.cellSize) / 2;
      offsetY = (height - rows * p.cellSize) / 2;

      cellOpacities = new Float32Array(cols * rows);
      cellTimestamps = new Float64Array(cols * rows);
    };

    const getCellCenter = (index: number): [number, number] => {
      const p = propsRef.current;
      const col = index % cols;
      const row = Math.floor(index / cols);
      return [
        offsetX + col * p.cellSize + p.cellSize / 2,
        offsetY + row * p.cellSize + p.cellSize / 2,
      ];
    };

    const highlightCellsAt = (x: number, y: number, intensity = 1) => {
      const p = propsRef.current;
      const r = Math.max(p.radius, 1);
      const curve = FALLOFF_MAP[p.falloff] || FALLOFF_MAP.smooth;
      const now = performance.now();

      const minCol = Math.max(0, Math.floor((x - r - offsetX) / p.cellSize));
      const maxCol = Math.min(cols - 1, Math.floor((x + r - offsetX) / p.cellSize));
      const minRow = Math.max(0, Math.floor((y - r - offsetY) / p.cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((y + r - offsetY) / p.cellSize));

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const index = row * cols + col;
          const [cx, cy] = getCellCenter(index);
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;

          const factor = curve(1 - dist / r) * p.maxOpacity * intensity;
          if (factor > cellOpacities[index]) {
            cellOpacities[index] = factor;
            cellTimestamps[index] = now;
          } else if (factor > 0) {
            cellTimestamps[index] = now;
          }
        }
      }
    };

    const render = (time: number) => {
      const p = propsRef.current;
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = hexToRgb(p.color);

      // 1. Draw static grid lines if gridOpacity > 0
      if (p.gridOpacity > 0) {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${p.gridOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let col = 0; col <= cols; col++) {
          const lx = Math.round(offsetX + col * p.cellSize) + 0.5;
          ctx.moveTo(lx, 0);
          ctx.lineTo(lx, height);
        }

        for (let row = 0; row <= rows; row++) {
          const ly = Math.round(offsetY + row * p.cellSize) + 0.5;
          ctx.moveTo(0, ly);
          ctx.lineTo(width, ly);
        }

        ctx.stroke();
      }

      // 2. Expand Click Wave Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const currentRadius = ((time - pulse.t0) / 1000) * p.pulseSpeed;

        if (currentRadius > Math.hypot(width, height)) {
          pulses.splice(i, 1);
          continue;
        }

        const half = p.cellSize;
        const minCol = Math.max(0, Math.floor((pulse.x - currentRadius - half - offsetX) / p.cellSize));
        const maxCol = Math.min(cols - 1, Math.floor((pulse.x + currentRadius + half - offsetX) / p.cellSize));
        const minRow = Math.max(0, Math.floor((pulse.y - currentRadius - half - offsetY) / p.cellSize));
        const maxRow = Math.min(rows - 1, Math.floor((pulse.y + currentRadius + half - offsetY) / p.cellSize));

        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            const index = row * cols + col;
            const [cx, cy] = getCellCenter(index);
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);

            if (Math.abs(dist - currentRadius) < p.cellSize / 2) {
              if (p.maxOpacity > cellOpacities[index]) {
                cellOpacities[index] = p.maxOpacity;
                cellTimestamps[index] = time;
              }
            }
          }
        }
      }

      // 3. Draw active/lit square cells
      let hasActive = pulses.length > 0;
      const fadeDelta = dt / Math.max(p.fadeDuration, 16);
      const halfSize = p.cellSize / 2;

      for (let index = 0; index < cellOpacities.length; index++) {
        let opacity = cellOpacities[index];
        if (opacity <= 0) continue;

        if (time - cellTimestamps[index] > p.holdTime) {
          opacity = Math.max(0, opacity - fadeDelta);
          cellOpacities[index] = opacity;
          if (opacity <= 0) continue;
        }

        hasActive = true;
        const [cx, cy] = getCellCenter(index);
        const cellX = cx - halfSize + 0.5;
        const cellY = cy - halfSize + 0.5;
        const size = p.cellSize - 1;

        // Radial glow border for high-end tactile feel
        const grad = ctx.createRadialGradient(cx, cy, halfSize * 0.1, cx, cy, p.cellSize);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        if (p.cellRadius > 0) {
          ctx.roundRect(cellX, cellY, size, size, p.cellRadius);
        } else {
          ctx.rect(cellX, cellY, size, size);
        }

        if (p.fillOpacity > 0) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * p.fillOpacity})`;
          ctx.fill();
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }

      if (hasActive) {
        animId = requestAnimationFrame(render);
      } else {
        isLooping = false;
        if (p.gridOpacity <= 0) ctx.clearRect(0, 0, width, height);
      }
    };

    const wakeLoop = () => {
      if (!isLooping) {
        isLooping = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerAt = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        highlightCellsAt(x, y);
        wakeLoop();
      }
    };

    const handleClickAt = (clientX: number, clientY: number) => {
      if (!propsRef.current.clickPulse) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pulses.push({ x, y, t0: performance.now() });
        highlightCellsAt(x, y, 1.2);
        wakeLoop();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      handlePointerAt(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      handleClickAt(e.clientX, e.clientY);
    };

    const ro = new ResizeObserver(() => {
      resize();
      wakeLoop();
    });

    ro.observe(container);
    resize();
    wakeLoop();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cursor-grid absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="cursor-grid__canvas block w-full h-full" />
    </div>
  );
}
