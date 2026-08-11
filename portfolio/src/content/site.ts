import type { Localized } from "@/lib/i18n";

/**
 * Single source of truth for identity and contact details.
 *
 * TODO(bruno): confirm `email` and `domain` before the first deploy. The
 * WhatsApp number is the one already published on the Adesso site — change it
 * here if you want a separate line for freelance enquiries.
 */
export const site = {
  name: "Bruno Castro",

  /** Used for canonical URLs, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brunocastro.com",

  email: "hello@brunocastro.com",
  whatsapp: "447470361422",

  location: {
    en: "London, United Kingdom",
    pt: "Londres, Reino Unido",
  } satisfies Localized<string>,

  availability: {
    en: "Remote worldwide · Freelance and contract",
    pt: "Remoto no mundo todo · Freelance e contrato",
  } satisfies Localized<string>,

  languages: {
    en: "Portuguese (native) · English · Spanish",
    pt: "Português (nativo) · Inglês · Espanhol",
  } satisfies Localized<string>,

  /**
   * The searchable headline. Job titles first, positioning second — clients
   * and recruiters search literal role names, not coined ones.
   */
  role: {
    en: "Exhibition & 3D Designer · Technical Designer · AI Automation",
    pt: "Exhibition & 3D Designer · Projetista Técnico · Automação com IA",
  } satisfies Localized<string>,

  headline: {
    en: "I work where the drawing meets the build.",
    pt: "Eu trabalho onde o desenho encontra a obra.",
  } satisfies Localized<string>,

  intro: {
    en: "Over a decade on European exhibition floors — drawing stands, specifying them for production, and installing them. That is the difference: the drawings work, because I have built what I draw. Around that sit the graphics, the websites and the automation the same clients kept asking for.",
    pt: "Mais de uma década em feiras europeias — desenhando stands, especificando para produção e montando. É essa a diferença: o desenho funciona, porque eu já montei o que desenho. Em volta disso estão as artes, os sites e a automação que os mesmos clientes foram pedindo.",
  } satisfies Localized<string>,

  /** Shown as a credential row on the hub. */
  credentials: {
    en: [
      "10+ years exhibition industry",
      "London · Frankfurt · Dubai",
      "beMatrix & LEDskin specialist",
      "UK-based, EU market reach",
    ],
    pt: [
      "10+ anos em exposições",
      "Londres · Frankfurt · Dubai",
      "Especialista beMatrix e LEDskin",
      "Base no UK, alcance na UE",
    ],
  } satisfies Localized<string[]>,

  social: {
    linkedin: "", // TODO(bruno): add your LinkedIn URL
    behance: "", // TODO(bruno): optional
  },
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
