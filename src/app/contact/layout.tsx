import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Adesso",
  description:
    "Get in touch with Adesso. Request early access to the platform, enquire about partnerships, or join the waitlist. Based in London, UK.",
  openGraph: {
    title: "Contact | Adesso",
    description:
      "Request early access or get in touch with the Adesso team. Limited access available for UK and European exhibition professionals.",
    url: "https://www.adessoexhibition.co.uk/contact",
  },
  alternates: {
    canonical: "https://www.adessoexhibition.co.uk/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
