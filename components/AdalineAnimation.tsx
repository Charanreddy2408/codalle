'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Adaline.ai Hero Animation (Proper Implementation)
 * 
 * This recreates the ACTUAL animation from Adaline.ai:
 * - It's a CAMERA DOLLY movement, not a zoom
 * - The camera moves through 3D space
 * - Creates natural parallax and depth
 * - Uses perspective transforms for 3D effect
 */

export default function AdalineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // CINEMATIC SMOOTH spring physics - realistic camera feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,     // Balanced for smooth, natural movement
    damping: 35,        // Professional camera smoothness
    mass: 0.2,          // Realistic inertia like a real camera dolly
    restDelta: 0.0001,  // Smooth settling
    restSpeed: 0.001,   // Natural ease to rest
  });

  /**
   * CAMERA DOLLY EFFECT (Adaline.ai technique)
   * This simulates a camera moving BACKWARDS through 3D space
   * NOT a simple scale/zoom
   */

  /**
   * 3D CAMERA DOLLY BACK (You move away from the scene)
   * Creates depth, parallax, and "getting away" feeling
   */

  // Perspective - CINEMATIC SMOOTH with maximum keyframes for realistic depth
  const perspective = useTransform(
    smoothProgress,
    [0, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3, 0.33, 0.36, 0.39, 0.42, 0.45, 0.48, 0.51, 0.54, 0.57, 0.6, 0.63, 0.66, 0.69, 0.72, 0.75, 0.78, 0.81, 0.84, 0.87, 0.9, 0.93, 0.96, 0.98, 1],
    [200, 218, 237, 257, 279, 303, 329, 357, 388, 422, 459, 500, 545, 594, 648, 707, 772, 843, 921, 1006, 1099, 1200, 1310, 1429, 1558, 1697, 1847, 2008, 2181, 2366, 2564, 2775, 3000, 3190, 3300]
  );

  // Z-axis - CINEMATIC DOLLY movement (realistic camera push-in)
  const translateZ = useTransform(
    smoothProgress,
    [0, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3, 0.33, 0.36, 0.39, 0.42, 0.45, 0.48, 0.51, 0.54, 0.57, 0.6, 0.63, 0.66, 0.69, 0.72, 0.75, 0.78, 0.81, 0.84, 0.87, 0.9, 0.93, 0.96, 0.98, 1],
    [30, 24, 18, 12, 5, -2, -10, -19, -29, -41, -54, -69, -86, -105, -127, -152, -180, -212, -248, -289, -335, -387, -446, -512, -586, -669, -762, -866, -982, -1111, -1255, -1415, -1593, -1760, -1900]
  );

  // Scale - CINEMATIC ZOOM (smooth dolly zoom effect)
  const scale = useTransform(
    smoothProgress,
    [0, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3, 0.33, 0.36, 0.39, 0.42, 0.45, 0.48, 0.51, 0.54, 0.57, 0.6, 0.63, 0.66, 0.69, 0.72, 0.75, 0.78, 0.81, 0.84, 0.87, 0.9, 0.93, 0.96, 0.98, 1],
    [3.0, 2.96, 2.92, 2.88, 2.83, 2.78, 2.73, 2.68, 2.62, 2.56, 2.50, 2.44, 2.37, 2.30, 2.23, 2.15, 2.07, 1.99, 1.91, 1.82, 1.73, 1.64, 1.55, 1.46, 1.37, 1.28, 1.20, 1.13, 1.07, 1.02, 0.98, 0.96, 0.95, 0.94, 0.93]
  );

  // Vertical - CINEMATIC CRANE movement (realistic vertical camera motion)
  const translateY = useTransform(
    smoothProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.96, 0.98, 1],
    [40, 38, 36, 33, 30, 27, 23, 19, 15, 11, 7, 3, -1, -5, -9, -12, -14, -15, -14, -11, -6, 0, 8]
  );

  // Horizontal - CINEMATIC TRACKING shot (smooth arc movement)
  const translateX = useTransform(
    smoothProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.96, 0.98, 1],
    [35, 33, 31, 29, 27, 24, 21, 18, 15, 12, 9, 6, 3, 0, -3, -6, -9, -12, -16, -19, -23, -27, -32]
  );

  // Rotation X - CINEMATIC TILT (smooth gimbal tilt like professional camera)
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.96, 0.98, 1],
    [4, 3.85, 3.7, 3.53, 3.35, 3.16, 2.96, 2.75, 2.53, 2.30, 2.06, 1.81, 1.55, 1.28, 1.00, 0.71, 0.41, 0.10, -0.22, -0.48, -0.78, -1.12, -1.5]
  );

  // Rotation Y - CINEMATIC PAN (smooth gimbal pan like professional camera)
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.96, 0.98, 1],
    [-2, -1.92, -1.83, -1.73, -1.62, -1.50, -1.37, -1.23, -1.08, -0.92, -0.75, -0.57, -0.38, -0.18, 0.03, 0.25, 0.48, 0.72, 0.97, 1.15, 1.35, 1.58, 1.85]
  );

  // Rotation Z - CINEMATIC ROLL (subtle gimbal roll for dynamic feel)
  const rotateZ = useTransform(
    smoothProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.96, 0.98, 1],
    [1, 0.97, 0.94, 0.90, 0.86, 0.82, 0.77, 0.72, 0.67, 0.61, 0.55, 0.48, 0.41, 0.33, 0.25, 0.16, 0.07, -0.03, -0.14, -0.22, -0.32, -0.43, -0.56]
  );

  // Opacity - CINEMATIC atmospheric fade (subtle, realistic)
  const opacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [1, 0.998, 0.995, 0.992, 0.988, 0.985, 0.982, 0.979, 0.976, 0.973, 0.97]
  );

  // Brightness - CINEMATIC exposure (auto-exposure simulation)
  const brightness = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [1.08, 1.07, 1.06, 1.055, 1.05, 1.045, 1.04, 1.035, 1.03, 1.02, 1.01]
  );

  // Blur - CINEMATIC depth of field (realistic focus pull)
  const blur = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
    [0, 0, 0, 0.02, 0.04, 0.07, 0.11, 0.16, 0.22, 0.29, 0.35, 0.4]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{
        height: '3000vh', // Perfect balance - smooth but not too long
      }}
    >
      {/* 3D Perspective Container - OPTIMIZED */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-pebble-50">
        <motion.div
          className="absolute inset-0"
          style={{
            perspective: perspective,
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Camera/Image Container - FULL 3D CAMERA MOVEMENT */}
          <motion.div
            ref={imageRef}
            className="absolute inset-0"
            style={{
              scale,
              x: translateX,
              y: translateY,
              z: translateZ,
              rotateX,      // Tilt up/down
              rotateY,      // Pan left/right
              rotateZ,      // Roll (cinematic)
              opacity,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform, opacity, filter',
              WebkitTransform: 'translateZ(0)',
              transformOrigin: 'center center',
              perspective: '1000px', // Add inner perspective for realism
            }}
          >
            {/* Image with 3D depth effects */}
            <motion.div
              className="w-full h-full"
              style={{
                filter: useTransform(
                  [brightness, blur],
                  ([b, bl]) => `brightness(${b}) blur(${bl}px)`
                ),
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <img
                src="/scene.png"
                alt="Scenic landscape"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'top 15% center',
                  imageRendering: 'crisp-edges',
                  transform: 'translateZ(0)',
                }}
              />
            </motion.div>
          </motion.div>

          {/* LAYERED PARALLAX - Multiple depth planes */}
          
          {/* Far background layer (moves slower) - CINEMATIC DEPTH */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], [0, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3]),
              scale: useTransform(smoothProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [1.12, 1.105, 1.09, 1.07, 1.05, 1.03, 1.01, 1.0]),
              y: useTransform(smoothProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [0, 8, 16, 24, 32, 40, 46, 52]), // Ultra smooth parallax
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(251, 253, 246, 0.4) 0%, transparent 60%)',
                filter: 'blur(1px)', // Atmospheric depth
              }}
            />
          </motion.div>

          {/* Mid-ground atmospheric layer - CINEMATIC DEPTH */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], [0.05, 0.08, 0.11, 0.15, 0.19, 0.22, 0.21, 0.19, 0.16, 0.13, 0.1]),
              y: useTransform(smoothProgress, [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1], [0, -12, -26, -40, -55, -68, -80, -90, -98]), // Ultra smooth faster parallax
              scale: useTransform(smoothProgress, [0, 0.3, 0.6, 0.9, 1], [1.05, 1.04, 1.02, 1.01, 1.0]),
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 70%, rgba(10, 29, 8, 0.15) 0%, transparent 50%)',
                filter: 'blur(0.5px)', // Subtle depth
              }}
            />
          </motion.div>

          {/* Foreground vignette (closest to camera) - CINEMATIC DEPTH */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1], [0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.31, 0.3, 0.27, 0.2, 0.12, 0.05]),
              scale: useTransform(smoothProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [1.35, 1.30, 1.25, 1.20, 1.15, 1.10, 1.05, 1.0]),
              y: useTransform(smoothProgress, [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1], [0, -22, -46, -72, -100, -128, -155, -180, -200]), // Ultra smooth fastest parallax
              filter: useTransform(smoothProgress, [0, 0.5, 1], ['blur(0px)', 'blur(0.3px)', 'blur(0.5px)']),
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(251, 253, 246, 0.5) 100%)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.08], [1, 0]),
        }}
      >
        <div className="text-center text-pebble-600/70 text-sm">
          <div className="mb-2 font-medium tracking-wide">Scroll to experience camera dolly</div>
          <motion.div
            className="text-2xl"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

