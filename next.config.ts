import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  distDir: '.next-vercel',
  webpack(config) {
    if (process.env.NOERONG_VERCEL_BUILD === '1') {
      config.resolve.alias[path.resolve(process.cwd(), 'lib/assistant-runtime.ts')] = path.resolve(process.cwd(), 'lib/assistant-runtime.vercel.ts');
    }
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
