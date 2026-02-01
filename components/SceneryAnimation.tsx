'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

/**
 * SceneryAnimation Component with PARALLAX EFFECT
 * 
 * Features:
 * - Ultra-smooth parallax scrolling with spring physics
 * - Multi-layer parallax depth (background, midground, foreground)
 * - Cinematic zoom-out with easing
 * - Buttery smooth 60fps animation
 */
export default function SceneryAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enable smooth scrolling
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  /**
   * Track scroll progress with smooth spring physics
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Apply cinematic spring physics for butter-smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,      // Slower, more cinematic
    damping: 35,        // More damping for smoothness
    restDelta: 0.0001,  // Ultra-precise
    mass: 0.5           // Lighter feel for responsive scroll
  });

  /**
   * CINEMATIC ZOOM OUT with ultra-smooth easing - MORE INTERMEDIATE FRAMES
   * 0% → 2.8x (extreme close-up, like looking through a lens)
   * 100% → 1.0x (perfect full view)
   * Uses smooth easing curve for professional camera feel
   */
  const scale = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [2.8, 2.65, 2.5, 2.35, 2.2, 2.0, 1.75, 1.5, 1.3, 1.15, 1.0] // Multi-point easing for smooth deceleration
  );

  /**
   * CINEMATIC VERTICAL MOVEMENT - MORE INTERMEDIATE FRAMES
   * Subtle upward drift as camera pulls back
   */
  const backgroundY = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-80, -65, -50, -30, -15, 0] // Smooth transition with more steps
  );

  /**
   * SUBTLE HORIZONTAL DRIFT - MORE INTERMEDIATE FRAMES
   * Mimics natural camera movement
   */
  const backgroundX = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [15, 10, 5, 0, -8] // Gentle left-to-right drift with more steps
  );

  /**
   * CINEMATIC OPACITY - MORE INTERMEDIATE FRAMES
   * Maintains clarity throughout zoom
   */
  const opacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [1, 0.995, 0.99, 0.985, 0.98] // Minimal fade for quality with smooth steps
  );

  /**
   * NO BLUR - Keep image crystal clear - MORE INTERMEDIATE FRAMES
   */
  const brightness = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.05, 1.03, 1.0, 0.99, 0.98] // Subtle brightness adjustment with more steps
  );

  /**
   * FOREGROUND PARALLAX (smoother, more cinematic) - MORE INTERMEDIATE FRAMES
   */
  const foregroundY = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -50, -100, -140, -180] // Smoother curve with more steps
  );

  /**
   * VERY SUBTLE ROTATION for depth (almost imperceptible) - MORE INTERMEDIATE FRAMES
   */
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [0, -0.15, -0.3, -0.4, -0.5] // Much more subtle with smooth progression
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ 
        height: '3000vh', // LONGER scroll for more intermediate frames
        perspective: '2000px', // Deeper 3D perspective
      }}
    >
      {/* Sticky Container - Ultra-smooth parallax */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-pebble-50">
        {/* CINEMATIC BACKGROUND LAYER */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale,
            x: backgroundX,
            y: backgroundY,
            opacity,
            rotateX,
            transformOrigin: 'center center',
            willChange: 'transform',
            backfaceVisibility: 'hidden', // Improve rendering
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* High-Quality Image Container - NO BLUR */}
          <motion.div
            className="w-full h-full"
            style={{
              filter: useTransform(brightness, (value) => `brightness(${value})`),
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            {/* HIGH QUALITY Image - Crystal Clear */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene.png"
              alt="Scenic background"
              className="w-full h-full object-cover"
              style={{
                objectPosition: 'center',
                imageRendering: 'crisp-edges',
                transform: 'translateZ(0)', // Force GPU
              }}
            />
          </motion.div>
        </motion.div>

        {/* SUBTLE VIGNETTE (no harsh overlays) - MORE INTERMEDIATE FRAMES */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: foregroundY,
            opacity: useTransform(smoothProgress, [0, 0.3, 0.5, 0.7, 0.9, 1], [0.15, 0.2, 0.25, 0.2, 0.1, 0]),
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(251, 253, 246, 0.2) 100%)',
            }}
          />
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator with parallax */}
      <motion.div 
        className="absolute top-[90vh] left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.05, 0.15], [1, 0.8, 0]),
          y: useTransform(smoothProgress, [0, 0.1], [0, 50]),
        }}
      >
        <div className="text-center text-pebble-600/80 text-sm">
          <div className="mb-2 font-medium tracking-wide animate-pulse">Scroll slowly for parallax effect</div>
          <motion.div 
            className="text-3xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

