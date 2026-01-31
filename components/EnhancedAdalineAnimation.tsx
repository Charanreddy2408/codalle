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
    stiffness: 70,        // Lower stiffness for ultra-smooth, fluid feel
    damping: 24,          // Lower damping for more fluid motion
    mass: 0.3,            // Lighter mass for smoother response
    restDelta: 0.00001,   // Ultra-high precision for perfect smoothness
    restSpeed: 0.003,     // Very slow settling for ultra-smooth motion
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

  // ULTRA-SMOOTH camera movement with maximum frame count
  // More keyframes = perfectly smooth transitions throughout
  const FRAME_COUNT = 2000; // Maximum frames for ultra-smooth camera movements
  
  // Ultra-smooth easing - cubic ease-in-out for consistent smoothness
  const smoothEase = (t: number) => {
    // Cubic ease-in-out for perfectly smooth motion throughout
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  // Camera perspective - Dynamic 3D perspective for illustrative camera movement
  const perspective = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      // Dynamic 3D perspective - changes as camera explores scene
      // Creates depth perception and 3D spatial awareness
      const basePerspective = 300 + eased * 4800; // Base perspective
      // Add slight variation for more dynamic 3D feel
      const perspectiveVariation = Math.sin(t * Math.PI * 0.3) * 200;
      return basePerspective + perspectiveVariation; // Dynamic 3D perspective
    })
  );

  // Camera Z movement - Controlled 3D dolly with dynamic path
  const translateZ = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      // 3D camera dolly - starts close, pulls out with controlled acceleration
      // Creates depth as camera explores the scene
      // Non-linear path for more interesting movement
      const depthCurve = 1 - Math.pow(1 - t, 1.6); // Smooth depth curve
      return 200 - depthCurve * 4200; // Controlled 3D pull-out
    })
  );

  // Scale - NO SCALE CHANGE - pure camera dolly movement (not zoom)
  const scale = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      // NO SCALE CHANGE - camera dolly does all the work
      // Scale stays constant to avoid zoom effect
      return 1.0; // Constant scale - pure camera movement
    })
  );

  // Camera Y movement - Crane/vertical tracking with 3D exploration
  const translateY = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      // 3D crane movement - camera rises then descends as it explores
      // Creates cinematic vertical tracking shot
      // Multi-phase movement: start high, dip in middle, rise at end
      const phase1 = t < 0.3 ? t / 0.3 : 1; // First 30% - quick descent
      const phase2 = t > 0.3 && t < 0.7 ? (t - 0.3) / 0.4 : (t > 0.7 ? 1 : 0); // Middle 40% - slow
      const phase3 = t > 0.7 ? (t - 0.7) / 0.3 : 0; // Last 30% - rise
      
      const verticalPath = 
        -60 * phase1 +                    // Start high, descend quickly
        -20 * phase2 +                   // Continue descending slowly
        40 * phase3;                      // Rise at end
      
      // Add smooth orbital arc for 3D feel
      const orbitalArc = Math.sin(t * Math.PI * 1.5) * 25;
      
      return verticalPath + orbitalArc; // Combined 3D vertical movement
    })
  );

  // Camera X movement - Tracking shot with 3D orbital movement
  const translateX = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      // 3D tracking shot - camera moves laterally while exploring scene
      // Creates side-to-side exploration with orbital feel
      // Multi-phase: start left, move right, then slight left curve
      const trackingPath = -50 + eased * 100; // Main tracking movement
      
      // Add 3D orbital curve - camera orbits around scene
      const orbitalRadius = 35;
      const orbitalAngle = t * Math.PI * 1.2; // 1.2 full rotations
      const orbitalX = Math.cos(orbitalAngle) * orbitalRadius * (1 - t * 0.5); // Decreases as we pull out
      
      // Add S-curve for cinematic feel
      const sCurve = Math.sin(t * Math.PI * 0.8) * 15;
      
      return trackingPath + orbitalX + sCurve; // Combined 3D horizontal movement
    })
  );

  // 3D Camera rotations - Illustrative camera movements
  // Creates dynamic camera exploration of the scene
  const rotateX = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      // 3D tilt - camera tilts down as it explores, then levels out
      // Creates depth perception and cinematic feel
      const tiltCurve = 1 - Math.pow(1 - t, 1.4);
      const dynamicTilt = Math.sin(t * Math.PI * 0.5) * 0.5; // Subtle dynamic variation
      return tiltCurve * -2.5 + dynamicTilt; // Controlled 3D tilt
    })
  );
  
  const rotateY = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      // 3D pan - camera pans as it orbits around scene
      // Creates sense of exploring the scene from different angles
      const panAngle = t * Math.PI * 0.6; // Pan through 108 degrees
      const orbitalPan = Math.sin(t * Math.PI * 1.5) * 1.8; // Orbital pan variation
      return panAngle * (180 / Math.PI) * 0.15 + orbitalPan; // Convert to degrees, scale down
    })
  );
  
  const rotateZ = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      // Subtle roll for 3D camera movement - very controlled
      // Adds slight dynamic feel without being disorienting
      const roll = Math.sin(t * Math.PI * 2) * 0.3; // Very subtle roll
      return roll; // Controlled roll (in degrees)
    })
  );

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
      style={{ height: '15000vh' }} // Extended scroll height to slow down animation, prevent window from reaching too fast
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
          {/* DEPTH LAYER 1 - Far Background (deepest, slowest parallax) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [-800, -1200]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  // Slow parallax for far background
                  return t * 40;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.1 - t * 0.05;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return Math.min(0.4, t * 0.5);
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center top, rgba(251, 253, 246, 0.6) 0%, rgba(107, 120, 96, 0.2) 50%, transparent 80%)',
                filter: 'blur(5px)',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 1.5 - Deep Mid Background (between far and mid) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [-600, -900]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return t * 20 - t * 50;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.08 - t * 0.04;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return Math.min(0.35, t * 0.45);
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(251, 253, 246, 0.5) 0%, rgba(107, 120, 96, 0.15) 45%, transparent 75%)',
                filter: 'blur(4px)',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 2 - Mid Background (medium depth, medium parallax) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [-400, -600]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  // Medium parallax for mid background
                  return -t * 80;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.05 - t * 0.03;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 0.2 + Math.sin(t * Math.PI) * 0.15;
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(10, 29, 8, 0.25) 0%, rgba(10, 29, 8, 0.1) 40%, transparent 70%)',
                filter: 'blur(3px)',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 2.5 - Near Background (between mid background and main image) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [-200, -350]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return -t * 100;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.03 - t * 0.02;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 0.15 + Math.sin(t * Math.PI * 0.8) * 0.12;
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 70%, rgba(10, 29, 8, 0.2) 0%, rgba(10, 29, 8, 0.08) 35%, transparent 65%)',
                filter: 'blur(2px)',
              }}
            />
          </motion.div>

          {/* Main Camera/Image Container - MIDGROUND (main scene) */}
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

          {/* DEPTH LAYER 2.75 - Near Foreground (between main image and foreground) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [100, -50]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return -t * 120;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.08 - t * 0.06;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 0.25 + Math.sin(t * Math.PI * 0.7) * 0.15;
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 25%, rgba(251, 253, 246, 0.4) 65%, rgba(251, 253, 246, 0.7) 100%)',
                filter: 'blur(1.5px)',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 3 - Foreground (closest, fastest parallax) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [200, -200]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  // Fast parallax for foreground
                  return -t * 150;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.15 - t * 0.1;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 0.3 + Math.sin(t * Math.PI) * 0.2;
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(251, 253, 246, 0.5) 60%, rgba(251, 253, 246, 0.8) 100%)',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 3.5 - Mid Foreground (between foreground and ultra foreground) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [300, 0]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return -t * 200;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.2 - t * 0.12;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 0.2 + Math.sin(t * Math.PI * 1.2) * 0.15;
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(251, 253, 246, 0.35) 0%, transparent 55%)',
                filter: 'blur(0.75px)',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 4 - Ultra Foreground (closest layer, very fast parallax) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [400, 100]),
              y: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  // Very fast parallax for ultra foreground
                  return -t * 250;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 1.25 - t * 0.15;
                })
              ),
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
                Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
                  const t = i / FRAME_COUNT;
                  return 0.15 + Math.sin(t * Math.PI * 1.5) * 0.1;
                })
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(251, 253, 246, 0.3) 0%, transparent 60%)',
                filter: 'blur(0.5px)',
              }}
            />
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

