import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "gvyodexzhfigzgrdhoiq.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lyjriwcbkbzlabhzrcnl.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],

  },
};

export default nextConfig;
