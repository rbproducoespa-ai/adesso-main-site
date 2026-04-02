"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { URLS } from "@/lib/urls";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const divisions = [
  { n: "01", name: "Exhibition",      href: URLS.exhibition,          desc: "Stand design & events",   external: true },
  { n: "02", name: "Automation",      href: URLS.automation,          desc: "Workflows & systems",     external: true },
  { n: "03", name: "Leads",           href: URLS.leads,               desc: "Lead intelligence",       external: true },
  { n: "04", name: "Lab",             href: URLS.lab,                 desc: "Future tools",            external: true },
  { n: "05", name: "3D Architecture", href: "/divisions/3d-architecture", desc: "Renders & visualization", external: false },
];

export function Header() {
  const [open, setOpen]       = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[#E2DFDA]"
            : "bg-white border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 text-[#1A1A1A] hover:opacity-80 transition-opacity">
              <Logo variant="full" size={26} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Divisions dropdown */}
              <div className="relative"
                onMouseEnter={() => setDivOpen(true)}
                onMouseLeave={() => setDivOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[#5C5C5C] hover:text-[#111111] transition-colors">
                  Divisions
                  <svg className={`w-3 h-3 transition-transform ${divOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {divOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-[#E2DFDA] shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-2">
                    {divisions.map((d) => (
                      d.external ? (
                        <a key={d.n} href={d.href} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-4 px-4 py-3 hover:bg-[#F5F4F1] transition-colors group">
                          <span className="text-[11px] font-semibold tracking-[0.15em] text-[#8C7355] w-6 flex-shrink-0">{d.n}</span>
                          <div>
                            <p className="text-[13px] font-semibold text-[#111111] group-hover:text-[#8C7355] transition-colors">{d.name}</p>
                            <p className="text-[11px] text-[#7A7A7A]">{d.desc}</p>
                          </div>
                          <svg className="w-3.5 h-3.5 text-[#C5C0B8] ml-auto group-hover:text-[#8C7355] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      ) : (
                        <Link key={d.n} href={d.href}
                          onClick={() => setDivOpen(false)}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-[#F5F4F1] transition-colors group border-t border-[#F0EDE8]">
                          <span className="text-[11px] font-semibold tracking-[0.15em] text-[#8C7355] w-6 flex-shrink-0">{d.n}</span>
                          <div>
                            <p className="text-[13px] font-semibold text-[#111111] group-hover:text-[#8C7355] transition-colors">{d.name}</p>
                            <p className="text-[11px] text-[#7A7A7A]">{d.desc}</p>
                          </div>
                          <svg className="w-3.5 h-3.5 text-[#C5C0B8] ml-auto group-hover:text-[#8C7355] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  className="px-4 py-2 text-[13px] font-medium text-[#5C5C5C] hover:text-[#111111] transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="https://wa.me/447470361422" target="_blank" rel="noopener noreferrer"
                className="text-[12px] font-medium text-[#5C5C5C] hover:text-[#111111] transition-colors">
                WhatsApp
              </a>
              <Link href="/account"
                className="text-[12px] font-medium text-[#5C5C5C] hover:text-[#111111] transition-colors">
                Client Area
              </Link>
              <Link href="/contact"
                className="bg-[#1A1A1A] text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[#8C7355] transition-colors duration-200">
                Book a Call
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2 text-[#111111]" aria-label="Menu">
              <div className="w-5 space-y-[5px]">
                <span className={`block h-[1.5px] bg-current transition-all origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block h-[1.5px] bg-current transition-all ${open ? "opacity-0" : ""}`} />
                <span className={`block h-[1.5px] bg-current transition-all origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-[72px] overflow-y-auto lg:hidden" onClick={() => setOpen(false)}>
          <div className="px-6 py-8 space-y-1" onClick={(e) => e.stopPropagation()}>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-4 px-2">Divisions</p>
            {divisions.map((d) => (
              d.external ? (
                <a key={d.n} href={d.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 px-2 border-b border-[#F0EDE8]"
                  onClick={() => setOpen(false)}>
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#8C7355] w-5">{d.n}</span>
                  <span className="text-[15px] font-medium text-[#111111]">{d.name}</span>
                </a>
              ) : (
                <Link key={d.n} href={d.href}
                  className="flex items-center gap-3 py-3 px-2 border-b border-[#F0EDE8]"
                  onClick={() => setOpen(false)}>
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#8C7355] w-5">{d.n}</span>
                  <span className="text-[15px] font-medium text-[#111111]">{d.name}</span>
                </Link>
              )
            ))}
            <div className="pt-6 space-y-1">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-4 px-2">Company</p>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block py-3 px-2 text-[15px] font-medium text-[#111111] border-b border-[#F0EDE8]">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="pt-8 space-y-3">
              <Link href="/account" onClick={() => setOpen(false)}
                className="block w-full text-center border border-[#E2DFDA] text-[#111111] text-[11px] font-semibold tracking-[0.15em] uppercase px-6 py-4 hover:border-[#8C7355] transition-colors">
                Client Area
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}
                className="block w-full text-center bg-[#1A1A1A] text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-6 py-4 hover:bg-[#8C7355] transition-colors">
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
