#!/bin/bash

# ====================================================
# Nginx Configuration Script for Social Downloader
# Domains:
#   - https://dl.scorix.live/ (Web UI Downloader)
#   - https://dl-api.scorix.live/ (Downloader API / iOS Shortcut)
# ====================================================

CONF_FILE="/etc/nginx/sites-available/scorix-downloader"
SSL_DIR="/etc/nginx/ssl"
CERT_FILE="$SSL_DIR/scorix_live.crt"
KEY_FILE="$SSL_DIR/scorix_live.key"

echo ">>> 1. Ensuring SSL Directory & Certificates exist..."
sudo mkdir -p $SSL_DIR

if [ ! -f "$CERT_FILE" ] || [ ! -f "$KEY_FILE" ]; then
    echo "🔑 Generating self-signed SSL cert fallback for initial setup..."
    sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
        -keyout $KEY_FILE -out $CERT_FILE \
        -subj "/C=US/ST=State/L=City/O=Cloudflare/OU=Origin/CN=*.scorix.live" > /dev/null 2>&1
    echo "💡 Note: You can replace $CERT_FILE and $KEY_FILE with your Cloudflare Origin CA certificate anytime."
fi

echo ">>> 2. Writing Nginx Virtual Host Configuration..."

sudo tee $CONF_FILE > /dev/null <<'EOF'
# --- HTTP: Redirect all domains to HTTPS ---
server {
    listen 80;
    listen [::]:80;
    server_name dl.scorix.live dl-api.scorix.live;
    return 301 https://$host$request_uri;
}

# --- HTTPS: Web UI Downloader (dl.scorix.live) ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name dl.scorix.live;

    ssl_certificate         /etc/nginx/ssl/scorix_live.crt;
    ssl_certificate_key     /etc/nginx/ssl/scorix_live.key;

    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 1000M;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}

# --- HTTPS: Downloader API & iOS Shortcut (dl-api.scorix.live) ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name dl-api.scorix.live;

    ssl_certificate         /etc/nginx/ssl/scorix_live.crt;
    ssl_certificate_key     /etc/nginx/ssl/scorix_live.key;

    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 1000M;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
EOF

echo ">>> 3. Enabling site configuration (symlink)..."
sudo ln -sf $CONF_FILE /etc/nginx/sites-enabled/scorix-downloader

echo ">>> 4. Testing Nginx configuration & Reloading..."
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "=================================================="
    echo "✅ SSL & NGINX CONFIGURATION READY!"
    echo "📍 Web UI:  https://dl.scorix.live/"
    echo "📍 API / iOS Shortcut: https://dl-api.scorix.live/api/shortcut?url=<LINK_VIDEO>"
    echo "=================================================="
else
    echo "❌ Nginx configuration test FAILED."
    exit 1
fi
