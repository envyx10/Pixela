import { NextRequest, NextResponse } from 'next/server';
import { getTmdbMovieService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ movieId: string }>;
}

// GET /api/movies/[movieId]/watch-providers
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
    const region = searchParams.get('region') || 'ES';
    
    const movieService = getTmdbMovieService();
    const providers = await movieService.getMovieWatchProviders(movieIdNum, region);
    
    if (!providers || !providers.results || Object.keys(providers.results).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No streaming providers found for this movie',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: providers,
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
