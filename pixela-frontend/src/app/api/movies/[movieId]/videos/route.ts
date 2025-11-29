import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ movieId: string }>;
}

// GET /api/movies/[movieId]/videos
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
    const videos = await movieService.getMovieVideos(movieIdNum);
    
    if (!videos) {
      return NextResponse.json(
        {
          success: false,
          message: 'No videos found for this movie',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: videos,
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
