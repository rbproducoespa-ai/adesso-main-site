import { redirect, notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: order } = await supabase
    .from("orders")
    .select("*, order_files(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!order) notFound();

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-2xl">
          <span className="eyebrow">Order #{order.id.slice(0, 8)}</span>
          <h1 className="headline-display mb-2">{order.product_name}</h1>
          <p className="body-sm text-[#8B8B8B]">Purchased {new Date(order.created_at).toLocaleDateString("en-GB")} · £{(order.amount_pence / 100).toFixed(2)}</p>
        </div>
      </section>

      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl max-w-2xl">
          {order.status === "delivered" && order.order_files?.length > 0 ? (
            <div className="bg-white border border-[#E2DFDA] p-8">
              <h2 className="headline-md mb-6">Your files</h2>
              <div className="space-y-3">
                {order.order_files.map((f: Record<string, string>) => (
                  <a key={f.id} href={f.file_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between border border-[#E2DFDA] px-5 py-4 hover:border-[#8C7355] transition-colors group">
                    <span className="font-medium text-[#111111] text-[14px]">{f.file_name ?? "Download file"}</span>
                    <span className="text-[12px] text-[#8C7355] font-semibold group-hover:underline">Download →</span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E2DFDA] p-8 text-center">
              <span className={"text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 mb-4 inline-block " +
                (order.status === "paid" ? "bg-[#8C7355] text-white" : "bg-[#E2DFDA] text-[#5C5C5C]")}>
                {order.status}
              </span>
              <p className="headline-md mb-2">Your data is being prepared.</p>
              <p className="body-sm">Our team is compiling your database. You will receive an email when it is ready to download. This typically takes up to 48 hours.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
