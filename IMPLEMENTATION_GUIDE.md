# MBF Enterprises — Implementation Guide

Context document for AI models. Use this to onboard with full project context.

---

## 1. Project Overview

- **Site:** Premium multi-page showcase for MBF Enterprises (landscaping and construction).
- **Audience:** High-end residential/commercial clients seeking premium hardscaping, design, and outdoor construction.
- **Vibe:** Modern, fast, visually striking; dark mode, gold accents; avoid generic local-business templates.

---

## 2. Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS** v4 (all styling; `@theme` in globals.css)
- **Framer Motion** (page transitions, scroll reveals, micro-interactions)
- **Lucide React** (icons)
- **Formspree** (contact form; `@formspree/react`)

---

## 3. Design System

### Color Palette

| Token              | Value     | Usage                    |
| ------------------ | --------- | ------------------------ |
| `--color-bg`       | `#0a0a0a` | Deep black background    |
| `--color-surface`  | `#171717` | Cards, elevated surfaces |
| `--color-accent`   | `#D4AF37` | Primary gold             |
| `--color-accent-light` | `#F3E5AB` | Hover/subtle highlights  |
| `--color-text`     | `#FAFAFA` | Primary text             |
| `--color-text-muted` | `#A3A3A3` | Secondary text           |

### Typography

- Modern sans-serif: Geist (or Inter). Clean, bold headers.
- Hero H1: responsive `text-4xl sm:text-5xl lg:text-6xl`
- Section H2: `text-2xl sm:text-3xl lg:text-4xl`
- Body: 16px base, line-height 1.6–1.7

### Component Patterns

- Glassmorphism navbar: `backdrop-blur-md bg-surface/80 border border-white/5`
- Subtle glowing borders on hover; gold accent for CTAs and focus states
- Large, high-contrast image areas; placeholder boxes until assets are added

---

## 4. Animations & Motion

- **Timing:** 200–350ms; premium but quick.
- **Hero text:** Staggered word/character reveal (Framer Motion).
- **Section headings:** Fade-in + slide-up on scroll (`whileInView`, `once: true`).
- **Mobile drawer:** Slide-in from right, `AnimatePresence`, ~250ms; backdrop tap to close; staggered link fade-in.
- **Buttons:** `whileTap: { scale: 0.98 }`; gold glow on hover.
- **Cards:** `whileHover: { y: -4 }`, 0.2s; glow on hover.
- **Nav links:** Underline or gold accent on hover, 0.2s.
- Prefer `transform` and `opacity` for GPU acceleration.

---

## 5. Responsive Design

- **Breakpoints:** Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).
- **Navbar:** Desktop horizontal nav; mobile hamburger → slide-out drawer.
- **Hero:** Full viewport; text and CTAs stack on mobile.
- **Service cards:** 1 col mobile, 2 tablet, 3 desktop.
- **Two-column blocks (About, Services):** Stack to single column on mobile (text first, image below).
- **Portfolio:** 2 col mobile, 3 tablet, 4 desktop.
- **Contact:** Form + info stack on mobile; side-by-side on lg+.
- **Footer:** Stack on mobile; multi-column on desktop.
- Tap targets ≥ 44px; no hover-only critical behavior; body scroll locked when drawer open.

---

## 6. Architecture & Routing

```
app/
  layout.tsx
  page.tsx          (Home)
  globals.css
  about/page.tsx
  services/page.tsx
  portfolio/page.tsx
  contact/page.tsx
components/
  Navbar.tsx
  Footer.tsx
  ServiceCard.tsx
  ContactForm.tsx
  PageTransition.tsx
  AnimatedText.tsx
```

---

## 7. Copy & Content

### Home (app/page.tsx)

- **Hero H1:** Elevating Your Outdoor Living Experience.
- **Hero sub:** Premium hardscaping, custom design, and flawless execution for properties that demand the best.
- **Primary CTA:** View Our Portfolio
- **Secondary CTA:** Request a Consultation
- **Why Us H2:** Craftsmanship Without Compromise.
- **Why Us paragraph:** At MBF Enterprises, we don't just build landscapes; we engineer outdoor sanctuaries. Specializing in high-end hardscaping and complete exterior transformations, we bring architectural precision and premium materials to every project. From custom retaining walls to lush artificial turf and elegant water features, your vision is our blueprint.
- **Service cards:** (1) Full-Scale Remodels — "Comprehensive exterior design and construction to completely redefine your property." (2) Architectural Hardscaping — "Structural elegance including custom retaining walls, patios, and stone masonry." (3) Premium Artificial Turf — "Flawless, zero-maintenance greenery installed with precision drainage systems."

### About (app/about/page.tsx)

- **Hero H1:** The Foundation of Excellence.
- **Hero sub:** Decades of combined experience, built on trust, precision, and structural integrity.
- **Story H2:** Redefining the Standard of Construction.
- **Paragraph 1:** MBF Enterprises was founded on a simple principle: outdoor construction should be built to outlast the elements and designed to inspire. We are a dedicated team of craftsmen, designers, and builders who treat every property as if it were our own.
- **Paragraph 2:** We step away from the "volume-first" approach of typical landscaping companies. Instead, we focus on high-end, bespoke projects where attention to detail is paramount. Whether it's engineering a complex retaining wall or designing a tranquil custom fountain, we combine heavy-duty construction techniques with refined aesthetic design.

### Services (app/services/page.tsx)

- **Service 1 — Full Design & Remodels:** A complete overhaul of your exterior space. We handle everything from the initial architectural drafting to the final stone laid, ensuring a cohesive, breathtaking result that seamlessly extends your living space into the outdoors.
- **Service 2 — Retaining Walls & Structural Hardscaping:** Engineered for longevity and designed for beauty. Our retaining walls do more than just hold back earth—they create dynamic, multi-level terraces that maximize your usable space and add immense value to your property.
- **Service 3 — Fountains & Water Features:** Introduce movement and tranquility to your landscape. We design and install custom water features, ranging from modern, minimalist spillways to naturalistic rock waterfalls, all built with commercial-grade pumps and filtration.
- **Service 4 — Premium Artificial Grass:** Achieve the perfect lawn, all year round. We install ultra-realistic, high-drainage artificial turf that stands up to heavy use and extreme weather, eliminating the need for constant watering and maintenance.

### Contact (app/contact/page.tsx)

- Form fields: Name, Email, Phone, Project Details (textarea), Submit.
- Contact info placeholders: Phone, Email, Service Area.

---

## 8. Implementation Status

- [x] 1. IMPLEMENTATION_GUIDE.md created
- [x] 2. Design system (globals.css) + layout shell
- [x] 3. Navbar + Footer
- [x] 4. PageTransition wrapper
- [x] 5. Home page (Hero, Why Us, ServiceCards)
- [x] 6. About page
- [x] 7. Services page (4 alternating blocks)
- [x] 8. Portfolio page (gallery grid)
- [x] 9. Contact page + ContactForm with Formspree
- [x] 10. AnimatedText + scroll-reveal on key sections
- [x] 11. QA pass (mobile 375px + desktop)

---

## 9. Key Decisions

- Tailwind v4: no `tailwind.config.js`; all theme in `globals.css` via `@theme`.
- Formspree: ContactForm uses `useForm("YOUR_FORM_ID")`; replace with real form endpoint from Formspree dashboard.
- Dark mode only; no theme toggle.
- Image placeholders are `div`s with aspect ratio and aria-label until real assets are added.

---

## 10. Placeholder Conventions

- **Images:** `div` with `bg-surface`, `aspect-video` or `aspect-square`, `border border-white/10`; `role="img"` and `aria-label="Image placeholder"`.
- **Formspree:** Replace `YOUR_FORM_ID` in `ContactForm.tsx` with Formspree form ID.
- **Contact info:** Placeholder text for Phone, Email, Service Area in Footer and Contact page.
