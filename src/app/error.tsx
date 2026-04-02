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
    <main className="min-h-screen flex items-center justify-center bg-white pt-[72px]">
      <div className="mx-auto max-w-[600px] px-6 text-center py-32">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="headline-xl mb-4">An unexpected error occurred.</h1>
        <p className="body-lead mb-10">
          We&apos;ve been notified and are looking into it. Please try again or contact us if the issue persists.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button onClick={reset} className="btn-primary">Try Again</button>
          <Link href="/" className="btn-outline">Return to Home</Link>
        </div>
        <p className="mt-8 text-[11px] text-[#ABABAB]">
          Need immediate help?{" "}
          <a href="mailto:hello@adesso.digital" className="text-[#8C7355] hover:underline">
            hello@adesso.digital
          </a>
        </p>
      </div>
    </main>
  );
}
