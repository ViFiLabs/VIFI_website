import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const ppObjectSans = localFont({
  src: [
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-ThinSlanted.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-Slanted.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-BoldSlanted.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/PP Object Sans/PPObjectSans-HeavySlanted.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-pp-object-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIFILABS",
  description: "Bringing emerging market economies onchain",
  openGraph: {
    title: "VIFILABS",
    description: "Bringing emerging market economies onchain",
    url: "https://vifilabs.xyz",
    siteName: "VIFILABS",
    images: [
      {
        url: "https://vifilabs.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "VIFILABS social preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ViFi_Labs",
    title: "VIFILABS",
    description: "Bringing emerging market economies onchain",
    images: [{"url": "https://vifilabs.xyz/og-image.png"}],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:image" content="https://vifilabs.xyz/og-image.png" />

      </head>
      <body
        suppressHydrationWarning
        className={`${ppObjectSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
