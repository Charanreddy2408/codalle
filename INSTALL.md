# Installation & Setup Guide

## Quick Start

Follow these steps to get the Adaline.ai hero section clone up and running:

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 15
- React 18
- Framer Motion 11
- Tailwind CSS 3
- TypeScript 5

### 2. Verify Scene Image

Make sure the background scenery image is in the correct location:
```
/public/scene.png
```

The image should be a high-quality landscape photo (preferably 1920x1080 or larger).

### 3. Run Development Server

```bash
npm run dev
```

The application will start at:
- **Local**: http://localhost:3000
- **Network**: Your local network IP address

### 4. View the Application

Open your browser and navigate to `http://localhost:3000`

You should see:
- ✅ Sticky navbar with "Adaline" logo
- ✅ Large hero heading
- ✅ "Watch Demo" button
- ✅ "Trusted by teams at" section with logo placeholders
- ✅ Beautiful background scenery with gradient mask
- ✅ Smooth scroll animation (scroll down to see it!)

## Testing the Scroll Animation

The hero section has a **350vh height**, meaning you need to scroll through about 3.5 screen heights to see the full animation.

**What to look for:**
1. **Scale**: Background zooms in gradually (1.0 → 1.2)
2. **Translation**: Background moves down (-150px)
3. **Opacity**: Background fades slightly (1.0 → 0.7)
4. **Content**: Hero text fades out as you scroll
5. **Sticky**: The scene stays fixed during animation

**Scroll down slowly** to observe these effects in action!

## Responsive Testing

### Desktop (1440px+)
```bash
# View in your browser at full width
# All animations and effects visible
```

### Tablet (768px - 1024px)
```bash
# Resize browser window or use DevTools
# Layout adjusts, animations still work
```

### Mobile (< 768px)
```bash
# Resize to phone width (375px)
# Navbar shows menu button
# Font sizes reduce
# Logo grid stacks
```

## Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

## Troubleshooting

### Issue: Background image not showing
**Solution**: 
```bash
# Check if file exists
ls public/scene.png

# If not, move it:
mv scene.png public/scene.png
```

### Issue: Scroll animation not smooth
**Solution**: 
- Make sure you're using a modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- Check browser console for errors
- Disable any browser extensions that might interfere

### Issue: TypeScript errors
**Solution**: 
```bash
npm install --save-dev @types/react @types/node
```

### Issue: Styles not applying
**Solution**: 
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Project Structure

```
codale/
├── app/
│   ├── globals.css          # Global styles, CSS variables, font imports
│   ├── layout.tsx            # Root layout (metadata, HTML structure)
│   └── page.tsx              # Home page (combines Navbar + Hero)
├── components/
│   ├── Navbar.tsx            # Sticky navbar with scroll effects
│   └── Hero.tsx              # Hero section with scroll animations
├── public/
│   └── scene.png             # Background scenery image
├── tailwind.config.ts        # Tailwind customization (colors, fonts, spacing)
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Customization Guide

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'adaline-bg': '#f5f3f0',        // Background beige
  'adaline-green': '#2d5f3f',     // Primary button color
  'adaline-text': '#1a1a1a',      // Heading text
  'adaline-text-muted': '#666666', // Secondary text
}
```

### Adjust Animation Speed

Edit `components/Hero.tsx`:

```typescript
// Line 25: Change scroll height
style={{ height: '400vh' }} // Slower animation

// Lines 16-18: Adjust transform ranges
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
```

### Change Typography

Edit `tailwind.config.ts`:

```typescript
fontSize: {
  'hero': ['4rem', { lineHeight: '1.1' }], // Larger heading
}
```

### Modify Gradient Mask

Edit `components/Hero.tsx` line 40:

```typescript
maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
```

## Performance Tips

1. **Use WebP images**: Convert scene.png to .webp for smaller file size
2. **Optimize image size**: 1920x1080 is sufficient for most screens
3. **Enable compression**: Use Next.js image optimization
4. **Reduce motion**: Animations respect `prefers-reduced-motion`

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: Older browsers may not support CSS `mask-image` or smooth Framer Motion animations.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

```bash
npm run build
# Upload the .next folder and package.json
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure Node.js version is 18 or higher
4. Clear browser cache and restart dev server

---

**Enjoy your pixel-perfect Adaline.ai clone! 🎨✨**


