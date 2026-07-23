import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (smaller than WebP), fall back to WebP. Shrinks the delivered
    // bytes of every next/image, which directly helps LCP on mobile.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for a year (source names are immutable).
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
