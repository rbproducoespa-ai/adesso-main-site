import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { createAdminSupabase } from "@/lib/supabase-admin";
import { Resend } from "resend";



function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length === 0) return true; // dev mode — allow all authenticated users
  return allowed.includes(email.toLowerCase());
}

export async function POST(req: NextRequest) {
  // Verify session + admin role
  const authSupabase = await createServerSupabase();
  const { data: { user } } = await authSupabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await req.json();

  // Use service role to bypass RLS for order update
  const supabase = createAdminSupabase();
  const { data: order } = await supabase
    .from("orders")
    .update({ status: "delivered", delivered_at: new Date().toISOString() })
    .eq("id", orderId)
    .select("*, order_files(*)")
    .single();

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adesso.digital";

  // Send delivery email to customer
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "ADESSO Digital <hello@adesso.digital>",
      to: order.customer_email,
      subject: `Your data is ready — ${order.product_name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111111;">
          <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #8C7355; margin-bottom: 24px;">ADESSO DIGITAL</p>
          <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 16px;">Your data is ready to download.</h1>
          <p style="font-size: 15px; color: #5C5C5C; line-height: 1.6; margin-bottom: 24px;">
            Your order for <strong>${order.product_name}</strong> has been processed and verified.
            Your data file is now available in your client area.
          </p>
          <a href="${siteUrl}/account/orders/${orderId}"
             style="display: inline-block; background: #111111; color: white; padding: 14px 28px; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
            Download Your Data →
          </a>
          <p style="font-size: 13px; color: #8B8B8B; margin-top: 32px;">
            If you have any questions, reply to this email or contact hello@adesso.digital
          </p>
          <hr style="border: none; border-top: 1px solid #E2DFDA; margin: 32px 0;" />
          <p style="font-size: 11px; color: #B0B0B0;">ADESSO Digital · London, United Kingdom</p>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error("[Deliver] Email send failed:", emailErr);
    // Don't fail the request — order is already marked delivered
  }

  return NextResponse.json({ success: true });
}
