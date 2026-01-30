import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';
import { logger } from '@/lib/logger';

interface TmdbDiscoverResponse {
  results: unknown[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  
  const tmdbType = 'movie';
  
  const tmdbParams: Record<string, string> = { page };
  searchParams.forEach((value, key) => {
      if (key !== 'limit' && key !== 'offset') {
          tmdbParams[key] = value;
      }
  });

  try {
    const data = await fetchFromTmdb<TmdbDiscoverResponse>(`/discover/${tmdbType}`, tmdbParams);
    
    return NextResponse.json({
        success: true,
        data: data.results || [],
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results
    });
  } catch (error) {
    logger.error('Failed to discover movies', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: false, error: 'Error al descubrir películas' }, { status: 500 });
  }
}
