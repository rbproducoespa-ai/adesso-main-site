import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, role, message, _honeypot } = body as {
      name: string;
      email: string;
      company: string;
      role: string;
      message: string;
      _honeypot?: string;
    };

    if (_honeypot) return NextResponse.json({ ok: true });

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 422 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 422 });
    }

    // Save to DB
    try {
      const supabase = createAdminSupabase();
      await supabase.from("form_submissions").insert({
        form_name: "contact",
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() ?? null,
        subject: role ?? null,
        message: message.trim(),
        source: "website",
        read: false,
        metadata: role ? { role } : null,
      });
      await supabase.from("contacts").insert({
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() ?? null,
        message: message.trim(),
        source: "website",
        status: "new",
      });
    } catch (dbErr) {
      console.error("DB insert error:", dbErr);
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "hello@adesso.digital";

    if (!RESEND_API_KEY) {
      console.log("[Contact Form]", { name, email, company, role, message });
      return NextResponse.json({ ok: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Adesso Website <noreply@adessoexhibition.co.uk>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${name} — ${company || "Adesso Website"}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#111;">
            <div style="background:#04040A;padding:24px 32px;">
              <p style="color:#0066FF;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 8px;">ADESSO</p>
              <p style="color:#F0F4FF;font-size:18px;font-weight:700;margin:0;">New Website Enquiry</p>
            </div>
            <div style="border:1px solid #E2DFDA;border-top:none;padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.1em;width:120px;padding-right:16px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:15px;color:#111;font-weight:500;">${name}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.1em;padding-right:16px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:15px;"><a href="mailto:${email}" style="color:#0066FF;">${email}</a></td></tr>
                ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.1em;padding-right:16px;">Company</td><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:15px;color:#111;">${company}</td></tr>` : ""}
                ${role ? `<tr><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.1em;padding-right:16px;">Role</td><td style="padding:10px 0;border-bottom:1px solid #E2DFDA;font-size:15px;color:#111;">${role}</td></tr>` : ""}
                <tr><td style="padding:12px 0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;padding-right:16px;">Message</td><td style="padding:12px 0;font-size:15px;color:#111;line-height:1.7;white-space:pre-wrap;">${message}</td></tr>
              </table>
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #E2DFDA;">
                <a href="mailto:${email}" style="display:inline-block;background:#0066FF;color:#fff;text-decoration:none;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;padding:12px 24px;">Reply to ${name}</a>
              </div>
            </div>
            <p style="color:#ABABAB;font-size:11px;padding:16px 0;">Submitted via adessoexhibition.co.uk · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
