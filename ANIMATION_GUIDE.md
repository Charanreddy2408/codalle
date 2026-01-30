# Scenery Scroll Animation Guide

## Overview

This component recreates Adaline.ai's hero background scroll animation where the camera **zooms OUT** (pulls back) as you scroll down.

## How to Use

### Option 1: Standalone Demo Page

Navigate to the demo page:
```bash
npm run dev
# Visit http://localhost:3000/animation-demo
```

### Option 2: Add to Existing Page

```tsx
import SceneryAnimation from '@/components/SceneryAnimation';

export default function YourPage() {
  return (
    <main>
      <SceneryAnimation />
      {/* Your other content */}
    </main>
  );
}
```

### Option 3: Replace Existing Hero

In `app/page.tsx`, replace the current Hero component:

```tsx
// Before:
import Hero from '@/components/Hero';

// After:
import SceneryAnimation from '@/components/SceneryAnimation';

export default function Home() {
  return (
    <main className="min-h-screen bg-adaline-bg">
      <Navbar />
      <SceneryAnimation />  {/* Replaced Hero */}
      {/* Rest of content */}
    </main>
  );
}
```

## Animation Behavior Explained

### Initial State (Top of Page)
When the page first loads, the image is:
- **Scale:** 1.15 (zoomed in 15%)
- **TranslateY:** -120px (shifted upward)
- **Opacity:** 1.0 (fully visible)
- **Transform Origin:** bottom (critical for pull-back effect)

### During Scroll
As you scroll through the 350vh container:
- **Scale:** 1.15 → 1.0 (zooms OUT, camera pulls back)
- **TranslateY:** -120px → 0px (centers vertically)
- **Opacity:** 1.0 → 0.9 (subtle fade)

### Final State (After Animation)
When scroll completes:
- Image returns to normal size (1.0)
- Perfectly centered (0px)
- Slightly faded for depth (0.9)

## Key Technical Details

### Scroll Height: 350vh
```tsx
style={{ height: '350vh' }}
```
This creates a tall container that acts as the animation timeline. The taller the container, the slower/smoother the animation feels.

**Adjust for different speeds:**
- `300vh` - Faster animation
- `350vh` - Default (balanced)
- `400vh` - Slower, more cinematic

### Transform Origin: Bottom
```tsx
transformOrigin: 'bottom'
```
**Critical for correct effect!** Without this, the zoom would feel like a standard zoom in/out from the center. With `bottom` origin, it creates the illusion of a camera tilting back and pulling away.

### Scroll-Scrubbed Animation
```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end start'],
});
```
This links animation directly to scroll position:
- **Not time-based** (no duration)
- **User controls** animation speed by scrolling
- **Perfectly smooth** scrubbing back and forth

### Transform Mappings
```tsx
// Zoom OUT (not in!)
const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);

// Move from up to center
const translateY = useTransform(scrollYProgress, [0, 1], [-120, 0]);

// Subtle fade for depth
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
```

## Customization

### Adjust Zoom Amount
```tsx
// More dramatic zoom
const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.0]);

// Less dramatic zoom
const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
```

### Adjust Vertical Movement
```tsx
// More movement
const translateY = useTransform(scrollYProgress, [0, 1], [-200, 0]);

// Less movement
const translateY = useTransform(scrollYProgress, [0, 1], [-80, 0]);
```

### Change Transform Origin
```tsx
transformOrigin: 'bottom'  // Camera pulls back (default)
transformOrigin: 'center'  // Standard zoom
transformOrigin: 'top'     // Camera pulls forward from top
```

### Modify Mask Gradient
```tsx
// Softer fade
maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'

// Harder edges
maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'

// No mask
// Remove the mask wrapper entirely
```

### Change Scroll Height
```tsx
// In SceneryAnimation.tsx line 48
style={{ height: '400vh' }}  // Slower animation
style={{ height: '300vh' }}  // Faster animation
```

## Mobile Responsiveness

### Current Behavior
The animation works on all devices. For mobile optimization, you can disable or reduce the animation:

```tsx
// At the top of SceneryAnimation component
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const scale = useTransform(
  scrollYProgress,
  [0, 1],
  isMobile ? [1.0, 1.0] : [1.15, 1.0]  // No zoom on mobile
);
```

### Static Image on Mobile
```tsx
export default function SceneryAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    return (
      <section className="relative w-full h-screen">
        <img
          src="/scene.png"
          alt="Scenic background"
          className="w-full h-full object-cover"
        />
      </section>
    );
  }

  // Return animated version for desktop
  return (
    // ... rest of component
  );
}
```

## Performance Notes

### GPU Acceleration
All transforms use CSS transforms which are GPU-accelerated:
- `scale` - GPU accelerated ✅
- `translateY` - GPU accelerated ✅
- `opacity` - GPU accelerated ✅

### 60fps Animation
Framer Motion's `motion.div` with `useTransform` ensures smooth 60fps:
- No JavaScript calculations on scroll
- Direct CSS transform updates
- Hardware-accelerated rendering

### Image Optimization
For best performance:
```bash
# Optimize your scene.png
# Recommended: 1920x1080 at 80% quality
# Or use WebP format for smaller size

# Using Next.js Image component (optional)
import Image from 'next/image';
<Image src="/scene.png" fill objectFit="cover" />
```

## Comparison with Original

| Feature | Adaline.ai | This Implementation | Match |
|---------|------------|---------------------|-------|
| Zoom Direction | OUT (pulls back) | OUT (pulls back) | ✅ |
| Initial Scale | ~1.15 | 1.15 | ✅ |
| Transform Origin | Bottom | bottom | ✅ |
| Scroll Control | Scrubbed | Scrubbed | ✅ |
| Sticky Behavior | Yes | Yes | ✅ |
| Mask Gradient | Yes | Yes | ✅ |
| Cinematic Feel | Yes | Yes | ✅ |
| Y Translation | Yes | -120px → 0px | ✅ |

## Debugging

### Animation Not Working?
1. Check scroll container height: `style={{ height: '350vh' }}`
2. Verify sticky positioning: `className="sticky top-0"`
3. Ensure transform origin: `transformOrigin: 'bottom'`
4. Check console for Framer Motion warnings

### Animation Too Fast/Slow?
Adjust the container height:
```tsx
// Slower
style={{ height: '450vh' }}

// Faster
style={{ height: '250vh' }}
```

### Image Not Showing?
Verify file exists at:
```
/public/scene.png
```

### Reverse Animation Direction?
Swap the transform values:
```tsx
// This would zoom IN instead of OUT (not recommended)
const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
```

## Advanced: Adding Content Overlay

To add text over the animation (like Adaline.ai):

```tsx
<section ref={containerRef} style={{ height: '350vh' }}>
  <div className="sticky top-0 h-screen w-full overflow-hidden">
    {/* Background Animation */}
    <motion.div style={{ scale, y: translateY, opacity }}>
      {/* Image */}
    </motion.div>

    {/* Overlay Content (NEW) */}
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-bold text-white"
        style={{ opacity: contentOpacity }}  // Fades out on scroll
      >
        Your Heading Here
      </motion.h1>
    </div>
  </div>
</section>
```

Add content opacity transform:
```tsx
const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
```

## Files Modified/Created

- ✅ `components/SceneryAnimation.tsx` - Main animation component
- ✅ `app/animation-demo/page.tsx` - Demo page
- ✅ `ANIMATION_GUIDE.md` - This guide

## Testing Checklist

- [ ] Animation starts zoomed in (1.15)
- [ ] Animation zooms OUT as you scroll (not in)
- [ ] Transform origin is from bottom
- [ ] Scroll controls animation (scrubbing works)
- [ ] Sticky positioning keeps image in view
- [ ] Mask gradient visible at edges
- [ ] Smooth 60fps performance
- [ ] Works on desktop
- [ ] Responsive on mobile
- [ ] Image loads correctly

---

**The animation is now ready! Scroll slowly to see the cinematic camera pull-back effect.** 🎬✨


