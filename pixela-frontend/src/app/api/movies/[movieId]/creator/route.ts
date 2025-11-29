import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ movieId: string }>;
}

// GET /api/movies/[movieId]/creator
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
    const creatorData = await movieService.getMovieCreator(movieIdNum);
    
    return NextResponse.json({
      success: true,
      data: creatorData,
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
