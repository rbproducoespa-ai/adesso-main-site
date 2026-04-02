import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { MetaPixel } from "@/components/ui/MetaPixel";
import { GoogleAnalytics } from "@/components/ui/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADESSO Digital — Exhibition, Automation & Lead Intelligence",
  description:
    "A UK digital services company operating across exhibition stand design, business automation, lead intelligence products, and digital product development.",
  openGraph: {
    title: "ADESSO Digital — Exhibition, Automation & Lead Intelligence",
    description: "Exhibition design, automation systems, lead intelligence, and digital products for B2B companies across the UK and Europe.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADESSO Digital",
    description: "Exhibition design, automation systems, lead intelligence, and digital products.",
  },
  alternates: {
    canonical: "https://adesso.digital",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-[#111111]`}>
        <MetaPixel />
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
