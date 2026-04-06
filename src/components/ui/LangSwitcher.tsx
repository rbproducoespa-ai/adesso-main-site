"use client";

import { useI18n, type Locale } from "@/lib/i18n";

export function LangSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-0.5">
      {(["en", "pt"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`text-[11px] font-mono font-semibold uppercase px-2 py-1 rounded-sm transition-all duration-150 ${
            locale === l
              ? "text-[#F0F4FF] bg-[#0066FF]/20 border border-[#0066FF]/30"
              : "text-[#4A5A7A] hover:text-[#8899BB] border border-transparent"
          }`}
          aria-label={`Switch to ${l === "en" ? "English" : "Portuguese"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
