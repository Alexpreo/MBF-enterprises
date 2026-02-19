import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://mbfenterprises.com";

export const metadata: Metadata = {
  title: "MBF Enterprises | Premium Landscaping & Construction",
  description:
    "Premium hardscaping, custom design, and flawless execution for properties that demand the best. High-end retaining walls, artificial turf, water features, and full exterior remodels.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "MBF Enterprises | Premium Landscaping & Construction",
    description:
      "Premium hardscaping, custom design, and flawless execution for properties that demand the best.",
    url: SITE_URL,
    siteName: "MBF Enterprises",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBF Enterprises | Premium Landscaping & Construction",
    description:
      "Premium hardscaping, custom design, and flawless execution for properties that demand the best.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen bg-bg text-text antialiased font-sans`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
