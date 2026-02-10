import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configure for GitHub Pages if using a custom domain or repository name
  // basePath: '/repository-name', // Uncomment and replace with your repo name if not using custom domain
  // assetPrefix: '/repository-name', // Uncomment and replace with your repo name if not using custom domain
};

export default nextConfig;
