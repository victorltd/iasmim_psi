# AGENTS.md — site_iasmim (Psicóloga Iasmim Borges)

## Architecture

Static HTML site with no build step, frameworks, or package manager. Edit `.html`, `.css`, `.js` files directly.

| File | Purpose |
|------|---------|
| `index.html` | Main landing page (single-page, scroll sections) |
| `links.html` | Linktree-style page for Instagram bio |
| `privacidade.html` | Privacy policy (LGPD) |
| `robots.txt` | Crawler rules with per-bot sections |
| `sitemap.xml` | Sitemap including `#anchor` deep links |
| `CNAME` | Custom domain for GitHub Pages |
| `assets/css/style.css` | ~1600-line CSS w/ custom properties design system |
| `assets/js/main.js` | Menu toggle, smooth scroll, scroll-spy, IntersectionObserver animations, FAQ accordion, WhatsApp click tracking |
| `assets/img/` | Photos, favicons, OG image (SVG), webmanifest |
| `googled91471211e23c4f7.html` | Google Search Console verification file |

## Key Identifiers

- **Domain:** `iasmimborgespsi.com.br` (GitHub Pages via CNAME)
- **CRP:** `21/06356`
- **WhatsApp:** `+5587981586596`
- **Google Analytics ID:** `G-XXXXXXXXXX` (placeholder — must be filled before tracking works)
- **Google Ads ID:** `AW-YYYYYYYYYY` (placeholder — must be filled before tracking works)
- **Git remote:** `https://github.com/victorltd/iasmim_psi.git`

## Deploy

Push to the main branch → GitHub Pages deploys automatically from the repo root. No CI/CD config exists.

## Content Constraints (Important)

This site is for a psychologist regulated by CFP. When editing copy:

- **Never** add patient testimonials or success stories
- **Never** write text promising cures, guaranteed results, or "before/after" language
- **Never** use sensationalist or fear-based copy
- The site must comply with **LGPD** (Brazilian data privacy law)
- Schema.org uses `Psychologist` + `FAQPage` types in `index.html`

## Design System (CSS custom properties)

```css
--cor-principal: #6B8E88;     /* Sage green */
--cor-destaque: #D48C70;      /* Terracotta accent */
--fonte-titulo: 'Lora', Georgia, serif;
--fonte-corpo: 'Montserrat', sans-serif;
```

Full design tokens in `assets/css/style.css:7`.

## Known Issues

- `privacidade.html` canonical URL points to `iasmimborges.com.br` (missing "psi") — should be `iasmimborgespsi.com.br`
- `sitemap.xml` references `assets/img/og-image.jpg` but the actual file is `assets/img/og-image.svg`

## Editing Notes

- `links.html` uses inline `<style>` for that page only; styles are NOT in `style.css`
- `index.html` uses `<details>` elements for FAQ (accordion behavior in JS closes siblings)
- Scroll-spy in `main.js` highlights active nav based on `section[id]` visibility
- The floating WhatsApp button appears after a 2-second delay
- `assets/img/site.webmanifest` is a PWA manifest (standalone mode, theme color)

## No Tests / Lint / Typecheck

This is a plain static site. There are no test suites, linters, or typecheckers. Validate changes by opening `.html` files in a browser.
