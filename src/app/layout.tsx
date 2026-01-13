// app/layout.tsx
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" || "https://goldenweft.in"
  ),
  title: {
    default: "GoldenWeft — Handcrafted Indian Sarees",
    template: "%s | GoldenWeft",
  },
  description:
    "GoldenWeft curates handcrafted Indian sarees with care, tradition, and quiet elegance. Designed to feel appropriate, never excessive.",
  keywords: [
    "Indian sarees",
    "Banarasi saree",
    "Bhagalpuri saree",
    "Handloom silk sarees",
    "Luxury sarees India",
  ],
  openGraph: {
    title: "GoldenWeft — Handcrafted Indian Sarees",
    description:
      "A considered collection of handcrafted sarees, curated with cultural sensitivity and quiet elegance.",
    url: "https://goldenweft.in",
    siteName: "GoldenWeft",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "GoldenWeft handcrafted sarees",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} bg-[#F7F5F2] text-gray-900`}
      >
        {/* ✅ Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        {children}

      </body>
    </html>
  );
}
