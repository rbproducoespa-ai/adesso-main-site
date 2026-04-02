import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase-server";

export const metadata = { title: "Blog — ADESSO Digital", description: "Insights on exhibition design, automation and B2B lead generation from the ADESSO Digital team." };

export const revalidate = 60;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  author: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

export default async function BlogPage() {
  const supabase = await createServerSupabase();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, category, author, cover_image, published_at, created_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const allPosts: BlogPost[] = posts ?? [];

  return (
    <main style={{ background: "#0D0D0D", minHeight: "100vh", padding: "80px 0" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{ color: "#8C7355", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 12px" }}>
            ADESSO Digital · Journal
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Insights & Ideas
          </h1>
          <p style={{ color: "#666", fontSize: "16px", margin: 0, maxWidth: "520px", lineHeight: 1.7 }}>
            Strategy, design and technology for exhibitors, automators and modern B2B brands.
          </p>
        </div>

        {allPosts.length === 0 ? (
          <div style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "60px 40px", textAlign: "center",
          }}>
            <p style={{ color: "#555", fontSize: "14px", margin: "0 0 8px" }}>No posts published yet.</p>
            <p style={{ color: "#333", fontSize: "12px", margin: 0 }}>Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {allPosts[0] && (
              <Link href={`/blog/${allPosts[0].slug}`} style={{ textDecoration: "none", display: "block", marginBottom: "40px" }}>
                <div style={{
                  background: "#141414", border: "1px solid #1E1E1E",
                  borderRadius: "4px", overflow: "hidden",
                  transition: "border-color 0.2s",
                  display: "grid", gridTemplateColumns: allPosts[0].cover_image ? "1fr 1fr" : "1fr",
                }}>
                  {allPosts[0].cover_image && (
                    <div style={{
                      background: `url(${allPosts[0].cover_image}) center/cover no-repeat`,
                      minHeight: "280px",
                    }} />
                  )}
                  <div style={{ padding: "36px 40px" }}>
                    {allPosts[0].category && (
                      <span style={{
                        display: "inline-block", fontSize: "9px", fontWeight: 700,
                        letterSpacing: "0.16em", textTransform: "uppercase",
                        color: "#8C7355", background: "rgba(140,115,85,0.12)",
                        padding: "3px 10px", borderRadius: "8px", marginBottom: "16px",
                      }}>
                        {allPosts[0].category}
                      </span>
                    )}
                    <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.3 }}>
                      {allPosts[0].title}
                    </h2>
                    {allPosts[0].excerpt && (
                      <p style={{ color: "#666", fontSize: "14px", margin: "0 0 20px", lineHeight: 1.7 }}>
                        {allPosts[0].excerpt}
                      </p>
                    )}
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      {allPosts[0].author && (
                        <span style={{ color: "#555", fontSize: "11px" }}>{allPosts[0].author}</span>
                      )}
                      <span style={{ color: "#333", fontSize: "11px" }}>
                        {new Date(allPosts[0].published_at ?? allPosts[0].created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Post Grid */}
            {allPosts.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {allPosts.slice(1).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: "#141414", border: "1px solid #1E1E1E",
                      borderRadius: "4px", overflow: "hidden", height: "100%",
                    }}>
                      {post.cover_image && (
                        <div style={{
                          height: "160px",
                          background: `url(${post.cover_image}) center/cover no-repeat`,
                        }} />
                      )}
                      <div style={{ padding: "20px 22px" }}>
                        {post.category && (
                          <span style={{
                            display: "inline-block", fontSize: "9px", fontWeight: 700,
                            letterSpacing: "0.14em", textTransform: "uppercase",
                            color: "#8C7355", marginBottom: "10px",
                          }}>
                            {post.category}
                          </span>
                        )}
                        <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p style={{ color: "#555", fontSize: "12px", margin: "0 0 16px", lineHeight: 1.6,
                            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {post.excerpt}
                          </p>
                        )}
                        <span style={{ color: "#444", fontSize: "10px" }}>
                          {new Date(post.published_at ?? post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
