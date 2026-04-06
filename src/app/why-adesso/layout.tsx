import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Adesso | The Innovation Case",
  description:
    "The exhibition industry generates billions in annual revenue. It has no digital infrastructure. Adesso exists to build it — category creation, not imitation.",
  openGraph: {
    title: "Why Adesso | The Innovation Case",
    description:
      "Adesso creates a new category: exhibition intelligence infrastructure. Proprietary data, AI models trained for exhibitions, and automation built around industry timelines.",
    url: "https://www.adessoexhibition.co.uk/why-adesso",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk/why-adesso",
  },
};

export default function WhyAdessoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
