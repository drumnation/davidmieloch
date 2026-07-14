/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Coolify builds a minimal, non-root runtime image from this output.
  output: 'standalone',
  poweredByHeader: false,
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
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://scripts.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss:",
      "media-src 'self' data: blob: https:",
      "frame-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()' },
        ],
      },
    ];
  },
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
      
      // Path aliases matching tsconfig.json - both base paths and subpaths with @ prefix
      '@': path.join(__dirname, './src'),
      '@components': path.join(__dirname, './src/components'),
      '@shared-components': path.join(__dirname, './src/shared-components'),
      '@utils': path.join(__dirname, './src/utils'),
      '@styles': path.join(__dirname, './src/styles'),
      '@types': path.join(__dirname, './src/types'),
      '@store': path.join(__dirname, './src/store'),
      '@providers': path.join(__dirname, './src/providers'),
      '@data': path.join(__dirname, './src/data'),
      '@pages': path.join(__dirname, './src/pages'),
      '@contexts': path.join(__dirname, './src/contexts'),
      '@analytics': path.join(__dirname, './src/analytics'),
    };

    // Keep original config otherwise
    return config;
  },
  // The swcMinify option has been removed in Next.js 15.2.1 as it's now enabled by default
};

module.exports = nextConfig;
