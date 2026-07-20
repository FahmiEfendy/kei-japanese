# Stage 1: Build & Minify Assets
FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npx -y clean-css-cli -o assets/css/style.css assets/css/style.css \
    && npx -y terser assets/js/script.js -o assets/js/script.js --compress --mangle

# Stage 2: Production Nginx Server
FROM nginx:stable-alpine

LABEL maintainer="Fahmi Efendy"
LABEL description="Kei Japanese Cheese Toast — Static landing page served via Nginx"
LABEL org.opencontainers.image.source="https://github.com/FahmiEfendy/kei-japanese"

# Remove default nginx static assets and config
RUN rm -rf /usr/share/nginx/html/* \
    && rm -f /etc/nginx/conf.d/default.conf

# Copy minified static assets from builder stage
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/404.html /usr/share/nginx/html/
COPY --from=builder /app/assets/ /usr/share/nginx/html/assets/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure correct permissions for non-root operation
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
