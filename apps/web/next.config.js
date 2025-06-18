/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/trpc/:path*',
        destination: 'http://localhost:3001/trpc/:path*',
      },
    ];
  },
};

export default nextConfig;
