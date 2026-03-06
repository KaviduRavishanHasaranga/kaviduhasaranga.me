#!/bin/bash

# Update dependencies
npm install

# Build the project
npm run build

# Restart the PM2 process
pm2 restart kaviduhasaranga-me || pm2 start ecosystem.config.js

# Save PM2 list
pm2 save
