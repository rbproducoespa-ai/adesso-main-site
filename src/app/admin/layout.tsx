import { redirect } from "next/navigation";
import { AdminShell } from "./_components/AdminShell";

export const metadata = { title: "Admin Studio — Adesso" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabase = supabaseUrl && !supabaseUrl.includes("YOUR_PROJECT_ID");

  let userEmail = "dev@local";

  if (hasSupabase) {
    // Only check auth when Supabase is configured
    const { createServerSupabase } = await import("@/lib/supabase-server");
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login?next=/admin");
    userEmail = user.email ?? "admin";
  }

  return <AdminShell userEmail={userEmail}>{children}</AdminShell>;
}
