# Kei Japanese Cheese Toast — Test Checklist

Run through this checklist after every deployment or significant code change.

---

## 1. Pre-Deployment

- [ ] **Container is built and pushed to GHCR**
  ```bash
  docker pull ghcr.io/fahmiefendy/kei-japanese:latest
  ```
  **Expected:** Image pulls successfully

- [ ] **Container starts without errors**
  ```bash
  docker compose up -d kei-japanese-app
  docker logs kei-japanese-app --tail 20
  ```
  **Expected:** No error messages, nginx starts cleanly

- [ ] **Health check passes**
  ```bash
  docker inspect --format='{{.State.Health.Status}}' kei-japanese-app
  ```
  **Expected:** `healthy`

---

## 2. Health & Connectivity

- [ ] **Homepage responds via reverse proxy**
  ```bash
  curl -s -o /dev/null -w "%{http_code}" http://kei.fahmiefendy.dev/
  ```
  **Expected:** `200`

- [ ] **Container is on the proxy network**
  ```bash
  docker network inspect proxy --format '{{range .Containers}}{{.Name}} {{end}}' | grep kei-japanese-app
  ```
  **Expected:** `kei-japanese-app` appears in the list

- [ ] **Direct container access works**
  ```bash
  docker exec kei-japanese-app wget -q -O - http://localhost/ | head -5
  ```
  **Expected:** Returns HTML content starting with `<!DOCTYPE html>`

---

## 3. Page Sections

- [ ] **Hero section renders**
  - Title "Japanese Cheese Toast Done Right." is visible
  - "Explore Our Menu" and "Find a Store" buttons are present
  - Hero image loads correctly

- [ ] **Menu section renders**
  - "Crafted with Love & Tradition" heading is visible
  - Both menu gallery images load

- [ ] **Products section renders**
  - All filter buttons are visible (All, Cheese Toast, Salt Bread, Croffle, Ice Cream Toast, Croissant, Cheese Cake)
  - Product cards display with images, names, descriptions, and prices

- [ ] **Stores section renders**
  - All 3 store cards are visible (Pondok Indah Mall, Grand Galaxy Park, Pademangan)
  - Open/Closed status is displayed correctly based on current time
  - "Open in Maps" links work

- [ ] **Footer renders**
  - Brand info, quick links, categories, and contact info are present
  - Instagram link points to correct profile
  - Copyright year shows 2026

---

## 4. Interactive Features

- [ ] **Product filter — category filter works**
  ```
  Click "Cheese Toast" → Only cheese toast products shown
  Click "Salt Bread" → Only salt bread products shown
  Click "All" → All products shown in horizontal scroll
  ```

- [ ] **Product filter — animations work**
  - Filtered-out cards fade out with animation
  - Filtered-in cards fade in with animation

- [ ] **Toast customizer works**
  ```
  Click "Choc" toast → Button highlights
  Click "Oreo" vla → Button highlights
  Combo text updates to "Chocolate Toast + Oreo Vla"
  ```

- [ ] **Navbar scroll effect**
  - Scroll down → Navbar gets `.scrolled` class (background appears)
  - Active nav link updates based on visible section

- [ ] **Smooth scroll navigation**
  - Click nav links → Page scrolls smoothly to the section

---

## 5. Mobile Responsiveness

- [ ] **Hamburger menu works**
  - Resize to mobile → Hamburger icon appears
  - Click hamburger → Menu slides in, overlay appears
  - Click link or overlay → Menu closes

- [ ] **Layout adapts**
  - Product grid switches to appropriate layout on mobile
  - Store cards stack vertically
  - Hero section stacks content above image

---

## 6. Security Headers

- [ ] **Security headers are present**
  ```bash
  curl -sI http://kei.fahmiefendy.dev/ | grep -iE "(x-frame|x-content|x-xss|referrer|content-security|permissions)"
  ```
  **Expected:**
  ```
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; ...
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  ```

- [ ] **Server version is hidden**
  ```bash
  curl -sI http://kei.fahmiefendy.dev/ | grep -i server
  ```
  **Expected:** `Server: nginx` (no version number)

- [ ] **Non-GET methods are blocked**
  ```bash
  curl -s -o /dev/null -w "%{http_code}" -X POST http://kei.fahmiefendy.dev/
  ```
  **Expected:** `405`

- [ ] **Dotfiles are blocked**
  ```bash
  curl -s -o /dev/null -w "%{http_code}" http://kei.fahmiefendy.dev/.env
  ```
  **Expected:** `403`

---

## 7. Performance

- [ ] **Gzip compression is active**
  ```bash
  curl -sI -H "Accept-Encoding: gzip" http://kei.fahmiefendy.dev/ | grep -i content-encoding
  ```
  **Expected:** `Content-Encoding: gzip`

- [ ] **Static assets have cache headers**
  ```bash
  curl -sI http://kei.fahmiefendy.dev/assets/css/style.css | grep -iE "(cache-control|expires)"
  ```
  **Expected:** `Cache-Control: public, immutable` with `Expires` header

- [ ] **Read-only filesystem is enforced**
  ```bash
  docker exec kei-japanese-app touch /test 2>&1
  ```
  **Expected:** `Read-only file system` error

---

## 8. Rollback

- [ ] **Previous image can be restored**
  ```bash
  # Pull a known good version
  docker compose pull kei-japanese-app
  docker compose up -d kei-japanese-app
  docker logs kei-japanese-app --tail 10
  ```
  **Expected:** Container starts with previous version, health check passes
