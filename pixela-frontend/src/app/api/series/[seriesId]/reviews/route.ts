import { NextRequest, NextResponse } from 'next/server';
import { getTmdbSeriesService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ seriesId: string }>;
}

// GET /api/series/[seriesId]/reviews
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { seriesId } = await params;
    const seriesIdNum = parseInt(seriesId, 10);
    
    if (isNaN(seriesIdNum)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid series ID',
        },
        { status: 400 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const seriesService = getTmdbSeriesService();
    const reviews = await seriesService.getSeriesReviews(seriesIdNum, page);
    
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
