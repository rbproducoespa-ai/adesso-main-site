import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adesso — AI Infrastructure for the Exhibition Industry",
  description:
    "Adesso is building a data-driven platform for exhibition intelligence, AI stand generation, and workflow automation. UK-based, European scale.",
  openGraph: {
    title: "Adesso — AI Infrastructure for the Exhibition Industry",
    description:
      "Adesso is building a data-driven platform for exhibition intelligence, AI stand generation, and workflow automation. UK-based, European scale.",
    url: "https://www.adessoexhibition.co.uk",
    siteName: "Adesso",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adesso — AI Infrastructure for the Exhibition Industry",
    description:
      "AI-powered platform for exhibition intelligence, stand generation, and workflow automation.",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} font-sans antialiased bg-[#04040A] text-[#F0F4FF]`}
      >
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
