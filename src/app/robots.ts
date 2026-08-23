import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://adesso.digital").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/network/", "/api/", "/auth/", "/account/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
