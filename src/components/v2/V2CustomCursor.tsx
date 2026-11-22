'use client';

import React, { useEffect, useRef, useState } from 'react';

export function V2CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setHasPointer(true);
      document.documentElement.classList.add('has-cursor');
    } else {
      return;
    }

    const dot = dotRef.current;
    if (!dot) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.45;
      currentY += (targetY - currentY) * 0.45;

      if (dot) {
        dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <div
      ref={dotRef}
      className="cursor pointer-events-none fixed top-0 left-0 z-[10001] w-[10px] h-[10px] -mt-[5px] -ml-[5px] rounded-full bg-white mix-blend-difference grid place-items-center transition-[width,height,margin,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      aria-hidden="true"
    >
      <span className="opacity-0" />
    </div>
  );
}
