import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col pt-[72px]">
      <div className="flex-1 flex items-center border-b border-[#E2DFDA]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-6">
                Error 404
              </span>
              <h1
                className="mb-6 text-[#111111]"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                }}
              >
                Page not<br />
                <em className="not-italic text-[#8C7355]">found.</em>
              </h1>
              <p className="text-[1.0625rem] text-[#5C5C5C] leading-[1.78] max-w-md mb-10">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back to familiar ground.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="bg-[#1A1A1A] text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-7 py-4 hover:bg-[#8C7355] transition-colors duration-200"
                >
                  Back to Home
                </Link>
                <Link
                  href="/contact"
                  className="border border-[#C5C0B8] text-[#111111] text-[11px] font-semibold tracking-[0.18em] uppercase px-7 py-4 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-4 lg:col-start-9 items-center justify-end">
              <div
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "11rem",
                  fontWeight: 700,
                  color: "#F0EDE8",
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.04em",
                }}
              >
                404
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick navigation */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 w-full">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-6">
          Quick Navigation
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Divisions", href: "/divisions" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border border-[#E2DFDA] px-5 py-4 text-[13px] font-medium text-[#5C5C5C] hover:text-[#111111] hover:border-[#C5C0B8] transition-all"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
