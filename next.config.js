const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
    outputFileTracingIncludes: {
      "*": [
        "./node_modules/.prisma/client/**/*",
        "./node_modules/@prisma/client/**/*",
        "./node_modules/prisma/libquery_engine-*",
        "./prisma/schema.prisma",
      ],
    },
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
