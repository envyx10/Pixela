import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { ItemType } from '@prisma/client';
import { isValidItemType, errorResponse } from '@/lib/api-utils';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_LANGUAGE = 'es-ES';

interface TmdbDetails {
  title?: string;
  name?: string;
  poster_path?: string | null;
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

// GET /api/reviews - Get user's reviews
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    const reviews = await prisma.review.findMany({
      where: { userId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    
    const detailedReviews = await Promise.all(
      reviews.map(async (review) => {
        const details = await fetchTmdbDetails(review.itemType, review.tmdbId);
        
        return {
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
          title: review.itemType === 'movie' ? details?.title : details?.name,
          poster_path: details?.poster_path ?? null,
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: detailedReviews,
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

// POST /api/reviews - Add a new review
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return errorResponse('Unauthorized', 401);
    }
    
    const body = await request.json();
    const { item_type, tmdb_id, rating, review: reviewText } = body;
    
    // Validation
    if (!item_type || !tmdb_id || rating === undefined) {
      return errorResponse('item_type, tmdb_id, and rating are required', 400);
    }
    
    if (!isValidItemType(item_type)) {
      return errorResponse('item_type must be either "movie" or "series"', 400);
    }
    
    if (typeof rating !== 'number' || rating < 0 || rating > 10) {
      return errorResponse('rating must be a number between 0 and 10', 400);
    }
    
    if (reviewText && reviewText.length > 600) {
      return errorResponse('review must be at most 600 characters', 400);
    }
    
    const userId = session.user.id;
    
    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        tmdbId: tmdb_id,
        itemType: item_type as ItemType,
      },
    });
    
    if (existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review already exists' },
        { status: 400 }
      );
    }
    
    const newReview = await prisma.review.create({
      data: {
        userId,
        tmdbId: tmdb_id,
        itemType: item_type as ItemType,
        rating: rating,
        review: reviewText || null,
      },
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Review added successfully',
        data: newReview,
      },
      { status: 201 }
    );
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
