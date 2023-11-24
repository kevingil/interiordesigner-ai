/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kevingil.com',
        port: '',
        pathname: '/interiordesigner/**',
      },
    ],
  },
}

module.exports = nextConfig
