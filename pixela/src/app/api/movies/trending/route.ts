import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const tmdbData = await fetchFromTmdb('/trending/movie/week', { page });
    
    // Wrapper para mantener compatibilidad con el frontend actual
    return NextResponse.json({
        success: true,
        data: tmdbData.results || []
    });
  } catch (error: any) {
    console.error("Error in movies trending route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
