"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LangSwitcher } from "@/components/ui/LangSwitcher";
import { useI18n } from "@/lib/i18n";

const navLinks = [
  { key: "nav.platform",   href: "/platform" },
  { key: "nav.technology", href: "/technology" },
  { key: "nav.roadmap",    href: "/roadmap" },
  { key: "nav.why_adesso", href: "/why-adesso" },
  { key: "nav.about",      href: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#04040A]/95 backdrop-blur-md border-b border-[#1A2540]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Adesso home">
              <Logo variant="full" size={24} dark />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-2 text-[13px] font-medium transition-colors duration-150 relative ${
                    pathname === l.href
                      ? "text-[#F0F4FF]"
                      : "text-[#8899BB] hover:text-[#F0F4FF]"
                  }`}
                >
                  {t(l.key)}
                  {pathname === l.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#0066FF] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA + Lang */}
            <div className="hidden lg:flex items-center gap-3">
              <LangSwitcher />
              <Link
                href="/contact"
                className="bg-[#0066FF] text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm hover:bg-[#0052CC] transition-colors duration-200"
                aria-label="Request early access"
              >
                {t("nav.cta")}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 -mr-2 text-[#F0F4FF]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <div className="w-5 space-y-[5px]">
                <span
                  className={`block h-[1.5px] bg-current transition-all origin-center ${
                    open ? "rotate-45 translate-y-[6.5px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all origin-center ${
                    open ? "-rotate-45 -translate-y-[6.5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#04040A] pt-[72px] transition-all duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 py-8 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center py-4 text-[17px] font-medium border-b border-[#1A2540] ${
                pathname === l.href ? "text-[#F0F4FF]" : "text-[#8899BB]"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
          <div className="pt-6 flex items-center justify-between">
            <LangSwitcher />
          </div>
          <div className="pt-4">
            <Link
              href="/contact"
              className="block w-full text-center bg-[#0066FF] text-white text-[14px] font-semibold px-6 py-4 rounded-sm hover:bg-[#0052CC] transition-colors"
            >
              {t("hero.cta_primary")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
