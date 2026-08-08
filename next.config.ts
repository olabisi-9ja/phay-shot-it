import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the sandbox live-preview host to reach the dev server without
  // cross-origin asset blocking.
  allowedDevOrigins: ["*.e2b.app"],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
