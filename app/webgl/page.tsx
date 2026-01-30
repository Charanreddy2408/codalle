import Navbar from '@/components/Navbar';
import WebGLScene from '@/components/WebGLScene';
import HeroContent from '@/components/HeroContent';
import LenisScroll from '@/components/LenisScroll';

export default function WebGLPage() {
  return (
    <>
      {/* Ultra-smooth scrolling */}
      <LenisScroll />
      
      <main className="min-h-screen bg-pebble-50 relative">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with WebGL Animation */}
        <section className="relative bg-pebble-50 h-[400vh]">
          {/* WebGL 3D Scene */}
          <WebGLScene />
          
          {/* Hero Content Overlay */}
          <div className="sticky top-0 h-screen flex items-center justify-center z-20">
            <HeroContent />
          </div>
        </section>

        {/* Additional Content Section */}
        <section className="relative z-30 bg-pebble-50 py-32 px-6">
          <div className="max-w-content mx-auto text-center text-pebble-900">
            <h2 className="text-4xl font-bold mb-6">Pure WebGL Experience</h2>
            <p className="text-lg text-pebble-600 max-w-2xl mx-auto mb-8">
              Hardware-accelerated 3D rendering using WebGL and Three.js for
              maximum performance and visual quality.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="bg-white/60 backdrop-blur rounded-2xl p-10 text-left">
                <h3 className="text-2xl font-bold mb-4">🎮 Real-time 3D</h3>
                <p className="text-pebble-600 leading-relaxed">
                  True 3D rendering with real-time lighting, shadows, and depth.
                  Every frame is calculated on your GPU for silky-smooth 60fps performance.
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur rounded-2xl p-10 text-left">
                <h3 className="text-2xl font-bold mb-4">🌈 Advanced Effects</h3>
                <p className="text-pebble-600 leading-relaxed">
                  Atmospheric fog, dynamic lighting, and realistic materials.
                  Post-processing effects create a cinematic visual experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

