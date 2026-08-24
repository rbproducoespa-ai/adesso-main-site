import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { site } from "@/content/site";
import { HTML_LANG } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Exhibition & 3D Designer, Projetista Técnico, Automação com IA`,
    template: `%s — ${site.name}`,
  },
  description:
    "Designer de exposições e 3D, projetista técnico e desenvolvedor de automação baseado em Londres. Projeto de stand, desenhos de produção, beMatrix e LEDskin, gráfica, web e sistemas de negócio, engenharia de áudio.",
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={HTML_LANG.pt} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-label focus:text-paper"
        >
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
