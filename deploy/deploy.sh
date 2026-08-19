#!/bin/bash
# ====================================================
# Deployment automation script for Social Downloader
# Zero-Downtime Deployment support using Docker Compose
# ====================================================

echo "====== 1. Pulling latest code from Git ======"
if [ -d ../.git ]; then
  cd ..
  git reset --hard
  git clean -fd
  git pull
  cd deploy || exit
else
  echo "ℹ️ Not a git repository root, skipping git pull."
fi

echo "====== 2. Building & Zero-Downtime Deploying ======"
echo "🏗️ Building new Docker image..."
docker compose -p dl-scorix -f docker-compose.prod.yml build

echo "🔄 Swapping to new container (atomic zero-downtime swap)..."
docker rm -f social-downloader 2>/dev/null || true
docker compose -p dl-scorix -f docker-compose.prod.yml up -d --force-recreate

echo "====== 3. Pruning dangling Docker images ======"
docker image prune -f

echo "🚀 Zero-downtime deployment completed successfully!"
echo "📍 Web UI: https://dl.scorix.live/"
echo "📍 API:    https://dl-api.scorix.live/"
