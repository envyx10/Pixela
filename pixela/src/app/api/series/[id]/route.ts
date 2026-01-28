import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';
import { logger } from '@/lib/logger';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await fetchFromTmdb(`/tv/${id}`, {
        append_to_response: 'credits,videos,images,similar,watch/providers',
        include_image_language: 'en,null,es'
    });
    
    return NextResponse.json({
        success: true,
        data: data
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    }
    
    logger.error('Failed to fetch series details', error, { seriesId: id });
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Error al obtener detalles de la serie' }, { status: 500 });
  }
}
