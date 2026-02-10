#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Shunfeng Compressor — Production Deployment Script
#
# Prerequisites:
#   - Ubuntu/Debian VPS with root or sudo access
#   - Domain DNS A record pointing to this server's IP
#   - .env.production filled with real values
#
# Usage:
#   ./scripts/deploy.sh           # Full deployment (first time)
#   ./scripts/deploy.sh update    # Update app only (code change)
#   ./scripts/deploy.sh seed      # Re-seed knowledge base
#   ./scripts/deploy.sh ssl       # Setup/renew SSL only
#   ./scripts/deploy.sh status    # Check service status
# ============================================================================

COMMAND="${1:-deploy}"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

COMPOSE="docker compose -f docker-compose.prod.yml"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }
step()  { echo -e "\n${CYAN}══════════════════════════════════════${NC}"; echo -e "${CYAN}  $1${NC}"; echo -e "${CYAN}══════════════════════════════════════${NC}"; }

# ─── Pre-flight checks ───────────────────────────────────────────────────────

preflight() {
  command -v docker >/dev/null 2>&1 || error "Docker not installed. Run: curl -fsSL https://get.docker.com | sh"
  docker compose version >/dev/null 2>&1 || error "Docker Compose V2 not found"
  [ -f ".env.production" ] || error ".env.production not found. Copy from .env.production.example and fill in values."

  source .env.production
  [ -n "${POSTGRES_PASSWORD:-}" ] || error "POSTGRES_PASSWORD not set in .env.production"
  [ -n "${OPENAI_API_KEY:-}" ]    || warn "OPENAI_API_KEY not set — chat feature will not work"
  [ -n "${DOMAIN:-}" ]            || error "DOMAIN not set in .env.production"

  export POSTGRES_PASSWORD OPENAI_API_KEY DOMAIN
}

# ─── Generate nginx config ────────────────────────────────────────────────────

generate_nginx_http() {
  info "Using HTTP-only nginx config (for SSL setup)"
  cp docker/nginx/default-initial.conf docker/nginx/active.conf
}

generate_nginx_ssl() {
  info "Generating SSL nginx config for ${DOMAIN}"
  sed "s/\${DOMAIN}/${DOMAIN}/g" docker/nginx/ssl.conf.template > docker/nginx/active.conf
}

# ─── Commands ─────────────────────────────────────────────────────────────────

cmd_deploy() {
  step "Step 1/6 — Pre-flight checks"
  preflight
  info "Domain: ${DOMAIN}"
  info "Project: ${PROJECT_DIR}"

  step "Step 2/6 — Build app image"
  $COMPOSE build app
  info "Build complete"

  step "Step 3/6 — Start services (HTTP mode)"
  generate_nginx_http
  $COMPOSE up -d postgres
  info "Waiting for PostgreSQL..."
  sleep 5
  until $COMPOSE exec -T postgres pg_isready -U shunfeng >/dev/null 2>&1; do sleep 1; done
  info "PostgreSQL ready"
  $COMPOSE up -d app nginx
  info "Services started"

  step "Step 4/6 — SSL certificate"
  echo ""
  info "Verify your site is reachable at http://${DOMAIN}"
  echo ""
  read -rp "Ready to request SSL certificate? [Y/n] " SSL_CONFIRM
  if [[ "${SSL_CONFIRM:-Y}" =~ ^[Nn]$ ]]; then
    warn "Skipping SSL. Site is running on HTTP only."
    warn "Run './scripts/deploy.sh ssl' later to enable HTTPS."
  else
    cmd_ssl_internal
  fi

  step "Step 5/6 — Seed knowledge base"
  ROW_COUNT=$($COMPOSE exec -T postgres \
    psql -U shunfeng -d shunfeng -tAc \
    "SELECT COUNT(*) FROM knowledge_segments;" 2>/dev/null || echo "0")

  if [ "$ROW_COUNT" -gt "0" ]; then
    info "Knowledge base already has ${ROW_COUNT} records, skipping"
  elif [ -z "${OPENAI_API_KEY:-}" ]; then
    warn "OPENAI_API_KEY not set, skipping seed"
    warn "Run './scripts/deploy.sh seed' after setting it"
  else
    info "Seeding knowledge base (~2 minutes)..."
    $COMPOSE run --rm seed
    info "Seed complete"
  fi

  step "Step 6/6 — Verify"
  sleep 3
  $COMPOSE ps
  echo ""
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/zh" 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" = "200" ]; then
    info "App is responding (HTTP ${HTTP_CODE})"
  else
    warn "App returned HTTP ${HTTP_CODE} — check logs: ${COMPOSE} logs app"
  fi

  echo ""
  step "Deployment complete!"
  echo ""
  info "Your site is live at:"
  if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ] 2>/dev/null || \
     $COMPOSE exec -T nginx test -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" 2>/dev/null; then
    info "  https://${DOMAIN}"
  else
    info "  http://${DOMAIN}  (run './scripts/deploy.sh ssl' for HTTPS)"
  fi
  echo ""
  info "Useful commands:"
  info "  ${COMPOSE} ps          # Service status"
  info "  ${COMPOSE} logs -f app # App logs"
  info "  ${COMPOSE} logs -f     # All logs"
  info "  ./scripts/deploy.sh update  # Deploy code changes"
  info "  ./scripts/deploy.sh seed    # Re-seed knowledge base"
}

cmd_ssl_internal() {
  info "Requesting certificate for ${DOMAIN}..."
  $COMPOSE run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "admin@${DOMAIN}" \
    --agree-tos \
    --no-eff-email \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}" \
    || {
      warn "certbot failed. Common causes:"
      warn "  - DNS not pointing to this server yet"
      warn "  - Port 80 not accessible from internet"
      warn "  - Rate limit exceeded (wait 1 hour)"
      warn "Site continues to work on HTTP."
      return 1
    }

  info "SSL certificate obtained!"
  generate_nginx_ssl
  $COMPOSE restart nginx
  info "HTTPS enabled"
}

cmd_ssl() {
  preflight
  step "SSL Certificate Setup"
  generate_nginx_http
  $COMPOSE up -d nginx
  sleep 2
  cmd_ssl_internal
}

cmd_update() {
  step "Update deployment"
  preflight

  info "Pulling latest code..."
  if command -v git >/dev/null 2>&1 && [ -d .git ]; then
    git pull
  else
    info "Not a git repo — make sure code is already updated"
  fi

  info "Rebuilding app image..."
  $COMPOSE build app

  info "Restarting app..."
  $COMPOSE up -d app

  # Check if SSL is active and regenerate nginx config
  if $COMPOSE exec -T nginx test -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" 2>/dev/null; then
    generate_nginx_ssl
  else
    generate_nginx_http
  fi
  $COMPOSE restart nginx

  sleep 3
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/zh" 2>/dev/null || echo "000")
  info "App responding: HTTP ${HTTP_CODE}"
  info "Update complete!"
}

cmd_seed() {
  step "Seed knowledge base"
  preflight
  [ -n "${OPENAI_API_KEY:-}" ] || error "OPENAI_API_KEY not set in .env.production"

  info "Building seed container..."
  $COMPOSE build seed

  info "Seeding knowledge base (~2 minutes)..."
  $COMPOSE run --rm seed

  info "Seed complete!"
  ROW_COUNT=$($COMPOSE exec -T postgres \
    psql -U shunfeng -d shunfeng -tAc "SELECT COUNT(*) FROM knowledge_segments;" 2>/dev/null || echo "?")
  info "Knowledge base now has ${ROW_COUNT} records"
}

cmd_status() {
  preflight 2>/dev/null || true
  echo ""
  $COMPOSE ps 2>/dev/null || warn "Services not running"
  echo ""

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/zh" 2>/dev/null || echo "000")
  info "App health: HTTP ${HTTP_CODE}"

  if [ -n "${DOMAIN:-}" ]; then
    EXT_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}/zh" 2>/dev/null || echo "000")
    info "External (HTTPS): HTTP ${EXT_CODE}"
  fi
}

# ─── Main ─────────────────────────────────────────────────────────────────────

case "$COMMAND" in
  deploy)  cmd_deploy ;;
  update)  cmd_update ;;
  seed)    cmd_seed ;;
  ssl)     cmd_ssl ;;
  status)  cmd_status ;;
  *)
    echo "Usage: $0 {deploy|update|seed|ssl|status}"
    echo ""
    echo "  deploy  — Full first-time deployment"
    echo "  update  — Rebuild and restart app (after code changes)"
    echo "  seed    — Re-seed the AI knowledge base"
    echo "  ssl     — Setup/renew SSL certificate"
    echo "  status  — Check service status"
    exit 1
    ;;
esac
