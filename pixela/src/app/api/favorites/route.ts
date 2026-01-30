import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await req.json();
    const { tmdb_id, item_type } = body;

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        tmdbId: BigInt(tmdb_id),
        itemType: item_type,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
          id: favorite.id,
          user_id: favorite.userId,
          tmdb_id: Number(favorite.tmdbId),
          item_type: favorite.itemType
      }
    });

  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: 'Ya está en favoritos' }, { status: 400 });
    }
    logger.error('Failed to create favorite', error);
    return NextResponse.json({ error: 'Error al añadir a favoritos' }, { status: 500 });
  }
}
