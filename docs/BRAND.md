# The Sweeter Life - Brand Guidelines

## Color Palette

| Name       | Hex       | Usage                                  |
|------------|-----------|----------------------------------------|
| Gold       | `#D4A24E` | Primary accent, CTAs, highlights       |
| Cream      | `#FFF8EE` | Page background, light sections        |
| Blush      | `#F5D6C8` | Alternating section backgrounds        |
| Chocolate  | `#4A2C2A` | Dark text, footer background           |
| Pink Soft  | `#F8E8E0` | Card backgrounds, subtle accents       |
| White      | `#FFFFFF` | Alternating sections, card surfaces    |
| Gold Dark  | `#B8892F` | Hover state for gold elements          |
| Text Dark  | `#3A2220` | Body text on light backgrounds         |
| Text Light | `#FFF8EE` | Text on dark (chocolate) backgrounds   |

### CSS Custom Properties
```css
:root {
  --color-gold: #D4A24E;
  --color-gold-dark: #B8892F;
  --color-cream: #FFF8EE;
  --color-blush: #F5D6C8;
  --color-chocolate: #4A2C2A;
  --color-pink-soft: #F8E8E0;
  --color-white: #FFFFFF;
  --color-text: #3A2220;
  --color-text-light: #FFF8EE;
}
```

## Typography

### Font Stack
- **Headings**: `'Playfair Display', Georgia, 'Times New Roman', serif`
- **Script Accents**: `'Sacramento', cursive` (taglines, decorative text)
- **Body**: `'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Google Fonts CDN
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Sacramento&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
```

### Type Scale
| Element    | Font           | Size (mobile) | Size (desktop) | Weight |
|------------|----------------|---------------|----------------|--------|
| H1         | Playfair       | 2.5rem        | 4rem           | 700    |
| H2         | Playfair       | 2rem          | 2.75rem        | 700    |
| H3         | Playfair       | 1.5rem        | 1.75rem        | 700    |
| Script     | Sacramento     | 1.5rem        | 2rem           | 400    |
| Body       | Lato           | 1rem          | 1.125rem       | 400    |
| Body Small | Lato           | 0.875rem      | 0.875rem       | 300    |

## Spacing

- **Section padding**: 4rem 1rem (mobile), 6rem 2rem (desktop)
- **Container max-width**: 1200px, centered
- **Card padding**: 1.5rem
- **Grid gap**: 1.5rem (mobile), 2rem (desktop)

## Components

### Buttons
- **Primary**: Gold background, chocolate text, rounded corners (30px), bold
- **Primary Hover**: Gold Dark background, slight scale (1.02)
- **Outline**: Transparent with gold border, gold text
- **Outline Hover**: Gold background fill, chocolate text

### Cards
- White or pink-soft background
- Subtle box-shadow: `0 4px 15px rgba(74, 44, 42, 0.08)`
- Border-radius: 12px
- Hover: lift effect with increased shadow

### Navigation
- **Desktop**: Horizontal links, Lato 700, chocolate text
- **Mobile**: Hamburger icon, full-screen overlay, centered links
- **Active/Hover**: Gold underline accent

## Accessibility

### Contrast Ratios (WCAG AA minimum 4.5:1)
- Chocolate (#4A2C2A) on Cream (#FFF8EE): ~12:1
- Chocolate (#4A2C2A) on White (#FFFFFF): ~13:1
- White (#FFFFFF) on Chocolate (#4A2C2A): ~13:1
- Gold Dark (#B8892F) on White: ~4.6:1

### Requirements
- All images must have descriptive `alt` text
- Interactive elements must have visible focus styles
- Skip-to-content link at top of page
- ARIA labels on navigation, hamburger menu, social links
- Form inputs must have associated `<label>` elements
- `prefers-reduced-motion` support for animations

## Image Guidelines

### Recommended Unsplash Search Terms
- Hero: "bakery table elegant", "dessert table gold", "cake display warm"
- About: "woman baking kitchen", "baker portrait warm"
- Cakes: "custom birthday cake", "elegant wedding cake"
- Cupcakes: "gourmet cupcakes display", "decorated cupcakes"
- Cake Pops: "cake pops decorated", "cake pops party"
- Chocolate Strawberries: "chocolate covered strawberries", "chocolate dipped fruit"

### Image Specs
- Hero: 1920x1080 minimum, landscape
- Product cards: 600x400, landscape or 1:1
- Gallery: 400x400 or 600x600, square preferred
- About portrait: 600x800, portrait orientation
