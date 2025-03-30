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
      }
    ]
  },
  // Next.js 13+ features
  transpilePackages: ['@mantine/carousel'],
  reactStrictMode: true,
};

module.exports = nextConfig; 