# PHAY SHOT IT

> **Concept:** *I photograph what remains.* — Not a website that displays photographs,
> but an experience in which the photographs are the world.

An immersive photography experience for **Phay**, a Lagos-born film photographer.
Built as a single long-form scroll — a film with chapters: tension, silence,
intensity, calm, reflection, climax, ending.

Built with **Next.js 16 (static) + TypeScript + GSAP ScrollTrigger + Lenis**,
zero runtime image CDNs, self-hosted fonts, and a hand-rolled CSS design system.

```
npm install
npm run dev        # develop
npm run build      # production build (fully static)
npm run start      # serve the production build on 0.0.0.0:3000
npm run assets     # re-derive responsive frames from /art masters (sharp)
```

---

## How the playbook maps to the build

### 01 · Concept — "Memory / Darkroom / Archive"
The site is one continuous metaphor: photographs are *objects with history*.
The loader is a **shutter**, the hero is a **focus pull**, the story section is a
**darkroom develop sequence**, the archive is a **room you wander**, and every
frame carries its EXIF, coordinates and date (Shot-on-iPhone-style metadata
storytelling).

### 02 · Page architecture (one long choreography)

| # | Section | Chapter | Motion |
|---|---------|---------|--------|
| 00 | Loader | — | real percent driven by actual image preloads; shutter-panel exit |
| 01 | Hero | BLACK | focus pull `blur → sharp` on load; ambient 16s breathing; scroll parallax |
| 02 | Manifesto | BLACK | masked line reveals, editorial stat rails |
| 03 | Peak frame | BLACK | pinned, slow push-in (scrub), live HUD, EXIF chips |
| 04 | Collections | LIGHT | kicker list — hover previews lead frame, click enters a shelf |
| 05 | The Archive | LIGHT GREY | **spatial gallery** — draggable 140% plane, 3 depth layers, scroll parallax |
| 06 | Story | BLACK | pinned scrollytelling, frames *develop* (dark→full) per scroll beat |
| 07 | Field map | LIGHT | abstract graticule, route of the year, node → archive preview |
| 08 | About | LIGHT | sticky portrait parallax + polaroid detail |
| 09 | Journal | WHITE | editorial accordion essays |
| 10 | Statement | BLACK | kinetic lines `SOME / MOMENTS / DESERVE / to stay.` |
| 11 | Contact | BLACK | an *ending*: thank-you, live Lagos clock, coordinates |

The alternating **dark → light rhythm** is deliberate pacing — the page breathes.

### 03 · Visual language
- Palette locked to `#080808 / #F1F1EF / muted greys / #FF3B30` — colour lives in the photographs.
- Type as architecture: **Anton** (mega display), **Fraunces** (expressive italic),
  **Archivo** (UI), **Space Mono** (metadata/EXIF). All self-hosted woff2, `swap`.
- Scale contrast everywhere: `01 / 24` microcopy against 17vw display type.
- Film grain + vignette overlay; photography-specific devices only (focus pull,
  shutter loader, develop filters, contact-sheet polaroid).

### 04 · Interaction
- **Cursor with intent**: `VIEW / DRAG / ENTER / READ / × / SCROLL` states (hidden on touch).
- Collections rows are magnetic previews; the Archive is `DRAG`-to-wander with inertia;
  map nodes describe themselves on hover; every interaction ends in a reward
  (full-bleed frame + metadata) — the *curiosity loop*.
- Optional synthesized **ambience** (WebAudio brown-noise room tone, off by default)
  and a shutter click when paging a lightbox.

### 05 · Performance & craft
- 37 responsive WebP frames derived from masters (`tools/convert-images.mjs`),
  descriptive filenames, `srcset`/`sizes`, intrinsic dimensions (no CLS).
- Only the hero is eager + preloaded; everything below the fold lazy-loads.
- Fonts self-hosted (3 variable families + Anton), preloaded, `size-adjust`-free.
- JS is code-split per interaction; total JS ~600KB pre-gzip, mostly GSAP.

### 06 · Accessibility
- Reduced-motion media query + runtime class degrade pins, parallax, grain and the
  darkroom scrub into a calm vertical sequence with full captions.
- Keyboard: skip link, visible accent focus, focus-managed dialogs
  (lightbox / shelf / menu), `Esc`/arrow navigation, `aria-expanded/controls/haspopup`.
- Semantic landmarks, single `h1`, descriptive `alt` text, `aria-live` frame counter.

### 07 · SEO
Real static HTML at build time, `metadataBase`, Open Graph + Twitter card (`/og.jpg`),
JSON-LD (`WebSite` + `Person`), `robots.ts`, `sitemap.ts`, `manifest.ts`.

---

## Tooling

```
tools/convert-images.mjs   # art/ masters -> public/images responsive WebP
tools/screenshot.mjs       # headless scroll-by QA captures
tools/interact.mjs         # drives menu/shelf/lightbox/map/journal states
tools/mobile.mjs           # 390×844 pass
```

QA scripts use headless Chromium via `@sparticuz/chromium` + `puppeteer-core`
(install with `npm i --no-save @sparticuz/chromium puppeteer-core`).

## Imagery

This is a fictional photographer's world built for design demonstration.
Master frames in `art/` were AI-generated for this project; four licensed
stock frames (Unsplash/Pexels) are listed in `CREDITS.md`. Replace with the
real archive by dropping masters into `art/` and running `npm run assets`.
