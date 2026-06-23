"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bookmark, RefreshCw, X } from 'lucide-react';
import { College } from '@/lib/college-data';
import { CollegeGridSkeleton } from '@/components/skeletons';
import { Chip, PrimaryButton, SectionHeader, StatusCard } from '@/components/ui';
import { useDiscovery } from '@/components/discovery-provider';
import { formatList, formatRating } from '@/lib/format';

export function CompareView() {
  const { compareIds, removeFromCompare, clearCompare, isSaved, toggleSaved, hydrated } = useDiscovery();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadColleges() {
      try {
        const response = await fetch('/api/colleges');
        if (!response.ok) throw new Error('Unable to load colleges');

        const data = (await response.json()) as College[];
        if (active) {
          setColleges(data);
          setLoading(false);
          setError(null);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unexpected error');
          setLoading(false);
        }
      }
    }

    loadColleges();

    return () => {
      active = false;
    };
  }, []);

  const selected = useMemo(
    () => compareIds.map((slug) => colleges.find((college) => college.slug === slug)).filter(Boolean) as College[],
    [colleges, compareIds]
  );

  if (loading) return <CollegeGridSkeleton />;

  if (error) {
    return (
      <StatusCard
        variant="error"
        title="Could not load the comparison view"
        description={error}
        action={<PrimaryButton icon={<RefreshCw className="h-4 w-4" />} onClick={() => window.location.reload()}>Retry</PrimaryButton>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Comparison workflow"
        title="Compare up to three colleges side by side."
        description="This view is responsive by design: the same data appears as a readable grid on desktop and as stacked cards on mobile."
      />

      <div className="flex flex-wrap gap-3">
        <PrimaryButton href="/" tone="ghost" icon={<ArrowLeft className="h-4 w-4" />}>Back to discovery</PrimaryButton>
        {hydrated && compareIds.length > 0 ? (
          <PrimaryButton tone="ghost" icon={<X className="h-4 w-4" />} onClick={clearCompare}>Clear all</PrimaryButton>
        ) : null}
      </div>

      {!hydrated || compareIds.length === 0 ? (
        <StatusCard
          title="No colleges selected for comparison"
          description="Use the Compare button on college cards or on a detail page to add up to three colleges here."
          action={<PrimaryButton href="/" icon={<ArrowRight className="h-4 w-4" />}>Browse colleges</PrimaryButton>}
        />
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {selected.map((college) => (
              <article key={college.slug} className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-panel">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{college.location}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-white">{college.name}</h2>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
                    onClick={() => removeFromCompare(college.slug)}
                    aria-label={`Remove ${college.name} from compare`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <CompareMetric label="Fees" value={college.feesText} />
                  <CompareMetric label="Rating" value={formatRating(college.rating)} />
                  <CompareMetric label="Courses" value={college.courses.join(', ')} />
                  <CompareMetric label="Placement" value={college.placement.medianPackage ?? 'Not available'} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>{college.location}</Chip>
                  <Chip>{college.placement.highestPackage ?? 'No highest package data'}</Chip>
                  <PrimaryButton href={`/colleges/${college.slug}`} tone="ghost" icon={<ArrowRight className="h-4 w-4" />}>Open detail page</PrimaryButton>
                  <PrimaryButton tone="ghost" icon={<Bookmark className="h-4 w-4" />} onClick={() => toggleSaved(college.slug)}>
                    {isSaved(college.slug) ? 'Saved' : 'Save'}
                  </PrimaryButton>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-panel lg:block">
            <div className="grid grid-cols-[1.25fr_repeat(3,minmax(0,1fr))] border-b border-white/10 bg-ink-950/80">
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Metric</p>
              </div>
              {selected.map((college) => (
                <div key={college.slug} className="border-l border-white/10 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{college.location}</p>
                      <h2 className="mt-2 font-display text-2xl font-semibold text-white">{college.name}</h2>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
                      onClick={() => removeFromCompare(college.slug)}
                      aria-label={`Remove ${college.name} from compare`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {[
              { label: 'Fees', values: selected.map((college) => college.feesText) },
              { label: 'Rating', values: selected.map((college) => formatRating(college.rating)) },
              { label: 'Location', values: selected.map((college) => college.location) },
              { label: 'Courses', values: selected.map((college) => college.courses.join(', ')) },
              { label: 'Placement statistics', values: selected.map((college) => formatPlacement(college)) }
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[1.25fr_repeat(3,minmax(0,1fr))] border-b border-white/10 last:border-b-0">
                <div className="p-5 font-semibold text-white">{row.label}</div>
                {row.values.map((value, index) => (
                  <div key={index} className="border-l border-white/10 p-5 text-sm leading-6 text-slate-300 whitespace-pre-line">
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CompareMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function formatPlacement(college: College) {
  const details = [college.placement.highestPackage, college.placement.medianPackage, college.placement.internshipRate].filter(Boolean).join(' · ');
  const recruiterText = formatList(college.placement.recruiters, 'Recruiter list not shared');

  return details ? `${details}\n${recruiterText}` : recruiterText;
}