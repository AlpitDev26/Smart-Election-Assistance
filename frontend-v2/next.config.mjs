/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Correct location for dev origins in recent Next.js versions
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
  },
};

export default nextConfig;