import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  distDir: '.next-vercel',
  poweredByHeader: false,
  async headers() {
    const headers = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; media-src 'self'; connect-src 'self'; upgrade-insecure-requests" },
    ];
    return ["/", "/:path*"].map(source => ({ source, headers }));
  },
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
