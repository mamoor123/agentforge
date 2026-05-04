#!/usr/bin/env bash
# Generate self-signed SSL certificates for development
set -euo pipefail

SSL_DIR="$(cd "$(dirname "$0")/../ssl" && pwd)"
mkdir -p "$SSL_DIR"

echo "==> Generating self-signed SSL certificate (valid 365 days)..."

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout "$SSL_DIR/privkey.pem" \
  -out "$SSL_DIR/fullchain.pem" \
  -subj "/C=US/ST=Dev/L=Dev/O=AgentForge/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

echo "==> Certificates generated:"
echo "    Certificate : $SSL_DIR/fullchain.pem"
echo "    Private key : $SSL_DIR/privkey.pem"
echo ""
echo "==> To start with Docker:"
echo "    docker compose up -d --build"
echo ""
echo "==> Visit https://localhost (accept the browser warning for self-signed cert)"
