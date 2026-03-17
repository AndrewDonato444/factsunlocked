#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PROJECT_ROOT="$SCRIPT_DIR"
while [ "$PROJECT_ROOT" != "/" ]; do
  if [ -d "$PROJECT_ROOT/.git" ]; then break; fi
  PROJECT_ROOT="$(dirname "$PROJECT_ROOT")"
done

load_env() { if [ -f "$1" ]; then set -a; source "$1"; set +a; fi; }
load_env .env
load_env ../../.env
load_env "$PROJECT_ROOT/.env"

if [ -f scripts/generate-voiceover.ts ] && [ -n "${GEMINI_API_KEY:-}" ]; then
  echo "🎙️  Generating AI voiceover..."
  npx tsx --no-cache scripts/generate-voiceover.ts
fi

if [ -f scripts/generate-assets.ts ] && [ -n "${GEMINI_API_KEY:-}" ]; then
  echo "🎨 Generating AI background images..."
  npx tsx --no-cache scripts/generate-assets.ts
fi

echo "🎬 Rendering video..."
npx remotion render src/index.ts BabyFactHeartbeatSpeed out/video.mp4
echo "✅ Video rendered to out/video.mp4"
