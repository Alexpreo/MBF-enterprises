import type { NextConfig } from "next";

const extraDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  // Mobile LAN preview: add the IP shown next to "Network:" in the terminal (DHCP can change overnight).
  // Example: ALLOWED_DEV_ORIGINS=192.168.1.42,10.0.0.101
  allowedDevOrigins: ["10.0.0.100", "10.0.0.147", "localhost", "127.0.0.1", ...extraDevOrigins],
};

export default nextConfig;
