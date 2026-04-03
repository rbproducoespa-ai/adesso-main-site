"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#04040A] text-center px-6 pt-[72px]">
      <div className="max-w-md">
        <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#0066FF] mb-4">
          Something went wrong
        </p>
        <h1 className="font-display text-3xl font-bold text-[#F0F4FF] mb-4">
          An unexpected error occurred.
        </h1>
        <p className="text-[#8899BB] mb-10">
          We&apos;ve been notified and are looking into it. Please try again or contact us if the
          issue persists.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="bg-[#0066FF] text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#0052CC] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-[#1A2540] text-[#F0F4FF] text-sm font-semibold px-6 py-3 rounded-sm hover:border-[#0066FF]/40 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
