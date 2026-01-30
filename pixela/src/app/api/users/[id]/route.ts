import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";
import { logger } from '@/lib/logger';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const userUpdateSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .regex(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*$/, "El nombre solo puede contener letras, números y los caracteres . _ - (sin espacios ni caracteres especiales)")
    .optional(),
  email: z.string().email("Email inválido").optional(),
  photo_url: z.string().url("URL de foto inválida").optional().or(z.literal("")),
  is_admin: z.preprocess((val) => {
    if (typeof val === 'string') return val === 'true';
    return val;
  }, z.boolean()).optional(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").optional(),
});

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
    
    // Validar datos con Zod
    const parseResult = userUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues[0].message }, { status: 400 });
    }

    const { name, email, photo_url, is_admin, password } = parseResult.data;
    const updateData: UpdateUserData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (photo_url !== undefined) updateData.photoUrl = photo_url;
    
    // Solo permitimos cambiar isAdmin si el que edita es admin
    if (isAdmin && is_admin !== undefined) {
      updateData.isAdmin = is_admin;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
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
