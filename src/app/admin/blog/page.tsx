import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";

export const metadata = { title: "Blog — ADESSO Admin" };

interface BlogPost {
  id: string;
  title?: string;
  slug?: string;
  status?: string;
  category?: string;
  author?: string;
  excerpt?: string;
  published_at?: string;
  created_at?: string;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  return `${d}d ago`;
}

export default async function BlogManagerPage() {
  const supabase = createAdminSupabase();

  let posts: BlogPost[] = [];
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (data) posts = data;

  const publishedCount = posts.filter(p => p.status === "published").length;
  const draftCount     = posts.filter(p => p.status === "draft").length;

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Blog</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Blog Manager</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>{posts.length} posts total</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href="/admin/database"
            style={{
              background: "#141414", color: "#777", padding: "9px 16px",
              fontSize: "11px", textDecoration: "none", borderRadius: "2px",
              border: "1px solid #252525",
            }}
          >
            ⬡ Manage Tables
          </Link>
          <Link
            href="/admin/blog/new"
            style={{
              background: "#8C7355", color: "#fff", padding: "9px 18px",
              fontSize: "11px", fontWeight: 700, textDecoration: "none",
              letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
            }}
          >
            + New Post
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Posts",  value: posts.length,   color: "#8C7355" },
          { label: "Published",    value: publishedCount, color: "#3D7A4E" },
          { label: "Drafts",       value: draftCount,     color: "#555"    },
        ].map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "28px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div style={{
          background: "#141414", border: "2px dashed #252525",
          borderRadius: "4px", padding: "60px 40px", textAlign: "center",
        }}>
          <p style={{ fontSize: "32px", margin: "0 0 16px", opacity: 0.3 }}>≡</p>
          <p style={{ color: "#777", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>No blog posts yet</p>
          <p style={{ color: "#444", fontSize: "12px", margin: "0 0 24px", maxWidth: "360px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Create your first post to start building organic traffic and establishing industry authority.
          </p>
          <Link
            href="/admin/blog/new"
            style={{
              background: "#8C7355", color: "#fff", padding: "9px 20px",
              fontSize: "11px", textDecoration: "none", borderRadius: "2px",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            }}
          >
            + Create First Post
          </Link>
        </div>
      ) : (
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Title", "Category", "Author", "Status", "Date", "Actions"].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#333",
                    borderBottom: "1px solid #1A1A1A",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #181818" }}>
                  <td style={{ padding: "12px 16px", maxWidth: "280px" }}>
                    <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.title ?? "Untitled"}
                    </p>
                    {p.slug && <code style={{ color: "#444", fontSize: "10px" }}>/blog/{p.slug}</code>}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "#8C7355",
                      background: "rgba(140,115,85,0.1)", padding: "2px 7px", borderRadius: "10px",
                    }}>
                      {p.category ?? "general"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#555", fontSize: "11px" }}>{p.author ?? "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: p.status === "published" ? "#3D7A4E" : "#555",
                      background: p.status === "published" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                      padding: "2px 7px", borderRadius: "10px",
                    }}>
                      {p.status ?? "draft"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#444", fontSize: "10px" }}>
                    {p.published_at ? timeAgo(p.published_at) : p.created_at ? timeAgo(p.created_at) : "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link
                        href={`/admin/blog/${p.id}/edit`}
                        style={{
                          color: "#8C7355", fontSize: "10px",
                          padding: "4px 10px", background: "rgba(140,115,85,0.1)",
                          borderRadius: "2px", border: "1px solid rgba(140,115,85,0.2)",
                          textDecoration: "none",
                        }}
                      >
                        Edit
                      </Link>
                      {p.slug && (
                        <a
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#555", fontSize: "10px",
                            padding: "4px 10px", background: "#1A1A1A",
                            borderRadius: "2px", border: "1px solid #252525",
                            textDecoration: "none",
                          }}
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
