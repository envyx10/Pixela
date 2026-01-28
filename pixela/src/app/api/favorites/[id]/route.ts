import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";
import { logger } from '@/lib/logger';

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

    const userId = parseInt(session.user.id);

    // Comprobar que el favorito pertenece al usuario
    const favorite = await prisma.favorite.findUnique({
      where: { id }
    });

    if (!favorite || favorite.userId !== userId) {
      return NextResponse.json({ error: 'No tienes permiso para eliminar este favorito' }, { status: 403 });
    }

    await prisma.favorite.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Failed to delete favorite', error, { favoriteId: id });
    return NextResponse.json({ error: 'Error al eliminar favorito' }, { status: 500 });
  }
}
