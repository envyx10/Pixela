import { NextRequest, NextResponse } from 'next/server';
import { getTmdbSeriesService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ seriesId: string }>;
}

// GET /api/series/[seriesId]
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
    
    const seriesService = getTmdbSeriesService();
    const seriesDetails = await seriesService.getSeriesById(seriesIdNum);
    
    if (!seriesDetails) {
      return NextResponse.json(
        {
          success: false,
          message: 'Series not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: seriesDetails,
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
