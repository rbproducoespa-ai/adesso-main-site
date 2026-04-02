import { createAdminSupabase } from "@/lib/supabase-admin";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://adesso.digital").replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/divisions`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/products`,lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/blog`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
  ];

  try {
    const supabase = createAdminSupabase();
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published");

    const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.published_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
