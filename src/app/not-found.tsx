import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#04040A] text-center px-6 pt-[72px]">
      <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#0066FF] mb-4">404</p>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F0F4FF] mb-4">
        Page Not Found
      </h1>
      <p className="text-[#8899BB] max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-[#0066FF] text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#0052CC] transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="border border-[#1A2540] text-[#F0F4FF] text-sm font-semibold px-6 py-3 rounded-sm hover:border-[#0066FF]/40 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
