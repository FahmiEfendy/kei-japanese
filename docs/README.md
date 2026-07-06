# Kei Japanese Cheese Toast — Landing Page

## Overview

Static landing page for Kei Japanese Cheese Toast, a premium artisan bakery brand. Built with vanilla HTML, CSS, and JavaScript, served via Nginx Alpine. Features a product catalog with interactive filtering, store locator with live open/closed status, and a cheese toast customizer.

**Container name:** `kei-japanese-app`
**Image:** `ghcr.io/fahmiefendy/kei-japanese:latest`
**Port:** `80`
**Runtime:** Nginx (Alpine)

## Architecture

```
Client → Cloudflare → infra-nginx:80 → kei.fahmiefendy.dev → kei-japanese-app:80
```

## Directory Structure

```
kei-japanese/
├── index.html              # Main landing page (single page)
├── assets/
│   ├── css/
│   │   └── style.css       # Complete stylesheet
│   ├── js/
│   │   └── script.js       # Interactive features (navbar, filters, customizer)
│   └── images/             # Product, store, and hero images
├── nginx.conf              # Production Nginx config with security headers
├── Dockerfile              # Production container image
├── docker-compose.yml      # Service definition
├── docs/                   # Documentation
│   ├── README.md           # This file
│   ├── CHANGELOG.md        # Version history
│   ├── TODO.md             # Improvement roadmap
│   └── TEST_CHECKLIST.md   # Deployment verification
└── .github/workflows/
    └── deploy.yml          # CI/CD — build & push to GHCR
```

## Features

| Feature | Description |
|---------|-------------|
| **Hero Section** | Animated hero with CTA buttons and best-seller badge |
| **Menu Gallery** | Image gallery showcasing full menu |
| **Product Catalog** | Filterable product grid (Cheese Toast, Salt Bread, Croffle, Ice Cream Toast, Croissant, Cheese Cake) |
| **Toast Customizer** | Interactive bread flavor + vla filling selector with live combo preview |
| **Store Locator** | 3 store locations with Google Maps links and live open/closed status |
| **Responsive Design** | Mobile-first with hamburger menu and adaptive layouts |
| **Scroll Animations** | IntersectionObserver-based reveal animations |

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `KEI_TAG` | Docker image tag to deploy | `latest` | No |

## Local Development

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use a local server (e.g., Python)
python3 -m http.server 8000

# Option 3: Use Docker
docker compose up -d
# Access at http://localhost (mapped via infra-nginx)
```

## Docker Deployment

The container is built and pushed via GitHub Actions on every push to `main`. On the homeserver:

```bash
# Start the app
cd /path/to/homeserver/apps/kei-japanese
docker compose up -d

# View logs
docker logs kei-japanese-app --tail 50 -f

# Check health
curl -s -o /dev/null -w "%{http_code}" http://kei.fahmiefendy.dev/
```

## Security Hardening

This deployment includes the following production security measures:

| Layer | Measure |
|-------|---------|
| **Docker** | Read-only filesystem, tmpfs for temp dirs, `no-new-privileges`, resource limits (64MB / 0.25 CPU) |
| **Nginx** | `server_tokens off`, security headers (CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy) |
| **HTTP** | Only `GET` and `HEAD` methods allowed (returns 405 for others) |
| **Access** | Dotfiles blocked, access logs disabled for static assets and health checks |
| **Caching** | Static assets cached (7d CSS/JS, 30d images) with immutable headers |
| **Build** | `.dockerignore` excludes sensitive files from image |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 from nginx | Check container is running: `docker ps --filter name=kei-japanese-app` |
| Health check failing | Check container logs: `docker logs kei-japanese-app` |
| Images not loading | Verify `assets/images/` directory was copied correctly in the Docker image |
| CSS/JS not updating | Clear browser cache or check cache headers with `curl -I` |
| 405 Method Not Allowed | Only GET and HEAD are allowed; POST/PUT/DELETE requests are rejected by design |

## Related Files

- [docker-compose.yml](../docker-compose.yml) — Service definition
- [Dockerfile](../Dockerfile) — Container build
- [nginx.conf](../nginx.conf) — Nginx configuration
- [deploy.yml](../.github/workflows/deploy.yml) — CI/CD pipeline
- [infra nginx config](../../../infra/nginx/conf.d/keijapanese.conf) — Reverse proxy
