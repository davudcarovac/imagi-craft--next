import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false, // 🔧 spreči webpack da traži 'canvas' modul
    };

    return config;
  },
};

export default nextConfig;
