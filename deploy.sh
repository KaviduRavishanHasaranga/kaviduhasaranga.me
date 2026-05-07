#!/bin/bash
set -e

echo "🚀 Starting deployment..."
cd /var/www/kaviduhasaranga.me

# ── Ensure swap exists (needed on low-RAM VPS for npm ci + Next.js build) ──
if ! swapon --show | grep -q '/swapfile'; then
  echo "💾 Creating swap file..."
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -qxF '/swapfile none swap sw 0 0' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "✅ Swap enabled"
else
  echo "✅ Swap already active"
fi

echo "🧹 Cleaning up local changes..."
git restore . || true
git clean -fd || true

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci --include=dev

echo "🔨 Building Next.js app..."
npm run build

echo "♻️ Starting / Restarting PM2..."
pm2 describe kaviduhasaranga-me > /dev/null 2>&1 \
  && pm2 restart kaviduhasaranga-me \
  || pm2 start ecosystem.config.js
pm2 save

echo "✅ Deployment complete!"
