import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | Adesso Modules",
  description:
    "Four integrated modules: Exhibition Lead Intelligence, AI Stand Concept Generator, Automation & Pipeline CRM, and the Exhibition Marketplace.",
  openGraph: {
    title: "Platform | Adesso Modules",
    description:
      "A complete operating system for exhibition professionals — data intelligence, AI design generation, automation, and marketplace.",
    url: "https://www.adessoexhibition.co.uk/platform",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk/platform",
  },
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
