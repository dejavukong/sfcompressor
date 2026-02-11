#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Build locally + push to server (avoids OOM on low-memory VPS)
#
# Usage:
#   ./scripts/push.sh              # Build + push + deploy
#   ./scripts/push.sh --seed       # Build + push + deploy + re-seed
# ============================================================================

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

SERVER="root@mimir-server"
REMOTE_DIR="~/shunfeng"
IMAGE_NAME="sfcompressor-app"
IMAGE_FILE="/tmp/sfcompressor.tar.gz"
DO_SEED=false
[[ "${1:-}" == "--seed" ]] && DO_SEED=true

GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'
info() { echo -e "${GREEN}[INFO]${NC} $1"; }
step() { echo -e "\n${CYAN}══  $1${NC}"; }

step "1/5 Build image locally"
docker build -t "$IMAGE_NAME" -f docker/Dockerfile .

step "2/5 Save and compress"
docker save "$IMAGE_NAME" | gzip > "$IMAGE_FILE"
info "$(du -h "$IMAGE_FILE" | cut -f1)"

step "3/5 Sync code"
rsync -avz --delete \
  --exclude='node_modules' --exclude='.next' --exclude='.env' \
  --exclude='dist' --exclude='.claude' --exclude='.git' \
  ./ "$SERVER:$REMOTE_DIR/"

step "4/5 Upload image"
scp "$IMAGE_FILE" "$SERVER:$IMAGE_FILE"

step "5/5 Deploy"
ssh "$SERVER" "
  docker load < $IMAGE_FILE
  rm -f $IMAGE_FILE
  cd $REMOTE_DIR
  docker compose -f docker-compose.prod.yml --env-file .env.production up -d --no-build
"

if [ "$DO_SEED" = true ]; then
  step "Seeding knowledge base"
  ssh "$SERVER" "cd $REMOTE_DIR && docker compose -f docker-compose.prod.yml --env-file .env.production run --rm seed"
fi

rm -f "$IMAGE_FILE"
step "Done!"
