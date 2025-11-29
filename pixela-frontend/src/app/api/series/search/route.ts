import { NextRequest, NextResponse } from 'next/server';
import { getTmdbSeriesService } from '@/lib/services';

// GET /api/series/search?query=...&page=1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: 'Search query is required',
        },
        { status: 400 }
      );
    }
    
    const seriesService = getTmdbSeriesService();
    const series = await seriesService.searchSeries(query, page);
    
    return NextResponse.json({
      success: true,
      page,
      total_pages: series.total_pages ?? null,
      total_results: series.total_results ?? null,
      data: series.results,
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
