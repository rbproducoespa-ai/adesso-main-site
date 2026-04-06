import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | How Adesso Works",
  description:
    "Adesso's technical architecture: data extraction, AI processing, automation frameworks, and cloud infrastructure built for the exhibition industry at scale.",
  openGraph: {
    title: "Technology | How Adesso Works",
    description:
      "How Adesso processes, analyses, and activates exhibition data at scale using AI and proprietary data models.",
    url: "https://www.adessoexhibition.co.uk/technology",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk/technology",
  },
};

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
