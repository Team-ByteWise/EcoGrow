import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'treenation-uploads.s3.eu-central-1.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
