'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function V2PhysicsMascot() {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [speech, setSpeech] = useState<string | null>('Wait for me! 💨');
  const [particles, setParticles] = useState<{ id: number; emoji: string }[]>([]);
  const [mood, setMood] = useState<'walk' | 'idle' | 'happy' | 'panic' | 'sleep' | 'drag'>('walk');
  const [frameIndex, setFrameIndex] = useState(0);

  const mascotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const dragSamples = useRef<{ x: number; y: number; t: number }[]>([]);
  const clickTimes = useRef<number[]>([]);
  const lastDirection = useRef<number>(0);
  const flipTimes = useRef<number[]>([]);
  const animFrame = useRef<number | null>(null);
  const speechTimeout = useRef<NodeJS.Timeout | null>(null);

  const WIDTH = 140;
  const HEIGHT = 188;

  // Initialize position to bottom right, matching the reference site
  useEffect(() => {
    setIsMounted(true);
    const initialX = Math.max(20, window.innerWidth - WIDTH - 80);
    const initialY = Math.max(20, window.innerHeight - HEIGHT - 40);
    setPos({ x: initialX, y: initialY });

    const handleResize = () => {
      setPos((prev) => ({
        x: Math.min(prev.x, window.innerWidth - WIDTH - 40),
        y: Math.min(prev.y, window.innerHeight - HEIGHT - 40),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sprite animation frame cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 5);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const showSpeech = useCallback((text: string, duration = 2200) => {
    if (speechTimeout.current) clearTimeout(speechTimeout.current);
    setSpeech(text);
    speechTimeout.current = setTimeout(() => setSpeech(null), duration);
  }, []);

  const spawnParticles = useCallback((emoji: string, count = 3) => {
    const newItems = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      emoji,
    }));
    setParticles((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.includes(p)));
    }, 1200);
  }, []);

  // 2D Numerical Physics Flight Loop
  const startFlight = useCallback((initialVx: number, initialVy: number) => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    setIsFlying(true);
    setMood('drag');

    let vx = initialVx;
    let vy = initialVy;
    let { x, y } = posRef.current;
    let lastBonk = 0;

    const step = () => {
      const maxX = window.innerWidth - WIDTH;
      const maxY = window.innerHeight - HEIGHT;

      vy += 0.9; // Gravity
      x += vx;
      y += vy;

      let impact = 0;

      // Left / Right Walls
      if (x < 0 || x > maxX) {
        x = x < 0 ? 0 : maxX;
        impact = Math.abs(vx);
        vx = -vx * 0.6;
      }

      // Ceiling
      if (y < 0) {
        y = 0;
        impact = Math.max(impact, Math.abs(vy));
        vy = -vy * 0.6;
      }

      // Floor
      if (y > maxY) {
        y = maxY;
        impact = Math.max(impact, Math.abs(vy));
        vy = Math.abs(vy) < 2.5 ? 0 : -vy * 0.5;
        vx *= 0.85; // Ground friction
      }

      // Impact bonk trigger
      const now = Date.now();
      if (impact > 10 && now - lastBonk > 300) {
        lastBonk = now;
        spawnParticles('💫', 1);
      }

      setPos({ x, y });

      // Settle condition
      if (y >= maxY && vy === 0 && Math.abs(vx) < 0.3) {
        setIsFlying(false);
        setMood('walk');
        showSpeech('Whew! Safe landing! 😵');
        spawnParticles('✨', 2);
        return;
      }

      animFrame.current = requestAnimationFrame(step);
    };

    animFrame.current = requestAnimationFrame(step);
  }, [WIDTH, HEIGHT, showSpeech, spawnParticles]);

  // Pointer Down
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    setIsFlying(false);
    setIsDragging(true);
    setMood('drag');

    const now = performance.now();
    dragSamples.current = [{ x: e.clientX, y: e.clientY, t: now }];

    // Poke detection
    const clickNow = Date.now();
    clickTimes.current = [...clickTimes.current.filter((t) => clickNow - t < 1500), clickNow];
    if (clickTimes.current.length >= 5) {
      setMood('panic');
      showSpeech('Hey! Stop poking me! 💢');
      spawnParticles('💢', 2);
      setTimeout(() => setMood('walk'), 1800);
    }
  };

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      const now = performance.now();
      dragSamples.current.push({ x: e.clientX, y: e.clientY, t: now });
      if (dragSamples.current.length > 8) dragSamples.current.shift();

      const newX = Math.max(0, Math.min(window.innerWidth - WIDTH, e.clientX - WIDTH / 2));
      const newY = Math.max(0, Math.min(window.innerHeight - HEIGHT, e.clientY - HEIGHT / 2));
      setPos({ x: newX, y: newY });
      return;
    }

    // Tickle / Scratch detection on hover
    if (e.movementX !== 0) {
      const dir = Math.sign(e.movementX);
      const now = Date.now();
      if (lastDirection.current && dir !== lastDirection.current) {
        flipTimes.current = [...flipTimes.current.filter((t) => now - t < 1200), now];
        if (flipTimes.current.length >= 5) {
          flipTimes.current = [];
          setMood('happy');
          showSpeech('Purrr~ 💙');
          spawnParticles('💙', 3);
          setTimeout(() => setMood('walk'), 1800);
        }
      }
      lastDirection.current = dir;
    }
  };

  // Pointer Up
  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const samples = dragSamples.current;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = Math.max(last.t - first.t, 1);
      const timeScale = 16 / dt;

      const vx = Math.max(-45, Math.min(45, (last.x - first.x) * timeScale));
      const vy = Math.max(-45, Math.min(45, (last.y - first.y) * timeScale));

      if (Math.hypot(vx, vy) > 10) {
        const phrases = ['Wheeee! 🚀', 'I can fly! 🐟', 'Aaaah! 😱'];
        showSpeech(phrases[Math.floor(Math.random() * phrases.length)]);
        startFlight(vx, vy);
        return;
      }
    }

    setMood('walk');
    showSpeech('Hop! ✨', 1000);
  };

  // Sprite sheet image path selector
  const getSpriteSrc = () => {
    switch (mood) {
      case 'idle':
        return '/assets/idle-DZeTPQ_y.webp';
      case 'happy':
        return '/assets/happy-DhKrdxqi.webp';
      case 'panic':
        return '/assets/panic-DL9GoHkk.webp';
      case 'drag':
        return '/assets/drag-BgwxZQVL.webp';
      case 'sleep':
        return '/assets/sleep-CuQIoJdr.webp';
      default:
        return '/assets/walk-c00TWIhC.webp';
    }
  };

  if (!isMounted) return null;

  return (
    <div
      ref={mascotRef}
      role="button"
      tabIndex={0}
      aria-label="Mascot: click, drag or throw it"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
      className={`mascot fixed top-0 left-0 z-[9995] select-none touch-none outline-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Dynamic Speech Bubble */}
      {speech && (
        <div className="mascot-bubble">
          {speech}
        </div>
      )}

      {/* Floating Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="mascot-particle"
          style={{ left: '45%' }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Ground Shadow */}
      <span
        className="mascot-shadow"
        aria-hidden="true"
        style={{
          transform: `scale(${isFlying ? 0.45 : 1})`,
          opacity: isFlying ? 0.25 : 0.7,
        }}
      />

      {/* Mascot Act / Bob / Sprite */}
      <div className="mascot-act">
        <div className={`mascot-bob ${mood === 'panic' ? 'animate-mascot-shake' : ''}`}>
          <div
            className="mascot-tilt"
            style={{
              transform: isFlying ? 'perspective(700px) rotateY(-8deg) rotateX(12deg)' : 'none',
            }}
          >
            <div
              className={`m-sprite ${mood === 'sleep' ? 'is-sleeping' : ''}`}
              style={{
                backgroundImage: `url("${getSpriteSrc()}")`,
                backgroundSize: '500% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: `${frameIndex * 25}%`,
                aspectRatio: '200 / 300',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
