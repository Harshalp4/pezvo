/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // /coverage was folded into /contact — "do you serve my area" is a
        // contact question.
        source: "/coverage",
        destination: "/contact#coverage",
        permanent: true,
      },

      /* ── Retiring the previous site ──────────────────────────────────────
         These URLs are live and returning 200 on www.presso24.com today.
         Without these 301s they become 404s the moment this deploys, losing
         both the visitor and whatever ranking they carry. Ordered most
         specific first — Next matches in order. */
      {
        source: "/corporate",
        destination: "/business",
        permanent: true,
      },
      {
        // 12 per-service detail pages collapse into the one services page.
        source: "/services/:slug",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/locations/:city",
        destination: "/contact#coverage",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Fonts are content-hashed by next/font, so they can be immutable.
        source: "/:all*(woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        /* Images served straight out of /public keep a stable URL — replacing
           one reuses the same path. Marking those immutable meant a swapped
           asset would never reach a returning visitor, so they get a day of
           freshness and a week of stale-while-revalidate instead.

           Scoped by directory on purpose. The earlier blanket
           `/:all*(svg|png|...)` also matched `/_next/static/media/*`, where
           Next emits content-hashed filenames and sets `immutable` itself —
           this rule was overriding that and downgrading genuinely immutable
           assets to a 24h TTL. Anything imported statically (the app
           screenshots, the photo bands) lives there and must keep Next's
           default. */
        source: "/:dir(logo|store|illustrations|og|gallery)/:file*.:ext(svg|png|jpg|jpeg|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
