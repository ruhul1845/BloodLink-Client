/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel's Next.js builder expects the standard `.next` output directory.
  // Local production checks use a separate directory so they cannot corrupt `next dev`.
  distDir: process.env.VERCEL ? ".next" : process.env.NODE_ENV === "production" ? ".next-build" : ".next",
};

export default nextConfig;
