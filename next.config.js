/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.githubassets.com'
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com'
      },
      {
        protocol: 'https',
        hostname: '**.medium.com'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: 'drumnation.gallerycdn.vsassets.io'
      }
    ]
  },
  // Next.js 13+ features
  transpilePackages: ['@mantine/carousel'],
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // EMERGENCY FIX: Override React Spring with dummy implementation to prevent Maximum Call Stack errors
    // This redirects all @react-spring imports to our mock implementation
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-spring/web': require.resolve('./src/utils/animations/force-disable-react-spring.ts'),
      '@react-spring/core': require.resolve('./src/utils/animations/force-disable-react-spring.ts'),
      '@react-spring/animated': require.resolve('./src/utils/animations/force-disable-react-spring.ts'),
      '@react-spring/shared': require.resolve('./src/utils/animations/force-disable-react-spring.ts'),
      '@react-spring/types': require.resolve('./src/utils/animations/force-disable-react-spring.ts'),
    };

    // Keep original config otherwise
    return config;
  },
  // The swcMinify option has been removed in Next.js 15.2.1 as it's now enabled by default
};

module.exports = nextConfig; 