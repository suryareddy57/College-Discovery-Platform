"use client";

import Link from 'next/link';
import { Bookmark, Columns3, GraduationCap, Menu } from 'lucide-react';
import { useDiscovery } from '@/components/discovery-provider';

const navItems = [
  { href: '/', label: 'Discover', icon: GraduationCap },
  { href: '/compare', label: 'Compare', icon: Columns3 },
  { href: '/saved', label: 'Saved', icon: Bookmark }
];

export function SiteHeader() {
  const { savedIds, compareIds, hydrated } = useDiscovery();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/82 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-gold-500 shadow-glow transition-transform group-hover:-translate-y-0.5">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.35em] text-brand-100/80">College Discovery</p>
            <p className="text-sm text-slate-300">Search, compare, shortlist.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 shadow-panel md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const count = item.href === '/compare' ? compareIds.length : item.href === '/saved' ? savedIds.length : 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {hydrated && count > 0 ? <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-xs text-brand-100">{count}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/compare"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"
          >
            Compare {hydrated ? `(${compareIds.length})` : ''}
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}