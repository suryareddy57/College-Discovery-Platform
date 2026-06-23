import { CollegeDetailView } from '@/components/college-detail-view';

export default async function CollegePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <CollegeDetailView slug={slug} />;
}