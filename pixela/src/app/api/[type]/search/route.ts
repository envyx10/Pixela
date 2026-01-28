import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(
  request: Request,
  props: { params: Promise<{ type: string }> }
) {
  const params = await props.params;
  const { type } = params;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  
  if (!query) {
    return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 });
  }

  // 'movies' -> 'movie', 'series' -> 'tv'
  const tmdbType = type === 'series' ? 'tv' : 'movie';
  
  try {
    const data = await fetchFromTmdb(`/search/${tmdbType}`, {
        query,
        page,
        include_adult: false
    });
    
    return NextResponse.json({
        success: true,
        data: data.results || [],
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results
    });
  } catch (error: any) {
    console.error(`Error in search route for ${type}:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
