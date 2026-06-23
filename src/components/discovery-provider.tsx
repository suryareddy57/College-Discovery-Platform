"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type DiscoveryContextValue = {
  savedIds: string[];
  compareIds: string[];
  hydrated: boolean;
  toggleSaved: (slug: string) => void;
  toggleCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isSaved: (slug: string) => boolean;
  isCompared: (slug: string) => boolean;
};

const DiscoveryContext = createContext<DiscoveryContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  saved: 'college-discovery.saved',
  compare: 'college-discovery.compare'
};

const readStoredArray = (key: string) => {
  if (typeof window === 'undefined') return [] as string[];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [] as string[];

    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [] as string[];
  }
};

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSavedIds(readStoredArray(STORAGE_KEYS.saved));
    setCompareIds(readStoredArray(STORAGE_KEYS.compare));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedIds));
    window.localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(compareIds));
  }, [compareIds, hydrated, savedIds]);

  const value = useMemo<DiscoveryContextValue>(
    () => ({
      savedIds,
      compareIds,
      hydrated,
      toggleSaved: (slug) => {
        setSavedIds((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
      },
      toggleCompare: (slug) => {
        let handled = true;

        setCompareIds((current) => {
          if (current.includes(slug)) {
            return current.filter((item) => item !== slug);
          }

          if (current.length >= 3) {
            handled = false;
            return current;
          }

          return [...current, slug];
        });

        return handled;
      },
      removeFromCompare: (slug) => {
        setCompareIds((current) => current.filter((item) => item !== slug));
      },
      clearCompare: () => {
        setCompareIds([]);
      },
      isSaved: (slug) => savedIds.includes(slug),
      isCompared: (slug) => compareIds.includes(slug)
    }),
    [compareIds, hydrated, savedIds]
  );

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>;
}

export function useDiscovery() {
  const context = useContext(DiscoveryContext);

  if (!context) {
    throw new Error('useDiscovery must be used within the DiscoveryProvider');
  }

  return context;
}