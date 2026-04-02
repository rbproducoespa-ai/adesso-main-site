import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";

export const metadata = { title: "Media Manager — ADESSO Admin" };

export default async function MediaManagerPage() {
  const supabase = createAdminSupabase();

  // Try to list files from Supabase storage bucket
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let files: any[] = [];
  let storageError = false;

  try {
    const { data, error } = await supabase.storage.from("site-assets").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) storageError = true;
    else files = data ?? [];
  } catch {
    storageError = true;
  }

  function formatSize(bytes?: number) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }

  function isImage(name: string) {
    return /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(name);
  }

  const imageFiles = files.filter(f => isImage(f.name));
  const otherFiles = files.filter(f => !isImage(f.name));

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Media</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Media Manager</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>
            Supabase Storage bucket: <code style={{ color: "#8C7355" }}>site-assets</code>
          </p>
        </div>
        <Link
          href="/admin/editor"
          style={{
            background: "#8C7355", color: "#fff", padding: "9px 18px",
            fontSize: "11px", fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
          }}
        >
          ↑ Upload via Editor
        </Link>
      </div>

      {storageError ? (
        /* Storage not yet set up */
        <div style={{
          background: "#141414", border: "1px solid #252525",
          borderRadius: "4px", padding: "40px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "32px", margin: "0 0 12px" }}>◈</p>
          <p style={{ color: "#777", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>
            Storage bucket not configured
          </p>
          <p style={{ color: "#444", fontSize: "12px", margin: "0 0 20px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Run the SQL migration in Supabase to create the <code style={{ color: "#8C7355" }}>site-assets</code> bucket,
            or upload images directly via the Site Editor.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#1A1A1A", color: "#777", padding: "8px 16px",
                fontSize: "11px", textDecoration: "none", borderRadius: "2px",
                border: "1px solid #252525",
              }}
            >
              Open Supabase →
            </a>
            <Link
              href="/admin/editor"
              style={{
                background: "#8C7355", color: "#fff", padding: "8px 16px",
                fontSize: "11px", textDecoration: "none", borderRadius: "2px",
              }}
            >
              Use Site Editor
            </Link>
          </div>
        </div>
      ) : files.length === 0 ? (
        /* Empty state */
        <div style={{
          background: "#141414", border: "2px dashed #252525",
          borderRadius: "4px", padding: "60px 40px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "40px", margin: "0 0 16px", opacity: 0.3 }}>↑</p>
          <p style={{ color: "#777", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>No files uploaded yet</p>
          <p style={{ color: "#444", fontSize: "12px", margin: "0 0 20px" }}>
            Upload images via the Site Editor when editing image fields.
          </p>
          <Link
            href="/admin/editor"
            style={{
              background: "#8C7355", color: "#fff", padding: "9px 20px",
              fontSize: "11px", textDecoration: "none", borderRadius: "2px",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            }}
          >
            ↑ Upload via Editor
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total Files",  value: files.length },
              { label: "Images",       value: imageFiles.length },
              { label: "Other Files",  value: otherFiles.length },
            ].map(s => (
              <div key={s.label} style={{
                background: "#141414", border: "1px solid #1E1E1E",
                borderRadius: "4px", padding: "16px 20px",
              }}>
                <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px" }}>{s.label}</p>
                <p style={{ color: "#8C7355", fontSize: "24px", fontWeight: 700, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Images Grid */}
          {imageFiles.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
                Images
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
                {imageFiles.map((f) => {
                  const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(f.name);
                  return (
                    <div key={f.id ?? f.name ?? Math.random()} style={{
                      background: "#141414", border: "1px solid #1E1E1E",
                      borderRadius: "4px", overflow: "hidden",
                    }}>
                      <div style={{ aspectRatio: "16/10", background: "#111", overflow: "hidden" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={urlData.publicUrl}
                          alt={f.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </div>
                      <div style={{ padding: "8px 10px" }}>
                        <p style={{ color: "#888", fontSize: "10px", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {f.name}
                        </p>
                        <p style={{ color: "#444", fontSize: "9px", margin: 0 }}>{formatSize(f.metadata?.size)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Files */}
          {otherFiles.length > 0 && (
            <div>
              <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
                Other Files
              </p>
              <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
                {otherFiles.map((f, i) => (
                  <div key={f.id ?? f.name ?? Math.random()} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 16px",
                    borderBottom: i < otherFiles.length - 1 ? "1px solid #1A1A1A" : "none",
                  }}>
                    <span style={{ fontSize: "16px", opacity: 0.4 }}>◈</span>
                    <span style={{ color: "#888", fontSize: "12px", flex: 1 }}>{f.name}</span>
                    <span style={{ color: "#444", fontSize: "10px" }}>{formatSize(f.metadata?.size)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
