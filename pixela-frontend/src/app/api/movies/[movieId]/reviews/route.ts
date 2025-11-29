import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ movieId: string }>;
}

// GET /api/movies/[movieId]/reviews
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
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const movieService = getTmdbMovieService();
    const reviews = await movieService.getMovieReviews(movieIdNum, page);
    
    return NextResponse.json({
      success: true,
      data: reviews,
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
