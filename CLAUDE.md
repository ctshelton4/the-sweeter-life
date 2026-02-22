# The Sweeter Life - Project Context

## Business Overview
- **Owner**: Amanda Shooter
- **Business**: Home bakery & event dessert catering
- **Service Area**: San Gabriel Valley / Greater LA area (626 area code)
- **Instagram**: [@thesweeterlife_](https://instagram.com/thesweeterlife_)
- **Phone**: 626.733.7088
- **Branding**: Yellow/gold with dessert motifs

## Products
- Custom cakes (birthday, wedding, specialty)
- Cupcakes (custom flavors and designs)
- Cake pops (decorated, themed)
- Chocolate covered strawberries & fruits

## Tech Stack
- **HTML5** - Single-page scrolling site (`index.html`)
- **CSS3** - Mobile-first responsive (`css/styles.css`)
- **Vanilla JS** - No dependencies (`js/main.js`)
- **Fonts** - Google Fonts CDN (Playfair Display, Sacramento, Lato)
- **No build tools** - Open `index.html` directly or use any static server

## File Structure
```
The Sweeter Life/
├── CLAUDE.md                 # This file
├── README.md                 # Setup & usage instructions
├── docs/
│   └── BRAND.md              # Brand guidelines & design system
├── index.html                # Single-page scrolling site
├── css/
│   └── styles.css            # Mobile-first responsive styles
├── js/
│   └── main.js               # Nav, scroll, animations, form handling
└── assets/
    ├── images/               # Product & hero images (replace placeholders)
    └── icons/                # Favicon (favicon.svg)
```

## Conventions
- Mobile-first CSS (min-width breakpoints)
- CSS custom properties for all brand colors (see docs/BRAND.md)
- BEM-like class naming: `.section__element--modifier`
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Accessibility: ARIA labels, skip-to-content link, sufficient color contrast
- No external JS dependencies

## Future Upgrade Paths
1. **Instagram Widget**: Elfsight embed (placeholder comment in HTML) for auto-updating feed
2. **Contact Form Backend**: Formspree or Netlify Forms for actual form submissions
3. **Domain & Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
4. **Analytics**: Add Google Analytics or Plausible script tag
5. **Online Ordering**: Integration with Square or a simple order form
