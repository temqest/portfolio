import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Patrick Kurt Villamer — Portfolio",
    template: "%s | Patrick Kurt Villamer",
  },
  description:
    "Founder and systems engineer. Co-founder of UNITE (blood bank logistics startup) and lead architect of ap-silang (municipal maternal health platform). Engineering high-consequence systems that hold up.",
  keywords: [
    "Patrick Kurt Villamer",
    "Systems Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Offline-First",
    "Healthcare Tech",
    "Philippines",
  ],
  authors: [{ name: "Patrick Kurt Villamer" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo-squircle.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0a122a] selection:bg-blue-100 selection:text-blue-900 overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
