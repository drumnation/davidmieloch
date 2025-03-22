import { NextConfig } from "next";
import type { Configuration } from 'webpack';

const config: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.githubassets.com'
      }
    ]
  },
  // Next.js 13+ features
  transpilePackages: ['@mantine/carousel'],
  reactStrictMode: true,
  webpack: (config: Configuration) => {
    // Add filesystem caching for better performance
    if (!config.cache) {
      config.cache = { type: 'filesystem' };
    }
    
    return config;
  },
};

export default config;
