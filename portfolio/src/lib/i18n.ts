export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** A value that exists in both languages. */
export type Localized<T> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

/**
 * English lives at the root (`/exhibition`); Portuguese is prefixed
 * (`/pt/exhibition`). Route-based rather than stored client-side, so each
 * language has a real URL that search engines can index.
 */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return clean ? `${base}/${clean}` : base || "/";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "pt" : "en";
}

/** BCP 47 tags used for <html lang> and hreflang alternates. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en-GB",
  pt: "pt-BR",
};

type UIKey =
  | "nav.work"
  | "nav.about"
  | "nav.contact"
  | "nav.divisions"
  | "hub.chooseArea"
  | "hub.allAreas"
  | "common.selectedWork"
  | "common.capabilities"
  | "common.tools"
  | "common.deliverables"
  | "common.howIWork"
  | "common.engagement"
  | "common.viewArea"
  | "common.backToAreas"
  | "common.getInTouch"
  | "common.email"
  | "common.whatsapp"
  | "common.basedIn"
  | "common.languages"
  | "common.placeholder"
  | "common.imagePending"
  | "contact.title"
  | "contact.lede"
  | "contact.responseNote"
  | "about.title"
  | "footer.rights"
  | "footer.builtWith"
  | "notFound.title"
  | "notFound.body"
  | "notFound.cta";

export const ui: Record<Locale, Record<UIKey, string>> = {
  en: {
    "nav.work": "Work",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.divisions": "Areas",
    "hub.chooseArea": "Choose the area you came for",
    "hub.allAreas": "Four areas. One person accountable for all of them.",
    "common.selectedWork": "Selected work",
    "common.capabilities": "What I do",
    "common.tools": "Tools",
    "common.deliverables": "Deliverables",
    "common.howIWork": "How it runs",
    "common.engagement": "Engagement",
    "common.viewArea": "Open",
    "common.backToAreas": "All areas",
    "common.getInTouch": "Start a project",
    "common.email": "Email",
    "common.whatsapp": "WhatsApp",
    "common.basedIn": "Based in",
    "common.languages": "Languages",
    "common.placeholder": "Placeholder",
    "common.imagePending": "Image pending",
    "contact.title": "Start a project",
    "contact.lede":
      "Tell me the deadline, the deliverable and the constraints. If it is a stand, the show date and the space dimensions are enough to begin.",
    "contact.responseNote": "I reply within one working day.",
    "about.title": "About",
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Next.js",
    "notFound.title": "That page does not exist",
    "notFound.body": "The link may be out of date, or the area may have moved.",
    "notFound.cta": "Go to all areas",
  },
  pt: {
    "nav.work": "Trabalhos",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.divisions": "Áreas",
    "hub.chooseArea": "Escolha a área que você veio buscar",
    "hub.allAreas": "Quatro áreas. Uma pessoa responsável por todas elas.",
    "common.selectedWork": "Trabalhos selecionados",
    "common.capabilities": "O que eu faço",
    "common.tools": "Ferramentas",
    "common.deliverables": "Entregáveis",
    "common.howIWork": "Como funciona",
    "common.engagement": "Contratação",
    "common.viewArea": "Abrir",
    "common.backToAreas": "Todas as áreas",
    "common.getInTouch": "Começar um projeto",
    "common.email": "E-mail",
    "common.whatsapp": "WhatsApp",
    "common.basedIn": "Base",
    "common.languages": "Idiomas",
    "common.placeholder": "Placeholder",
    "common.imagePending": "Imagem pendente",
    "contact.title": "Começar um projeto",
    "contact.lede":
      "Me diga o prazo, o entregável e as restrições. Se for stand, a data da feira e as dimensões do espaço já bastam para começar.",
    "contact.responseNote": "Respondo em até um dia útil.",
    "about.title": "Sobre",
    "footer.rights": "Todos os direitos reservados.",
    "footer.builtWith": "Feito com Next.js",
    "notFound.title": "Essa página não existe",
    "notFound.body": "O link pode estar desatualizado, ou a área pode ter mudado de lugar.",
    "notFound.cta": "Ver todas as áreas",
  },
};

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
}
