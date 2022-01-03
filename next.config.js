// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Generate Sitemap + RSS on build time
    if (isServer) {
      import('./lib/generate-sitemap.mjs').then(gs => { gs.generateSitemap() })
    } else {
      config.resolve.fallback.fs = false
    }

    return config
  },
  reactStrictMode: true,
}

module.exports = nextConfig
