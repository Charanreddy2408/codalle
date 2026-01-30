'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

/**
 * GSAP Smooth Scroll Component
 * Provides butter-smooth scrolling with hardware acceleration
 * Similar to Lenis but using GSAP's ScrollSmoother
 */

interface GSAPSmoothScrollProps {
  children: React.ReactNode;
  smooth?: number;
  effects?: boolean;
}

export default function GSAPSmoothScroll({ 
  children, 
  smooth = 1.5,
  effects = true 
}: GSAPSmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // Check if ScrollSmoother is available
    if (!ScrollSmoother) {
      console.warn('ScrollSmoother requires GSAP Business/Club license. Using regular ScrollTrigger.');
      return;
    }

    try {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: smooth,
        effects: effects,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });

      return () => {
        smoother.kill();
      };
    } catch (error) {
      console.log('ScrollSmoother not available, using standard scrolling');
    }
  }, [smooth, effects]);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}

