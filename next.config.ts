import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用快速刷新，提供更好的开发体验
  reactStrictMode: true,
  // 优化图片加载
  images: {
    domains: ['*'],
    // 启用图片优化
    unoptimized: false,
  },
};

export default nextConfig;
