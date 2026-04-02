// Division URLs — reads from .env.local in dev, falls back to production domains
export const URLS = {
  exhibition: process.env.NEXT_PUBLIC_EXHIBITION_URL ?? "https://exhibition.adesso.digital",
  automation:  process.env.NEXT_PUBLIC_AUTOMATION_URL ?? "https://automation.adesso.digital",
  leads:       process.env.NEXT_PUBLIC_LEADS_URL       ?? "https://leads.adesso.digital",
  lab:         process.env.NEXT_PUBLIC_LAB_URL         ?? "https://lab.adesso.digital",
} as const;
