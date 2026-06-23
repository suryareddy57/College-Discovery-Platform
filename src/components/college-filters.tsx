"use client";

import { Search } from 'lucide-react';
import { getLocations } from '@/lib/college-data';

export type CollegeFiltersState = {
  search: string;
  location: string;
  fees: string;
  rating: string;
  sort: string;
};

export function CollegeFilters({ filters, onChange }: { filters: CollegeFiltersState; onChange: (next: CollegeFiltersState) => void }) {
  const locations = getLocations();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-panel backdrop-blur-sm sm:p-6">
      <div className="grid gap-4 lg:grid-cols-5">
        <label className="lg:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Search college</span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 focus-within:border-brand-500/40">
            <Search className="h-4 w-4 text-brand-100" />
            <input
              value={filters.search}
              onChange={(event) => onChange({ ...filters, search: event.target.value })}
              placeholder="Search by college name"
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </label>

        <SelectField
          label="Location"
          value={filters.location}
          onChange={(value) => onChange({ ...filters, location: value })}
          options={[{ label: 'All locations', value: 'all' }, ...locations.map((location) => ({ label: location, value: location }))]}
        />

        <SelectField
          label="Fees"
          value={filters.fees}
          onChange={(value) => onChange({ ...filters, fees: value })}
          options={[
            { label: 'All fees', value: 'all' },
            { label: 'Under ₹2 LPA', value: 'under-2' },
            { label: '₹2-5 LPA', value: '2-5' },
            { label: 'Above ₹5 LPA', value: 'above-5' }
          ]}
        />

        <SelectField
          label="Rating"
          value={filters.rating}
          onChange={(value) => onChange({ ...filters, rating: value })}
          options={[
            { label: 'All ratings', value: 'all' },
            { label: '4.5 and above', value: '4.5' },
            { label: '4.0 and above', value: '4.0' },
            { label: '3.5 and above', value: '3.5' }
          ]}
        />

        <SelectField
          label="Sort"
          value={filters.sort}
          onChange={(value) => onChange({ ...filters, sort: value })}
          options={[
            { label: 'Rating high to low', value: 'rating-desc' },
            { label: 'Fees low to high', value: 'fees-asc' },
            { label: 'Fees high to low', value: 'fees-desc' }
          ]}
        />
      </div>
    </section>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-ink-900">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}