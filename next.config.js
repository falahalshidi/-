/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
  },
  // تحسين الأداء
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // تحسين الصور
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // تسريع التحميل
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  // تحسين الإنتاج
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig

