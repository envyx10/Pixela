import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET() {
  try {
    // Fetch movie genres
    const movieGenres = await fetchFromTmdb('/genre/movie/list');
    // Fetch TV genres
    const tvGenres = await fetchFromTmdb('/genre/tv/list');

    // Combine and deduplicate
    const combinedGenres = new Map();
    
    movieGenres.genres.forEach((g: any) => combinedGenres.set(g.id, g));
    tvGenres.genres.forEach((g: any) => combinedGenres.set(g.id, g));

    const genres = Array.from(combinedGenres.values());

    return NextResponse.json({
        success: true,
        data: genres
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
