import { NextResponse } from 'next/server';
import { collegeData } from '@/lib/college-data';

export async function GET() {
  return NextResponse.json(collegeData, { headers: { 'Cache-Control': 'no-store' } });
}