import Script from "next/script";
import { createServerSupabase } from "@/lib/supabase-server";

export async function MetaPixel() {
  try {
    const supabase = await createServerSupabase();
    const { data } = await supabase
      .from("site_content")
      .select("key, value")
      .eq("app", "main")
      .eq("page", "__meta__")
      .eq("section", "meta")
      .eq("key", "pixel_id")
      .single();

    const pixelId = data?.value?.trim();
    if (!pixelId) return null;

    return (
      <>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
        `}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1" width="1" style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </>
    );
  } catch {
    return null;
  }
}
