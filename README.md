# Adaline.ai Hero Section Clone

A pixel-perfect recreation of the Adaline.ai landing page hero section with scroll animations, built with Next.js, React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Exact Visual Match**: Recreates Adaline.ai's hero section with matching:
  - Typography (Inter font family)
  - Colors (beige background, green accents)
  - Spacing and layout
  - Button styles
  - Navbar design

- **Scroll Animation**: 
  - Smooth scroll-scrubbed animations
  - Background scenery scales, translates, and fades on scroll
  - Sticky positioning during animation
  - 350vh scroll height for extended animation

- **Responsive Design**:
  - Desktop: Full scroll animation experience
  - Tablet: Optimized layout
  - Mobile: Adjusted font sizes and spacing

- **Performance Optimized**:
  - Framer Motion for 60fps animations
  - CSS transforms for hardware acceleration
  - Efficient re-rendering

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Ensure the scenery image exists**:
   - The image should be at `/public/scene.png`
   - This image is used as the animated background

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Scroll down to see the animation in action

## 📁 Project Structure

```
codale/
├── app/
│   ├── globals.css          # Global styles & CSS variables
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── Navbar.tsx            # Sticky navbar with transparency effect
│   └── Hero.tsx              # Hero section with scroll animations
├── public/
│   └── scene.png             # Background scenery image
├── tailwind.config.ts        # Tailwind customization
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

## 🎨 Design Specifications

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hero Heading**: `clamp(2.5rem, 6vw, 5rem)` with `-0.02em` letter spacing
- **Nav Text**: `0.9375rem` (15px)
- **Trusted By**: `0.75rem` uppercase with `0.05em` letter spacing

### Colors
- **Background**: `#f5f3f0` (warm beige)
- **Text**: `#1a1a1a` (near black)
- **Muted Text**: `#666666` (gray)
- **Primary Green**: `#2d5f3f`
- **Green Hover**: `#234a31`
- **Border**: `#e0ddd8`

### Spacing
- **Navbar Height**: `80px` (5rem)
- **Max Content Width**: `1280px`
- **Horizontal Padding**: `24px` desktop, `48px` large screens

### Animation Details
- **Scroll Height**: `350vh` for extended animation
- **Scale Transform**: `1 → 1.2`
- **Y Transform**: `0 → -150px`
- **Opacity**: `1 → 0.7`
- **Easing**: Custom cubic-bezier `[0.22, 1, 0.36, 1]`

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first CSS
- **Framer Motion 11** - Animation library
- **PostCSS** - CSS processing

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🎭 Animation Behavior

The hero section uses Framer Motion's `useScroll` and `useTransform` hooks to create a scroll-linked animation:

1. **Sticky Container**: The viewport stays fixed while scrolling through 350vh
2. **Background Animation**: 
   - Scales up (zoom effect)
   - Translates down (parallax effect)
   - Fades slightly (depth effect)
3. **Content Animation**: Hero text fades out as you scroll
4. **Mask Gradient**: CSS mask creates soft edges on background image

## 🔧 Customization

### Adjust Animation Speed
Edit `Hero.tsx`:
```typescript
// Change scroll height
style={{ height: '350vh' }} // Increase for slower animation

// Adjust transform ranges
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]); // More zoom
const y = useTransform(scrollYProgress, [0, 1], [0, -200]); // More movement
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'adaline-bg': '#yourColor',
  'adaline-green': '#yourColor',
  // ...
}
```

### Modify Typography
Edit `tailwind.config.ts`:
```typescript
fontSize: {
  'hero': ['yourSize', { lineHeight: 'yourValue' }],
}
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

**Issue**: Animation feels choppy
- **Solution**: Ensure hardware acceleration is enabled in browser
- Check browser console for performance warnings

**Issue**: Image not displaying
- **Solution**: Verify `/public/scene.png` exists and is a valid image file

**Issue**: TypeScript errors
- **Solution**: Run `npm install` to ensure all type definitions are installed

## 📄 License

This project is for educational purposes. The design is inspired by Adaline.ai.

## 🙏 Credits

- Design inspiration: [Adaline.ai](https://adaline.ai)
- Built with ❤️ using Next.js and Framer Motion


