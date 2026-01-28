import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    // TMDB endpoint
    const data = await fetchFromTmdb(`/movie/${id}`, {
        append_to_response: 'credits,videos,images,similar,watch/providers',
        include_image_language: 'en,null,es'
    });
    
    return NextResponse.json({
        success: true,
        data: data
    });
  } catch (error: any) {
    if (error.message.includes('404')) {
         return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
