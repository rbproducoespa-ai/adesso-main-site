import Script from "next/script";
import { createAdminSupabase } from "@/lib/supabase-admin";

/**
 * Google Analytics 4 — server component
 * Reads GA4 Measurement ID from settings table or NEXT_PUBLIC_GA4_ID env var.
 * Injects gtag.js with afterInteractive strategy.
 */
export async function GoogleAnalytics() {
  // Try env var first (fastest path)
  let measurementId = process.env.NEXT_PUBLIC_GA4_ID ?? "";

  // Fallback: read from site_content settings
  if (!measurementId) {
    try {
      const supabase = createAdminSupabase();
      const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("app", "main")
        .eq("page", "__settings__")
        .eq("section", "analytics")
        .eq("key", "ga4_id")
        .maybeSingle();
      measurementId = data?.value?.trim() ?? "";
    } catch {
      // Table may not exist yet — graceful fallback
    }
  }

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          page_path: window.location.pathname,
          send_page_view: true,
        });
        window.gtag = gtag;
      `}</Script>
    </>
  );
}
