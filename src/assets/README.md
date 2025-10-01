# Asset Optimization

## Header Image Optimization

The header image `piazza-header.jpg` should be optimized for web performance.

### Recommended Process:

1. **Convert to WebP format** for better compression:
   ```bash
   # Using cwebp (Google's WebP converter)
   cwebp -q 80 piazza-header.jpg -o piazza-header.webp

   # Or using Sharp (Node.js)
   npx sharp-cli --input piazza-header.jpg --output piazza-header.webp --webp
   ```

2. **Create responsive versions**:
   - Mobile: 640px width
   - Tablet: 1024px width
   - Desktop: 1920px width

   ```bash
   # Mobile
   npx sharp-cli --input piazza-header.jpg --resize 640 --output piazza-header-mobile.webp --webp

   # Tablet
   npx sharp-cli --input piazza-header.jpg --resize 1024 --output piazza-header-tablet.webp --webp

   # Desktop
   npx sharp-cli --input piazza-header.jpg --resize 1920 --output piazza-header-desktop.webp --webp
   ```

3. **Keep JPEG fallback** for browser compatibility

### Quick Setup:

```bash
npm install --save-dev sharp-cli
npm run optimize-images
```

### Expected Results:
- **Original JPG**: ~100-300KB
- **WebP**: ~30-100KB (60-70% size reduction)
- **Responsive versions**: Even smaller for mobile devices

## Current Implementation

The Header component has been updated to use responsive images with WebP support and fallback to JPG.
