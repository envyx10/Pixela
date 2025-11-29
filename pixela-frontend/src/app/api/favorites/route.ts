import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { ItemType } from '@prisma/client';
import { isValidItemType, errorResponse } from '@/lib/api-utils';

// POST /api/favorites - Add a favorite
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return errorResponse('Unauthorized', 401);
    }
    
    const body = await request.json();
    const { tmdb_id, item_type } = body;
    
    if (!tmdb_id || !item_type) {
      return errorResponse('tmdb_id and item_type are required', 400);
    }
    
    if (!isValidItemType(item_type)) {
      return errorResponse('item_type must be either "movie" or "series"', 400);
    }
    
    const userId = session.user.id;
    
    // Check if favorite already exists
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        tmdbId: tmdb_id,
        itemType: item_type as ItemType,
      },
    });
    
    if (existingFavorite) {
      return errorResponse('Favorite item already exists', 400);
    }
    
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        tmdbId: tmdb_id,
        itemType: item_type as ItemType,
      },
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Favorite item added successfully',
        data: favorite,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Unknown error', 500);
  }
}
