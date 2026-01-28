import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await fetchFromTmdb(`/tv/${id}/images`);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
