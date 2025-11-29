import { NextRequest } from 'next/server';
import { getTmdbSeriesService } from '@/lib/services';
import { paginatedResponse, errorResponse } from '@/lib/api-utils';

// GET /api/series/search?query=...&page=1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    if (!query) {
      return errorResponse('Search query is required', 400);
    }
    
    const seriesService = getTmdbSeriesService();
    const series = await seriesService.searchSeries(query, page);
    
    return paginatedResponse(series, page);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
