import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      frame-ancestors 'self' http://localhost:* https://sandbox-buy.paddle.com https://*.paddle.com;
    `.replace(/\s{2,}/g, " "),
  },
];

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
