import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";
import { fetchFromTmdb } from '@/lib/tmdb';
import { logger } from '@/lib/logger';

interface TmdbMediaDetails {
  title?: string;
  name?: string;
  poster_path?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const reviews = await prisma.review.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            photoUrl: true
          }
        }
      }
    });

    // Enriquecer reseñas con datos de TMDB (Título y Poster)
    const enrichedReviews = await Promise.all(
        reviews.map(async (review) => {
            try {
                const tmdbType = review.itemType === 'movie' ? 'movie' : 'tv';
                const tmdbData = await fetchFromTmdb<TmdbMediaDetails>(`${tmdbType}/${review.tmdbId}`);

                return {
                    id: review.id,
                    user_id: review.userId,
                    user_name: review.user.name,
                    photo_url: review.user.photoUrl,
                    tmdb_id: Number(review.tmdbId),
                    item_type: review.itemType,
                    rating: Number(review.rating),
                    review: review.review,
                    created_at: review.createdAt.toISOString(),
                    updated_at: review.updatedAt.toISOString(),
                    // Campos extraídos de TMDB
                    title: tmdbData.title || tmdbData.name || 'Sin título',
                    poster_path: tmdbData.poster_path,
                };
            } catch (error) {
                logger.error(`Error enrichment for review ${review.id}`, error);
                return {
                    id: review.id,
                    user_id: review.userId,
                    user_name: review.user.name,
                    photo_url: review.user.photoUrl,
                    tmdb_id: Number(review.tmdbId),
                    item_type: review.itemType,
                    rating: Number(review.rating),
                    review: review.review,
                    created_at: review.createdAt.toISOString(),
                    updated_at: review.updatedAt.toISOString(),
                    title: `Media #${review.tmdbId}`,
                    poster_path: null,
                };
            }
        })
    );

    return NextResponse.json({
        success: true,
        data: enrichedReviews
    });
  } catch (error) {
    logger.error('Failed to list reviews', error);
    return NextResponse.json({ error: 'Error al listar reseñas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await req.json();
    
    // El frontend envía snake_case
    const { tmdb_id, item_type, rating, review } = body;

    if (!tmdb_id || !item_type || rating === undefined) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newReview = await prisma.review.upsert({
      where: {
        userId_itemType_tmdbId: {
          userId,
          itemType: item_type,
          tmdbId: BigInt(tmdb_id)
        }
      },
      update: {
        rating,
        review,
      },
      create: {
        userId,
        itemType: item_type,
        tmdbId: BigInt(tmdb_id),
        rating,
        review,
      },
      include: {
          user: {
              select: {
                  name: true,
                  photoUrl: true
              }
          }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
          id: newReview.id,
          user_id: newReview.userId,
          user_name: newReview.user.name,
          photo_url: newReview.user.photoUrl,
          tmdb_id: Number(newReview.tmdbId),
          item_type: newReview.itemType,
          rating: Number(newReview.rating),
          review: newReview.review,
          created_at: newReview.createdAt.toISOString(),
          updated_at: newReview.updatedAt.toISOString()
      }
    });

  } catch (error) {
    logger.error('Failed to create/update review', error);
    return NextResponse.json({ error: 'Error al procesar la reseña' }, { status: 500 });
  }
}
