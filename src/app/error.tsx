"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-ink-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-panel">
            <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">The application caught an unexpected error. You can retry the current screen or go back to the homepage.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500 px-5 py-3 text-sm font-semibold text-white">
                <RefreshCw className="h-4 w-4" />
                Try again
              </button>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100">
                <ArrowLeft className="h-4 w-4" />
                Back home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}