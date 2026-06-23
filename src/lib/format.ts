export const formatRating = (rating: number | null | undefined) => {
  if (rating === null || rating === undefined) return 'Not rated yet';
  return rating.toFixed(1);
};

export const formatList = (items: string[] | undefined, fallback = 'Information not available') => {
  if (!items || items.length === 0) return fallback;
  return items.join(' • ');
};