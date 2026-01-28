import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  
  const tmdbType = 'tv';
  
  const tmdbParams: Record<string, string> = { page };
  searchParams.forEach((value, key) => {
      if (key !== 'limit' && key !== 'offset') {
          tmdbParams[key] = value;
      }
  });

  try {
    const data = await fetchFromTmdb(`/discover/${tmdbType}`, tmdbParams);
    
    return NextResponse.json({
        success: true,
        data: data.results || [],
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results
    });
  } catch (error: any) {
    console.error("Error in series discover route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
