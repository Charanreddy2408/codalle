'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Smooth Scroll Component using Lenis
 * This is what Adaline.ai uses for their buttery-smooth scrolling
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis smooth scroll (Adaline.ai style)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 2,
    } as any); // Type assertion for compatibility

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

