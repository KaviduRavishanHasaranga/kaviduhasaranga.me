import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,

  // Explicitly set the root to this project directory to avoid
  // Next.js mistakenly detecting a parent-level lockfile as the workspace root
  outputFileTracingRoot: path.join(__dirname),

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
