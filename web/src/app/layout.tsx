import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Moon Trading Platform - AI-Powered Trading Automation",
  description:
    "Advanced AI-powered trading platform with automated strategies, real-time analytics, and intelligent agents for cryptocurrency and financial markets.",
  keywords: [
    "trading",
    "AI trading",
    "automated trading",
    "cryptocurrency",
    "trading bots",
    "algorithmic trading",
  ],
  authors: [{ name: "Moon Dev" }],
  openGraph: {
    title: "Moon Trading Platform - AI-Powered Trading Automation",
    description:
      "Advanced AI-powered trading platform with automated strategies and real-time analytics.",
    type: "website",
    url: "https://moon-trading.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Moon Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon Trading Platform - AI-Powered Trading Automation",
    description:
      "Advanced AI-powered trading platform with automated strategies and real-time analytics.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
