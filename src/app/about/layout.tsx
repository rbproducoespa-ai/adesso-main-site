import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Adesso | AI Platform for Exhibitions",
  description:
    "Adesso was founded to solve a fundamental gap in the exhibition industry: the absence of a unified digital system. Registered in England & Wales.",
  openGraph: {
    title: "About Adesso | AI Platform for Exhibitions",
    description:
      "Building the digital infrastructure the exhibition industry never had.",
    url: "https://www.adessoexhibition.co.uk/about",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
