# Rakesh Sharma Design — React + Tailwind CSS

A luxury interior studio website converted from HTML to a fully structured React CRA project with Tailwind CSS.

---

## Project Structure

```
rsd-studio/
├── public/
│   └── index.html                  ← CRA HTML shell + Google Fonts
│
├── src/
│   ├── components/
│   │   ├── Preloader.jsx           ← Fullscreen intro preloader
│   │   ├── Header.jsx              ← Frosted glass floating navbar
│   │   ├── SlideMenu.jsx           ← Right-side drawer menu
│   │   ├── HeroSlider.jsx          ← Full-viewport image slider
│   │   ├── QuoteSection.jsx        ← Editorial italic quote
│   │   ├── Newsletter.jsx          ← Email subscription form
│   │   └── Footer.jsx              ← 4-col footer grid
│   │
│   ├── hooks/
│   │   └── useSlider.js            ← Reusable slide interval hook
│   │
│   ├── data/
│   │   └── siteData.js             ← All text content & links (single source of truth)
│   │
│   ├── styles/
│   │   └── index.css               ← Tailwind directives + custom CSS animations
│   │
│   ├── App.jsx                     ← Root component, layout & state
│   └── index.js                    ← ReactDOM entry point
│
├── tailwind.config.js              ← Custom fonts, colors, keyframes
├── postcss.config.js
├── package.json
└── README.md
```

---

## Quick Start

### 1. Install dependencies
```bash
cd rsd-studio
npm install
```

### 2. Start development server
```bash
npm start
```
Opens at **http://localhost:3000**

### 3. Build for production
```bash
npm run build
```

---

## Customization

### Change text content
All text (nav links, hero slides, quote, footer) lives in one file:
```
src/data/siteData.js
```
Edit it and every component updates automatically.

### Change hero images
In `src/data/siteData.js`, update the `HERO_SLIDES` array:
```js
export const HERO_SLIDES = [
  {
    image: "https://your-image-url.com/photo.jpg",
    title: "Your Slide Title",
    subtitle: "Your subtitle — 2026",
  },
  // ...
];
```

### Add more nav links
In `src/data/siteData.js`, update `NAV_LINKS`:
```js
export const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Studio",   href: "#studio"   },
  // add more here...
];
```

### Add new pages / sections
Create a new component in `src/components/` and import it in `src/App.jsx`.

---

## Component Reference

| Component        | What it does                                               |
|------------------|------------------------------------------------------------|
| `Preloader`      | Dark fullscreen intro. Fades out after ~2.8s. Calls `onDone` when hidden. |
| `Header`         | Frosted glass pill navbar fixed at top. Fades in after preloader. RSD signature + brand name + menu trigger. |
| `SlideMenu`      | Right drawer, 520px wide. Backdrop blur. Close button spins 180°. Menu links slide + expand on hover. |
| `HeroSlider`     | 100vh slider. Ken Burns scale on images. Animated text per slide. RSD watermark. Film grain. Light leaks. |
| `QuoteSection`   | Warm #f7f4ef background with serif italic quote. |
| `Newsletter`     | Email input + subscribe button inside footer. |
| `Footer`         | Newsletter → 4-col grid → copyright bar. All link data from `siteData.js`. |

---

## Hooks

| Hook        | Usage |
|-------------|-------|
| `useSlider(count, interval)` | Returns `[currentIndex, setCurrentIndex]`. Automatically cycles every `interval` ms. Used by `HeroSlider`. |

---

## Notes

- **No GSAP dependency** — all animations are pure CSS keyframes defined in `tailwind.config.js` and `index.css`, keeping the bundle lean.
- **Fonts** — Tenor Sans (serif editorial) + Plus Jakarta Sans (clean sans) loaded via Google Fonts in `public/index.html`.
- **Film grain** — uses `https://grainy-gradients.vercel.app/noise.svg` (free CDN). Replace with a local SVG in `public/assets/` for production.
- **Video background** — `HeroSlider` has a commented `<video>` slot. Add `src/assets/video.mp4` and uncomment the tag to enable it.
