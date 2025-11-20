/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "catalog-cdn.detmir.st"
      },
      {
        protocol: "https",
        hostname: "**.retailrocket.ru"
      },
      {
        protocol: "https",
        hostname: "externalapi.retailrocket.ru"
      }
    ]
  }
};

export default nextConfig;
