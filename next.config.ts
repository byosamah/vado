import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only (Next's default). AVIF was measured to REGRESS mobile LCP
    // (1.6s -> ~2.8s, dropping the score 99 -> 95) because AVIF's heavier decode
    // outweighs its smaller download on throttled mobile CPUs. Keeping WebP.
    // Long edge cache for optimized images (source names are immutable) — this
    // only helps repeat views and never hurts the cold Lighthouse run.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
