import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap 2026–2028 | Adesso",
  description:
    "Adesso's development trajectory: UK Foundation in 2026, European Expansion in 2027, and Global Platform by 2028. Built on subscription revenue from day one.",
  openGraph: {
    title: "Roadmap 2026–2028 | Adesso",
    description:
      "From UK launch to European scale to global platform — Adesso's three-phase development trajectory.",
    url: "https://www.adessoexhibition.co.uk/roadmap",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk/roadmap",
  },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
