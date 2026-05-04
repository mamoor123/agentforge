#!/usr/bin/env bash
# Obtain Let's Encrypt SSL certificates for production
# Usage: ./scripts/setup-letsencrypt.sh yourdomain.com
set -euo pipefail

DOMAIN="${1:?Usage: $0 <domain>}"
SSL_DIR="$(cd "$(dirname "$0")/../ssl" && pwd)"
mkdir -p "$SSL_DIR"

echo "==> Setting up Let's Encrypt for: $DOMAIN"
echo ""

# Step 1: Temporarily use HTTP-only nginx config for ACME challenge
cat > "$(dirname "$0")/../nginx/default.conf" <<'NGINX'
server {
    listen 80;
    server_name _;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}
NGINX

echo "==> Starting nginx for ACME challenge..."
docker compose up -d nginx

# Step 2: Request certificate via certbot
echo "==> Requesting certificate from Let's Encrypt..."
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@${DOMAIN} \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"

# Step 3: Copy certs to ssl directory
docker compose run --rm certbot sh -c "
    cp /etc/letsencrypt/live/${DOMAIN}/fullchain.pem /ssl/fullchain.pem
    cp /etc/letsencrypt/live/${DOMAIN}/privkey.pem /ssl/privkey.pem
"

# Step 4: Restore full nginx SSL config
cat > "$(dirname "$0")/../nginx/default.conf" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name ${DOMAIN};

    ssl_certificate     /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    ssl_stapling on;
    ssl_stapling_verify on;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /_next/static/ {
        proxy_pass http://app:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

echo "==> Restarting nginx with SSL..."
docker compose up -d nginx

echo ""
echo "==> SSL setup complete!"
echo "    Certificate : $SSL_DIR/fullchain.pem"
echo "    Private key : $SSL_DIR/privkey.pem"
echo "    Visit       : https://${DOMAIN}"
echo ""
echo "==> Auto-renewal: certbot renews automatically. Add to crontab for safety:"
echo "    0 3 * * 1 docker compose run --rm certbot renew && docker compose exec nginx nginx -s reload"
