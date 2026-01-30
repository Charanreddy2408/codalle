'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Enhanced Adaline.ai Animation with GSAP + WebGL
 * 
 * Combines:
 * - Framer Motion for smooth React integration
 * - GSAP ScrollTrigger for advanced scroll effects
 * - 3D transforms for camera dolly effect
 * - Multiple parallax layers for depth
 */

export default function EnhancedAdalineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const [isClient, setIsClient] = useState(false);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Ultra-smooth spring physics - optimized for buttery smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,       // Higher stiffness for responsive feel
    damping: 30,          // Balanced damping for smooth motion
    mass: 0.5,            // Standard mass for natural response
    restDelta: 0.001,     // Good precision without over-calculation
    restSpeed: 0.01,      // Natural settling speed
  });

  // GSAP enhancements
  useGSAP(() => {
    if (!isClient || !containerRef.current) return;

    // GSAP ScrollTrigger for additional effects
    const ctx = gsap.context(() => {
      // Image shimmer effect
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          '--shimmer-x': '200%',
          duration: 3,
          repeat: -1,
          ease: 'power1.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ULTRA-SMOOTH camera movement with optimal frame count
  // More keyframes = smoother transitions throughout
  const FRAME_COUNT = 250; // Optimized for smooth animation
  
  // Ultra-smooth easing - cubic ease-in-out for consistent smoothness
  const smoothEase = (t: number) => {
    // Cubic ease-in-out for perfectly smooth motion throughout
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  // Camera perspective - creates 3D depth for dolly movement (not zoom)
  const perspective = useTransform(
    smoothProgress,
    // 250 intermediate frames for pixel-perfect smoothness throughout
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Perspective change for 3D dolly effect - creates depth
      const eased = smoothEase(t);
      return 300 + eased * 4000; // Perspective for 3D dolly movement
    })
  );

  // Camera Z movement - Main dolly movement through 3D scene (NO ZOOM)
  const translateZ = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Camera dolly movement - moves through 3D space
      const eased = smoothEase(t);
      // Camera moves backward through scene (dolly out) - pure 3D movement
      // This creates the dolly effect, not zoom
      return 200 - eased * 3500; // Strong dolly movement through 3D space
    })
  );

  // Scale - minimal change, focus on camera dolly movement (not zoom)
  const scale = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Minimal scale change - camera dolly does the work, not zoom
      const eased = smoothEase(t);
      // Very slight scale adjustment to complement dolly, not create zoom effect
      return 1.2 - eased * 0.15; // Minimal scale change (1.2 to 1.05)
    })
  );

  // Camera Y movement - Vertical dolly movement (cinematic 3D camera movement)
  const translateY = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Vertical camera dolly movement - moves through 3D space
      const eased = smoothEase(t);
      // Camera moves vertically through scene - creates depth and movement
      // Smooth arc movement for cinematic feel
      const arc = Math.sin(t * Math.PI) * 20; // Smooth arc for natural movement
      return -50 + eased * 180 + arc; // Strong vertical dolly movement
    })
  );

  // Camera X movement - Horizontal dolly pan (cinematic 3D side movement)
  const translateX = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Horizontal camera dolly movement - moves through 3D space
      const eased = smoothEase(t);
      // Camera moves horizontally through scene - creates lateral dolly effect
      // Smooth S-curve movement for cinematic feel
      const arc = Math.sin(t * Math.PI * 0.5) * 18; // Smooth arc for natural movement
      return -40 + eased * 80 + arc; // Strong horizontal dolly pan
    })
  );

  // Controlled rotation for cinematic camera dolly effect
  // Adds cinematic feel while maintaining professional look
  const rotateX = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Controlled tilt down as camera moves through scene
      const eased = smoothEase(t);
      return eased * -2; // Controlled downward tilt (in degrees)
    })
  );
  
  const rotateY = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Controlled horizontal rotation for cinematic feel
      const eased = smoothEase(t);
      return Math.sin(t * Math.PI) * 1.2; // Controlled S-curve rotation
    })
  );
  
  const rotateZ = useTransform(smoothProgress, [0, 1], [0, 0]); // Keep roll at 0

  // Opacity with consistent smooth transitions throughout
  const opacity = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Consistent opacity fade - very subtle throughout
      const eased = smoothEase(t);
      return 1 - eased * 0.08; // Smooth fade from 1.0 to 0.92
    })
  );

  // Brightness with consistent smooth transitions
  const brightness = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Consistent brightness adjustment throughout
      const eased = smoothEase(t);
      return 1.12 - eased * 0.11; // Smooth from 1.12 to 1.01
    })
  );

  // Minimal blur for clean camera dolly effect
  const blur = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Very minimal blur increase - consistent throughout
      const eased = smoothEase(t);
      return eased * 0.2; // From 0 to 0.2px blur - minimal for clarity
    })
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '6000vh' }} // Optimized scroll height for faster, smoother camera movement
    >
      {/* Sticky viewport */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden bg-pebble-50"
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        
        {/* 3D Perspective Container */}
        <motion.div
          className="absolute inset-0"
          style={{
            perspective,
            perspectiveOrigin: '50% 50%',
            willChange: 'transform',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        >
          {/* Main Camera/Image Container */}
          <motion.div
            ref={imageRef}
            className="absolute inset-0"
            style={{
              scale,
              x: translateX,
              y: translateY,
              z: translateZ,
              rotateX,
              rotateY,
              rotateZ,
              opacity,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity, filter',
              transformOrigin: 'center center',
              // GPU acceleration optimizations
              WebkitTransform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Main Image with filters */}
            <motion.div
              className="w-full h-full relative"
              style={{
                filter: useTransform(
                  [brightness, blur],
                  ([b, bl]) => `brightness(${b}) blur(${bl}px)`
                ),
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              }}
            >
              <img
                src="/scene.png"
                alt="Scenic landscape"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'top 15% center',
                  imageRendering: 'crisp-edges',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Atmospheric particles layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.25, 0.1]),
            }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  scale: useTransform(smoothProgress, [0, 1], [0.5 + Math.random() * 0.5, 1.5]),
                  y: useTransform(smoothProgress, [0, 1], [0, -200 - Math.random() * 300]),
                  opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.5, 0]),
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
        }}
      >
        <div className="text-center text-pebble-600/80 text-sm">
          <div className="mb-3 font-semibold tracking-wider">
            Scroll to explore
          </div>
          <motion.div
            className="text-3xl"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}

