import Navbar from '@/components/Navbar';
import EnhancedAdalineAnimation from '@/components/EnhancedAdalineAnimation';
import HeroContent from '@/components/HeroContent';
import LenisScroll from '@/components/LenisScroll';

export default function EnhancedPage() {
  return (
    <>
      {/* Ultra-smooth scrolling */}
      <LenisScroll />
      
      <main className="min-h-screen bg-pebble-50">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with Enhanced 3D Animation */}
        <section className="relative bg-pebble-50">
          {/* Enhanced 3D Camera Animation with GSAP */}
          <div className="relative z-20 origin-bottom md:-mb-[50vh]">
            <EnhancedAdalineAnimation />
            
            {/* Hero Content Overlay */}
            <div className="absolute top-0 bottom-0 w-full z-20">
              <HeroContent />
            </div>
          </div>
        </section>

        {/* Additional Content Section */}
        <section className="relative z-30 bg-pebble-50 py-32 px-6">
          <div className="max-w-content mx-auto text-center text-pebble-900">
            <h2 className="text-4xl font-bold mb-6">Enhanced with WebGL & GSAP</h2>
            <p className="text-lg text-pebble-600 max-w-2xl mx-auto mb-8">
              Experience ultra-smooth scrolling with hardware-accelerated 3D transforms,
              GSAP ScrollTrigger, and advanced parallax effects.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-pebble-200">
                <div className="text-3xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-3">3D Camera Dolly</h3>
                <p className="text-pebble-600">
                  True cinematic camera movement through 3D space with dynamic perspective changes
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-pebble-200">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">GSAP Power</h3>
                <p className="text-pebble-600">
                  Professional-grade animations with ScrollTrigger for butter-smooth interactions
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-pebble-200">
                <div className="text-3xl mb-4">🌊</div>
                <h3 className="text-xl font-semibold mb-3">Multi-Layer Parallax</h3>
                <p className="text-pebble-600">
                  Multiple depth layers creating immersive 3D parallax effects
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="relative z-30 bg-gradient-to-b from-pebble-50 to-white py-32 px-6">
          <div className="max-w-content mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Powered By</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['WebGL', 'GSAP', 'Three.js', 'React Three Fiber', 'Framer Motion', 'Next.js'].map((tech) => (
                <div 
                  key={tech}
                  className="px-6 py-3 bg-white rounded-full border border-pebble-300 text-pebble-700 font-medium hover:shadow-lg transition-shadow"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

