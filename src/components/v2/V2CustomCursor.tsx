'use client';

import React, { useEffect, useRef } from 'react';

export function V2CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const dot = dotRef.current;
    if (!dot) return;

    let hasMoved = false;

    // Instant 1:1 direct tracking - zero latency, zero React re-renders
    const onPointerMove = (e: PointerEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      if (!hasMoved) {
        hasMoved = true;
        dot.style.opacity = '1';
        document.documentElement.classList.add('has-cursor');
      }

      // Check element under pointer directly in DOM without React setState
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable;

        if (isInput) {
          dot.classList.add('is-hidden');
        } else {
          dot.classList.remove('is-hidden');
        }

        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('btn') ||
          Boolean(target.closest('[data-cursor-hover]'));

        if (isClickable && !isInput) {
          dot.classList.add('is-hovering');
        } else {
          dot.classList.remove('is-hovering');
        }
      }
    };

    const onPointerLeave = () => {
      dot.style.opacity = '0';
      document.documentElement.classList.remove('has-cursor');
    };

    const onPointerEnter = (e: PointerEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      dot.style.opacity = '1';
      document.documentElement.classList.add('has-cursor');
    };

    const onWindowBlur = () => {
      dot.style.opacity = '0';
      document.documentElement.classList.remove('has-cursor');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointerenter', onPointerEnter);
      window.removeEventListener('blur', onWindowBlur);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="cursor pointer-events-none fixed top-0 left-0 z-[10001] rounded-full grid place-items-center opacity-0"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
