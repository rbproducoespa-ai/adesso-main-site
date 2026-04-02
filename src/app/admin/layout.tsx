import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import { AdminShell } from "./_components/AdminShell";

export const metadata = { title: "Admin Studio — ADESSO Digital" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?next=/admin");

  return <AdminShell userEmail={user.email ?? ""}>{children}</AdminShell>;
}
