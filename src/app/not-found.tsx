import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-panel">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-100">
          <SearchX className="h-6 w-6" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-white">College not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">The page you opened does not map to a college in the current mock catalog.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500 px-5 py-3 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to discovery
        </Link>
      </div>
    </div>
  );
}