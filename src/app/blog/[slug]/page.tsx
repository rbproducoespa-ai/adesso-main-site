import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase-server";
import type { Metadata } from "next";

export const revalidate = 60;

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, seo_title, seo_description, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Post Not Found" };

  return {
    title: data.seo_title ?? `${data.title} — ADESSO Digital`,
    description: data.seo_description ?? data.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const supabase = await createServerSupabase();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const date = new Date(post.published_at ?? post.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <main style={{ background: "#0D0D0D", minHeight: "100vh", padding: "80px 0" }}>

      {/* Cover Image */}
      {post.cover_image && (
        <div style={{
          width: "100%", height: "340px",
          background: `url(${post.cover_image}) center/cover no-repeat`,
          marginBottom: "0",
        }} />
      )}

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", margin: "40px 0 32px" }}>
          <Link href="/blog" style={{ color: "#555", fontSize: "11px", textDecoration: "none" }}>Blog</Link>
          <span style={{ color: "#333", fontSize: "11px" }}>›</span>
          {post.category && (
            <>
              <span style={{ color: "#8C7355", fontSize: "11px" }}>{post.category}</span>
              <span style={{ color: "#333", fontSize: "11px" }}>›</span>
            </>
          )}
          <span style={{ color: "#333", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "260px" }}>
            {post.title}
          </span>
        </div>

        {/* Category */}
        {post.category && (
          <span style={{
            display: "inline-block", fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#8C7355", background: "rgba(140,115,85,0.12)",
            padding: "3px 10px", borderRadius: "8px", marginBottom: "16px",
          }}>
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 style={{
          color: "#fff", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700,
          margin: "0 0 20px", lineHeight: 1.15, letterSpacing: "-0.02em",
        }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "36px", paddingBottom: "24px", borderBottom: "1px solid #1E1E1E" }}>
          {post.author && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: "#8C7355", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff",
              }}>
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: "#777", fontSize: "12px" }}>{post.author}</span>
            </div>
          )}
          <span style={{ color: "#444", fontSize: "12px" }}>{date}</span>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{
            color: "#888", fontSize: "17px", lineHeight: 1.8,
            margin: "0 0 32px", fontStyle: "italic",
            borderLeft: "3px solid #8C7355", paddingLeft: "20px",
          }}>
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        {post.content ? (
          <div
            style={{
              color: "#aaa", fontSize: "15px", lineHeight: 1.85,
            }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
          />
        ) : (
          <p style={{ color: "#444", fontSize: "14px" }}>No content yet.</p>
        )}

        {/* Footer */}
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid #1E1E1E", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link
            href="/blog"
            style={{
              color: "#8C7355", fontSize: "12px", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            ← Back to Blog
          </Link>
          <Link
            href="/contact"
            style={{
              background: "#8C7355", color: "#fff", padding: "10px 20px",
              fontSize: "11px", fontWeight: 700, textDecoration: "none",
              letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
