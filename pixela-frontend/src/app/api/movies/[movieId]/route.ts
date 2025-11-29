import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ movieId: string }>;
}

// GET /api/movies/[movieId]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { movieId } = await params;
    const movieIdNum = parseInt(movieId, 10);
    
    if (isNaN(movieIdNum)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid movie ID',
        },
        { status: 400 }
      );
    }
    
    const movieService = getTmdbMovieService();
    const movieDetails = await movieService.getMovieById(movieIdNum);
    
    if (!movieDetails) {
      return NextResponse.json(
        {
          success: false,
          message: 'Movie not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: movieDetails,
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
