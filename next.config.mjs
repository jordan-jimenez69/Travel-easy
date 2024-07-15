/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/Travel-easy',
  assetPrefix: '/Travel-easy',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/categories/:slug',
        destination: '/categories/[slug]',
      },
    ];
  },
};

export default nextConfig;
