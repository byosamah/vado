import type { NextConfig } from "next";

/**
 * /alkhoor is a client hand-off link, not a page: it sends the visitor
 * straight to one PDF, and the PDF downloads instead of opening in a tab.
 * Config redirects run before proxy.ts, so the locale redirect never sees
 * these paths. The locale-prefixed forms are listed too, because an earlier
 * deploy answered /alkhoor with a permanent redirect to /en/alkhoor and a
 * browser can still hold that answer.
 */
const ALKHOOR_FILE = "/alkhoor/Marafi-Al-Khor-Hoarding-Design.pdf";

const nextConfig: NextConfig = {
  images: {
    // WebP only (Next's default). AVIF was measured to REGRESS mobile LCP
    // (1.6s -> ~2.8s, dropping the score 99 -> 95) because AVIF's heavier decode
    // outweighs its smaller download on throttled mobile CPUs. Keeping WebP.
    // Long edge cache for optimized images (source names are immutable) — this
    // only helps repeat views and never hurts the cold Lighthouse run.
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return ["/alkhoor", "/en/alkhoor", "/ar/alkhoor"].map((source) => ({
      source,
      destination: ALKHOOR_FILE,
      permanent: false,
    }));
  },
  async headers() {
    return [
      {
        source: ALKHOOR_FILE,
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="Marafi-Al-Khor-Hoarding-Design.pdf"' },
          // A client file, not site content: keep it out of search results.
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
