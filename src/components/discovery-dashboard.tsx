"use client";

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeInfo, Bookmark, Columns3, RefreshCw } from 'lucide-react';
import { College, collegeData } from '@/lib/college-data';
import { CollegeCard } from '@/components/college-card';
import { CollegeFilters, CollegeFiltersState } from '@/components/college-filters';
import { CollegeGridSkeleton } from '@/components/skeletons';
import { EmptySearchState, PrimaryButton, SectionHeader, StatusCard } from '@/components/ui';
import { useDiscovery } from '@/components/discovery-provider';

type FetchState = {
  colleges: College[];
  loading: boolean;
  error: string | null;
};

const initialFilters: CollegeFiltersState = {
  search: '',
  location: 'all',
  fees: 'all',
  rating: 'all',
  sort: 'rating-desc'
};

export function DiscoveryDashboard() {
  const [state, setState] = useState<FetchState>({ colleges: [], loading: true, error: null });
  const [filters, setFilters] = useState<CollegeFiltersState>(initialFilters);
  const deferredSearch = useDeferredValue(filters.search.trim().toLowerCase());
  const { compareIds, savedIds, hydrated, isSaved, isCompared, toggleCompare, toggleSaved } = useDiscovery();

  useEffect(() => {
    let active = true;

    async function loadColleges() {
      try {
        const response = await fetch('/api/colleges');
        if (!response.ok) throw new Error('Unable to load college catalog');

        const data = (await response.json()) as College[];
        if (active) setState({ colleges: data, loading: false, error: null });
      } catch (fetchError) {
        if (active) {
          setState({ colleges: [], loading: false, error: fetchError instanceof Error ? fetchError.message : 'Something went wrong' });
        }
      }
    }

    loadColleges();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const colleges = state.colleges.filter((college) => {
      const matchesSearch = !deferredSearch || college.name.toLowerCase().includes(deferredSearch);
      const matchesLocation = filters.location === 'all' || college.location === filters.location;
      const matchesFees =
        filters.fees === 'all' ||
        (filters.fees === 'under-2' && college.feesValue < 200000) ||
        (filters.fees === '2-5' && college.feesValue >= 200000 && college.feesValue <= 500000) ||
        (filters.fees === 'above-5' && college.feesValue > 500000);
      const matchesRating =
        filters.rating === 'all' || (college.rating !== null && college.rating >= Number.parseFloat(filters.rating));

      return matchesSearch && matchesLocation && matchesFees && matchesRating;
    });

    colleges.sort((left, right) => {
      if (filters.sort === 'fees-asc') return left.feesValue - right.feesValue;
      if (filters.sort === 'fees-desc') return right.feesValue - left.feesValue;

      return (right.rating ?? -1) - (left.rating ?? -1);
    });

    return colleges;
  }, [deferredSearch, filters.fees, filters.location, filters.rating, filters.sort, state.colleges]);

  const selectedCount = compareIds.length;

  return (
    <div className="space-y-8 pb-8">
      <section className="grid gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur-sm lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Frontend Engineer MVP"
            title="Discover colleges with a calmer, sharper workflow."
            description="Compare programs, filter by value, shortlist in one tap, and save your options for later. Built with resilient UI patterns that keep working when data is incomplete."
          />

          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/compare" icon={<Columns3 className="h-4 w-4" />}>
              Open comparison view
            </PrimaryButton>
            <PrimaryButton href="/saved" tone="ghost" icon={<Bookmark className="h-4 w-4" />}>
              View saved colleges
            </PrimaryButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Colleges" value={state.colleges.length || collegeData.length} helper="Live catalog" />
            <StatCard label="Compared" value={selectedCount} helper="Up to 3 colleges" />
            <StatCard label="Saved" value={hydrated ? savedIds.length : 0} helper="LocalStorage" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-950/70 p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,191,137,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(215,162,27,0.18),transparent_28%)]" />
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-100">
              <BadgeInfo className="h-3.5 w-3.5" />
              Production-ready behavior
            </div>
            <div className="space-y-3">
              <InfoLine title="Search and filter" text="Refine results instantly with responsive controls." />
              <InfoLine title="Graceful states" text="Loading, empty, and error states keep the UI predictable." />
              <InfoLine title="Fallback-safe data" text="Missing images, ratings, or placements never break the page." />
            </div>
          </div>
        </div>
      </section>

      <CollegeFilters filters={filters} onChange={setFilters} />

      {state.loading ? <CollegeGridSkeleton /> : null}

      {state.error ? (
        <StatusCard
          variant="error"
          title="Could not load colleges"
          description={state.error}
          action={<PrimaryButton icon={<RefreshCw className="h-4 w-4" />} onClick={() => window.location.reload()}>Retry</PrimaryButton>}
        />
      ) : null}

      {!state.loading && !state.error ? (
        filtered.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((college) => (
              <CollegeCard
                key={college.slug}
                college={college}
                isSaved={isSaved(college.slug)}
                isCompared={isCompared(college.slug)}
                compareDisabled={!isCompared(college.slug) && selectedCount >= 3}
                onToggleCompare={() => toggleCompare(college.slug)}
                onToggleSaved={() => toggleSaved(college.slug)}
              />
            ))}
          </div>
        ) : (
          <EmptySearchState onReset={() => setFilters(initialFilters)} />
        )
      ) : null}

      {hydrated && selectedCount > 0 ? <CompareTray count={selectedCount} /> : null}
    </div>
  );
}

function StatCard({ label, value, helper }: { label: string; value: number; helper: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-ink-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{helper}</p>
    </div>
  );
}

function InfoLine({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function CompareTray({ count }: { count: number }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-2xl rounded-[1.5rem] border border-brand-500/20 bg-ink-950/95 p-4 shadow-panel backdrop-blur-lg sm:inset-x-auto sm:right-6 sm:w-[28rem]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Comparison tray</p>
          <p className="mt-1 text-sm font-semibold text-white">{count} colleges selected</p>
        </div>
        <Link href="/compare" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
          Compare now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}