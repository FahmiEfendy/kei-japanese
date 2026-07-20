# Kei Japanese Cheese Toast — Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-07-20

### Added
- **Content Security Policy** — Full CSP header in `nginx.conf`: `default-src 'self'`, `script-src 'self'`, `style-src` with Google Fonts whitelist, `font-src` for gstatic, `img-src 'self' data:`, `object-src 'none'`
- **Accessibility** — Skip-to-content link, `<main id="main-content">` landmark, ARIA roles (`tablist`, `tab`, `navigation`, `group`), `aria-expanded`/`aria-controls`/`aria-hidden` on mobile nav, `aria-pressed` on customizer buttons, `aria-live="polite"` region for combo preview
- **Keyboard navigation** — Arrow key, Home, End navigation for product filter tabs; Escape to close mobile menu and return focus to toggle
- **Favicon** — Brand SVG icon (golden badge with "K" lettermark) replacing emoji placeholder
- **Custom 404 page** — Branded error page with 100dvh layout, nav, footer, and CTA buttons; wired via `error_page 404` in `nginx.conf`
- **Scroll-to-top button** — Floating button visible after 400px scroll; smooth scroll, hover/active/focus-visible states, mobile-responsive sizing
- **Lazy load blur-up effect** — CSS `filter: blur` placeholder + `is-loading` / `is-loaded` classes toggled on image load events
- **CSS/JS minification in Docker** — Multi-stage build using `clean-css-cli` and `terser` before Nginx copy
- **Image format** — All 31 product/store/hero images converted from PNG/JPG/JPEG to WebP (`cwebp -q 82`); original files deleted; `<img>` tags updated to `.webp` directly (no `<picture>` wrapper needed)
- **Alt text** — All image `alt` attributes rewritten with descriptive, screen-reader-friendly copy
- `loading="eager"` and `fetchpriority="high"` added to above-the-fold hero image
- Instagram `aria-label` updated to full descriptive label; `aria-hidden="true"` added to decorative SVGs
- Fixed HTML syntax bug: stray `and` in `target="_blank" and rel=` attribute on Instagram link

---

## [0.1.0] — 2026-06-20

### Added
- Single-page landing site with hero, menu gallery, product catalog, store locator, and footer
- Interactive product filter with animated show/hide transitions (Cheese Toast, Salt Bread, Croffle, Ice Cream Toast, Croissant, Cheese Cake)
- Toast customizer — select bread flavor (Milk, Chocolate, Strawberry, Matcha, Taro) and vla filling with live combo preview
- Dynamic store status (open/closed) based on current time, auto-refreshing every 60 seconds
- Responsive navbar with mobile hamburger menu, overlay, and scroll-aware styling
- IntersectionObserver-based scroll reveal animations
- Smooth scroll navigation with active link tracking
- SEO metadata, Open Graph tags, and favicon
- Production Nginx configuration with security headers (CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy)
- HTTP method restriction (GET/HEAD only, 405 for others)
- Static asset caching (7d for CSS/JS, 30d for images) with immutable Cache-Control
- Gzip compression for text, CSS, JS, and SVG
- Dotfile access blocking
- Production Dockerfile with OCI labels, correct ownership, and HEALTHCHECK
- Docker Compose with read-only filesystem, tmpfs mounts, resource limits (64MB / 0.25 CPU), and `no-new-privileges`
- `.dockerignore` to optimize Docker build context
- GitHub Actions CI/CD pipeline — builds and pushes to GHCR on `main` branch
- Infra reverse proxy configuration (`keijapanese.conf`) for `kei.fahmiefendy.dev`
- Documentation: README, CHANGELOG, TODO, TEST_CHECKLIST
