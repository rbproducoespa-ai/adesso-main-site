import Link from "next/link";
import { Logo } from "@/components/Logo";
import { URLS } from "@/lib/urls";

const divLinks = [
  { name: "Exhibition",      href: URLS.exhibition },
  { name: "Automation",      href: URLS.automation },
  { name: "Lead Intelligence", href: URLS.leads },
  { name: "Lab",             href: URLS.lab },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Divisions", href: "/divisions" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex text-white mb-6">
              <Logo variant="full" size={26} dark />
            </Link>
            <p className="text-[#7A7A7A] text-sm leading-relaxed mb-6 max-w-xs">
              A UK digital services company operating across exhibition design,
              business automation, lead intelligence, and product development.
            </p>
            <div className="space-y-2">
              <a href="mailto:hello@adesso.digital"
                className="block text-[13px] text-[#9A9A9A] hover:text-white transition-colors">
                hello@adesso.digital
              </a>
              <a href="https://wa.me/447470361422" target="_blank" rel="noopener noreferrer"
                className="block text-[13px] text-[#9A9A9A] hover:text-white transition-colors">
                +44 7470 361422
              </a>
            </div>
          </div>

          {/* Divisions */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-5">Divisions</p>
            <ul className="space-y-3">
              {divLinks.map((l) => (
                <li key={l.name}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer"
                    className="text-[13px] text-[#7A7A7A] hover:text-white transition-colors">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-5">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href}
                    className="text-[13px] text-[#7A7A7A] hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-5">Connect</p>
            <ul className="space-y-3">
              <li>
                <a href="https://linkedin.com/company/adesso-digital" target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-[#7A7A7A] hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://wa.me/447470361422" target="_blank" rel="noopener noreferrer"
                  className="text-[13px] text-[#7A7A7A] hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/contact"
                  className="text-[13px] text-[#7A7A7A] hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mx-6 lg:mx-12" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <p className="text-[11px] text-[#666666]">
            © {new Date().getFullYear()} ADESSO Digital Ltd. All rights reserved.
          </p>
          <span className="hidden sm:block text-[#333333] text-[10px]">·</span>
          <p className="text-[11px] text-[#444444]">Registered in England &amp; Wales</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-[11px] text-[#666666] hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms"   className="text-[11px] text-[#666666] hover:text-white transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
