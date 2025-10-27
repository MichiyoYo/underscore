import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['images.unsplash.com', 'covers.openlibrary.org'],
  },
};

export default nextConfig;
