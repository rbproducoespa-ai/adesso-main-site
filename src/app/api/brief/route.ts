import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServerSupabase } from "@/lib/supabase-server";

const serviceLabels: Record<string, string> = {
  stand_design: "Stand Concept Design",
  "3d_visualisation": "3D Visualisation",
  cinematic_renders: "Cinematic Renders",
  full_stand_package: "Full Stand Package",
  event_production: "Event Production & Support",
  automation: "Business Process Automation",
  lead_database: "Lead Database (Custom)",
};

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    const formData = await req.formData();
    const service = formData.get("service") as string;
    const fieldsRaw = formData.get("fields") as string;
    const fields: Record<string, string> = JSON.parse(fieldsRaw || "{}");
    const files = formData.getAll("files") as File[];

    const serviceLabel = serviceLabels[service] ?? service;
    const customerEmail = user?.email ?? "unknown";
    const customerName = user?.user_metadata?.full_name ?? customerEmail;

    const fieldsHtml = Object.entries(fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#8C7355;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;white-space:nowrap">${k.replace(/_/g, " ")}</td><td style="padding:6px 12px;font-size:14px;color:#111111">${v}</td></tr>`)
      .join("");

    const fileList = files.length > 0
      ? `<p style="margin:16px 0 8px;font-size:13px;color:#5C5C5C"><strong>Files attached:</strong> ${files.map(f => f.name).join(", ")}</p>`
      : "";

    await resend.emails.send({
      from: "ADESSO Digital <hello@adesso.digital>",
      to: "hello@adesso.digital",
      subject: `New Brief: ${serviceLabel} — ${customerName}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#111111">
          <div style="background:#111111;padding:24px 32px">
            <p style="color:#8C7355;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0">ADESSO Digital</p>
            <p style="color:#ffffff;font-size:22px;font-weight:600;margin:8px 0 0">New Project Brief</p>
          </div>
          <div style="padding:32px;background:#F5F4F1">
            <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #E2DFDA">
              <tr style="background:#E2DFDA"><td colspan="2" style="padding:10px 12px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#5C5C5C">Client</td></tr>
              <tr><td style="padding:6px 12px;font-weight:600;color:#8C7355;text-transform:uppercase;font-size:11px;letter-spacing:0.1em">Name</td><td style="padding:6px 12px;font-size:14px">${customerName}</td></tr>
              <tr><td style="padding:6px 12px;font-weight:600;color:#8C7355;text-transform:uppercase;font-size:11px;letter-spacing:0.1em">Email</td><td style="padding:6px 12px;font-size:14px"><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
              <tr><td style="padding:6px 12px;font-weight:600;color:#8C7355;text-transform:uppercase;font-size:11px;letter-spacing:0.1em">Service</td><td style="padding:6px 12px;font-size:14px;font-weight:600">${serviceLabel}</td></tr>
              <tr style="background:#E2DFDA"><td colspan="2" style="padding:10px 12px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#5C5C5C">Brief Details</td></tr>
              ${fieldsHtml}
            </table>
            ${fileList}
            <div style="margin-top:24px;padding:16px;background:#111111;text-align:center">
              <a href="mailto:${customerEmail}" style="color:#8C7355;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">Reply to Client →</a>
            </div>
          </div>
        </div>
      `,
    });

    // Confirmation to client
    await resend.emails.send({
      from: "ADESSO Digital <hello@adesso.digital>",
      to: customerEmail,
      subject: `Brief received — ${serviceLabel}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#111111">
          <div style="background:#111111;padding:24px 32px">
            <p style="color:#8C7355;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin:0">ADESSO Digital</p>
            <p style="color:#ffffff;font-size:22px;font-weight:600;margin:8px 0 0">Brief Received</p>
          </div>
          <div style="padding:32px;background:#F5F4F1">
            <p style="font-size:15px;line-height:1.6">Hi ${customerName},</p>
            <p style="font-size:15px;line-height:1.6">We&apos;ve received your brief for <strong>${serviceLabel}</strong>. Our team will review it and come back to you within 24 hours.</p>
            <p style="font-size:15px;line-height:1.6">In the meantime, feel free to reply to this email with any additional information.</p>
            <p style="font-size:15px;line-height:1.6">— The ADESSO Team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
