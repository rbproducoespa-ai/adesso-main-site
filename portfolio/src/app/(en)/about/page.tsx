import type { Metadata } from "next";
import { About } from "@/views/About";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "about",
  title: "About",
  description: `${site.name} — from touring drummer to live sound, then a decade on European exhibition floors designing, specifying and installing stands, and now building the digital systems around them.`,
});

export default function Page() {
  return <About locale="en" />;
}
