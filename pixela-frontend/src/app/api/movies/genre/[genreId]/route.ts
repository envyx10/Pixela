import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ genreId: string }>;
}

// GET /api/movies/genre/[genreId]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { genreId } = await params;
    const genreIdNum = parseInt(genreId, 10);
    
    if (isNaN(genreIdNum)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid genre ID',
        },
        { status: 400 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const movieService = getTmdbMovieService();
    const movies = await movieService.getMovieByGenre(genreIdNum, page);
    
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
