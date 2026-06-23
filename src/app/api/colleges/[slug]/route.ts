import { NextResponse } from 'next/server';
import { getCollegeBySlug } from '@/lib/college-data';

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);

  if (!college) {
    return NextResponse.json({ message: 'College not found' }, { status: 404 });
  }

  return NextResponse.json(college, { headers: { 'Cache-Control': 'no-store' } });
}