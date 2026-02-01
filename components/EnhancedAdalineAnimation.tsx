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

// Particle component that can use hooks properly
function AtmosphericParticle({ 
  smoothProgress, 
  left, 
  top, 
  scaleRange, 
  yRange, 
  opacityRange 
}: { 
  smoothProgress: any; 
  left: number; 
  top: number; 
  scaleRange: [number, number]; 
  yRange: [number, number]; 
  opacityRange: [number, number, number]; 
}) {
  const scale = useTransform(smoothProgress, [0, 1], scaleRange);
  const y = useTransform(smoothProgress, [0, 1], yRange);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], opacityRange);
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-[#6B7860]/15 rounded-full"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        scale,
        y,
        opacity,
        willChange: 'transform, opacity',
      }}
    />
  );
}

function AtmosphericParticles({ smoothProgress }: { smoothProgress: any }) {
  const particles = React.useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      scaleRange: [0.5 + Math.random() * 0.5, 1.2] as [number, number],
      yRange: [0, -150 - Math.random() * 200] as [number, number],
      opacityRange: [0, 0.2, 0] as [number, number, number],
    }));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.15, 0.05]),
        willChange: 'opacity',
      }}
    >
      {particles.map((particle) => (
        <AtmosphericParticle
          key={particle.id}
          smoothProgress={smoothProgress}
          left={particle.left}
          top={particle.top}
          scaleRange={particle.scaleRange}
          yRange={particle.yRange}
          opacityRange={particle.opacityRange}
        />
      ))}
    </motion.div>
  );
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
  // Animation completes when image reaches 100% width
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Optimized spring physics for smooth, performant scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,       // Higher stiffness for responsive feel
    damping: 30,          // Balanced damping for smooth motion
    mass: 0.5,            // Standard mass for natural response
    restDelta: 0.001,     // Good precision without over-calculation
    restSpeed: 0.01,      // Natural settling speed
  });

  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends

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

  // ULTRA-SMOOTH camera movement with optimized frame count
  // Balanced for performance and smoothness
  const FRAME_COUNT = 800; // Optimized frame count for smooth performance
  
  // Ultra-smooth easing - cubic ease-in-out for consistent smoothness
  const smoothEase = (t: number) => {
    // Cubic ease-in-out for perfectly smooth motion throughout
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  // Camera perspective - Dynamic 3D perspective for illustrative camera movement
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
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
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
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
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
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
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
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
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
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
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
  const opacity = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      return 1 - eased * 0.08; // Smooth fade from 1.0 to 0.92
    })
  );


  // Brightness with consistent smooth transitions
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
  const brightness = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      return 1.12 - eased * 0.11; // Smooth from 1.12 to 1.01
    })
  );

  // Minimal blur for clean camera dolly effect
  // Animation completes at 100% scroll progress - image reaches 100% width exactly when scrolling ends
  const blur = useTransform(
    smoothProgress,
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => i / FRAME_COUNT),
    Array.from({ length: FRAME_COUNT + 1 }, (_, i) => {
      const t = i / FRAME_COUNT;
      const eased = smoothEase(t);
      return eased * 0.2; // From 0 to 0.2px blur
    })
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '6000vh' }} // Scroll height: animation completes at 100% scroll, scrolling stops exactly when image reaches 100% width - no extra scrollable space
    >
      {/* Sticky viewport */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          backgroundColor: '#FBFDF6', // Base background color
          willChange: 'scroll-position',
          transform: 'translateZ(0)', // Force GPU acceleration
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
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
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          {/* DEPTH LAYER 1 - Far Background (realistic, no white) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [-600, -900]),
              y: useTransform(smoothProgress, [0, 1], [0, 30]),
              scale: useTransform(smoothProgress, [0, 1], [1.08, 1.0]),
              opacity: useTransform(smoothProgress, [0, 1], [0.2, 0.4]),
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center top, rgba(107, 120, 96, 0.15) 0%, rgba(10, 29, 8, 0.1) 40%, rgba(107, 120, 96, 0.05) 80%)',
                filter: 'blur(3px)',
                backgroundColor: 'transparent',
              }}
            />
          </motion.div>

          {/* DEPTH LAYER 2 - Mid Background (realistic, no white) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [-300, -500]),
              y: useTransform(smoothProgress, [0, 1], [0, -60]),
              scale: useTransform(smoothProgress, [0, 1], [1.04, 1.0]),
              opacity: useTransform(smoothProgress, [0, 1], [0.1, 0.2]),
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(10, 29, 8, 0.15) 0%, rgba(10, 29, 8, 0.06) 40%, transparent 70%)',
                filter: 'blur(1.5px)',
                backgroundColor: 'transparent',
              }}
            />
          </motion.div>

          {/* Main Camera/Image Container - MIDGROUND (main scene) - scene.png */}
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
              backgroundColor: 'transparent', // Transparent to show natural background
              // GPU acceleration optimizations
              WebkitTransform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Scene Image with filters */}
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
                  imageRendering: 'auto' as any,
                }}
              />
            </motion.div>
          </motion.div>

          {/* DEPTH LAYER 3 - Foreground (realistic, subtle) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              z: useTransform(smoothProgress, [0, 1], [150, -100]),
              y: useTransform(smoothProgress, [0, 1], [0, -120]),
              scale: useTransform(smoothProgress, [0, 1], [1.12, 1.0]),
              opacity: useTransform(smoothProgress, [0, 1], [0.15, 0.2]),
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(107, 120, 96, 0.1) 70%, rgba(10, 29, 8, 0.05) 100%)',
                filter: 'blur(0.5px)',
                backgroundColor: 'transparent',
              }}
            />
          </motion.div>

          {/* Atmospheric particles layer - optimized for performance */}
          <AtmosphericParticles smoothProgress={smoothProgress} />
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

