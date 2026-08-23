/**
 * Access control for the OS API routes.
 *
 * Mirrors the gate in src/middleware.ts: a signed-in Supabase user whose email
 * is in ADMIN_EMAILS. Middleware protects the pages; this protects the routes,
 * because a route handler is reachable directly and must never rely on the page
 * gate having run.
 *
 * Server-side only.
 */

import { createServerSupabase } from "@/lib/supabase-server";

export interface NetworkUser {
  id: string;
  email: string | null;
}

function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  // No allowlist configured means local development, same as middleware.
  if (allowed.length === 0) return true;
  return allowed.includes(email.toLowerCase());
}

/**
 * Returns the operator, or null when the caller may not write.
 *
 * When Supabase is unconfigured there is no session to check and no database to
 * write to, so this denies rather than waving the caller through — read paths
 * degrade to demo data, write paths simply refuse.
 */
export async function getNetworkUser(): Promise<NetworkUser | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.includes("YOUR_PROJECT_ID")) return null;

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) return null;
  return { id: user.id, email: user.email ?? null };
}
