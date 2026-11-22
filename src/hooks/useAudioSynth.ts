"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export function useAudioSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  const stopAudio = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;
    
    // Smooth fade out to prevent clicks
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      nodesRef.current.forEach((node) => {
        try {
          if ("stop" in node && typeof (node as AudioScheduledSourceNode).stop === "function") {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore cleanup errors
        }
      });
      nodesRef.current = [];
      setIsPlaying(false);
    }, 850);
  }, []);

  const startAudio = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = audioCtxRef.current || new AudioContextClass();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master output gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const createdNodes: AudioNode[] = [];

      // 1. Deep Sub Bass Drone (55Hz Root - A1)
      const subOsc = ctx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, ctx.currentTime);
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.35, ctx.currentTime);
      subOsc.connect(subGain);
      subGain.connect(master);
      subOsc.start();
      createdNodes.push(subOsc, subGain);

      // 2. Beating Harmonic Sine (55.35Hz - 0.35Hz phase drift)
      const beatOsc = ctx.createOscillator();
      beatOsc.type = "sine";
      beatOsc.frequency.setValueAtTime(55.35, ctx.currentTime);
      const beatGain = ctx.createGain();
      beatGain.gain.setValueAtTime(0.28, ctx.currentTime);
      beatOsc.connect(beatGain);
      beatGain.connect(master);
      beatOsc.start();
      createdNodes.push(beatOsc, beatGain);

      // 3. Gentle Cosmic Pink Noise generator with Biquad Filter
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.07; // scale down
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter: Warm low-pass
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(240, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(master);
      whiteNoise.start();
      createdNodes.push(whiteNoise, filter, noiseGain);

      nodesRef.current = createdNodes;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio API error or not permitted:", e);
      setIsPlaying(false);
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleAudio };
}
