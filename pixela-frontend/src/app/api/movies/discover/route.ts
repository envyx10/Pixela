import { NextRequest } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';
import { paginatedResponse, errorResponse } from '@/lib/api-utils';

// GET /api/movies/discover
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const movieService = getTmdbMovieService();
    const movies = await movieService.getAllDiscoveredMovies(page);
    
    return paginatedResponse(movies, page);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
