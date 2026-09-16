import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  webpack(config, { dev }) {
    // The gallery's many variants produce a multi-GB persistent webpack cache.
    // Avoid serializing it on Vercel's build machines; retain local dev caching.
    if (!dev && process.env.VERCEL === "1") {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/preview/:group/ox-alpha/:path*",
        destination: "/preview/:group/glm-5.3-flash/:path*",
        permanent: true,
      },
      {
        source: "/:group/ox-alpha/:path*",
        destination: "/:group/glm-5.3-flash/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
