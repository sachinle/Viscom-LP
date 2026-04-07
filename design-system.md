# Design System
## B.Sc Visual Communication — AI Ready Animation & VFX Designer
### Rathinam College of Arts & Science × Raise Smart

---

## 1. Color Palette

### Primary Colors
| Name            | Hex       | Usage                                      |
|-----------------|-----------|------------------------------------------- |
| Navy (Base)     | `#0A0F1E` | Page background                            |
| Navy 800        | `#111827` | Card backgrounds                           |
| Navy 700        | `#1A2236` | Elevated surfaces, footer                  |
| Navy 600        | `#243047` | Borders, dividers                          |
| Navy 500        | `#2E3D5A` | Subtle borders                             |

### Accent Colors
| Name            | Hex       | Usage                                      |
|-----------------|-----------|------------------------------------------- |
| Gold            | `#C9A84C` | Primary CTA, headings accent, borders      |
| Gold Light      | `#E6C975` | Hover states                               |
| Gold Pale       | `#F5E6BB` | Very light tint backgrounds                |
| Teal            | `#0D9E8A` | Secondary accent, eyebrows, icons          |
| Teal Light      | `#14C4AC` | Hover on teal elements                     |
| Orange          | `#E8692A` | Tertiary accent, footer icons              |
| Purple          | `#7C4DFF` | OLT / FEP category colors                 |
| Blue            | `#1E88E5` | SIIP / Microsoft category colors           |
| Red             | `#E84545` | Error states, warning cards                |

### Text Colors
| Name            | Value                    | Usage                   |
|-----------------|--------------------------|-------------------------|
| White           | `#FFFFFF`                | Headings, primary text  |
| Text Light      | `rgba(255,255,255,0.85)` | Body copy               |
| Text Muted      | `rgba(255,255,255,0.55)` | Captions, placeholders  |

---

## 2. Typography Scale

### Font Families
- **Display / Headings:** `Playfair Display` — Bold, elegant serif for authority and premium feel
- **Body / UI:** `DM Sans` — Clean, modern sans-serif optimised for readability

### Type Scale (8px base)
| Token    | px   | rem    | Usage                              |
|----------|------|--------|------------------------------------|
| text-xs  | 12px | 0.75   | Labels, captions, badges           |
| text-sm  | 14px | 0.875  | Body small, card content, table    |
| text-base| 16px | 1.0    | Body default, form inputs          |
| text-md  | 18px | 1.125  | Section subtitles, lead text       |
| text-lg  | 20px | 1.25   | Card titles, GIP labels            |
| text-xl  | 24px | 1.5    | Sub-headings, pricing amounts      |
| text-2xl | 32px | 2.0    | Mid-level headings                 |
| text-3xl | 40px | 2.5    | Section titles                     |
| text-4xl | 52px | 3.25   | Page sections (clamped)            |
| text-5xl | 64px | 4.0    | Hero title (clamped)               |

### Heading Sizes (Responsive — clamp)
- **H1:** `clamp(2.5rem, 5.5vw, 4.5rem)` — Hero title
- **H2:** `clamp(2rem, 4vw, 3rem)` — Section titles
- **H3:** `clamp(1.25rem, 2vw, 1.75rem)` — Card titles

### Font Weights
| Token      | Value | Usage                |
|------------|-------|----------------------|
| fw-light   | 300   | Decorative light text|
| fw-regular | 400   | Body text            |
| fw-medium  | 500   | Nav links, labels    |
| fw-semi    | 600   | Sub-headings, bold UI|
| fw-bold    | 700   | Headings, CTA text   |
| fw-black   | 900   | Hero title, display  |

### Line Heights
| Token       | Value | Usage                  |
|-------------|-------|------------------------|
| lh-tight    | 1.1   | Display headings        |
| lh-snug     | 1.3   | Card titles, subtitles  |
| lh-normal   | 1.6   | Body text              |
| lh-relaxed  | 1.8   | Long-form paragraphs   |

---

## 3. Spacing System (8px Grid)

| Token     | px    | rem   | Usage                     |
|-----------|-------|-------|---------------------------|
| space-1   | 4px   | 0.25  | Micro spacing             |
| space-2   | 8px   | 0.5   | Icon gap, small padding   |
| space-3   | 12px  | 0.75  | List item gap             |
| space-4   | 16px  | 1.0   | Form group margin         |
| space-5   | 20px  | 1.25  | Card padding sm           |
| space-6   | 24px  | 1.5   | Card padding              |
| space-8   | 32px  | 2.0   | Section inner gap         |
| space-10  | 40px  | 2.5   | Large padding             |
| space-12  | 48px  | 3.0   | Card grid gap             |
| space-16  | 64px  | 4.0   | Section sub-headers gap   |
| space-20  | 80px  | 5.0   | Section padding (mobile)  |
| space-24  | 96px  | 6.0   | Section padding (desktop) |
| space-32  | 128px | 8.0   | Section padding (large)   |

---

## 4. Border Radius

| Token       | Value   | Usage                         |
|-------------|---------|-------------------------------|
| radius-sm   | 6px     | Badges, small chips           |
| radius-md   | 12px    | Inputs, icon wrappers         |
| radius-lg   | 20px    | Cards (standard)              |
| radius-xl   | 28px    | Large cards, pricing cards    |
| radius-full | 9999px  | Pills, tags, round buttons    |

---

## 5. Shadow System

| Token        | Value                              | Usage                     |
|--------------|------------------------------------|---------------------------|
| shadow-sm    | `0 2px 8px rgba(0,0,0,0.25)`      | Subtle card lift          |
| shadow-md    | `0 8px 24px rgba(0,0,0,0.35)`     | Card hover state          |
| shadow-lg    | `0 16px 48px rgba(0,0,0,0.45)`    | Modal, hero form          |
| shadow-gold  | `0 0 24px rgba(201,168,76,0.2)`   | Gold accent glow          |
| shadow-teal  | `0 0 24px rgba(13,158,138,0.2)`   | Teal accent glow          |

---

## 6. Button Styles

### `.btn--primary` — Primary CTA
- Background: `#C9A84C` (Gold)
- Text: `#0A0F1E` (Navy)
- Hover: Lighter gold + `translateY(-2px)` + gold glow shadow
- Border radius: `9999px` (pill)

### `.btn--outline` — Secondary
- Transparent background, gold border + text
- Hover: Fills with gold, text turns navy

### `.btn--ghost` — Tertiary / Dark BG
- Semi-transparent white background
- White text
- Use on coloured/dark section backgrounds

### `.btn--submit` — Form Submit
- Full-width inside form
- Gold gradient, square-ish (radius-md)
- Slightly larger padding

### Size Variants
- Default: `padding: 12px 24px`, `font-size: 14px`
- `.btn--large`: `padding: 16px 40px`, `font-size: 16px`

---

## 7. Card Styles

### Standard Card (`.deliverable-card`)
- Background: `#111827`
- Border: `1px solid rgba(255,255,255,0.07)`
- Radius: `20px`
- Padding: `24px`
- Hover: `translateY(-4px)` + gold border + shadow

### Featured Card (`.deliverable-card--featured`)
- Same base + gold border + subtle gold gradient background tint

### Pricing Card (`.pricing-card`)
- Radius: `28px`
- Padding: `32px`
- Featured variant has gold border + glow

### Glassmorphism Card (`.admission-card`)
- `backdrop-filter: blur(24px)`
- `background: rgba(26, 34, 54, 0.8)`
- Gold top accent line (3px)
- Soft inner glow shadow

---

## 8. Layout Grid

### Container
- Max-width: `1280px`
- Horizontal padding: `32px` desktop / `20px` mobile

### Grid Systems Used
| Section          | Grid                          |
|------------------|-------------------------------|
| Hero             | `2-column (1fr 1fr)`         |
| Stats Bar        | `5-column` → `2-column` mob  |
| Deliverables     | `3-column` → `2` → `1`      |
| Add-Ons          | `2-column` (max 800px wide)   |
| GIP Types        | `5-column` → `3` → `2`      |
| Skill Passport   | `2-column (1fr 1.4fr)`       |
| Footer           | `4-column` → `2` → `1`      |

---

## 9. Animation System

### Entrance Animations
- `[data-animate="fade-up"]` — translate Y + opacity
- `[data-animate="fade-left"]` — translate X right + opacity
- `[data-animate="fade-right"]` — translate X left + opacity
- Triggered by `IntersectionObserver` → adds `.is-visible`

### Transition Speeds
| Token               | Duration | Easing                            |
|---------------------|----------|-----------------------------------|
| transition-fast     | 150ms    | ease                              |
| transition-base     | 250ms    | ease                              |
| transition-slow     | 400ms    | ease                              |
| transition-spring   | 350ms    | cubic-bezier(0.34, 1.56, 0.64, 1)|

### Counter Animation
- Easing: `easeOutQuart`
- Duration: `1800ms`
- Triggered on IntersectionObserver (threshold 0.5)

---

## 10. Iconography

- **Library:** Phosphor Icons (v2.1.1 — CDN, tree-shakeable)
- **Style:** Bold weight (`ph-bold`) for UI icons, Fill (`ph-fill`) for stars/decorative
- **Size:** 1rem (default), 1.5rem (section icons), 5rem (video play)

---

## 11. Responsive Breakpoints

| Breakpoint  | Width     | Layout Changes                    |
|-------------|-----------|-----------------------------------|
| Desktop     | > 1024px  | Full multi-column layouts         |
| Tablet      | ≤ 1024px  | 2-col, hamburger menu, stacked    |
| Mobile      | ≤ 768px   | Single column, condensed spacing  |
| Small Mobile| ≤ 480px   | Tighter padding, simplified grids |

---

## 12. Accessibility Standards

- WCAG AA contrast ratios maintained
- All interactive elements have `:focus-visible` gold outline
- `aria-label`, `aria-expanded`, `aria-hidden` on all dynamic components
- Skip link for keyboard/screen-reader navigation
- `role="alert"` on form error messages (live region)
- `prefers-reduced-motion` respected — animations disabled
- `alt` text on all meaningful images
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`)
