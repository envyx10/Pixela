import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';
import { logger } from '@/lib/logger';

interface TmdbTrendingResponse {
  results: unknown[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const tmdbData = await fetchFromTmdb<TmdbTrendingResponse>('/trending/tv/week', { page });
    
    return NextResponse.json({
        success: true,
        data: tmdbData.results || []
    });
  } catch (error) {
    logger.error('Failed to fetch trending series', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: false, error: 'Error al obtener series en tendencia' }, { status: 500 });
  }
}
