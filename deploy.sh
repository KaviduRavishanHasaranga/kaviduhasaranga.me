#!/bin/bash
set -e

echo "🚀 Starting deployment..."
cd /var/www/kaviduhasaranga.me

echo "🧹 Cleaning up local changes..."
git restore . || true
git clean -fd || true

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci --include=dev

echo "🔨 Building Next.js app..."
npm run build

echo "♻️ Restarting PM2..."
pm2 restart kaviduhasaranga-me

echo "✅ Deployment complete!"
