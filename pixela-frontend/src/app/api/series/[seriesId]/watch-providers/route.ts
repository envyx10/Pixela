import { NextRequest, NextResponse } from 'next/server';
import { getTmdbSeriesService } from '@/lib/services';

interface RouteParams {
  params: Promise<{ seriesId: string }>;
}

// GET /api/series/[seriesId]/watch-providers
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
    const region = searchParams.get('region') || 'ES';
    
    const seriesService = getTmdbSeriesService();
    const providers = await seriesService.getSeriesWatchProviders(seriesIdNum, region);
    
    if (!providers || !providers.results || Object.keys(providers.results).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No streaming providers found for this series',
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
