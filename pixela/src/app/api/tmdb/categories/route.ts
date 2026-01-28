import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';
import { logger } from '@/lib/logger';

interface Genre {
  id: number;
  name: string;
}

export async function GET() {
  try {
    const movieGenres = await fetchFromTmdb<{ genres: Genre[] }>('/genre/movie/list');
    const tvGenres = await fetchFromTmdb<{ genres: Genre[] }>('/genre/tv/list');

    const combinedGenres = new Map<number, Genre>();
    
    movieGenres.genres.forEach((g) => combinedGenres.set(g.id, g));
    tvGenres.genres.forEach((g) => combinedGenres.set(g.id, g));

    const genres = Array.from(combinedGenres.values());

    return NextResponse.json({
        success: true,
        data: genres
    });
  } catch (error) {
    logger.error('Failed to fetch categories', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' }, 
      { status: 500 }
    );
  }
}
