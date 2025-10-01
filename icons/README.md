# PWA Icons Generation

This directory should contain app icons in various sizes for PWA installation.

## Required Icons

Generate the following icons from your app logo:

### Standard Icons (any purpose)
- `icon-72x72.png` (72x72px)
- `icon-96x96.png` (96x96px)
- `icon-128x128.png` (128x128px)
- `icon-144x144.png` (144x144px)
- `icon-152x152.png` (152x152px)
- `icon-192x192.png` (192x192px)
- `icon-384x384.png` (384x384px)
- `icon-512x512.png` (512x512px)

### Maskable Icons (adaptive icons for Android)
- `icon-maskable-192x192.png` (192x192px with safe zone)
- `icon-maskable-512x512.png` (512x512px with safe zone)

### Shortcut Icons (optional)
- `shortcut-today.png` (96x96px)
- `shortcut-calendar.png` (96x96px)
- `shortcut-dictionary.png` (96x96px)

## How to Generate

### Option 1: Online Tools
1. **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
2. **RealFaviconGenerator**: https://realfavicongenerator.net/

### Option 2: Using Sharp (Node.js)
```bash
npm install -g sharp-cli
sharp -i logo.png -o icon-72x72.png resize 72 72
sharp -i logo.png -o icon-96x96.png resize 96 96
sharp -i logo.png -o icon-128x128.png resize 128 128
sharp -i logo.png -o icon-144x144.png resize 144 144
sharp -i logo.png -o icon-152x152.png resize 152 152
sharp -i logo.png -o icon-192x192.png resize 192 192
sharp -i logo.png -o icon-384x384.png resize 384 384
sharp -i logo.png -o icon-512x512.png resize 512 512
```

### Option 3: Using ImageMagick
```bash
convert logo.png -resize 72x72 icon-72x72.png
convert logo.png -resize 96x96 icon-96x96.png
convert logo.png -resize 128x128 icon-128x128.png
convert logo.png -resize 144x144 icon-144x144.png
convert logo.png -resize 152x152 icon-152x152.png
convert logo.png -resize 192x192 icon-192x192.png
convert logo.png -resize 384x384 icon-384x384.png
convert logo.png -resize 512x512 icon-512x512.png
```

## Maskable Icons Guidelines

For maskable icons, ensure your logo is centered with a safe zone:
- The icon should have a 40% safe zone (padding) around the edges
- Use tools like https://maskable.app/ to test
- Background should be solid color (theme color: #D4755F)

## Design Recommendations

- Use the primary theme color (#D4755F - terra cotta) as background
- Feature a symbolic representation of:
  - A calendar page
  - Calabrian cultural element
  - Or the letter "L" for Lametino in serif font (Playfair Display)
- Keep design simple and recognizable at small sizes
- Ensure good contrast for visibility

## Temporary Placeholder

Until real icons are generated, you can use the existing favicon.ico or create simple colored squares for testing.
