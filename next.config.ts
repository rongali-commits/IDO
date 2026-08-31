import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // Vinext/Vite understands `?raw` imports natively. This matching rule
    // gives the native Next.js build used by Vercel the same behavior for the
    // essay source files.
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source',
    });

    return config;
  },
};

export default nextConfig;
