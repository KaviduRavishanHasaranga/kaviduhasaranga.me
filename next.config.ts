import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
