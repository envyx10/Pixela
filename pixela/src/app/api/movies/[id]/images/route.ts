import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';
import { logger } from '@/lib/logger';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await fetchFromTmdb(`/movie/${id}/images`);
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Failed to fetch movie images', error, { movieId: id });
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Error al obtener imágenes' }, { status: 500 });
  }
}
