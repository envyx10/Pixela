import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  props: { params: Promise<{ tmdbId: string; itemType: string }> }
) {
  const params = await props.params;
  const tmdbId = BigInt(params.tmdbId);
  const itemType = params.itemType as any;

  try {
    const reviews = await prisma.review.findMany({
      where: {
        tmdbId,
        itemType,
      },
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

    const mappedReviews = reviews.map(review => ({
      id: review.id,
      user_id: review.userId,
      user_name: review.user.name,
      photo_url: review.user.photoUrl,
      tmdb_id: Number(review.tmdbId),
      item_type: review.itemType,
      rating: Number(review.rating),
      review: review.review,
      created_at: review.createdAt.toISOString(),
      updated_at: review.updatedAt.toISOString()
    }));

    return NextResponse.json({
        success: true,
        data: mappedReviews
    });
  } catch (error) {
    console.error("Error fetching media reviews:", error);
    return NextResponse.json({ error: 'Error al obtener reseñas' }, { status: 500 });
  }
}
