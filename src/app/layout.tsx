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
  title: "Patrick — Founder & Systems Engineer",
  description:
    "Co-founder of UNITE (blood bank logistics startup) and architect of ap-silang (municipal maternal health platform). Engineering high-consequence systems that hold up.",
  keywords: [
    "Systems Engineer",
    "Full-Stack Developer",
    "Patrick",
    "Next.js",
    "React",
    "TypeScript",
    "Offline-First",
    "Healthcare Tech",
    "Philippines",
  ],
  authors: [{ name: "Patrick" }],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0a122a] selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
