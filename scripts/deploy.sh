#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Shunfeng Compressor — Server-side Deployment Script
#
# Prerequisites:
#   - Ubuntu/Debian VPS with Docker + Caddy installed
#   - Cloudflare Origin Certificate at /etc/cloudflare/{cert.pem, key.pem}
#   - Caddy configured with sfcompressor.com reverse proxy
#   - .env.production filled with real values
#   - .env symlinked to .env.production (ln -s .env.production .env)
#
# Usage:
#   ./scripts/deploy.sh                # Full deployment (first time)
#   ./scripts/deploy.sh update         # Update app only (code change)
#   ./scripts/deploy.sh update --seed  # Update app + re-seed knowledge base
#   ./scripts/deploy.sh seed           # Re-seed knowledge base only
#   ./scripts/deploy.sh status         # Check service status
#   ./scripts/deploy.sh logs           # Tail all service logs
# ============================================================================

COMMAND="${1:-deploy}"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

COMPOSE="docker compose -f docker-compose.prod.yml --env-file .env.production"

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
  [ -f ".env.production" ] || error ".env.production not found. Copy from .env.production.example"

  source .env.production
  [ -n "${POSTGRES_PASSWORD:-}" ] || error "POSTGRES_PASSWORD not set in .env.production"
  [ -n "${DOMAIN:-}" ]            || error "DOMAIN not set in .env.production"
  [ -n "${OPENAI_API_KEY:-}" ]    || warn "OPENAI_API_KEY not set — chat will not work"

  export POSTGRES_PASSWORD OPENAI_API_KEY DOMAIN
}

# ─── Check Caddy config ──────────────────────────────────────────────────────

check_caddy() {
  if ! command -v caddy >/dev/null 2>&1 && ! systemctl is-active --quiet caddy 2>/dev/null; then
    warn "Caddy not detected. Make sure Caddy is configured as reverse proxy."
    warn "See DEPLOY.md for Caddy setup instructions."
  fi
  if [ ! -f "/etc/cloudflare/cert.pem" ] || [ ! -f "/etc/cloudflare/key.pem" ]; then
    warn "Cloudflare Origin Certificate not found at /etc/cloudflare/"
    warn "See DEPLOY.md for certificate setup instructions."
  fi
}

# ─── Commands ─────────────────────────────────────────────────────────────────

cmd_deploy() {
  step "Step 1/5 — Pre-flight checks"
  preflight
  info "Domain: ${DOMAIN}"
  info "Project: ${PROJECT_DIR}"

  step "Step 2/5 — Build app image"
  $COMPOSE build app
  info "Build complete"

  step "Step 3/5 — Start services"
  check_caddy
  $COMPOSE up -d postgres
  info "Waiting for PostgreSQL..."
  until $COMPOSE exec -T postgres pg_isready -U shunfeng >/dev/null 2>&1; do sleep 1; done
  info "PostgreSQL ready"
  $COMPOSE up -d app
  info "All services started"

  step "Step 4/5 — Seed knowledge base"
  # Wait for schema init (docker-entrypoint-initdb runs on first start)
  sleep 3
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
    $COMPOSE build seed
    $COMPOSE run --rm seed
    info "Seed complete"
  fi

  step "Step 5/5 — Verify"
  sleep 3
  $COMPOSE ps
  echo ""
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/zh" 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" = "200" ]; then
    info "App responding: HTTP ${HTTP_CODE}"
  else
    warn "App returned HTTP ${HTTP_CODE} — check: $COMPOSE logs app"
  fi

  step "Deployment complete!"
  echo ""
  if [ -f "/etc/cloudflare/cert.pem" ]; then
    info "Site live at: https://${DOMAIN}"
  else
    info "Site live at: http://${DOMAIN} (add Cloudflare cert for HTTPS)"
  fi
  echo ""
  info "Commands:"
  info "  ./scripts/deploy.sh status  — Service status"
  info "  ./scripts/deploy.sh update  — Deploy code changes"
  info "  ./scripts/deploy.sh seed    — Re-seed knowledge base"
  info "  ./scripts/deploy.sh logs    — Tail logs"
}

cmd_update() {
  local do_seed=false
  for arg in "$@"; do
    case "$arg" in
      --seed) do_seed=true ;;
    esac
  done

  step "Update deployment"
  preflight

  if command -v git >/dev/null 2>&1 && [ -d .git ]; then
    info "Pulling latest code..."
    git pull
  fi

  info "Rebuilding app image..."
  $COMPOSE build app

  info "Restarting app..."
  $COMPOSE up -d app

  if [ "$do_seed" = true ]; then
    step "Re-seed knowledge base"
    [ -n "${OPENAI_API_KEY:-}" ] || error "OPENAI_API_KEY not set in .env.production"
    info "Building seed container..."
    $COMPOSE build seed
    info "Seeding (~2 minutes)..."
    $COMPOSE run --rm seed
    ROW_COUNT=$($COMPOSE exec -T postgres \
      psql -U shunfeng -d shunfeng -tAc "SELECT COUNT(*) FROM knowledge_segments;" 2>/dev/null || echo "?")
    info "Seed complete! ${ROW_COUNT} records in knowledge base"
  fi

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

  info "Seeding (~2 minutes)..."
  $COMPOSE run --rm seed

  ROW_COUNT=$($COMPOSE exec -T postgres \
    psql -U shunfeng -d shunfeng -tAc "SELECT COUNT(*) FROM knowledge_segments;" 2>/dev/null || echo "?")
  info "Done! ${ROW_COUNT} records in knowledge base"
}

cmd_status() {
  source .env.production 2>/dev/null || true
  export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-}" DOMAIN="${DOMAIN:-}"
  echo ""
  $COMPOSE ps 2>/dev/null || warn "Services not running"
  echo ""
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/zh" 2>/dev/null || echo "000")
  info "App: HTTP ${HTTP_CODE}"
  if [ -n "${DOMAIN:-}" ]; then
    EXT_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}/zh" 2>/dev/null || echo "000")
    info "External: HTTPS ${EXT_CODE}"
  fi
}

cmd_logs() {
  source .env.production 2>/dev/null || true
  export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-}" DOMAIN="${DOMAIN:-}"
  $COMPOSE logs -f --tail=100
}

# ─── Main ─────────────────────────────────────────────────────────────────────

case "$COMMAND" in
  deploy)  cmd_deploy ;;
  update)  shift; cmd_update "$@" ;;
  seed)    cmd_seed ;;
  status)  cmd_status ;;
  logs)    cmd_logs ;;
  *)
    echo "Usage: $0 {deploy|update|seed|status|logs}"
    echo ""
    echo "  deploy        — Full first-time deployment"
    echo "  update        — Rebuild and restart app (code changes only)"
    echo "  update --seed — Rebuild app + re-seed knowledge base"
    echo "  seed          — Re-seed AI knowledge base only"
    echo "  status        — Check all services"
    echo "  logs          — Tail service logs"
    exit 1
    ;;
esac
