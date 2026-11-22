import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inacio Nakiti — Frontend Engineer & Shopify Plus Specialist",
  description:
    "Stores you never have to think about. Fast, custom Shopify & Shopify Plus themes, checkout extensibility, and scalable commerce integrations.",
  keywords: [
    "Shopify Plus",
    "Frontend Engineer",
    "Inacio Nakiti",
    "Next.js",
    "Liquid",
    "Headless Commerce",
    "Cape Town",
  ],
  authors: [{ name: "Inacio Nakiti" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#eeece8] selection:bg-[#5b5fe0] selection:text-white">
        {children}

        {/* Global SVG Gooey Filter definition */}
        <svg
          className="absolute -top-[9999px] -left-[9999px] w-0 h-0 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
