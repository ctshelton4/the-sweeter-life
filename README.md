# The Sweeter Life

A professional single-page website for **The Sweeter Life**, a home bakery and event dessert catering business in the San Gabriel Valley.

## Quick Start

No build tools needed. Open `index.html` directly in your browser, or start a local server:

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

Alternatively, use any static file server (VS Code Live Server extension, Node's `npx serve`, etc.).

## Replacing Placeholder Images

The site ships with CSS gradient placeholders. To add real photos:

1. Save images to `assets/images/` (JPEG or WebP recommended)
2. In `index.html`, replace the `<div class="placeholder-image ...">` elements with `<img>` tags:

```html
<!-- Before (placeholder) -->
<div class="card__image placeholder-image placeholder-image--cake">
  <span class="placeholder-image__text">Custom Cakes</span>
</div>

<!-- After (real image) -->
<div class="card__image">
  <img src="assets/images/custom-cake.jpg" alt="Custom decorated birthday cake with gold accents" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### Recommended image sizes
- **Hero background**: 1920x1080px (add as `background-image` on `.hero`)
- **Menu cards**: 600x400px
- **Gallery**: 600x600px (square)
- **About portrait**: 600x800px

See `docs/BRAND.md` for Unsplash search terms to find matching stock photos.

## Updating the Gallery

The gallery links to Instagram posts. To update with new posts:

1. Go to your Instagram post in a browser
2. Copy the post URL (e.g., `https://www.instagram.com/p/ABC123/`)
3. Save the image from the post to `assets/images/`
4. In `index.html`, update a gallery item:

```html
<a href="https://www.instagram.com/p/ABC123/" target="_blank" rel="noopener noreferrer" class="gallery__item animate-fade-in" aria-label="View on Instagram">
  <img src="assets/images/gallery-1.jpg" alt="Description of the dessert" class="placeholder-image--gallery" style="width:100%;aspect-ratio:1;object-fit:cover;">
</a>
```

## Future Upgrades

### Instagram Auto-Feed (Elfsight Widget)
A commented-out placeholder exists in `index.html` (search for "Elfsight"). To enable:
1. Sign up at [elfsight.com](https://elfsight.com)
2. Create an Instagram Feed widget
3. Uncomment the embed code and paste your widget ID
4. Remove the manual gallery grid

### Contact Form (Formspree)
To make the contact form actually send emails:
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. Add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>` tag
4. Remove the JavaScript form handler in `js/main.js`

### Custom Domain & Hosting
Free hosting options:
- [GitHub Pages](https://pages.github.com) - Push repo, enable Pages
- [Netlify](https://netlify.com) - Drag-and-drop deploy
- [Vercel](https://vercel.com) - Connect repo for auto-deploy

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Playfair Display, Sacramento, Lato)
- No frameworks, no build tools, no dependencies
