import Navbar from '@/components/Navbar';
import CanvasScrollAnimation from '@/components/CanvasScrollAnimation';
import HeroContent from '@/components/HeroContent';
import LenisScroll from '@/components/LenisScroll';

export default function CanvasPage() {
  return (
    <>
      {/* Ultra-smooth scrolling */}
      <LenisScroll />
      
      <main className="min-h-screen bg-pebble-50">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with Canvas Frame Sequence (Like Adaline.ai) */}
        <section className="relative bg-pebble-50">
          {/* Canvas Animation - EXACTLY like Adaline.ai */}
          <div className="relative z-20">
            <CanvasScrollAnimation 
              frameCount={150}
              framePrefix="/frames/frame"
              quality="standard"
            />
            
            {/* Hero Content Overlay */}
            <div className="absolute top-0 bottom-0 w-full z-20 pointer-events-none">
              <div className="sticky top-[15vh]">
                <HeroContent />
              </div>
            </div>
          </div>
        </section>

        {/* Explanation Section */}
        <section className="relative z-30 bg-pebble-50 py-32 px-6">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                🎬 ADALINE.AI TECHNIQUE
              </div>
              <h2 className="text-4xl font-bold mb-6 text-pebble-900">
                Canvas Frame Sequence Animation
              </h2>
              <p className="text-xl text-pebble-600 max-w-3xl mx-auto leading-relaxed">
                This is the EXACT technique Adaline.ai uses: 281 pre-rendered JPG frames 
                displayed through HTML5 Canvas for 100% smooth, jitter-free scrolling.
              </p>
            </div>

            {/* How It Works */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-white rounded-2xl p-8 border-2 border-pebble-200">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-bold mb-3 text-pebble-900">1. Pre-render Frames</h3>
                <p className="text-pebble-600">
                  Export 150-281 frames of your camera movement from Blender, After Effects, 
                  or any 3D software
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border-2 border-pebble-200">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-3 text-pebble-900">2. Load to Canvas</h3>
                <p className="text-pebble-600">
                  Images are preloaded and drawn to HTML5 Canvas based on scroll position 
                  using requestAnimationFrame
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border-2 border-pebble-200">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3 text-pebble-900">3. Perfect Smoothness</h3>
                <p className="text-pebble-600">
                  Frame-by-frame control gives 100% smooth animation with zero jitter, 
                  exactly like Apple and Airbnb
                </p>
              </div>
            </div>

            {/* Adaline.ai Analysis */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-10 border-2 border-green-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-pebble-900 flex items-center gap-3">
                <span className="text-3xl">🔍</span>
                Adaline.ai Implementation Analysis
              </h3>
              <div className="space-y-4 text-pebble-700">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>281 frames</strong> total in their sequence
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Two quality tiers:</strong> "standard" (50% quality) and "high" (85% quality)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Progressive loading:</strong> Load first frame immediately, batch load the rest
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Format:</strong> JPG images (optimized for web)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>Naming:</strong> <code className="bg-white px-2 py-1 rounded text-sm">graded_4K_100_gm_50_1080_3x5_3-001.jpg</code>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Generate Frames */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-pebble-900 text-center">
                🎬 How to Generate Your Own Frames
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-pebble-300">
                  <h4 className="font-bold text-lg mb-3 text-pebble-900">Option 1: Blender (Free & Powerful)</h4>
                  <ol className="list-decimal list-inside space-y-2 text-pebble-600">
                    <li>Create your 3D scene in Blender</li>
                    <li>Set up camera dolly animation (150 frames at 24fps = 6.25 seconds)</li>
                    <li>Output → Properties → Frame Range: 1 to 150</li>
                    <li>Render → Output Format: JPEG (Quality: 85%)</li>
                    <li>File Format: <code className="bg-pebble-100 px-2 py-1 rounded text-sm">frame-####</code></li>
                    <li>Render → Render Animation</li>
                  </ol>
                </div>

                <div className="bg-white rounded-xl p-6 border border-pebble-300">
                  <h4 className="font-bold text-lg mb-3 text-pebble-900">Option 2: After Effects</h4>
                  <ol className="list-decimal list-inside space-y-2 text-pebble-600">
                    <li>Create composition (1920x1080, 150 frames)</li>
                    <li>Animate camera dolly movement</li>
                    <li>File → Export → Add to Render Queue</li>
                    <li>Output Module → Format: JPEG Sequence</li>
                    <li>Quality: 85</li>
                    <li>Render</li>
                  </ol>
                </div>

                <div className="bg-white rounded-xl p-6 border border-pebble-300">
                  <h4 className="font-bold text-lg mb-3 text-pebble-900">Option 3: FFmpeg (Convert Video)</h4>
                  <div className="bg-pebble-900 text-pebble-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    ffmpeg -i your-video.mp4 -vf "fps=24,scale=1920:1080" frame-%04d.jpg
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* File Structure Guide */}
        <section className="relative z-30 bg-white py-32 px-6">
          <div className="max-w-content mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-pebble-900">
              📁 File Structure
            </h2>
            
            <div className="max-w-2xl mx-auto bg-pebble-900 text-green-400 p-8 rounded-xl font-mono text-sm">
              <div>public/</div>
              <div className="ml-4">└── frames/</div>
              <div className="ml-8">├── frame-0001.jpg</div>
              <div className="ml-8">├── frame-0002.jpg</div>
              <div className="ml-8">├── frame-0003.jpg</div>
              <div className="ml-8">├── ...</div>
              <div className="ml-8">└── frame-0150.jpg</div>
            </div>

            <div className="mt-8 max-w-2xl mx-auto text-center text-pebble-600">
              <p className="mb-4">
                <strong>Important:</strong> Use 4-digit padding (0001, 0002, etc.) for proper sorting
              </p>
              <p>
                <strong>Optimization:</strong> Convert to WebP for 30-40% smaller file sizes with same quality
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

