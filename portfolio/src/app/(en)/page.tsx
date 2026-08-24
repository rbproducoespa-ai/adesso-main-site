import type { Metadata } from "next";
import { Hub } from "@/views/Hub";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: `${site.name} — Exhibition & 3D Designer, Technical Designer, AI Automation`,
  description:
    "Exhibition stand design, 3D visualisation and production drawings, beMatrix and LEDskin, graphics and print, web and business automation, audio engineering. London-based, working remotely worldwide.",
});

export default function Page() {
  return <Hub locale="en" />;
}
