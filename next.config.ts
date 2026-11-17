import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: `npm run build` writes plain HTML/CSS/JS to ./out
  output: "export",
  // Empty locally; the deploy workflow sets it to "/<repo name>" for GitHub Pages.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
