'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface WorkflowStepProps {
  stepNumber: number;
  title: string;
  tagline: string;
  features: string[];
  iconType: 'iterate' | 'evaluate' | 'deploy' | 'monitor';
  inView: boolean;
}

function WorkflowStepIcon({ type, inView }: { type: string; inView: boolean }) {
  const [rotation1, setRotation1] = React.useState(0);
  const [rotation2, setRotation2] = React.useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let frameId: number;
    const animate = () => {
      setRotation1(prev => prev + 0.5);
      setRotation2(prev => prev - 0.75);
      frameId = requestAnimationFrame(animate);
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  if (type === 'iterate') {
    return (
      <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
        {/* Four overlapping irregular polygons */}
        <div 
          className="flex aspect-square shrink-0 items-center justify-center absolute top-[0%] left-[20%] h-[50%]"
        >
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${rotation1 * 11.5}deg)` }}>
            <div className="absolute inset-0" style={{ transform: `rotate(${rotation2 * 17.2}deg)` }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path fill="none" stroke="currentColor" d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[5%] left-[75%] h-[20%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${-rotation1 * 11.5}deg)` }}>
            <div className="absolute inset-0" style={{ transform: `rotate(${-rotation2 * 17.2}deg)` }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path fill="none" stroke="currentColor" d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[35%] left-[0%] h-[35%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${rotation1 * 11.5}deg)` }}>
            <div className="absolute inset-0" style={{ transform: `rotate(${rotation2 * 17.2}deg)` }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path fill="none" stroke="currentColor" d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[35%] left-[25%] h-[65%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${-rotation1 * 11.5}deg)` }}>
            <div className="absolute inset-0" style={{ transform: `rotate(${-rotation2 * 17.2}deg)` }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path fill="none" stroke="currentColor" d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'evaluate') {
    return (
      <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
        {/* Four overlapping dashed circles */}
        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[37%] left-[0%] h-[50%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${-rotation1 * 4.6}deg)` }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[0%] left-[20%] h-[55%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${rotation1 * 4.6}deg)` }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[35%] left-[75%] h-[20%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${-rotation1 * 4.6}deg)` }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="flex aspect-square shrink-0 items-center justify-center absolute top-[60%] left-[35%] h-[40%]">
          <div className="absolute -inset-1/6" style={{ transform: `rotate(${rotation1 * 4.6}deg)` }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute -inset-[calc(5%+12px)]">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
              <path d="M28 32h8M32 28v8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder for deploy and monitor - can be added later
  return null;
}

function WorkflowStep({ stepNumber, title, tagline, features, iconType, inView }: WorkflowStepProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div 
      className="col-span-1 flex aspect-[5/3] max-h-[calc(25vh-50px)] min-h-32 w-full transition-colors duration-300"
      style={{ opacity }}
    >
      <div className="relative aspect-square h-full max-h-[calc(25vh-50px)] min-h-32">
        <WorkflowStepIcon type={iconType} inView={inView} />
      </div>
      <div className="relative flex-1">
        <div 
          className="flex -translate-y-1/2 items-center gap-2 absolute"
          style={{
            top: stepNumber === 1 ? '36%' : '68%',
            left: stepNumber === 1 ? '-24px' : '-28px'
          }}
        >
          <div className="atlas-web-sm bg-meadow-200 text-meadow-900 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors duration-300">
            {stepNumber}
          </div>
          <div className="atlas-web-mono">{title}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkflowSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-pebble-50 py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-pebble-900">
            Your workflow, simplified
          </h2>
          <p className="text-base sm:text-lg text-pebble-600 max-w-2xl mx-auto">
            Four steps to build, test, and deploy AI agents with confidence
          </p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <WorkflowStep
            stepNumber={1}
            title="Iterate"
            tagline="Sketch, test and refine"
            features={['Editor', 'Playground', 'Datasets']}
            iconType="iterate"
            inView={inView}
          />
          <WorkflowStep
            stepNumber={2}
            title="Evaluate"
            tagline="Reflect and measure"
            features={['Evaluations', 'Datasets']}
            iconType="evaluate"
            inView={inView}
          />
          {/* Add Deploy and Monitor steps here */}
        </div>

        {/* Feature Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <h4 className="text-[22px] font-[400] text-[#0A1D08] mb-5 leading-tight" style={{ fontFamily: 'var(--font-akkurat)' }}>
              Sketch, test and refine
            </h4>
            <ul className="space-y-2.5">
              <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Editor</li>
              <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Playground</li>
              <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Datasets</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[22px] font-[400] text-[#0A1D08] mb-5 leading-tight" style={{ fontFamily: 'var(--font-akkurat)' }}>
              Reflect and measure
            </h4>
            <ul className="space-y-2.5">
              <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Evaluations</li>
              <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Datasets</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
