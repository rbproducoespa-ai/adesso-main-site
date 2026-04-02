import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function OrdersPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl">
          <span className="eyebrow">Client Area</span>
          <h1 className="headline-display">My Orders</h1>
        </div>
      </section>

      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          {!orders || orders.length === 0 ? (
            <div className="bg-white border border-[#E2DFDA] p-12 text-center">
              <p className="body-sm text-[#8B8B8B] mb-4">No orders yet.</p>
              <Link href="https://leads.adesso.digital/products" className="btn-primary">Browse Products</Link>
            </div>
          ) : (
            <div className="bg-white border border-[#E2DFDA]">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#E2DFDA] bg-[#F5F4F1]">
                <span className="col-span-4 text-[10px] font-semibold uppercase tracking-wider text-[#8B8B8B]">Product</span>
                <span className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#8B8B8B]">Amount</span>
                <span className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#8B8B8B]">Date</span>
                <span className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#8B8B8B]">Status</span>
                <span className="col-span-2 text-[10px] font-semibold uppercase tracking-wider text-[#8B8B8B]">Action</span>
              </div>
              {orders.map((o: Record<string, string>) => (
                <div key={o.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E2DFDA] last:border-b-0 items-center">
                  <div className="col-span-4">
                    <p className="font-semibold text-[#111111] text-[14px]">{o.product_name}</p>
                    <p className="text-[11px] text-[#8B8B8B]">#{o.id.slice(0, 8)}</p>
                  </div>
                  <p className="col-span-2 font-semibold text-[#111111]">£{(Number(o.amount_pence) / 100).toFixed(2)}</p>
                  <p className="col-span-2 text-[13px] text-[#5C5C5C]">{new Date(o.created_at).toLocaleDateString("en-GB")}</p>
                  <div className="col-span-2">
                    <span className={"text-[10px] font-semibold tracking-wider uppercase px-2 py-1 " +
                      (o.status === "delivered" ? "bg-[#111111] text-white" :
                       o.status === "paid" ? "bg-[#8C7355] text-white" :
                       "bg-[#E2DFDA] text-[#5C5C5C]")}>
                      {o.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    {o.status === "delivered" ? (
                      <Link href={`/account/orders/${o.id}`} className="text-[12px] font-semibold text-[#8C7355] hover:underline">
                        Download →
                      </Link>
                    ) : (
                      <span className="text-[12px] text-[#8B8B8B]">Processing</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
