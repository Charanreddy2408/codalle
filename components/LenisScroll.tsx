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

    // Initialize Lenis with perfectly tuned settings for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,           // Perfect balance - responsive yet smooth
      easing: (t) => {
        // Perfect easing function - exponential ease out
        return 1 - Math.pow(1 - t, 3);
      },
      smooth: true,
      smoothTouch: false,      // Disable on touch for better mobile performance
      touchMultiplier: 2,      // Natural touch scrolling
      infinite: false,
      wheelMultiplier: 1,      // Natural wheel speed
      normalizeWheel: true,    // Normalize wheel delta for consistency
    });

    // High-performance RAF loop with time delta
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

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

