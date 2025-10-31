const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif','image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'cdn.lemonsqueezy.com' }
    ]
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
    turbo: { resolveAlias: { '@': './src' } }
  },
  async redirects() {
    return [
      { source: '/inicio', destination: '/es-MX', permanent: true },
      { source: '/start', destination: '/en-US', permanent: true }
    ];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }];
  }
};
module.exports = nextConfig;
