import { Mail, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { pick, t, type Locale } from "@/lib/i18n";

export function ContactBlock({
  locale,
  heading,
  body,
  waMessage,
}: {
  locale: Locale;
  heading?: string;
  body?: string;
  waMessage?: string;
}) {
  return (
    <section className="border border-rule-strong bg-surface p-7 sm:p-10">
      <p className="label-accent mb-3">{t(locale, "common.getInTouch")}</p>
      <h2 className="h-section mb-4">{heading ?? t(locale, "contact.title")}</h2>
      <p className="lede mb-8">{body ?? t(locale, "contact.lede")}</p>

      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className="btn-solid">
          <Mail aria-hidden="true" className="h-3.5 w-3.5" />
          {site.email}
        </a>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
          {t(locale, "common.whatsapp")}
        </a>
      </div>

      <p className="mt-6 font-mono text-[11px] text-ink-3">
        {t(locale, "contact.responseNote")} · {pick(site.location, locale)}
      </p>
    </section>
  );
}
