import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndicatorHub — TradingView Indicator Marketplace",
  description:
    "Access battle-tested TradingView indicators from top traders. Subscribe monthly, get instant Pine Script access, and elevate your trading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#09090B" }}>
        {children}
      </body>
    </html>
  );
}
