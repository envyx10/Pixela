import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";
import { fetchFromTmdb } from '@/lib/tmdb';

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const userId = parseInt((session.user as any).id);
    const body = await request.json();

    const review = await prisma.review.findUnique({
      where: { id }
    });

    if (!review || review.userId !== userId) {
      return NextResponse.json({ error: 'No tienes permiso para editar esta reseña' }, { status: 403 });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        rating: body.rating,
        review: body.review,
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

    // Enriquecer con datos de TMDB para mantener consistencia
    const tmdbType = updatedReview.itemType === 'movie' ? 'movie' : 'tv';
    const tmdbData = await fetchFromTmdb(`${tmdbType}/${updatedReview.tmdbId}`);

    return NextResponse.json({
        success: true,
        data: {
            id: updatedReview.id,
            user_id: updatedReview.userId,
            user_name: updatedReview.user.name,
            photo_url: updatedReview.user.photoUrl,
            tmdb_id: Number(updatedReview.tmdbId),
            item_type: updatedReview.itemType,
            rating: Number(updatedReview.rating),
            review: updatedReview.review,
            created_at: updatedReview.createdAt.toISOString(),
            updated_at: updatedReview.updatedAt.toISOString(),
            title: tmdbData.title || tmdbData.name || 'Sin título',
            poster_path: tmdbData.poster_path,
        }
    });
  } catch (error: any) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: 'Error al actualizar reseña' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const userId = parseInt((session.user as any).id);

    const review = await prisma.review.findUnique({
      where: { id }
    });

    if (!review || (review.userId !== userId && !(session.user as any).isAdmin)) {
      return NextResponse.json({ error: 'No tienes permiso para eliminar esta reseña' }, { status: 403 });
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: 'Error al eliminar reseña' }, { status: 500 });
  }
}
