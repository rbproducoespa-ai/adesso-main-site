import type { Metadata } from "next";
import { Contact } from "@/views/Contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  locale: "pt",
  path: "contact",
  title: "Contato",
  description:
    "Começar um projeto — exposições e 3D, gráfica e impressão, web e automação, ou áudio. Base em Londres, atuação remota no mundo todo.",
});

export default function Page() {
  return <Contact locale="pt" />;
}
