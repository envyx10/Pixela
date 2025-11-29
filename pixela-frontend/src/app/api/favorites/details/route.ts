import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_LANGUAGE = 'es-ES';

interface TmdbDetails {
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
}

async function fetchTmdbDetails(type: string, tmdbId: number): Promise<TmdbDetails | null> {
  const url = type === 'movie'
    ? `${TMDB_BASE_URL}/movie/${tmdbId}`
    : `${TMDB_BASE_URL}/tv/${tmdbId}`;

  try {
    const response = await fetch(
      `${url}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}`,
      { next: { revalidate: 43200 } } // Cache for 12 hours
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

// GET /api/favorites/details - Get favorites with TMDB details
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = parseInt(session.user.id, 10);
    
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    const detailedFavorites = await Promise.all(
      favorites.map(async (fav) => {
        const details = await fetchTmdbDetails(fav.itemType, fav.tmdbId);
        
        return {
          id: fav.id,
          user_id: fav.userId,
          tmdb_id: fav.tmdbId,
          item_type: fav.itemType,
          title: fav.itemType === 'movie' ? details?.title : details?.name,
          poster_path: details?.poster_path ?? null,
          release_date: fav.itemType === 'movie' 
            ? details?.release_date 
            : details?.first_air_date,
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      message: 'Favorites with details retrieved successfully',
      data: detailedFavorites,
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
