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
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  
  const [isClient, setIsClient] = useState(false);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // PERFECTLY SMOOTH spring physics - no lag, no stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,       // Higher stiffness for responsive feel
    damping: 30,          // Moderate damping for natural motion
    mass: 0.5,            // Light mass for quick response
    restDelta: 0.001,     // Good precision without over-calculation
    restSpeed: 0.01,      // Natural settling
  });

  // GSAP enhancements
  useGSAP(() => {
    if (!isClient || !containerRef.current) return;

    // GSAP ScrollTrigger for additional effects
    const ctx = gsap.context(() => {
      // Parallax layers with GSAP
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          y: -200,
          scale: 1.15,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5, // Smooth scrubbing
          },
        });
      }

      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          y: -100,
          scale: 1.08,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          y: 100,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

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

  // ULTRA-SMOOTH camera movement with maximum keyframes for cinematic feel
  // More keyframes = smoother transitions between camera positions
  const perspective = useTransform(
    smoothProgress,
    // 100+ keyframes for pixel-perfect smoothness
    Array.from({ length: 101 }, (_, i) => i / 100),
    Array.from({ length: 101 }, (_, i) => {
      const t = i / 100;
      // Exponential easing for natural camera dolly feel
      return 200 + Math.pow(t, 1.8) * 2800;
    })
  );

  const translateZ = useTransform(
    smoothProgress,
    Array.from({ length: 101 }, (_, i) => i / 100),
    Array.from({ length: 101 }, (_, i) => {
      const t = i / 100;
      // Gradual depth movement with easing
      return 30 - Math.pow(t, 1.6) * 1400;
    })
  );

  const scale = useTransform(
    smoothProgress,
    Array.from({ length: 101 }, (_, i) => i / 100),
    Array.from({ length: 101 }, (_, i) => {
      const t = i / 100;
      // Smooth scale change with ease-in-out
      return 3.5 - Math.pow(t, 1.4) * 2.6;
    })
  );

  // Minimal camera movement - mostly centered
  const translateY = useTransform(
    smoothProgress,
    Array.from({ length: 51 }, (_, i) => i / 50),
    Array.from({ length: 51 }, (_, i) => {
      const t = i / 50;
      // Very subtle vertical movement
      return Math.sin(t * Math.PI) * 15;
    })
  );

  const translateX = useTransform(
    smoothProgress,
    Array.from({ length: 51 }, (_, i) => i / 50),
    Array.from({ length: 51 }, (_, i) => {
      const t = i / 50;
      // Very subtle horizontal centering
      return Math.sin(t * Math.PI * 0.5) * 10;
    })
  );

  // NO ROTATION - Keep the scene perfectly straight
  // Only pure camera dolly movement for clean, professional look
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [0, 0]);
  const rotateZ = useTransform(smoothProgress, [0, 1], [0, 0]);

  const opacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [1, 0.99, 0.97, 0.94, 0.9]
  );

  const brightness = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    [1.1, 1.07, 1.04, 1.01]
  );

  const blur = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 0.85, 1],
    [0, 0.05, 0.15, 0.3, 0.45]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '8000vh' }} // Very long scroll for extremely gradual camera movement
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-pebble-50">
        
        {/* 3D Perspective Container */}
        <motion.div
          className="absolute inset-0"
          style={{
            perspective,
            perspectiveOrigin: '50% 50%',
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

          {/* PARALLAX LAYER 1 - Far background (slowest) */}
          <motion.div
            ref={layer1Ref}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => {
                  const t = i / 20;
                  return Math.min(0.4, t * 0.5);
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => 1.15 - (i / 20) * 0.1)
              ),
              y: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => (i / 20) * 80)
              ),
              z: useTransform(smoothProgress, [0, 1], [-50, -150]),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center bottom, rgba(251, 253, 246, 0.5) 0%, rgba(107, 120, 96, 0.08) 40%, transparent 70%)',
                filter: 'blur(3px)',
              }}
            />
          </motion.div>

          {/* PARALLAX LAYER 2 - Mid-ground (medium speed) */}
          <motion.div
            ref={layer2Ref}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => {
                  const t = i / 20;
                  return 0.08 + Math.sin(t * Math.PI) * 0.15;
                })
              ),
              y: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => -(i / 20) * 140)
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => 1.08 - (i / 20) * 0.06)
              ),
              z: useTransform(smoothProgress, [0, 1], [-30, -80]),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 70%, rgba(10, 29, 8, 0.15) 0%, rgba(10, 29, 8, 0.06) 35%, transparent 60%)',
                filter: 'blur(1.5px)',
              }}
            />
          </motion.div>

          {/* PARALLAX LAYER 3 - Foreground vignette (fastest) */}
          <motion.div
            ref={layer3Ref}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => {
                  const t = i / 20;
                  return 0.2 + Math.sin(t * Math.PI) * 0.15;
                })
              ),
              scale: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => 1.4 - (i / 20) * 0.4)
              ),
              y: useTransform(
                smoothProgress,
                Array.from({ length: 21 }, (_, i) => i / 20),
                Array.from({ length: 21 }, (_, i) => -(i / 20) * 280)
              ),
              z: useTransform(smoothProgress, [0, 1], [20, -30]),
              filter: useTransform(
                smoothProgress,
                Array.from({ length: 11 }, (_, i) => i / 10),
                Array.from({ length: 11 }, (_, i) => `blur(${(i / 10) * 1.2}px)`)
              ),
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 15%, rgba(251, 253, 246, 0.3) 70%, rgba(251, 253, 246, 0.6) 100%)',
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

