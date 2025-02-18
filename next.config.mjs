/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_SERVER],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
