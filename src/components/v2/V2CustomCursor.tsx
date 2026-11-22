'use client';

import React, { useEffect, useRef, useState } from 'react';

export function V2CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId = 0;
    let hasMoved = false;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        currentX = e.clientX;
        currentY = e.clientY;
        setIsVisible(true);
        document.documentElement.classList.add('has-cursor');
      }

      // Check element under pointer
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable;
        setIsTextInput(Boolean(isInput));

        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('btn');
        setIsHovering(Boolean(isClickable));
      }
    };

    const onPointerLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('has-cursor');
    };

    const onPointerEnter = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      currentX = e.clientX;
      currentY = e.clientY;
      setIsVisible(true);
      document.documentElement.classList.add('has-cursor');
    };

    const onWindowBlur = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('has-cursor');
    };

    const loop = () => {
      // Direct high-responsiveness spring lerp (0.55 gives instant snap with slight fluid spring)
      currentX += (targetX - currentX) * 0.55;
      currentY += (targetY - currentY) * 0.55;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);
    window.addEventListener('blur', onWindowBlur);

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
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
      className={`cursor pointer-events-none fixed top-0 left-0 z-[10001] rounded-full grid place-items-center transition-[width,height,margin,background,border,opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHovering ? 'is-hovering' : ''
      } ${!isVisible || isTextInput ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
