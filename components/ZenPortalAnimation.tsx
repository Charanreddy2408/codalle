'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  MousePointer2, FileText, Folder, ChevronRight, 
  Code, Send, Search, Settings, Terminal
} from 'lucide-react';

/**
 * ZEN PORTAL ANIMATION - SCROLL-BASED (MATCHING ORIGINAL)
 * 
 * Stage 1: The Zen State (3D Japanese garden with tilted perspective)
 * Stage 2: The Portal Mechanism (Shoji doors + dolly zoom on scroll)
 * Stage 3: The Dashboard Resolve (Cross-fade with landing animation)
 * Stage 4: Dashboard Layout (File tree, code editor, AI assistant)
 */

export default function ZenPortalAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the animation track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress with camera momentum and weight
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Sophisticated easing curve from video
  const sophisticatedEase = [0.4, 0, 0.2, 1] as const;

  // CINEMATIC CAMERA MOVEMENTS - MORE INTERMEDIATE FRAMES
  
  // 1. THE TILT (Starts immediately, levels out halfway) - MORE INTERMEDIATE FRAMES
  const rotateX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1], [15, 12, 8, 5, 3, 1, 0]);

  // 2. THE DOLLY (Starts slow, then accelerates exponentially at the end) - MORE INTERMEDIATE FRAMES
  const scale = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.75, 0.85, 0.95, 1], [1, 1.03, 1.1, 1.4, 1.8, 2.3, 2.7, 3]);

  // 3. THE DEPTH (Moving the camera "past" the garden) - MORE INTERMEDIATE FRAMES
  const z = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 100, 200, 300, 400, 500]);

  // 4. THE BLUR (Only starts kicking in once we are deep into the zoom) - MORE INTERMEDIATE FRAMES
  const blur = useTransform(smoothProgress, [0.5, 0.65, 0.75, 0.85, 0.9, 0.95, 1], [0, 8, 16, 24, 32, 36, 40]);

  // Additional effects - MORE INTERMEDIATE FRAMES
  const gardenBrightness = useTransform(smoothProgress, [0.5, 0.65, 0.75, 0.85, 0.9, 0.95, 1], [1, 1.1, 1.2, 1.3, 1.4, 1.45, 1.5]);
  const gardenSaturate = useTransform(smoothProgress, [0.5, 0.65, 0.75, 0.85, 0.9, 0.95, 1], [1, 1.05, 1.1, 1.15, 1.18, 1.19, 1.2]);
  const gardenOpacity = useTransform(smoothProgress, [0.85, 0.88, 0.91, 0.94, 0.97, 1], [1, 0.8, 0.6, 0.4, 0.2, 0]);

  // Shoji doors (slide from ±100% to ±32%) - sync with zoom - MORE INTERMEDIATE FRAMES
  const leftDoorX = useTransform(smoothProgress, [0.4, 0.55, 0.65, 0.75, 0.85, 0.9, 0.95, 1], ['-100%', '-85%', '-70%', '-55%', '-45%', '-38%', '-35%', '-32%']);
  const rightDoorX = useTransform(smoothProgress, [0.4, 0.55, 0.65, 0.75, 0.85, 0.9, 0.95, 1], ['100%', '85%', '70%', '55%', '45%', '38%', '35%', '32%']);

  // Cursor visibility (fades early) - MORE INTERMEDIATE FRAMES
  const cursorOpacity = useTransform(smoothProgress, [0, 0.1, 0.15, 0.2, 0.25], [1, 0.75, 0.5, 0.25, 0]);

  // Dashboard reveal (after garden fades) - MORE INTERMEDIATE FRAMES
  const dashboardOpacity = useTransform(smoothProgress, [0.9, 0.92, 0.94, 0.96, 0.98, 1], [0, 0.2, 0.4, 0.6, 0.8, 1]);
  const dashboardScale = useTransform(smoothProgress, [0.9, 0.92, 0.94, 0.96, 0.98, 1], [0.95, 0.96, 0.97, 0.98, 0.99, 1]);
  const dashboardY = useTransform(smoothProgress, [0.9, 0.92, 0.94, 0.96, 0.98, 1], [30, 24, 18, 12, 6, 0]);

  // Combine filter effects
  const gardenFilter = useTransform(
    [blur, gardenBrightness, gardenSaturate],
    ([b, brightness, saturate]) => 
      `blur(${b}px) brightness(${brightness}) saturate(${saturate})`
  );

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-white">
      {/* STICKY VIEWPORT */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          perspective: '1200px', // CRUCIAL: Parent perspective
        }}
      >
        {/* STAGE 1 & 2: THE ZEN STATE + PORTAL TRANSITION */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: gardenOpacity,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 3D Garden Container - Cinematic Camera Movement */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              rotateX: rotateX,
              translateZ: z,
              scale: scale,
              filter: gardenFilter,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center 40%', // Vanishing point trick - fly toward horizon
            }}
          >
            <img
              src="/scene.png"
              alt="Japanese Garden"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Orange Cursor Icon - Persistent at top: 25%, left: 40% */}
          <motion.div
            className="absolute z-10"
            style={{
              top: '25%',
              left: '40%',
              opacity: cursorOpacity,
            }}
          >
            <MousePointer2 
              size={24} 
              className="text-orange-500 drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            />
          </motion.div>

          {/* STAGE 2: SHOJI DOORS (Portal Mechanism) */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-white z-30"
            style={{
              x: leftDoorX,
              width: '50%',
              boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            {/* Shoji Grid Pattern */}
            <div className="h-full w-full flex flex-col">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-1 border-b border-gray-200">
                  <div className="h-full flex">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={j}
                        className="flex-1 border-r border-gray-200 last:border-r-0"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute top-0 right-0 h-full bg-white z-30"
            style={{
              x: rightDoorX,
              width: '50%',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            {/* Shoji Grid Pattern */}
            <div className="h-full w-full flex flex-col">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-1 border-b border-gray-200">
                  <div className="h-full flex">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={j}
                        className="flex-1 border-r border-gray-200 last:border-r-0"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* STAGE 3 & 4: DASHBOARD RESOLVE */}
        <motion.div
          className="absolute inset-0 bg-white flex"
          style={{
            opacity: dashboardOpacity,
            scale: dashboardScale,
            y: dashboardY,
          }}
        >
          {/* LEFT SIDEBAR - File Tree (w-64, bg-[#0f172a]) */}
          <aside className="w-64 bg-[#0f172a] flex flex-col overflow-hidden">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-white text-sm font-semibold mb-2">Explorer</h2>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
              <FileTreeItem icon={<Folder size={16} />} label="projects" expanded>
                <FileTreeItem icon={<Folder size={16} />} label="zen-portal" expanded>
                  <FileTreeItem icon={<FileText size={16} />} label="main.py" active />
                  <FileTreeItem icon={<FileText size={16} />} label="config.json" />
                  <FileTreeItem icon={<FileText size={16} />} label="README.md" />
                </FileTreeItem>
                <FileTreeItem icon={<Folder size={16} />} label="components">
                  <FileTreeItem icon={<FileText size={16} />} label="Navbar.tsx" />
                  <FileTreeItem icon={<FileText size={16} />} label="Hero.tsx" />
                </FileTreeItem>
              </FileTreeItem>
              <FileTreeItem icon={<Folder size={16} />} label="public">
                <FileTreeItem icon={<FileText size={16} />} label="scene.png" />
              </FileTreeItem>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Terminal size={14} />
                <span>Terminal</span>
              </div>
            </div>
          </aside>

          {/* CENTER EDITOR (flex-1, bg-white) */}
          <main className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Breadcrumbs */}
            <header className="h-12 bg-white border-b border-gray-200 flex items-center px-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Code size={14} />
                <span>projects</span>
                <ChevronRight size={12} />
                <span>zen-portal</span>
                <ChevronRight size={12} />
                <span className="text-gray-900 font-medium">main.py</span>
              </div>
            </header>

            {/* Code Editor */}
            <div className="flex-1 overflow-y-auto p-6 bg-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>
              <div className="max-w-4xl mx-auto font-mono text-sm leading-relaxed">
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-600">def</span>{' '}
                    <span className="text-blue-600">zen_portal_transition</span>
                    <span className="text-gray-600">():</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-600"># Stage 1: The Zen State</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-600">garden</span> = <span className="text-green-600">JapaneseGarden</span>(
                  </div>
                  <div className="pl-8">
                    <span className="text-orange-600">perspective</span>=<span className="text-blue-600">1200</span>,
                  </div>
                  <div className="pl-8">
                    <span className="text-orange-600">rotateX</span>=<span className="text-blue-600">15</span>,
                  </div>
                  <div className="pl-8">
                    <span className="text-orange-600">translateZ</span>=<span className="text-blue-600">-50</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-600">)</span>
                  </div>
                  <div className="pl-4 mt-4">
                    <span className="text-gray-600"># Stage 2: Portal Mechanism</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-600">doors</span>.<span className="text-blue-600">slide</span>(
                  </div>
                  <div className="pl-8">
                    <span className="text-orange-600">from</span>=<span className="text-green-600">&quot;±100%&quot;</span>,
                  </div>
                  <div className="pl-8">
                    <span className="text-orange-600">to</span>=<span className="text-green-600">&quot;±32%&quot;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-600">)</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT PANEL - AI Assistant (w-96, bg-slate-50) */}
          <aside className="w-96 bg-slate-50 flex flex-col border-l border-gray-200 overflow-hidden">
            {/* AI Assistant Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="text-sm font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-500 mt-1">Ready to help</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
              <motion.div
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-xs text-gray-500 mb-2 font-medium">AI Assistant</p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  I&apos;ve analyzed the Zen Portal animation. The transition uses a sophisticated dolly zoom effect with synchronized Shoji door panels. The garden scales from 1.0 to 2.8 while applying blur(40px), brightness(1.5), and saturate(1.2) filters.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-xs text-gray-500 mb-2 font-medium">AI Assistant</p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  The dashboard resolves with a smooth landing animation: scale(0.95) → scale(1) and y(30) → y(0), creating a professional cross-fade transition.
                </p>
              </motion.div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300 shadow-sm">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
                />
                <button className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </aside>
        </motion.div>
      </div>
    </div>
  );
}

// File Tree Component
function FileTreeItem({ 
  icon, 
  label, 
  expanded = false, 
  active = false, 
  children 
}: { 
  icon: React.ReactNode; 
  label: string; 
  expanded?: boolean; 
  active?: boolean; 
  children?: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded text-sm cursor-pointer transition-colors ${
          active
            ? 'bg-slate-700 text-white'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
        onClick={() => children && setIsExpanded(!isExpanded)}
      >
        {children && (
          <ChevronRight
            size={12}
            className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
        )}
        {!children && <div className="w-3" />}
        {icon}
        <span>{label}</span>
      </div>
      {children && isExpanded && (
        <div className="ml-4 mt-1">{children}</div>
      )}
    </div>
  );
}
