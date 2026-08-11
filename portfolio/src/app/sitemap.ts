import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publicDivisions } from "@/content/divisions";
import { LOCALES, localePath } from "@/lib/i18n";

/**
 * Hidden divisions are deliberately absent — the trade-services page is
 * reachable by direct link only, and is served with noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...publicDivisions.map((d) => d.slug), "about", "contact"];
  const now = new Date();

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: new URL(localePath(locale, path), site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );
}
