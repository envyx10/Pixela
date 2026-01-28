import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";

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

    const currentUserId = parseInt((session.user as any).id);
    const isAdmin = (session.user as any).isAdmin;

    // Solo el propio usuario o un admin pueden editar
    if (currentUserId !== id && !isAdmin) {
      return NextResponse.json({ error: 'No tienes permiso para editar este perfil' }, { status: 403 });
    }

    const body = await request.json();
    
    const updateData: any = {
      name: body.name,
      email: body.email,
      photoUrl: body.photo_url,
    };

    // Solo permitimos cambiar isAdmin si el que edita es admin
    if (isAdmin && body.is_admin !== undefined) {
      updateData.isAdmin = body.is_admin === true || body.is_admin === 'true';
    }

    // Gestionar cambio de contraseña si viene en el body
    if (body.password && body.password.trim().length >= 8) {
        const bcrypt = require('bcryptjs');
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
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: error.message || 'Error al actualizar usuario' }, { status: 500 });
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

    const currentUserId = parseInt((session.user as any).id);
    const isAdmin = (session.user as any).isAdmin;

    // Solo el propio usuario o un admin pueden borrar
    if (currentUserId !== id && !isAdmin) {
      return NextResponse.json({ error: 'No tienes permiso para eliminar este perfil' }, { status: 403 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message || 'Error al eliminar usuario' }, { status: 500 });
  }
}
