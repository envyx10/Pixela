import { NextRequest } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';
import { paginatedResponse, errorResponse } from '@/lib/api-utils';

// GET /api/movies/top-rated
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const movieService = getTmdbMovieService();
    const movies = await movieService.getTopRatedMovies(page);
    
    return paginatedResponse(movies, page);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
