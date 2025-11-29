import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

// GET /api/movies/discover
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const movieService = getTmdbMovieService();
    const movies = await movieService.getAllDiscoveredMovies(page);
    
    return NextResponse.json({
      success: true,
      page,
      total_pages: movies.total_pages ?? null,
      total_results: movies.total_results ?? null,
      data: movies.results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
