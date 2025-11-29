import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { ItemType } from '@prisma/client';

// POST /api/favorites - Add a favorite
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { tmdb_id, item_type } = body;
    
    if (!tmdb_id || !item_type) {
      return NextResponse.json(
        { success: false, message: 'tmdb_id and item_type are required' },
        { status: 400 }
      );
    }
    
    if (!['movie', 'series'].includes(item_type)) {
      return NextResponse.json(
        { success: false, message: 'item_type must be either "movie" or "series"' },
        { status: 400 }
      );
    }
    
    const userId = parseInt(session.user.id, 10);
    
    // Check if favorite already exists
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        tmdbId: tmdb_id,
        itemType: item_type as ItemType,
      },
    });
    
    if (existingFavorite) {
      return NextResponse.json(
        { success: false, message: 'Favorite item already exists' },
        { status: 400 }
      );
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
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
