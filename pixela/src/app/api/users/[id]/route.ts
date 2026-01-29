import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";
import { logger } from '@/lib/logger';
import bcrypt from 'bcryptjs';

interface UpdateUserData {
  name?: string;
  email?: string;
  photoUrl?: string;
  isAdmin?: boolean;
  password?: string;
}

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

    const currentUserId = parseInt(session.user.id);
    const isAdmin = session.user.isAdmin;

    // Solo el propio usuario o un admin pueden editar
    if (currentUserId !== id && !isAdmin) {
      return NextResponse.json({ error: 'No tienes permiso para editar este perfil' }, { status: 403 });
    }

    const body = await request.json();
    
    const updateData: UpdateUserData = {};

    // Solo actualizar campos que vienen en el body (no undefined)
    if (body.name !== undefined) {
      updateData.name = body.name;
    }
    
    if (body.email !== undefined) {
      updateData.email = body.email;
    }
    
    if (body.photo_url !== undefined) {
      updateData.photoUrl = body.photo_url;
    }

    // Solo permitimos cambiar isAdmin si el que edita es admin
    if (isAdmin && body.is_admin !== undefined) {
      updateData.isAdmin = body.is_admin === true || body.is_admin === 'true';
    }

    if (body.password && body.password.trim().length >= 8) {
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
        success: true,
        user: {
            user_id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo_url: updatedUser.photoUrl,
            is_admin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        }
    });
  } catch (error) {
    logger.error('Failed to update user', error, { userId: id });
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
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

    const currentUserId = parseInt(session.user.id);
    const isAdmin = session.user.isAdmin;

    // Solo el propio usuario o un admin pueden borrar
    if (currentUserId !== id && !isAdmin) {
      return NextResponse.json({ error: 'No tienes permiso para eliminar este perfil' }, { status: 403 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Failed to delete user', error, { userId: id });
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
