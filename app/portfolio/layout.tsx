import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | MBF Enterprises",
  description:
    "A selection of premium outdoor spaces we've brought to life. High-end hardscaping, artificial turf, water features, and full exterior remodels.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
