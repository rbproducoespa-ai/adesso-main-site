import Link from "next/link";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[70vh] items-center">
      <div className="sheet">
        <p className="label-accent figure mb-5">404</p>
        <h1 className="h-display mb-5 max-w-[16ch]">{t("en", "notFound.title")}</h1>
        <p className="lede mb-8">{t("en", "notFound.body")}</p>
        <Link href="/" className="btn-ghost">
          {t("en", "notFound.cta")}
        </Link>
      </div>
    </main>
  );
}
