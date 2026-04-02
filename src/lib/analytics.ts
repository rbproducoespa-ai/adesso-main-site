/**
 * ADESSO Analytics — unified event tracking layer
 * Sends events to both GA4 (gtag) and Meta Pixel (fbq)
 * Import and call from client components.
 * Global Window types are declared in src/types/globals.d.ts
 */

type EventParams = Record<string, string | number | boolean | undefined | string[]>;

// ── Core GA4 event ────────────────────────────────────────────────────────────
function gaEvent(name: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

// ── Core Meta Pixel event ─────────────────────────────────────────────────────
function fbEvent(name: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, params);
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Page view — called automatically by GA4 on navigation */
export function trackPageView(path: string) {
  gaEvent("page_view", { page_path: path });
}

/** Contact form submitted */
export function trackContactForm(params?: { division?: string }) {
  gaEvent("generate_lead", { event_category: "contact", ...params });
  fbEvent("Lead", { content_name: "Contact Form", ...params });
}

/** WhatsApp button clicked */
export function trackWhatsAppClick(params?: { source?: string }) {
  gaEvent("whatsapp_click", { event_category: "engagement", ...params });
  fbEvent("Contact", { method: "whatsapp", ...params });
}

/** CTA button clicked */
export function trackCTAClick(label: string, destination?: string) {
  gaEvent("cta_click", { event_label: label, event_category: "cta", destination });
}

/** Division visited */
export function trackDivisionClick(division: string) {
  gaEvent("division_click", { event_category: "navigation", division });
}

/** Begin checkout (leads app) */
export function trackBeginCheckout(productId: string, value: number) {
  gaEvent("begin_checkout", {
    event_category: "ecommerce",
    currency: "GBP",
    value: value / 100,
    item_id: productId,
  });
  fbEvent("InitiateCheckout", {
    currency: "GBP",
    value: value / 100,
    content_id: productId,
  });
}

/** Purchase completed */
export function trackPurchase(params: {
  transactionId: string;
  productId: string;
  productName: string;
  value: number;
}) {
  gaEvent("purchase", {
    transaction_id: params.transactionId,
    value: params.value / 100,
    currency: "GBP",
    item_id: params.productId,
    item_name: params.productName,
  });
  fbEvent("Purchase", {
    content_name: params.productName,
    currency: "GBP",
    value: params.value / 100,
    content_id: params.productId,
  });
}

/** User registered */
export function trackSignUp(method = "email") {
  gaEvent("sign_up", { method });
  fbEvent("CompleteRegistration", { method });
}

/** User logged in */
export function trackLogin(method = "email") {
  gaEvent("login", { method });
}

/** Blog post viewed */
export function trackBlogView(slug: string, title: string) {
  gaEvent("blog_view", { slug, title, event_category: "content" });
  fbEvent("ViewContent", { content_type: "article", content_name: title });
}
