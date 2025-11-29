import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { ItemType, Review, User } from '@prisma/client';
import { isValidItemType, errorResponse } from '@/lib/api-utils';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_LANGUAGE = 'es-ES';

interface TmdbDetails {
  title?: string;
  name?: string;
  poster_path?: string | null;
}

interface RouteParams {
  params: Promise<{ tmdbId: string; itemType: string }>;
}

async function fetchTmdbDetails(type: string, tmdbId: number): Promise<TmdbDetails | null> {
  const url = type === 'movie'
    ? `${TMDB_BASE_URL}/movie/${tmdbId}`
    : `${TMDB_BASE_URL}/tv/${tmdbId}`;

  try {
    const response = await fetch(
      `${url}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}`,
      { next: { revalidate: 43200 } }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

// GET /api/reviews/media/[tmdbId]/[itemType] - Get all reviews for a specific media
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return errorResponse('Unauthorized', 401);
    }
    
    const { tmdbId, itemType } = await params;
    const tmdbIdNum = parseInt(tmdbId, 10);
    
    if (isNaN(tmdbIdNum)) {
      return errorResponse('Invalid TMDB ID', 400);
    }
    
    if (!isValidItemType(itemType)) {
      return errorResponse('Invalid item type. Must be either "movie" or "series".', 400);
    }
    
    const reviews = await prisma.review.findMany({
      where: {
        tmdbId: tmdbIdNum,
        itemType: itemType as ItemType,
      },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    
    // Fetch TMDB details once
    const details = await fetchTmdbDetails(itemType, tmdbIdNum);
    
    const detailedReviews = reviews.map((review: Review & { user: User | null }) => ({
      id: review.id,
      user_id: review.userId,
      user_name: review.user?.name ?? null,
      photo_url: review.user?.photoUrl ?? null,
      tmdb_id: review.tmdbId,
      item_type: review.itemType,
      rating: review.rating,
      review: review.review,
      created_at: review.createdAt,
      updated_at: review.updatedAt,
      title: itemType === 'movie' ? details?.title : details?.name,
      poster_path: details?.poster_path ?? null,
    }));
    
    return NextResponse.json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: detailedReviews,
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
