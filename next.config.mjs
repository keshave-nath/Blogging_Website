/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
  },
  images: {
    domains: ['https://blogging-server-1mfg.onrender.com'],
  },
};

export default nextConfig;
