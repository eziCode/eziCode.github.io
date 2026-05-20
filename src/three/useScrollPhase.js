// useScrollPhase.js — maps window.scrollY to normalized progress (fully bidirectional)
import { useState, useEffect, useRef, useCallback } from 'react';

// Proxy height in viewport heights — always scroll-driven, never "done"
const PROXY_VH = 5.0;

export function useScrollPhase() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  // Actual scrollable range = (PROXY_VH - 1) * vh
  const maxScrollable = useCallback(() => (window.innerHeight * PROXY_VH) - window.innerHeight, []);

  useEffect(() => {
    function tick() {
      const p = Math.min(window.scrollY / maxScrollable(), 1);
      setProgress(p);
      rafRef.current = null;
    }
    function onScroll() {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [maxScrollable]);

  // Jump to the fully focused monitor/content position
  const snapToMonitor = useCallback(() => {
    window.scrollTo({ top: maxScrollable(), behavior: 'smooth' });
  }, [maxScrollable]);

  // Jump back to start
  const snapToStart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { progress, snapToMonitor, snapToStart };
}
