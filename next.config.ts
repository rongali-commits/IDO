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
    return [...["/", "/:path*"].map(source => ({ source, headers })), {
      source: '/about', headers: headers.map(header => header.key === 'Content-Security-Policy' ? { ...header, value: header.value.replace("script-src 'self' 'unsafe-inline'", "script-src 'self' 'unsafe-inline' https://platform.linkedin.com https://badges.linkedin.com").replace("style-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline' https://static.licdn.com").replace("img-src 'self' data: blob:", "img-src 'self' data: blob: https://media.licdn.com https://static.licdn.com https://www.linkedin.com").replace("font-src 'self'", "font-src 'self' https://static.licdn.com") } : header)
    }];
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
