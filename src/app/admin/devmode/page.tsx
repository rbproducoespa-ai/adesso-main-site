export const metadata = { title: "Developer Mode — ADESSO Admin" };

const ENV_VARS = [
  { key: "NEXT_PUBLIC_SUPABASE_URL",        required: true,  desc: "Supabase project URL" },
  { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",   required: true,  desc: "Supabase anonymous key" },
  { key: "NEXT_PUBLIC_SITE_URL",            required: true,  desc: "Main site public URL" },
  { key: "NEXT_PUBLIC_EXHIBITION_URL",      required: false, desc: "Exhibition division URL" },
  { key: "NEXT_PUBLIC_AUTOMATION_URL",      required: false, desc: "Automation division URL" },
  { key: "NEXT_PUBLIC_LEADS_URL",           required: false, desc: "Leads division URL" },
  { key: "NEXT_PUBLIC_LAB_URL",             required: false, desc: "Lab division URL" },
  { key: "NEXT_PUBLIC_GA_ID",               required: false, desc: "Google Analytics 4 Measurement ID" },
  { key: "STRIPE_SECRET_KEY",               required: false, desc: "Stripe secret key (server only)" },
  { key: "STRIPE_WEBHOOK_SECRET",           required: false, desc: "Stripe webhook signing secret" },
];

const API_ROUTES = [
  { method: "GET",    path: "/api/content",              desc: "List content overrides for a page" },
  { method: "POST",   path: "/api/content",              desc: "Create/update a content field" },
  { method: "DELETE", path: "/api/content",              desc: "Reset a field to default" },
  { method: "DELETE", path: "/api/content/clear",        desc: "Clear all content overrides" },
  { method: "POST",   path: "/api/content/upload",       desc: "Upload image to site-assets bucket" },
  { method: "GET",    path: "/api/blog",                 desc: "List all blog posts" },
  { method: "POST",   path: "/api/blog",                 desc: "Create a new blog post" },
  { method: "GET",    path: "/api/blog/[id]",            desc: "Get a single blog post" },
  { method: "PATCH",  path: "/api/blog/[id]",            desc: "Update a blog post" },
  { method: "DELETE", path: "/api/blog/[id]",            desc: "Delete a blog post" },
  { method: "PATCH",  path: "/api/contacts/[id]",        desc: "Update contact status/notes" },
  { method: "GET",    path: "/api/settings",             desc: "Load site settings" },
  { method: "POST",   path: "/api/settings",             desc: "Save site settings" },
  { method: "PATCH",  path: "/api/inbox",                desc: "Mark message(s) as read" },
  { method: "POST",   path: "/api/checkout",             desc: "Create Stripe payment session" },
  { method: "POST",   path: "/api/checkout/webhook",     desc: "Handle Stripe webhook events" },
  { method: "GET",    path: "/api/account/orders",       desc: "Get orders for logged-in user" },
];

const CODE_STRUCTURE = [
  { path: "apps/main/",         desc: "Main marketing site (port 3000)" },
  { path: "apps/exhibition/",   desc: "Exhibition division (port 3001)" },
  { path: "apps/automation/",   desc: "Automation division (port 3002)" },
  { path: "apps/leads/",        desc: "Leads division (port 3003)" },
  { path: "apps/lab/",          desc: "Lab division (port 3004)" },
  { path: "packages/ui/",       desc: "Shared UI components" },
  { path: "supabase/",          desc: "Database migrations & SQL" },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "#4A6C8C", POST: "#3D7A4E", DELETE: "#8C3535", PUT: "#6B4C8C", PATCH: "#8C7355",
  };
  return (
    <span style={{
      fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
      color: "#fff", background: colors[method] ?? "#333",
      padding: "2px 7px", borderRadius: "3px", flexShrink: 0,
    }}>
      {method}
    </span>
  );
}

export default function DevModePage() {
  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Dev Mode</p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Developer Mode</h2>
        <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>API routes, environment variables, stack info</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

        {/* API Routes */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>API Routes</p>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
            {API_ROUTES.map((r, i) => (
              <div key={r.path} style={{
                display: "flex", gap: "12px", alignItems: "center",
                padding: "10px 16px",
                borderBottom: i < API_ROUTES.length - 1 ? "1px solid #181818" : "none",
              }}>
                <MethodBadge method={r.method} />
                <code style={{ color: "#8C7355", fontSize: "11px", flex: 1 }}>{r.path}</code>
                <p style={{ color: "#444", fontSize: "10px", margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Env Vars */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>Environment Variables</p>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
            {ENV_VARS.map((v, i) => (
              <div key={v.key} style={{
                padding: "10px 16px",
                borderBottom: i < ENV_VARS.length - 1 ? "1px solid #181818" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                  <code style={{ color: "#8C7355", fontSize: "10px" }}>{v.key}</code>
                  <span style={{
                    fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: v.required ? "#8C3535" : "#444",
                    background: v.required ? "rgba(140,53,53,0.1)" : "#1A1A1A",
                    padding: "1px 5px", borderRadius: "6px",
                  }}>
                    {v.required ? "Required" : "Optional"}
                  </span>
                </div>
                <p style={{ color: "#444", fontSize: "10px", margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stack */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>Tech Stack</p>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px" }}>
            {[
              ["Framework",    "Next.js 15 (App Router)"],
              ["Language",     "TypeScript (strict)"],
              ["Styling",      "Tailwind CSS 3.4"],
              ["Database",     "Supabase (PostgreSQL)"],
              ["Auth",         "Supabase Auth"],
              ["Storage",      "Supabase Storage"],
              ["Monorepo",     "Turborepo"],
              ["Hosting",      "Vercel"],
              ["Payments",     "Stripe"],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "7px 0", borderBottom: "1px solid #1A1A1A",
              }}>
                <span style={{ color: "#555", fontSize: "11px" }}>{label}</span>
                <span style={{ color: "#888", fontSize: "11px", fontFamily: "monospace" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>Monorepo Structure</p>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px" }}>
            {CODE_STRUCTURE.map((s) => (
              <div key={s.path} style={{
                display: "flex", gap: "12px", alignItems: "center",
                padding: "8px 0", borderBottom: "1px solid #1A1A1A",
              }}>
                <code style={{ color: "#8C7355", fontSize: "11px", minWidth: "180px" }}>{s.path}</code>
                <p style={{ color: "#444", fontSize: "10px", margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#141414", color: "#777", padding: "8px 14px",
                fontSize: "10px", textDecoration: "none", borderRadius: "2px",
                border: "1px solid #252525",
              }}
            >
              ↗ GitHub Repo
            </a>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#141414", color: "#777", padding: "8px 14px",
                fontSize: "10px", textDecoration: "none", borderRadius: "2px",
                border: "1px solid #252525",
              }}
            >
              ↗ Vercel Dashboard
            </a>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#141414", color: "#777", padding: "8px 14px",
                fontSize: "10px", textDecoration: "none", borderRadius: "2px",
                border: "1px solid #252525",
              }}
            >
              ↗ Supabase
            </a>
          </div>
        </div>
      </div>

      {/* Quick Commands */}
      <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px 20px" }}>
        <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 12px" }}>Dev Commands</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { cmd: "pnpm dev",                       desc: "Start all apps (turbo)" },
            { cmd: "pnpm --filter main dev",         desc: "Start main app only" },
            { cmd: "pnpm build",                     desc: "Build all apps" },
            { cmd: "pnpm --filter main tsc",         desc: "TypeScript check" },
            { cmd: "supabase db push",               desc: "Push migrations" },
            { cmd: "supabase gen types typescript",  desc: "Generate DB types" },
          ].map(c => (
            <div key={c.cmd} style={{
              background: "#0D0D0D", border: "1px solid #1A1A1A",
              borderRadius: "3px", padding: "10px 14px",
            }}>
              <code style={{ color: "#8C7355", fontSize: "11px", display: "block", marginBottom: "3px" }}>{c.cmd}</code>
              <p style={{ color: "#444", fontSize: "10px", margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
