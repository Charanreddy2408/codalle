'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Animate scenery on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0.7]);

  // Animate content on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '350vh', position: 'relative' }}>
      {/* Sticky container for the animation */}
      <div className="sticky top-0 h-screen overflow-hidden w-full">
        {/* Animated Background Scenery */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            scale,
            y,
            opacity,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            }}
          >
            <img
              src="/scene.png"
              alt="Scenery"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <div className="max-w-content mx-auto text-center">
            {/* Main Heading */}
            <motion.h1
              className="text-hero font-bold text-adaline-text mb-12 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              The single platform to iterate, evaluate, deploy, and monitor AI agents
            </motion.h1>

            {/* Watch Demo Button */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="px-8 py-3.5 text-base text-white bg-adaline-green hover:bg-adaline-green-hover transition-all duration-200 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                Watch Demo
              </button>
            </motion.div>

            {/* Trusted By Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-trusted text-adaline-text-muted uppercase tracking-wider font-medium">
                Trusted by teams at
              </p>

              {/* Logo Placeholder Grid */}
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-28 h-12 bg-adaline-text/5 rounded-lg flex items-center justify-center border border-adaline-border"
                  >
                    <span className="text-xs text-adaline-text-muted font-medium">Logo {i}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

