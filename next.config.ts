import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
};

export default nextConfig;
