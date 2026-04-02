// Global type declarations for third-party analytics scripts

interface Window {
  // Google Analytics 4
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
  // Meta Pixel
  fbq: (...args: unknown[]) => void;
  _fbq: unknown;
}
