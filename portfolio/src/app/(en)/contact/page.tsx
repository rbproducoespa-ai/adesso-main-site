import type { Metadata } from "next";
import { Contact } from "@/views/Contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: "contact",
  title: "Contact",
  description:
    "Start a project — exhibition and 3D design, graphics and print, web and automation, or audio. Based in London, working remotely worldwide.",
});

export default function Page() {
  return <Contact locale="en" />;
}
