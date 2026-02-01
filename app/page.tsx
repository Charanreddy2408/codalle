import Navbar from '@/components/Navbar';
import EnhancedAdalineAnimation from '@/components/EnhancedAdalineAnimation';
import HeroContent from '@/components/HeroContent';
import LenisScroll from '@/components/LenisScroll';

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
      </main>
    </>
  );
}
