'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Lenis Smooth Scroll Component
 * Provides ultra-smooth, buttery scrolling experience like Adaline.ai
 * Optimized for maximum smoothness and performance
 */

export default function LenisScroll() {
  useEffect(() => {
    // Add Lenis class to HTML for styling
    document.documentElement.classList.add('lenis');

    // Initialize Lenis with ultra-smooth settings
    const lenis = new Lenis({
      duration: 1.5,           // Optimal duration for smooth scrolling
      easing: (t: number) => {
        // Cubic ease-in-out for perfectly smooth motion throughout
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      },
      wheelMultiplier: 0.8,    // Balanced for smooth, consistent speed
      normalizeWheel: true,    // Normalize wheel delta for consistency
      lerp: 0.12,             // Optimal lerp for smooth interpolation
    } as any);

    // High-performance RAF loop with optimal timing
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    
    // Start RAF loop
    rafId = requestAnimationFrame(raf);

    // Handle window resize for responsive smoothness
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  return null; // This component doesn't render anything
}

