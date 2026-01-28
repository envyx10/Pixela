import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(request: Request, props: { params: Promise<{ type: string }> }) {
  const params = await props.params;
  const { type } = params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  
  // Map pixela type to tmdb type
  // 'movies' -> 'movie'
  // 'series' -> 'tv'
  const tmdbType = type === 'series' ? 'tv' : 'movie';
  
  // Extra params pass-through (genre, sort, etc)
  const tmdbParams: Record<string, string> = { page };
  searchParams.forEach((value, key) => {
      if (key !== 'limit' && key !== 'offset') {
          tmdbParams[key] = value;
      }
  });

  try {
    const data = await fetchFromTmdb(`/discover/${tmdbType}`, tmdbParams);
    
    return NextResponse.json({
        success: true,
        data: data.results || [],
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results
    });
  } catch (error: any) {
    console.error(`Error in discover route for ${type}:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
