import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase-server";
import { URLS } from "@/lib/urls";

const sidebarLinks = [
  { label: "Overview", href: "/account" },
  { label: "Submit a Brief", href: "/account/new-project" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Downloads", href: "/account/orders" },
  { label: "Profile", href: "/account/profile" },
];

export default async function AccountPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const name = user.user_metadata?.full_name ?? user.email?.split("@")[0];

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="eyebrow">Client Area</span>
              <h1 className="headline-display">Welcome, {name}.</h1>
            </div>
            <form action="/auth/signout" method="post">
              <button className="text-[12px] text-[#8B8B8B] hover:text-[#111111] transition-colors mt-6">Sign out →</button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-1">
              {sidebarLinks.map((l) => (
                <Link key={l.label} href={l.href}
                  className="flex items-center justify-between px-4 py-3 text-[13px] font-medium text-[#5C5C5C] hover:text-[#111111] hover:bg-white border border-transparent hover:border-[#E2DFDA] transition-all">
                  {l.label}
                  <span className="text-[#E2DFDA]">→</span>
                </Link>
              ))}
            </div>

            {/* Main */}
            <div className="lg:col-span-9">
              <div className="bg-white border border-[#E2DFDA] p-8 mb-6">
                <h2 className="headline-md mb-6">Recent Orders</h2>
                {!orders || orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="body-sm text-[#8B8B8B] mb-6">No orders yet.</p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/account/new-project" className="btn-primary">Submit a Brief</Link>
                      <a href={`${URLS.leads}/products`} target="_blank" rel="noopener noreferrer" className="btn-outline">Browse Products</a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o: Record<string, string>) => (
                      <div key={o.id} className="flex items-center justify-between py-3 border-b border-[#E2DFDA] last:border-b-0">
                        <div>
                          <p className="font-semibold text-[#111111] text-[14px]">{o.product_name}</p>
                          <p className="text-[11px] text-[#8B8B8B]">{new Date(o.created_at).toLocaleDateString("en-GB")}</p>
                        </div>
                        <div className="text-right">
                          <span className={"text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 " +
                            (o.status === "delivered" ? "bg-[#111111] text-white" :
                             o.status === "paid" ? "bg-[#8C7355] text-white" :
                             "bg-[#E2DFDA] text-[#5C5C5C]")}>
                            {o.status}
                          </span>
                          {o.status === "delivered" && (
                            <Link href={`/account/orders/${o.id}`} className="block text-[11px] text-[#8C7355] mt-1 hover:underline">
                              Download →
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                    <Link href="/account/orders" className="text-[12px] text-[#8C7355] hover:underline block pt-2">
                      View all orders →
                    </Link>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Orders", value: orders?.length ?? 0 },
                  { label: "Delivered", value: orders?.filter((o: Record<string, string>) => o.status === "delivered").length ?? 0 },
                  { label: "Pending", value: orders?.filter((o: Record<string, string>) => o.status === "paid").length ?? 0 },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-[#E2DFDA] p-5">
                    <p className="text-2xl font-bold text-[#111111]">{s.value}</p>
                    <p className="text-[11px] text-[#8B8B8B] uppercase tracking-wide mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
