import Navbar from '@/components/Navbar';
import EnhancedAdalineAnimation from '@/components/EnhancedAdalineAnimation';
import HeroContent from '@/components/HeroContent';
import LenisScroll from '@/components/LenisScroll';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Ultra-smooth scrolling */}
      <LenisScroll />
      
      <main className="min-h-screen bg-pebble-50">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with Enhanced 3D Animation */}
        <section className="relative bg-pebble-50">
          {/* Enhanced 3D Camera Animation with GSAP + WebGL */}
          <div className="relative z-20 origin-bottom md:-mb-[50vh]">
            <EnhancedAdalineAnimation />
            
            {/* Hero Content Overlay */}
            <div className="absolute top-0 bottom-0 w-full z-20">
              <HeroContent />
            </div>
          </div>
        </section>

        {/* Demo Navigation Section */}
        <section className="relative z-30 bg-gradient-to-b from-pebble-50 via-white to-pebble-50 py-24 px-6">
          <div className="max-w-content mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              ✨ New: Enhanced Animations
            </div>
            <h2 className="text-5xl font-bold mb-6 text-pebble-900">
              Choose Your Experience
            </h2>
            <p className="text-xl text-pebble-600 max-w-2xl mx-auto mb-16">
              Explore different animation approaches powered by WebGL, GSAP, and Framer Motion
            </p>
            
            {/* Demo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Enhanced Animation */}
              <Link href="/enhanced">
                <div className="group relative bg-gradient-to-br from-white to-pebble-100 rounded-3xl p-10 border-2 border-pebble-200 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">🚀</div>
                    <h3 className="text-2xl font-bold mb-4 text-pebble-900">Enhanced Animation</h3>
                    <p className="text-pebble-600 mb-6 leading-relaxed">
                      GSAP ScrollTrigger + Framer Motion with multi-layer parallax,
                      particle effects, and ultra-smooth scrolling
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">GSAP</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Parallax</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">3D</span>
                    </div>
                    <div className="mt-6 text-green-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      View Demo →
                    </div>
                  </div>
                </div>
              </Link>

              {/* WebGL Scene */}
              <Link href="/webgl">
                <div className="group relative bg-gradient-to-br from-white to-pebble-100 rounded-3xl p-10 border-2 border-pebble-200 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">🎮</div>
                    <h3 className="text-2xl font-bold mb-4 text-pebble-900">Pure WebGL</h3>
                    <p className="text-pebble-600 mb-6 leading-relaxed">
                      Hardware-accelerated 3D rendering with Three.js, real-time
                      lighting, and advanced post-processing effects
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">WebGL</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Three.js</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">GPU</span>
                    </div>
                    <div className="mt-6 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      View Demo →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Canvas Frame Sequence */}
              <Link href="/canvas">
                <div className="group relative bg-gradient-to-br from-white to-pebble-100 rounded-3xl p-10 border-2 border-pebble-200 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">🎬</div>
                    <h3 className="text-2xl font-bold mb-4 text-pebble-900">Canvas Frames</h3>
                    <p className="text-pebble-600 mb-6 leading-relaxed">
                      The EXACT technique Adaline.ai uses: pre-rendered image sequence 
                      for 100% smooth, Apple-level scrolling
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Canvas</span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Frames</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Perfect</span>
                    </div>
                    <div className="mt-6 text-purple-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      View Demo →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-30 bg-pebble-50 py-32 px-6">
          <div className="max-w-content mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center text-pebble-900">
              Build AI agents with confidence
            </h2>
            <p className="text-lg text-pebble-600 max-w-2xl mx-auto text-center mb-16">
              Adaline provides the tools and infrastructure you need to iterate quickly, 
              evaluate thoroughly, deploy confidently, and monitor continuously.
            </p>

            {/* Tech Stack */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'GSAP', emoji: '⚡', desc: 'Professional animations' },
                { name: 'WebGL', emoji: '🎮', desc: 'GPU acceleration' },
                { name: 'Three.js', emoji: '🎨', desc: '3D rendering' },
                { name: 'React', emoji: '⚛️', desc: 'Modern UI' },
              ].map((tech) => (
                <div key={tech.name} className="text-center p-6 bg-white rounded-2xl border border-pebble-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3">{tech.emoji}</div>
                  <div className="font-bold text-pebble-900 mb-1">{tech.name}</div>
                  <div className="text-sm text-pebble-600">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
