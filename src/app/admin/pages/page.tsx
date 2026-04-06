import Link from "next/link";

interface SitePage {
  path: string;
  label: string;
  slug: string;
  section: string;
  status: "published" | "draft";
  hasEditor: boolean;
  editorSection?: string;
}

const SITE_PAGES: SitePage[] = [
  // Main site pages
  { path: "/",           label: "Home",            slug: "home",     section: "Main",       status: "published", hasEditor: true,  editorSection: "home" },
  { path: "/about",      label: "About",           slug: "about",    section: "Main",       status: "published", hasEditor: true,  editorSection: "about" },
  { path: "/services",   label: "Services",        slug: "services", section: "Main",       status: "published", hasEditor: true,  editorSection: "services" },
  { path: "/divisions",  label: "Divisions",       slug: "divisions",section: "Main",       status: "published", hasEditor: true,  editorSection: "divisions" },
  { path: "/products",   label: "Products",        slug: "products", section: "Main",       status: "published", hasEditor: true,  editorSection: "products" },
  { path: "/contact",    label: "Contact",         slug: "contact",  section: "Main",       status: "published", hasEditor: true,  editorSection: "contact" },
  // Auth
  { path: "/auth/login", label: "Login",           slug: "login",    section: "Auth",       status: "published", hasEditor: false },
  // Account
  { path: "/account",    label: "Account",         slug: "account",  section: "Account",    status: "published", hasEditor: false },
  { path: "/checkout",   label: "Checkout",        slug: "checkout", section: "Account",    status: "published", hasEditor: false },
  // Admin
  { path: "/admin",      label: "Admin Dashboard", slug: "admin",    section: "Admin",      status: "published", hasEditor: false },
  { path: "/admin/editor",label: "Site Editor",    slug: "editor",   section: "Admin",      status: "published", hasEditor: false },
];

const SECTIONS = [...new Set(SITE_PAGES.map(p => p.section))];

function Badge({ status }: { status: string }) {
  const colors: Record<string, [string, string]> = {
    published: ["#3D7A4E", "rgba(61,122,78,0.12)"],
    draft:     ["#0066FF", "rgba(140,115,85,0.12)"],
  };
  const [fg, bg] = colors[status] ?? ["#555", "#1A1A1A"];
  return (
    <span style={{
      fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: fg, background: bg,
      padding: "2px 7px", borderRadius: "10px",
    }}>
      {status}
    </span>
  );
}

export const metadata = { title: "Pages — ADESSO Admin" };

export default function PagesManagerPage() {
  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>
            Admin › Pages
          </p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Pages Manager</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>
            {SITE_PAGES.length} pages across {SECTIONS.length} sections
          </p>
        </div>
        <Link
          href="/admin/editor"
          style={{
            background: "#0066FF", color: "#fff",
            padding: "9px 18px", fontSize: "11px",
            fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.12em", textTransform: "uppercase",
            borderRadius: "2px",
          }}
        >
          ✏ Open Editor
        </Link>
      </div>

      {/* Groups */}
      {SECTIONS.map((section) => {
        const pages = SITE_PAGES.filter(p => p.section === section);
        return (
          <div key={section} style={{ marginBottom: "24px" }}>
            <p style={{
              color: "#333", fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              margin: "0 0 8px",
            }}>
              {section}
            </p>
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Page", "URL", "Status", "Actions"].map((h, i) => (
                      <th key={h} style={{
                        padding: "10px 16px", textAlign: "left",
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                        textTransform: "uppercase", color: "#333",
                        borderBottom: "1px solid #1A1A1A",
                        width: i === 3 ? "200px" : undefined,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pages.map((p) => (
                    <tr key={p.path} style={{ borderBottom: "1px solid #181818" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: 0 }}>{p.label}</p>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <code style={{ color: "#555", fontSize: "11px", background: "#0D0D0D", padding: "2px 6px", borderRadius: "2px" }}>
                          {p.path}
                        </code>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <Badge status={p.status} />
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <a
                            href={p.path}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "#555", fontSize: "10px", textDecoration: "none",
                              padding: "4px 10px", background: "#1A1A1A",
                              borderRadius: "2px", border: "1px solid #252525",
                            }}
                          >
                            ↗ View
                          </a>
                          {p.hasEditor && (
                            <Link
                              href={`/admin/editor?page=${p.editorSection ?? p.slug}`}
                              style={{
                                color: "#0066FF", fontSize: "10px", textDecoration: "none",
                                padding: "4px 10px", background: "rgba(140,115,85,0.1)",
                                borderRadius: "2px", border: "1px solid rgba(140,115,85,0.2)",
                              }}
                            >
                              ✏ Edit
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Info */}
      <div style={{
        background: "#141414", border: "1px solid #1E1E1E",
        borderRadius: "4px", padding: "16px 20px",
        display: "flex", gap: "12px", alignItems: "flex-start",
      }}>
        <span style={{ fontSize: "16px", flexShrink: 0 }}>ℹ</span>
        <div>
          <p style={{ color: "#777", fontSize: "12px", margin: "0 0 4px", fontWeight: 600 }}>
            Dynamic Page Management
          </p>
          <p style={{ color: "#444", fontSize: "11px", margin: 0, lineHeight: 1.6 }}>
            Pages are managed through the Next.js App Router. To add new pages, create files in the <code style={{ color: "#0066FF" }}>src/app/</code> directory.
            Use the Site Editor to modify text and images on existing pages.
          </p>
        </div>
      </div>

    </div>
  );
}
