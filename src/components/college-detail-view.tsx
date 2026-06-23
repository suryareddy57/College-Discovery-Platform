"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Columns3, MapPin, RefreshCw, Star, Users } from 'lucide-react';
import { College } from '@/lib/college-data';
import { DetailSkeleton } from '@/components/skeletons';
import { Chip, PrimaryButton, StatusCard } from '@/components/ui';
import { formatList, formatRating } from '@/lib/format';
import { useDiscovery } from '@/components/discovery-provider';

export function CollegeDetailView({ slug }: { slug: string }) {
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSaved, isCompared, toggleSaved, toggleCompare } = useDiscovery();

  useEffect(() => {
    let active = true;

    async function loadCollege() {
      try {
        const response = await fetch(`/api/colleges/${slug}`);
        if (response.status === 404) {
          if (active) {
            setCollege(null);
            setLoading(false);
            setError(null);
          }
          return;
        }

        if (!response.ok) throw new Error('Unable to load college details');

        const data = (await response.json()) as College;
        if (active) {
          setCollege(data);
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

    loadCollege();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <DetailSkeleton />;

  if (error) {
    return (
      <StatusCard
        variant="error"
        title="Unable to load this college"
        description={error}
        action={<PrimaryButton icon={<RefreshCw className="h-4 w-4" />} onClick={() => window.location.reload()}>Retry</PrimaryButton>}
      />
    );
  }

  if (!college) {
    return (
      <StatusCard
        variant="warning"
        title="College not found"
        description="That college ID does not exist in the catalog. Go back to the discovery page and choose another college."
        action={<PrimaryButton href="/" icon={<ArrowLeft className="h-4 w-4" />}>Back to discovery</PrimaryButton>}
      />
    );
  }

  const saved = isSaved(college.slug);
  const compared = isCompared(college.slug);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PrimaryButton href="/" tone="ghost" icon={<ArrowLeft className="h-4 w-4" />}>Back to results</PrimaryButton>
        <div className="flex flex-wrap gap-2">
          <PrimaryButton tone="ghost" icon={<Columns3 className="h-4 w-4" />} onClick={() => toggleCompare(college.slug)}>
            {compared ? 'Remove from compare' : 'Add to compare'}
          </PrimaryButton>
          <PrimaryButton tone="ghost" icon={<Bookmark className="h-4 w-4" />} onClick={() => toggleSaved(college.slug)}>
            {saved ? 'Saved' : 'Save college'}
          </PrimaryButton>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-panel">
          <div className="relative h-[24rem]">
            {college.image ? (
              <Image src={college.image} alt={college.name} fill unoptimized className="object-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 text-center">
                <div>
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <MapPin className="h-6 w-6 text-brand-100" />
                  </div>
                  <p className="text-sm font-medium text-slate-200">Image unavailable</p>
                  <p className="mt-1 text-xs text-slate-400">Fallback preview shown safely</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>{college.location}</Chip>
                <Chip>{college.feesText}</Chip>
                <Chip>{formatRating(college.rating)} rating</Chip>
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-5xl">{college.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{college.overview}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-[2.25rem] border border-white/10 bg-white/5 p-5 shadow-panel sm:p-6">
          <MetricRow label="Rating" value={formatRating(college.rating)} note={college.rating ? 'Student ratings' : 'No rating published yet'} icon={<Star className="h-4 w-4 text-gold-100" />} />
          <MetricRow label="Location" value={college.location} note="Campus and city context" icon={<MapPin className="h-4 w-4 text-brand-100" />} />
          <MetricRow label="Fees" value={college.feesText} note="Annual program estimate" icon={<Users className="h-4 w-4 text-brand-100" />} />
          <MetricRow label="Placement" value={college.placement.medianPackage ?? 'Not available'} note={college.placement.highestPackage ?? 'Highest package not shared'} icon={<Columns3 className="h-4 w-4 text-gold-100" />} />
        </aside>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Courses" description="Programs available at a glance">
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course) => <Chip key={course}>{course}</Chip>)}
          </div>
        </SectionCard>

        <SectionCard title="Placement statistics" description="Useful recruiter and outcome signals">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Highest package" value={college.placement.highestPackage ?? 'Not available'} />
            <MetricCard label="Median package" value={college.placement.medianPackage ?? 'Not available'} />
            <MetricCard label="Internship rate" value={college.placement.internshipRate ?? 'Not available'} />
            <MetricCard label="Recruiters" value={formatList(college.placement.recruiters, 'Recruiter list not shared')} />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Overview" description="What makes this college worth considering">
        <div className="grid gap-3 sm:grid-cols-3">
          {college.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-white/10 bg-ink-950/60 p-4 text-sm text-slate-200">
              {highlight}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Reviews" description="Short, grounded feedback from the mock data set">
        <div className="grid gap-4 md:grid-cols-2">
          {college.reviews.map((review) => (
            <article key={`${review.author}-${review.role}`} className="rounded-2xl border border-white/10 bg-ink-950/60 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{review.author}</p>
                  <p className="text-sm text-slate-400">{review.role}</p>
                </div>
                <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-100">
                  {review.rating ? review.rating.toFixed(1) : 'N/A'}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">“{review.quote}”</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-panel sm:p-6">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function MetricRow({
  label,
  value,
  note,
  icon
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-950/70 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-2 font-display text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{note}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}