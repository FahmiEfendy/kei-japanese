# Kei Japanese Cheese Toast — TODO

## 🔴 Critical

- [ ] **Content Security Policy tuning** — Test CSP in production and adjust if Google Fonts or external resources are blocked
- [ ] **Image optimization** — Compress all product/store images with `webp` format and add `srcset` for responsive images
- [ ] **Accessibility audit** — Add proper ARIA labels, ensure keyboard navigation works for product filters and customizer
- [ ] **Alt text review** — Verify all `alt` attributes accurately describe the images for screen readers
- [ ] **Favicon** — Replace emoji-based SVG favicon with a proper brand icon

## 🟡 Medium

- [ ] **PWA support** — Add `manifest.json` and service worker for offline access and home screen install
- [ ] **SEO structured data** — Add JSON-LD schema markup for `LocalBusiness`, `Product`, and `BreadcrumbList`
- [ ] **Performance monitoring** — Add Lighthouse CI to GitHub Actions for automated performance regression checks
- [ ] **Lazy loading improvements** — Use `loading="lazy"` consistently and add blur-up placeholder images
- [ ] **CSS minification** — Minify CSS and JS in the Docker build step for smaller payloads
- [ ] **404 page** — Create a custom branded 404 error page
- [ ] **Sitemap** — Generate `sitemap.xml` for search engine indexing
- [ ] **robots.txt** — Add `robots.txt` with appropriate crawling rules
- [ ] **Print stylesheet** — Add a print-friendly CSS for users printing the menu

## 🟢 Nice to Have

- [ ] **Analytics** — Integrate privacy-friendly analytics (Plausible, Umami, or Cloudflare Web Analytics)
- [ ] **Multi-language** — Add English/Indonesian language toggle
- [ ] **CMS integration** — Move product data to a headless CMS or JSON API for easier content management
- [ ] **WhatsApp order link** — Add direct WhatsApp order buttons on product cards
- [ ] **Dark mode** — Add a dark/light theme toggle with system preference detection
- [ ] **Scroll-to-top button** — Floating button that appears after scrolling down
- [ ] **Image gallery lightbox** — Full-screen image viewer for menu and product images
- [ ] **Store hours holiday override** — Support special holiday hours in the store status checker
- [ ] **OpenGraph image** — Generate a branded OG image for social media sharing
