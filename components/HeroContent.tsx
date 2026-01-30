'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start start', 'end start'],
  });

  // Content fades out as you scroll down
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.25], [1, 1, 0.3, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  return (
    <motion.div
      ref={contentRef}
      className="sticky top-[15vh] z-20 flex w-full flex-col items-center pointer-events-none"
      style={{
        opacity: contentOpacity,
        y: contentY,
      }}
    >
      {/* Main container */}
      <div className="w-full max-w-[1400px] mx-auto px-6">
        {/* Content wrapper */}
        <div className="flex flex-col items-center text-center">
          
          {/* Heading container */}
          <div className="mb-16">
            <motion.h1
              className="text-[38.848px] leading-[1.1] font-[500] tracking-[-0.02em] text-[#0A1D08] max-w-[641.42px]"
              style={{ fontFamily: 'var(--font-akkurat)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              The single platform to iterate, evaluate, deploy, and monitor AI agents
            </motion.h1>
          </div>

          {/* Trusted By Section */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Label */}
            <div className="flex justify-center">
              <p className="text-[11px] text-[#6B7860] uppercase tracking-[0.2em] font-[500]">
                TRUSTED BY
              </p>
            </div>

            {/* Company Logos Container */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-16 pr-16">
                
                {/* Symbolic.ai */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A1D08]">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z"/>
                    <circle cx="12" cy="12" r="3.5" fill="white"/>
                  </svg>
                  <span className="text-[17px] font-[500] text-[#0A1D08]">Symbolic.ai</span>
                </div>

                {/* Reforge */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A1D08]">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  <span className="text-[17px] font-[500] text-[#0A1D08]">Reforge</span>
                </div>

                {/* McKinsey & Company */}
                <div className="flex items-center opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <span className="text-[17px] font-[400] text-[#0A1D08] text-center leading-[1.3]">
                    McKinsey<br />& Company
                  </span>
                </div>

                {/* HubSpot */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A1D08]">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  </svg>
                  <span className="text-[17px] font-[500] text-[#0A1D08]">HubSpot</span>
                </div>

                {/* serif */}
                <div className="flex items-center opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <span className="text-[20px] font-serif italic text-[#0A1D08]">serif</span>
                </div>

                {/* +5five */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0A1D08]">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-[17px] font-[500] text-[#0A1D08]">+5five</span>
                </div>

                {/* Discord */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A1D08]">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span className="text-[17px] font-[700] text-[#0A1D08]">Discord</span>
                </div>

                {/* salesforce */}
                <div className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A1D08]">
                    <path d="M12.5 2C10.26 2 8.39 3.58 8 5.66C6.88 5.87 6 6.84 6 8c0 .37.1.72.28 1.02C5.51 9.56 5 10.45 5 11.5c0 1.1.6 2.05 1.47 2.57C6.17 14.35 6 14.66 6 15c0 1.1.9 2 2 2h.5c.28 1.16 1.35 2 2.5 2c1.66 0 3-1.34 3-3c0-.35-.06-.68-.17-1h.67c1.38 0 2.5-1.12 2.5-2.5c0-1.23-.88-2.25-2.05-2.47C15.9 8.87 16 8.45 16 8c0-1.16-.84-2.13-1.95-2.34C13.61 3.58 11.74 2 12.5 2z"/>
                  </svg>
                  <span className="text-[17px] font-[500] text-[#0A1D08]">salesforce</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
