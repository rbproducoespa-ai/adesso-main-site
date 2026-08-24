import type { Metadata } from "next";
import { site } from "@/content/site";
import { HTML_LANG, localePath, type Locale } from "./i18n";

/**
 * Builds metadata with canonical and hreflang alternates for both languages,
 * so the Portuguese pages are indexed as translations rather than duplicates.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  noindex = false,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const canonical = new URL(localePath(locale, path), site.url).toString();

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: noindex
      ? { canonical }
      : {
          canonical,
          languages: {
            [HTML_LANG.en]: new URL(localePath("en", path), site.url).toString(),
            [HTML_LANG.pt]: new URL(localePath("pt", path), site.url).toString(),
            "x-default": new URL(localePath("en", path), site.url).toString(),
          },
        },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: HTML_LANG[locale].replace("-", "_"),
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Person schema for the hub. Helps search engines connect the name to the
 * job titles, which is the whole point of a searchable headline.
 */
export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: [
      "Exhibition Designer",
      "3D Designer",
      "Technical Designer",
      "AI Automation Specialist",
      "Audio Engineer",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    knowsLanguage: ["pt", "en", "es"],
    knowsAbout: [
      "Exhibition stand design",
      "beMatrix",
      "LEDskin",
      "SketchUp",
      "AutoCAD",
      "Autodesk Inventor",
      "Twinmotion",
      "Technical drawing",
      "Large format print",
      "Next.js",
      "Workflow automation",
      "n8n",
      "Live sound engineering",
    ],
    inLanguage: HTML_LANG[locale],
  };
}
