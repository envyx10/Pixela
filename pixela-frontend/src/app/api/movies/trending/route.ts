import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

// Helper for paginated responses
function paginatedResponse(data: { results: unknown[]; total_pages?: number; total_results?: number }, page: number) {
  return NextResponse.json({
    success: true,
    page,
    total_pages: data.total_pages ?? null,
    total_results: data.total_results ?? null,
    data: data.results,
  });
}

// GET /api/movies/trending
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const movieService = getTmdbMovieService();
    const movies = await movieService.getTrendingMovies(page);
    
    return paginatedResponse(movies, page);
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
