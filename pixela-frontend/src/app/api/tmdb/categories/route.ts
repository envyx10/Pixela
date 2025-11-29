import { NextResponse } from 'next/server';
import { getTmdbService } from '@/lib/services';

// GET /api/tmdb/categories
export async function GET() {
  try {
    const tmdbService = getTmdbService();
    const categories = await tmdbService.getAllCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
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
