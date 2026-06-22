/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production builds away from the active development cache.
  distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next",
};

export default nextConfig;
