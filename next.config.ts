import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rawBasePath = process.env.BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  rawBasePath === "" || rawBasePath === "/"
    ? ""
    : rawBasePath.startsWith("/")
      ? rawBasePath
      : `/${rawBasePath}`;

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: configDir,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
  // Configure for GitHub Pages if using a custom domain or repository name
  // basePath: '/repository-name', // Uncomment and replace with your repo name if not using custom domain
  // assetPrefix: '/repository-name', // Uncomment and replace with your repo name if not using custom domain
};

export default nextConfig;
