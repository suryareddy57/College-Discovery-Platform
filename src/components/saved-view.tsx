"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, RefreshCw } from 'lucide-react';
import { College } from '@/lib/college-data';
import { CollegeCard } from '@/components/college-card';
import { CollegeGridSkeleton } from '@/components/skeletons';
import { PrimaryButton, SectionHeader, StatusCard } from '@/components/ui';
import { useDiscovery } from '@/components/discovery-provider';

export function SavedView() {
  const { savedIds, isSaved, isCompared, toggleCompare, toggleSaved, hydrated } = useDiscovery();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadColleges() {
      try {
        const response = await fetch('/api/colleges');
        if (!response.ok) throw new Error('Unable to load saved colleges');

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

  const savedColleges = colleges.filter((college) => savedIds.includes(college.slug));

  if (loading) return <CollegeGridSkeleton />;

  if (error) {
    return (
      <StatusCard
        variant="error"
        title="Could not load saved colleges"
        description={error}
        action={<PrimaryButton icon={<RefreshCw className="h-4 w-4" />} onClick={() => window.location.reload()}>Retry</PrimaryButton>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Saved colleges"
        title="Keep a shortlist that persists between sessions."
        description="Everything here is synced to localStorage. You can save and remove colleges without losing your list when the page reloads."
      />

      <div className="flex flex-wrap gap-3">
        <PrimaryButton href="/" tone="ghost" icon={<ArrowLeft className="h-4 w-4" />}>Back to discovery</PrimaryButton>
      </div>

      {!hydrated || savedColleges.length === 0 ? (
        <StatusCard
          title="Your saved list is empty"
          description="Tap Save on any college card or detail page, and it will appear here immediately."
          action={<PrimaryButton href="/" icon={<Bookmark className="h-4 w-4" />}>Discover colleges</PrimaryButton>}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedColleges.map((college) => (
            <CollegeCard
              key={college.slug}
              college={college}
              isSaved={isSaved(college.slug)}
              isCompared={isCompared(college.slug)}
              compareDisabled={false}
              onToggleCompare={() => toggleCompare(college.slug)}
              onToggleSaved={() => toggleSaved(college.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}