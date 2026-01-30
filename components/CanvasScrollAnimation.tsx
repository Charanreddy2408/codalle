'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValue } from 'framer-motion';

/**
 * Canvas Frame Sequence Animation - EXACTLY like Adaline.ai
 * 
 * This is the REAL technique Adaline.ai uses:
 * - Pre-rendered image sequence (281 frames)
 * - Canvas rendering for 100% smooth scrolling
 * - Progressive frame loading
 * - No CSS transforms - pure frame-by-frame animation
 */

interface CanvasScrollAnimationProps {
  frameCount?: number;
  framePrefix?: string;
  quality?: 'standard' | 'high';
}

export default function CanvasScrollAnimation({
  frameCount = 150,
  framePrefix = '/frames/frame',
  quality = 'standard',
}: CanvasScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef<number>();
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const preloadImage = (index: number) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        
        // Format: frame-0001.jpg (4 digits with leading zeros)
        const frameNumber = String(index).padStart(4, '0');
        img.src = `${framePrefix}-${frameNumber}.jpg`;
        
        img.onload = () => {
          loaded++;
          setLoadedFrames(loaded);
          if (loaded === frameCount) {
            setIsLoading(false);
          }
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          loaded++;
          setLoadedFrames(loaded);
          if (loaded === frameCount) {
            setIsLoading(false);
          }
          resolve(); // Still resolve to continue loading
        };
        
        images[index] = img;
      });
    };

    // Load first frame immediately for instant display
    preloadImage(1).then(() => {
      if (canvasRef.current) {
        renderFrame(1);
      }
    });

    // Load remaining frames in batches for better performance
    const batchSize = 10;
    let currentBatch = 2;

    const loadNextBatch = async () => {
      const promises: Promise<void>[] = [];
      const endIndex = Math.min(currentBatch + batchSize, frameCount + 1);
      
      for (let i = currentBatch; i < endIndex; i++) {
        promises.push(preloadImage(i));
      }
      
      await Promise.all(promises);
      currentBatch += batchSize;
      
      if (currentBatch <= frameCount) {
        requestAnimationFrame(loadNextBatch);
      }
    };

    loadNextBatch();

    imagesRef.current = images;

    return () => {
      // Cleanup
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [frameCount, framePrefix]);

  // Render specific frame to canvas
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true, // Better performance
    });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Update frame based on scroll with RAF for smoothness
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const frameIndex = Math.min(
        Math.max(1, Math.ceil(latest * frameCount)),
        frameCount
      );

      // Only render if frame changed
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        
        // Use RAF for smooth rendering
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        
        requestRef.current = requestAnimationFrame(() => {
          renderFrame(frameIndex);
        });
      }
    });

    return () => {
      unsubscribe();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [scrollYProgress, frameCount, renderFrame]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Redraw current frame
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '500vh' }} // Adjust based on desired scroll length
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pebble-50">
          <div className="text-center">
            <div className="text-pebble-900 text-lg font-semibold mb-2">
              Loading Experience
            </div>
            <div className="text-pebble-600 text-sm">
              {Math.round((loadedFrames / frameCount) * 100)}%
            </div>
            <div className="w-64 h-1 bg-pebble-200 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${(loadedFrames / frameCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-pebble-50">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            imageRendering: 'crisp-edges',
            WebkitFontSmoothing: 'antialiased',
          }}
        />
      </div>
    </section>
  );
}

