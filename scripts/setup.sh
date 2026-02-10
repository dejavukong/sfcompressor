#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Shunfeng Compressor — Project Setup Script
# Usage:
#   ./scripts/setup.sh          # Local development (default)
#   ./scripts/setup.sh prod     # Production server
# ============================================================================

MODE="${1:-dev}"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ---------- Pre-flight checks ----------

command -v docker >/dev/null 2>&1 || error "Docker is not installed"
docker compose version >/dev/null 2>&1 || error "Docker Compose V2 is not installed"

if [ "$MODE" = "prod" ]; then
  info "Mode: PRODUCTION"
  COMPOSE_FILE="docker-compose.prod.yml"
  ENV_FILE=".env.production"
  [ -f "$ENV_FILE" ] || error "$ENV_FILE not found. Copy from .env.production.example and fill in values."
  # Source production env for DATABASE_URL construction
  source "$ENV_FILE"
  DB_URL="postgresql://shunfeng:${POSTGRES_PASSWORD}@localhost:5432/shunfeng"
else
  info "Mode: LOCAL DEVELOPMENT"
  COMPOSE_FILE="docker-compose.yml"
  ENV_FILE=".env"
  [ -f "$ENV_FILE" ] || error "$ENV_FILE not found. Create it with OPENAI_API_KEY and DATABASE_URL."
  source "$ENV_FILE"
  DB_URL="${DATABASE_URL:-postgresql://shunfeng:shunfeng_dev@localhost:5433/shunfeng}"
fi

# ---------- Step 1: Install dependencies ----------

if command -v pnpm >/dev/null 2>&1; then
  info "Step 1/4 — Installing dependencies..."
  pnpm install --frozen-lockfile 2>/dev/null || pnpm install
else
  warn "pnpm not found, skipping dependency install (production image has deps baked in)"
fi

# ---------- Step 2: Start database ----------

info "Step 2/4 — Starting PostgreSQL..."
docker compose -f "$COMPOSE_FILE" up -d postgres
info "Waiting for PostgreSQL to be ready..."

RETRIES=30
until docker compose -f "$COMPOSE_FILE" exec -T postgres pg_isready -U shunfeng >/dev/null 2>&1; do
  RETRIES=$((RETRIES - 1))
  if [ "$RETRIES" -le 0 ]; then
    error "PostgreSQL did not become ready in time"
  fi
  sleep 1
done
info "PostgreSQL is ready"

# ---------- Step 3: Initialize database schema ----------

info "Step 3/4 — Initializing database schema..."

# Check if table already exists
TABLE_EXISTS=$(docker compose -f "$COMPOSE_FILE" exec -T postgres \
  psql -U shunfeng -d shunfeng -tAc \
  "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'knowledge_segments');" 2>/dev/null || echo "f")

if [ "$TABLE_EXISTS" = "t" ]; then
  info "Database schema already exists, skipping init-db.sql"
else
  info "Creating tables and indexes..."
  docker compose -f "$COMPOSE_FILE" exec -T postgres \
    psql -U shunfeng -d shunfeng < scripts/init-db.sql
  info "Schema created"
fi

# ---------- Step 4: Seed knowledge base ----------

# Check if data already seeded
ROW_COUNT=$(docker compose -f "$COMPOSE_FILE" exec -T postgres \
  psql -U shunfeng -d shunfeng -tAc \
  "SELECT COUNT(*) FROM knowledge_segments;" 2>/dev/null || echo "0")

if [ "$ROW_COUNT" -gt "0" ]; then
  info "Step 4/4 — Knowledge base already has $ROW_COUNT records"
  echo ""
  read -rp "Re-seed? This will replace all existing data. [y/N] " RESEED
  if [[ ! "$RESEED" =~ ^[Yy]$ ]]; then
    info "Skipping seed"
  else
    info "Step 4/4 — Re-seeding knowledge base..."
    DATABASE_URL="$DB_URL" pnpm tsx scripts/seed-knowledge.ts
  fi
else
  if [ -z "${OPENAI_API_KEY:-}" ]; then
    warn "Step 4/4 — OPENAI_API_KEY not set, skipping knowledge base seed"
    warn "Chat feature will not work. Run manually later:"
    warn "  DATABASE_URL=\"$DB_URL\" pnpm tsx scripts/seed-knowledge.ts"
  else
    info "Step 4/4 — Seeding knowledge base (this takes ~2 minutes)..."
    DATABASE_URL="$DB_URL" pnpm tsx scripts/seed-knowledge.ts
  fi
fi

# ---------- Done ----------

echo ""
info "========================================="
if [ "$MODE" = "prod" ]; then
  info "Production setup complete!"
  echo ""
  info "Next steps:"
  info "  1. Start all services:  docker compose -f docker-compose.prod.yml up -d"
  info "  2. Get SSL certificate: see deployment guide"
  info "  3. Check status:        docker compose -f docker-compose.prod.yml ps"
else
  info "Local setup complete!"
  echo ""
  info "Start developing:"
  info "  pnpm dev"
  echo ""
  info "Open http://localhost:3000"
  info "Database running on localhost:5433"
fi
info "========================================="
