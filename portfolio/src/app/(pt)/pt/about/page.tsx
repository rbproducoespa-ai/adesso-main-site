import type { Metadata } from "next";
import { About } from "@/views/About";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  locale: "pt",
  path: "about",
  title: "Sobre",
  description: `${site.name} — de baterista de estrada a som ao vivo, depois uma década em feiras europeias desenhando, especificando e montando stands, e agora construindo os sistemas digitais em volta.`,
});

export default function Page() {
  return <About locale="pt" />;
}
