'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className="pointer-events-auto fixed top-0 right-0 left-0 z-[200]"
      style={{ opacity: 1 }}
    >
      <div 
        className={`relative transition-all duration-200 ${
          scrolled ? 'bg-[#FBFDF6]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
        style={{ 
          opacity: 1, 
          height: 'var(--nav-height)',
          borderBottom: scrolled ? '1px solid rgba(10, 29, 8, 0.1)' : 'none',
          paddingTop: '0px',
        }}
      >
        <div 
          className="absolute inset-0 z-20 flex items-center justify-between" 
          style={{ 
            width: '100%',
            maxWidth: '1400px',
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'relative',
            paddingLeft: 'var(--grid-margin)',
            paddingRight: 'var(--grid-margin)',
            paddingTop: '16px',
          }}
        >
          {/* Left Side - Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button 
                className="atlas-web-mono text-meadow-900 flex items-center gap-1 cursor-default hover:opacity-70 transition-opacity border border-[#0A1D08] rounded-[20px]"
                style={{ 
                  padding: '10px 18px',
                  fontSize: '18px',
                  lineHeight: '18px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
                aria-expanded={productsOpen}
              >
                PRODUCTS
                <div aria-hidden="true" style={{ transform: 'none', display: 'flex', alignItems: 'center' }}>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {productsOpen && (
                  <motion.div 
                    className="absolute top-full left-0 bg-[#FBFDF6] border border-[#0A1D08]/10 rounded-lg shadow-lg z-50 hidden md:block"
                    style={{
                      width: 'max-content',
                      minWidth: 'min(1000px, calc(100vw - 2 * var(--grid-margin)))',
                      maxWidth: 'calc(100vw - 2 * var(--grid-margin))',
                      padding: 'clamp(32px, 4vw, 56px) clamp(24px, 3vw, 48px)',
                      marginTop: '12px',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {/* Header */}
                    <div className="mb-10 text-center">
                      <p className="atlas-web-mono text-[#0A1D08] text-[11px] opacity-60 uppercase tracking-[0.1em]">ACROSS YOUR JOURNEY</p>
                    </div>
                    
                    {/* Top Row: Icons with Number Badges and Titles */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-6 lg:mb-8">
                      {/* ITERATE */}
                      <div className="flex items-center gap-2 lg:gap-4">
                        <div className="relative flex-shrink-0">
                          {/* Icon: Overlapping octagons with + signs */}
                          <svg width="48" height="48" viewBox="0 0 64 64" className="text-[#0A1D08] lg:w-16 lg:h-16">
                            {/* Large octagon at bottom */}
                            <polygon points="32,50 38,52 42,56 44,62 42,68 38,70 32,72 26,70 22,68 20,62 22,56 26,52" 
                              fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Medium octagon top-left overlapping */}
                            <polygon points="24,36 30,38 34,42 36,48 34,54 30,56 24,58 18,56 14,54 12,48 14,42 18,38" 
                              fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Medium octagon top-right overlapping */}
                            <polygon points="40,36 46,38 50,42 52,48 50,54 46,56 40,58 34,56 30,54 28,48 30,42 34,38" 
                              fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Small octagon right of top-right */}
                            <polygon points="50,24 54,25 56,28 57,32 56,36 54,39 50,40 46,39 44,36 43,32 44,28 46,25" 
                              fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* + signs in centers */}
                            <text x="32" y="62" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">+</text>
                            <text x="24" y="48" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="40" y="48" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="50" y="32" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="600">+</text>
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#6B7860] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[11px] text-[#FBFDF6] font-medium">1</span>
                          </div>
                          <h3 className="atlas-web-mono text-[#0A1D08] text-[13px]">ITERATE</h3>
                        </div>
                      </div>

                      {/* EVALUATE */}
                      <div className="flex items-center gap-2 lg:gap-4">
                        <div className="relative flex-shrink-0">
                          {/* Icon: Overlapping dashed circles with + signs */}
                          <svg width="48" height="48" viewBox="0 0 64 64" className="text-[#0A1D08] lg:w-16 lg:h-16">
                            {/* Large dashed circle at top */}
                            <circle cx="32" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            {/* Medium dashed circle bottom-left overlapping */}
                            <circle cx="24" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            {/* Medium dashed circle bottom-right overlapping */}
                            <circle cx="40" cy="34" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            {/* Small dashed circle right of bottom-right */}
                            <circle cx="50" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            {/* + signs in centers */}
                            <text x="32" y="18" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">+</text>
                            <text x="24" y="32" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="40" y="36" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="50" y="14" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="600">+</text>
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#6B7860] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[11px] text-[#FBFDF6] font-medium">2</span>
                          </div>
                          <h3 className="atlas-web-mono text-[#0A1D08] text-[13px]">EVALUATE</h3>
                        </div>
                      </div>

                      {/* DEPLOY */}
                      <div className="flex items-center gap-2 lg:gap-4">
                        <div className="relative flex-shrink-0">
                          {/* Icon: Overlapping circles with radial lines (gears) with + signs */}
                          <svg width="48" height="48" viewBox="0 0 64 64" className="text-[#0A1D08] lg:w-16 lg:h-16">
                            {/* Large gear circle at bottom */}
                            <circle cx="32" cy="50" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="32" y1="39" x2="32" y2="61" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="21" y1="50" x2="43" y2="50" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="25.5" y1="41.5" x2="38.5" y2="58.5" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="38.5" y1="41.5" x2="25.5" y2="58.5" stroke="currentColor" strokeWidth="1.2" />
                            {/* Medium gear circle top-left overlapping */}
                            <circle cx="24" cy="36" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="24" y1="27" x2="24" y2="45" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="15" y1="36" x2="33" y2="36" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="19.5" y1="28.5" x2="28.5" y2="43.5" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="28.5" y1="28.5" x2="19.5" y2="43.5" stroke="currentColor" strokeWidth="1.2" />
                            {/* Medium gear circle top-right overlapping */}
                            <circle cx="40" cy="38" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="40" y1="30" x2="40" y2="46" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="32" y1="38" x2="48" y2="38" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="35.5" y1="31.5" x2="44.5" y2="44.5" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="44.5" y1="31.5" x2="35.5" y2="44.5" stroke="currentColor" strokeWidth="1.2" />
                            {/* Small gear circle top-right of top-right */}
                            <circle cx="50" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="50" y1="14" x2="50" y2="26" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="44" y1="20" x2="56" y2="20" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="47" y1="15.5" x2="53" y2="24.5" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="53" y1="15.5" x2="47" y2="24.5" stroke="currentColor" strokeWidth="1.2" />
                            {/* + signs in centers */}
                            <text x="32" y="52" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">+</text>
                            <text x="24" y="38" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="40" y="40" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="50" y="22" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="600">+</text>
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#6B7860] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[11px] text-[#FBFDF6] font-medium">3</span>
                          </div>
                          <h3 className="atlas-web-mono text-[#0A1D08] text-[13px]">DEPLOY</h3>
                        </div>
                      </div>

                      {/* MONITOR */}
                      <div className="flex items-center gap-2 lg:gap-4">
                        <div className="relative flex-shrink-0">
                          {/* Icon: Double-ring circles (solid inner, dashed outer) with + signs */}
                          <svg width="48" height="48" viewBox="0 0 64 64" className="text-[#0A1D08] lg:w-16 lg:h-16">
                            {/* Large double-ring circle at top */}
                            <circle cx="32" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            <circle cx="32" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Medium double-ring circle bottom-left overlapping */}
                            <circle cx="24" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            <circle cx="24" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Medium double-ring circle bottom-right overlapping */}
                            <circle cx="40" cy="34" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            <circle cx="40" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* Small double-ring circle right of bottom-right */}
                            <circle cx="50" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
                            <circle cx="50" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            {/* + signs in inner circles */}
                            <text x="32" y="18" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">+</text>
                            <text x="24" y="32" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="40" y="36" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">+</text>
                            <text x="50" y="14" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="600">+</text>
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#6B7860] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[11px] text-[#FBFDF6] font-medium">4</span>
                          </div>
                          <h3 className="atlas-web-mono text-[#0A1D08] text-[13px]">MONITOR</h3>
                        </div>
                      </div>
                    </div>

                    {/* Dotted separator line */}
                    <div className="border-t border-[#0A1D08]/20 border-dotted mb-8" style={{ borderWidth: '1px' }}></div>

                    {/* Bottom Row: Descriptions and Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                      {/* ITERATE Description */}
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

                      {/* EVALUATE Description */}
                      <div className="flex flex-col">
                        <h4 className="text-[22px] font-[400] text-[#0A1D08] mb-5 leading-tight" style={{ fontFamily: 'var(--font-akkurat)' }}>
                          Reflect and measure
                        </h4>
                        <ul className="space-y-2.5">
                          <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Evaluations</li>
                          <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Datasets</li>
                        </ul>
                      </div>

                      {/* DEPLOY Description */}
                      <div className="flex flex-col">
                        <h4 className="text-[22px] font-[400] text-[#0A1D08] mb-5 leading-tight" style={{ fontFamily: 'var(--font-akkurat)' }}>
                          From draft to live
                        </h4>
                        <ul className="space-y-2.5">
                          <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Deployments</li>
                          <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Analytics</li>
                          <li className="text-[14px] text-[#0A1D08] opacity-70 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-akkurat)' }}>
                            Gateway
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M7 17L17 7M7 7h10v10" />
                            </svg>
                          </li>
                        </ul>
                      </div>

                      {/* MONITOR Description */}
                      <div className="flex flex-col">
                        <h4 className="text-[22px] font-[400] text-[#0A1D08] mb-5 leading-tight" style={{ fontFamily: 'var(--font-akkurat)' }}>
                          Insights in real time
                        </h4>
                        <ul className="space-y-2.5">
                          <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Logs</li>
                          <li className="text-[14px] text-[#0A1D08] opacity-70" style={{ fontFamily: 'var(--font-akkurat)' }}>Analytics</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Link */}
            <Link 
              href="/pricing" 
              className="atlas-web-mono text-meadow-900 flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{
                fontSize: '18px',
                lineHeight: '18px',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              PRICING
            </Link>

            {/* Blog Link */}
            <Link 
              href="/blog" 
              className="atlas-web-mono text-meadow-900 flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{
                fontSize: '18px',
                lineHeight: '18px',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              BLOG
            </Link>
          </div>

          {/* Center - Logo */}
          <Link 
            className="absolute left-1/2 -translate-x-1/2 flex items-center md:static md:left-auto md:translate-x-0" 
            aria-label="Adaline Homepage" 
            href="/"
            style={{ width: 'auto' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              viewBox="0 0 84 15" 
              className="text-[#0A1D08] md:h-[26px]"
              style={{ height: '24px', width: 'auto' }}
            >
              <path d="M9.15.003.451 12.124v1.733h1.74l8.698-6.928V.003zM10.89 11.777H8.801v2.078h2.087zM39.034.67v5.113h-.036C38.52 5.034 37.472 4.5 36.301 4.5c-2.413 0-4.099 1.906-4.099 4.81 0 2.601 1.562 4.775 4.135 4.775 1.029 0 2.218-.517 2.697-1.425h.035l.089 1.193h1.349V.67zM36.46 12.73c-1.739 0-2.715-1.497-2.715-3.439 0-1.977.976-3.474 2.715-3.474 1.757 0 2.59 1.515 2.59 3.474 0 1.925-.887 3.439-2.59 3.439m13.396-.196V7.742c0-.516-.088-1.015-.283-1.443-.409-.98-1.491-1.8-3.248-1.8-1.916 0-3.584 1.052-3.655 2.887h1.473c.089-1.122 1.1-1.639 2.182-1.639 1.225 0 2.023.606 2.023 1.853v.66l-2.821.195c-2.395.16-3.265 1.568-3.265 2.94 0 1.265.976 2.69 3.159 2.69 1.348 0 2.43-.588 2.98-1.497h.036l.16 1.265h2.218v-1.318zm-1.508-2.53c0 1.586-1.082 2.762-2.697 2.762-1.295 0-1.828-.73-1.828-1.515 0-1.122.994-1.568 1.988-1.639l2.537-.178zM70.263 4.5c-1.1 0-2.414.57-2.857 1.621h-.036l-.106-1.39h-1.33v9.122h1.525v-4.24c0-.766.035-1.657.337-2.334.408-.82 1.189-1.39 2.094-1.39C71.31 5.89 72 6.78 72 8.189v5.665h1.509V7.974c0-2.174-1.225-3.474-3.248-3.474m13.236 5.22c0-.018.036-.25.036-.57 0-2.459-1.384-4.65-4.117-4.65-2.715 0-4.258 2.298-4.258 4.828 0 2.298 1.366 4.757 4.223 4.757 2.058 0 3.637-1.23 3.921-2.975h-1.526c-.302 1.104-1.136 1.621-2.342 1.621-1.721 0-2.715-1.514-2.715-2.922V9.72zM79.4 5.8c1.668 0 2.467 1.283 2.502 2.637h-5.128C76.81 7.101 77.857 5.8 79.4 5.8m-23.74 6.735V.669h-3.301v1.265h1.74v10.601h-1.882v1.318h5.359v-1.318zm6.813 0V4.732h-3.282V6.05h1.72v6.485H58.96v1.318h5.483v-1.318zM64.407.669h-1.934v1.907h1.934zM26.134 8.847l.107-.16h2.714V3.128L21.361 13.89h-1.916v-.036L28.885.67h1.738v13.22h-1.668V9.987h-2.82z"></path>
            </svg>
          </Link>

          {/* Right Side - CTA Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Watch Demo Button - light colored with play icon */}
            <button 
              className="atlas-web-mono inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[20px] cursor-pointer transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shrink-0 bg-[#FBFDF6] border border-[#0A1D08]/10 hover:border-[#0A1D08]/20"
              style={{
                padding: '0px 28px 0px 24px',
                height: '44px',
                fontSize: '18px',
                lineHeight: '18px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: '#203B14',
              }}
            >
                WATCH DEMO
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    className="text-[#203B14]"
                    width="18"
                    height="18"
                  >
                    <path d="M7 7.396c0-1.432 0-2.148.3-2.548a1.5 1.5 0 0 1 1.093-.597c.498-.035 1.1.352 2.305 1.126l7.162 4.604c1.045.672 1.567 1.008 1.748 1.435a1.5 1.5 0 0 1 0 1.168c-.18.427-.703.763-1.748 1.435l-7.162 4.604c-1.205.774-1.807 1.161-2.305 1.126A1.5 1.5 0 0 1 7.3 19.15C7 18.751 7 18.036 7 16.604z"></path>
                  </svg>
            </button>

            {/* Start for free Button - dark green */}
            <a 
              className="atlas-web-mono inline-flex items-center justify-center whitespace-nowrap rounded-[20px] cursor-pointer transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shrink-0 bg-[#0A1D08] text-[#FBFDF6] md:px-6 md:py-2.5 md:h-[44px] lg:px-7" 
              style={{
                padding: '8px 20px',
                height: '44px',
                fontSize: '18px',
                lineHeight: '18px',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://app.adaline.ai/sign-up?utm_source=adaline.ai"
            >
              <span className="hidden lg:inline">START FOR FREE</span>
              <span className="lg:hidden">START</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#0A1D08]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-[#FBFDF6] border-t border-[#0A1D08]/10 shadow-lg z-50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col p-4 gap-4" style={{ paddingLeft: 'var(--grid-margin)', paddingRight: 'var(--grid-margin)' }}>
                <button
                  className="atlas-web-mono text-left text-[#0A1D08] py-2"
                  onClick={() => {
                    setProductsOpen(!productsOpen);
                  }}
                >
                  PRODUCTS {productsOpen ? '−' : '+'}
                </button>
                {productsOpen && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link href="#" className="block text-sm text-[#0A1D08] opacity-70">ITERATE</Link>
                    <Link href="#" className="block text-sm text-[#0A1D08] opacity-70">EVALUATE</Link>
                    <Link href="#" className="block text-sm text-[#0A1D08] opacity-70">DEPLOY</Link>
                    <Link href="#" className="block text-sm text-[#0A1D08] opacity-70">MONITOR</Link>
                  </div>
                )}
                <Link href="/pricing" className="atlas-web-mono text-[#0A1D08] py-2">PRICING</Link>
                <Link href="/blog" className="atlas-web-mono text-[#0A1D08] py-2">BLOG</Link>
                <button className="atlas-web-mono text-left bg-[#FBFDF6] border border-[#0A1D08]/10 rounded-[20px] px-4 py-2 text-[#0A1D08]">
                  DEMO
                </button>
                <a
                  href="https://app.adaline.ai/sign-up?utm_source=adaline.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-web-mono text-center bg-[#0f360b] text-[#FBFDF6] rounded-[20px] px-4 py-2"
                >
                  START FOR FREE
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
