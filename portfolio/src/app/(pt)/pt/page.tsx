import type { Metadata } from "next";
import { Hub } from "@/views/Hub";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  locale: "pt",
  title: `${site.name} — Exhibition & 3D Designer, Projetista Técnico, Automação com IA`,
  description:
    "Projeto de stand, visualização 3D e desenhos de produção, beMatrix e LEDskin, gráfica e impressão, web e automação de negócio, engenharia de áudio. Base em Londres, atuação remota no mundo todo.",
});

export default function Page() {
  return <Hub locale="pt" />;
}
