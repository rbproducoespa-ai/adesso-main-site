import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, division, message, _honeypot } = body;

    // Honeypot — reject bots
    if (_honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 422 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 422 });
    }

    // Always save to DB regardless of email config
    try {
      const supabase = createAdminSupabase();
      await supabase.from("form_submissions").insert({
        form_name: "contact",
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() ?? null,
        subject: division ?? null,
        message: message.trim(),
        source: "website",
        read: false,
        metadata: division ? { division } : null,
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
      // Non-fatal — continue to send email
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "rbproducoespa@gmail.com";

    if (!RESEND_API_KEY) {
      // Dev fallback — log to console if Resend not configured
      console.log("[Contact Form Submission]", { name, email, company, division, message });
      return NextResponse.json({ ok: true });
    }

    // Send via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ADESSO Website <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #111111;">
            <div style="background: #111111; padding: 24px 32px; margin-bottom: 0;">
              <p style="color: #8C7355; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 8px;">ADESSO Digital</p>
              <p style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0;">New Website Enquiry</p>
            </div>
            <div style="border: 1px solid #E2DFDA; border-top: none; padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 12px; color: #8B8B8B; text-transform: uppercase; letter-spacing: 0.1em; width: 120px; vertical-align: top; padding-right: 16px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 15px; color: #111111; font-weight: 500;">${name}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 12px; color: #8B8B8B; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-right: 16px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 15px; color: #8C7355;"><a href="mailto:${email}" style="color: #8C7355;">${email}</a></td></tr>
                ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 12px; color: #8B8B8B; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-right: 16px;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 15px; color: #111111;">${company}</td></tr>` : ""}
                ${division ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 12px; color: #8B8B8B; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-right: 16px;">Division</td><td style="padding: 10px 0; border-bottom: 1px solid #E2DFDA; font-size: 15px; color: #111111;">${division}</td></tr>` : ""}
                <tr><td style="padding: 12px 0; font-size: 12px; color: #8B8B8B; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-right: 16px;">Message</td><td style="padding: 12px 0; font-size: 15px; color: #111111; line-height: 1.7; white-space: pre-wrap;">${message}</td></tr>
              </table>
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E2DFDA;">
                <a href="mailto:${email}" style="display: inline-block; background: #111111; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 24px;">Reply to ${name}</a>
              </div>
            </div>
            <div style="padding: 16px 0; border-top: 1px solid #E2DFDA; margin-top: 0;">
              <p style="color: #ABABAB; font-size: 11px; margin: 0;">This message was submitted via adesso.digital · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      // Data is already saved to DB — return success so user isn't blocked
      // Email delivery failure is an ops issue, not a user-facing error
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
