import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  // Ensure proper handling of images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
