import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(
  request: Request,
  props: { params: Promise<{ type: string; id: string }> }
) {
  const params = await props.params;
  const { type, id } = params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  
  // 'movies' -> 'movie', 'series' -> 'tv'
  const tmdbType = type === 'series' ? 'tv' : 'movie';
  
  try {
    const data = await fetchFromTmdb(`/discover/${tmdbType}`, {
        page,
        with_genres: id,
        sort_by: 'popularity.desc'
    });
    
    return NextResponse.json({
        success: true,
        data: data.results || [],
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results
    });
  } catch (error: any) {
    console.error(`Error in genre route for ${type}/${id}:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
