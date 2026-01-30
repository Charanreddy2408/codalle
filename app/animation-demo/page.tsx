import SceneryAnimation from '@/components/SceneryAnimation';
import HeroContent from '@/components/HeroContent';

/**
 * Animation Demo Page
 * 
 * Complete Adaline.ai hero section with:
 * - Background scroll animation
 * - Hero text overlay
 * - Company logos
 */
export default function AnimationDemo() {
  return (
    <main className="min-h-screen bg-[#f5f3f0]">
      {/* Background Scenery Animation */}
      <SceneryAnimation />
      
      {/* Hero Content Overlay (text + logos) */}
      <HeroContent />
      
      {/* Content Below Animation - demonstrates scroll completion */}
      <section className="relative z-20 bg-gradient-to-b from-black to-gray-900 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Animation Complete
          </h2>
          <p className="text-xl text-gray-400">
            The background has smoothly zoomed out from 1.15x to 1.0x while you scrolled.
            This demonstrates the scroll-scrubbed animation behavior.
          </p>
          <div className="mt-12 p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Animation Details:</h3>
            <ul className="text-left text-gray-300 space-y-2">
              <li>• <strong>Initial Scale:</strong> 1.15 (zoomed IN)</li>
              <li>• <strong>Final Scale:</strong> 1.0 (normal)</li>
              <li>• <strong>Transform Origin:</strong> bottom (camera pulls back)</li>
              <li>• <strong>Scroll Height:</strong> 350vh</li>
              <li>• <strong>Animation Type:</strong> Scroll-scrubbed (no time-based)</li>
              <li>• <strong>Y Translation:</strong> -120px → 0px</li>
              <li>• <strong>Opacity:</strong> 1.0 → 0.9</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

