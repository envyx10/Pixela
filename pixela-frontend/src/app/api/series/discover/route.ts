import { NextRequest } from 'next/server';
import { getTmdbSeriesService } from '@/lib/services';
import { paginatedResponse, errorResponse } from '@/lib/api-utils';

// GET /api/series/discover
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    const seriesService = getTmdbSeriesService();
    const series = await seriesService.getAllDiscoveredSeries(page);
    
    return paginatedResponse(series, page);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
