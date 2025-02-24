import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.imgur.com",
      "imgur.com",
      "photos.marinetraffic.com",
      "images2.imgbox.com",
      "farm5.staticflickr.com",
      "crompton-partners-technical.s3.ap-southeast-1.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crompton-partners-technical.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
