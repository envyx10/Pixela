import { NextRequest, NextResponse } from 'next/server';
import { getTmdbService } from '@/lib/services';

// GET /api/tmdb/trending
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const tmdbService = getTmdbService();
    const trending = await tmdbService.getAllTrending(page);
    
    return NextResponse.json({
      success: true,
      page,
      total_pages: trending.total_pages,
      total_results: trending.total_results,
      data: trending.results,
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
