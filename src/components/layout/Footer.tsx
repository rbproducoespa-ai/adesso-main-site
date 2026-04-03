import Link from "next/link";
import { Logo } from "@/components/Logo";

const platformLinks = [
  { name: "Lead Intelligence", href: "/platform#module-01" },
  { name: "AI Concept Generator", href: "/platform#module-02" },
  { name: "Automation & CRM", href: "/platform#module-03" },
  { name: "Marketplace", href: "/platform#module-04" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Technology", href: "/technology" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Why Adesso", href: "/why-adesso" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#080D1A] border-t border-[#1A2540]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex mb-6" aria-label="Adesso home">
              <Logo variant="full" size={24} dark />
            </Link>
            <p className="text-[#4A5A7A] text-sm leading-relaxed mb-6 max-w-xs">
              AI infrastructure for the exhibition industry. Data intelligence,
              AI-powered stand generation, and workflow automation — at scale.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:hello@adesso.digital"
                className="block text-[13px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors"
              >
                hello@adesso.digital
              </a>
              <p className="text-[13px] text-[#4A5A7A]">London, United Kingdom</p>
            </div>
          </div>

          {/* Platform */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#0066FF] mb-5">
              Platform
            </p>
            <ul className="space-y-3">
              {platformLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#0066FF] mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#0066FF] mb-5">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/company/adesso-exhibition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors"
                  aria-label="Adesso on LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[13px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors"
                >
                  Request Access
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A2540]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <p className="text-[11px] text-[#4A5A7A]">
              © {new Date().getFullYear()} Adesso Digital Ltd. All rights reserved.
            </p>
            <span className="hidden sm:block text-[#1A2540]">·</span>
            <p className="text-[11px] text-[#4A5A7A]">Registered in England &amp; Wales</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[11px] text-[#4A5A7A] hover:text-[#F0F4FF] transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
