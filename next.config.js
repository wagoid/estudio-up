/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ['typeorm'],
  },
}

module.exports = nextConfig
