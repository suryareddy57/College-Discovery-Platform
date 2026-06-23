"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Columns3, MapPin, Star } from 'lucide-react';
import { College } from '@/lib/college-data';
import { formatRating } from '@/lib/format';
import { Chip, PrimaryButton, SavedBadge } from '@/components/ui';

export function CollegeCard({
  college,
  isSaved,
  isCompared,
  compareDisabled,
  onToggleCompare,
  onToggleSaved
}: {
  college: College;
  isSaved: boolean;
  isCompared: boolean;
  compareDisabled?: boolean;
  onToggleCompare: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-panel transition hover:-translate-y-1 hover:border-brand-500/30">
      <div className="relative h-56 overflow-hidden">
        {college.image ? (
          <CollegeImage image={college.image} alt={college.name} />
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

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent px-5 pb-4 pt-16">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-display text-xl font-semibold text-white">{college.name}</h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-200">
                <MapPin className="h-4 w-4 text-brand-100" />
                <span>{college.location}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-right backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-300">Fees</p>
              <p className="text-sm font-semibold text-white">{college.feesText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>{college.courses[0] ?? 'Flexible programs'}</Chip>
          <Chip>{college.highlights[0] ?? 'Strong academic culture'}</Chip>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBlock label="Rating" value={formatRating(college.rating)} icon={<Star className="h-4 w-4 text-gold-100" />} />
          <StatBlock label="Mode" value="Campus" icon={<Columns3 className="h-4 w-4 text-brand-100" />} />
        </div>

        <div className="flex flex-wrap gap-2">
          <PrimaryButton href={`/colleges/${college.slug}`} icon={<ArrowRight className="h-4 w-4" />}>
            View details
          </PrimaryButton>
          <PrimaryButton
            tone="ghost"
            icon={<Columns3 className="h-4 w-4" />}
            onClick={onToggleCompare}
            disabled={compareDisabled && !isCompared}
          >
            {isCompared ? 'Remove compare' : 'Compare'}
          </PrimaryButton>
          <button
            type="button"
            onClick={onToggleSaved}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            <SavedBadge active={isSaved} />
          </button>
        </div>
      </div>
    </article>
  );
}

function CollegeImage({ image, alt }: { image: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 text-center">
        <div>
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <MapPin className="h-6 w-6 text-brand-100" />
          </div>
          <p className="text-sm font-medium text-slate-200">Image unavailable</p>
          <p className="mt-1 text-xs text-slate-400">Fallback preview shown safely</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition duration-500 group-hover:scale-105"
      onError={() => setErrored(true)}
    />
  );
}

function StatBlock({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}