import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "@meysam213/iconsax-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
