# Kei Japanese Cheese Toast — Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-06-20

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
