import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { divisions } from "@/content/divisions";
import { LOCALES, localePath } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  const hidden = divisions
    .filter((d) => d.hidden)
    .flatMap((d) => LOCALES.map((locale) => localePath(locale, d.slug)));

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: hidden,
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
