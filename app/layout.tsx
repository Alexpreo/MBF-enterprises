import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Buddy Landscaping | Premium Landscaping & Construction",
  description:
    "Premium hardscaping, custom design, and flawless execution for properties that demand the best. High-end retaining walls, artificial turf, water features, and full exterior remodels.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Buddy Landscaping | Premium Landscaping & Construction",
    description:
      "Premium hardscaping, custom design, and flawless execution for properties that demand the best.",
    url: SITE_URL,
    siteName: "Buddy Landscaping",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buddy Landscaping | Premium Landscaping & Construction",
    description:
      "Premium hardscaping, custom design, and flawless execution for properties that demand the best.",
  },
  icons: {
    icon: [
      {
        url: "/media/buddy%20landscaping%20logo-modified.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen bg-bg text-text antialiased font-sans`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
