/**
 * Supabase admin client — uses service role key, bypasses RLS.
 * For server-side use only (API routes, Server Components).
 * NEVER import this in client components.
 *
 * When Supabase env vars are not configured (local dev without .env.local),
 * returns a mock client that resolves all queries to empty data so the
 * admin UI loads gracefully instead of crashing.
 */
import { createClient } from "@supabase/supabase-js";

function isConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url.length > 0 && !url.includes("YOUR_PROJECT_ID");
}

/** Returns a chainable Supabase-shaped object that always resolves to empty data. */
function createMockClient() {
  const empty = Promise.resolve({ data: null, error: null, count: 0 });

  function chain(): any {
    const methods = [
      "select","eq","neq","gt","lt","gte","lte","like","ilike","in","is",
      "contains","containedBy","overlaps","textSearch","filter","match",
      "not","or","and","order","limit","range","single","maybeSingle",
      "insert","upsert","update","delete","head","returns",
    ];
    const b: any = {
      then:    (r: any, e: any) => empty.then(r, e),
      catch:   (e: any) => empty.catch(e),
      finally: (f: any) => empty.finally(f),
    };
    methods.forEach(m => { b[m] = () => b; });
    return b;
  }

  return {
    from:    () => chain(),
    storage: {
      from: () => ({
        list:         () => Promise.resolve({ data: [],   error: null }),
        upload:       () => Promise.resolve({ data: null, error: null }),
        remove:       () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
    rpc: () => chain(),
  } as any;
}

export function createAdminSupabase() {
  if (!isConfigured()) {
    return createMockClient();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    // URL configured but no service role key — use mock to avoid crash
    return createMockClient();
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
