import { redirect } from "next/navigation";

import { NetworkShell } from "./_components/NetworkShell";

export const metadata = {
  title: "AI Creator Network OS",
  description: "Data-driven AI creator network: discovery, content intelligence and monetisation.",
  robots: { index: false, follow: false },
};

export default async function NetworkLayout({ children }: { children: React.ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabase = supabaseUrl && !supabaseUrl.includes("YOUR_PROJECT_ID");

  let userEmail = "dev@local";

  if (hasSupabase) {
    const { createServerSupabase } = await import("@/lib/supabase-server");
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login?next=/network");
    userEmail = user.email ?? "operator";
  }

  return <NetworkShell userEmail={userEmail}>{children}</NetworkShell>;
}
