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
  // Allow access to nested pages
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Force using the App Router
  useFileSystemPublicRoutes: true,
  webpack: (config) => {
    // Fix issues with framer-motion
    config.externals = [...(config.externals || []), { 'framer-motion': 'framer-motion' }];
    return config;
  },
};

export default nextConfig;
