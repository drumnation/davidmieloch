import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  // Enable both App Router and Pages Router
  useFileSystemPublicRoutes: true,
  // Ensure proper handling of images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
