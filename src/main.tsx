import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App';
import './index.css';

// ─── Kodr smooth scroll (Lenis) with reduced-motion guard ───
function initLenis(): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lenis = new Lenis({ duration: 0.85, smoothWheel: true });
  (window as any).__lenis = lenis;
  // Sync Lenis with GSAP ScrollTrigger — fixes pin/scrub lag & jitter.
  // Single clock via gsap ticker (no competing rAF loops).
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

initLenis();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
