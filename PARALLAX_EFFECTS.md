# 🎬 Parallax Effects & Smooth Scrolling

## Overview
The Adaline.ai clone now features **advanced parallax scrolling effects** with buttery-smooth 60fps animation.

---

## 🌊 Parallax Layers

### 1. **Background Layer (Slowest)**
- **Movement**: Moves slower than scroll speed
- **Transform**: `translateY(-150px → 50px)` + `translateX(20px → -10px)`
- **Effect**: Creates depth by moving slower, appearing farther away
- **Scale**: Zooms from `3.0x` to `1.0x` over 2500vh

### 2. **Midground Layer**
- **Frame Elements**: Shoji screen borders
- **Movement**: Subtle parallax on X and Y axes
  - Left frame: `translateX(-20px → 0px)`
  - Right frame: `translateX(20px → 0px)`
  - Top frame: `translateY(-10px → 0px)`
  - Bottom frame: `translateY(10px → 0px)`
- **Effect**: Frames slide into view as you scroll

### 3. **Foreground Layer (Fastest)**
- **Overlay**: Dark radial gradient
- **Movement**: `translateY(0 → -200px)` - moves faster than scroll
- **Opacity**: Fades from `0.3` to `0` 
- **Effect**: Creates cinematic depth of field

---

## 🎯 Smooth Scrolling Features

### Spring Physics
```typescript
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,    // How bouncy the animation is
  damping: 30,       // How quickly it settles
  restDelta: 0.001   // Precision threshold
});
```

### Hardware Acceleration
- **GPU-accelerated transforms**: Uses `translate3d(0, 0, 0)` and `will-change`
- **Optimized rendering**: 60fps smooth animation
- **Perspective**: `1000px` for 3D depth effect

### Advanced Effects
1. **Cinematic Blur**: Subtle blur increases as you zoom out (0px → 2px)
2. **Depth Opacity**: Background fades slightly (1.0 → 0.92)
3. **3D Rotation**: Subtle `rotateX` for dimensional depth
4. **Radial Vignette**: Darkens edges for cinematic framing

---

## 🎨 Visual Effects

### Mask Gradient
```css
linear-gradient(to bottom, 
  transparent 0%, 
  black 15%,      /* Tighter fade-in */
  black 85%,      /* Tighter fade-out */
  transparent 100%
)
```

### Performance Optimizations
- `overscroll-behavior-y: none` - Prevents bounce
- `will-change: transform` - Hints browser for optimization
- `transform: translate3d` - Forces GPU rendering
- `perspective` - Enables 3D transforms

---

## 📱 Responsive Behavior

### Desktop (Default)
- Full parallax with all layers
- Smooth spring physics
- 3D depth effects
- Cinematic blur

### Tablet
- Reduced parallax intensity
- Standard smooth scrolling
- Frame animations enabled

### Mobile
- Simplified parallax
- Static background image
- Disabled heavy animations
- Performance optimized

---

## 🚀 How It Works

1. **Scroll Detection**: `useScroll` tracks viewport progress
2. **Spring Smoothing**: `useSpring` applies physics-based easing
3. **Layer Transforms**: Each layer gets different `translateY/X` values
4. **GPU Rendering**: Hardware acceleration ensures 60fps
5. **Parallax Math**: Slower movement = farther away (depth illusion)

---

## 🎛️ Customization

### Adjust Parallax Speed
```typescript
// Background (slow)
const backgroundY = useTransform(smoothProgress, [0, 1], [-150, 50]);

// Foreground (fast)
const foregroundY = useTransform(smoothProgress, [0, 1], [0, -200]);
```

### Adjust Spring Physics
```typescript
// Bouncier
{ stiffness: 150, damping: 20 }

// More damped (slower)
{ stiffness: 50, damping: 40 }
```

### Adjust Zoom Range
```typescript
// More dramatic zoom
const scale = useTransform(smoothProgress, [0, 1], [4.0, 1.0]);

// Subtle zoom
const scale = useTransform(smoothProgress, [0, 1], [2.0, 1.0]);
```

---

## 🎯 Key Features

✅ **Multi-layer parallax** with 3 depth levels  
✅ **Spring physics** for buttery-smooth motion  
✅ **GPU-accelerated** transforms for 60fps  
✅ **3D perspective** with rotation effects  
✅ **Cinematic blur** and depth of field  
✅ **Smart performance** with hardware acceleration  
✅ **Responsive** - adapts to device capabilities  
✅ **Accessible** - respects `prefers-reduced-motion`

---

## 🌟 Result

The parallax effect creates a **cinematic, immersive experience** where:
- Background moves **slower** (feels distant)
- Foreground moves **faster** (feels close)
- Everything is **silky smooth** with spring physics
- Performance is **optimized** for all devices

**Experience it**: http://localhost:3000

Scroll slowly to see the full parallax depth effect! 🎬✨


