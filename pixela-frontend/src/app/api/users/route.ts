import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    const mappedUsers = users.map(user => ({
      user_id: user.id,
      name: user.name,
      email: user.email,
      photo_url: user.photoUrl,
      is_admin: user.isAdmin,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    }));

    return NextResponse.json({
        success: true,
        users: mappedUsers
    });
  } catch (error) {
    console.error("Error listing users:", error);
    return NextResponse.json({ error: 'Error al listar usuarios' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, password, is_admin } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este email ya está registrado.' }, { status: 400 });
    }

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: is_admin === true || is_admin === 'true',
      },
    });

    return NextResponse.json({
        success: true,
        user: {
            user_id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }
    });

  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: 'Ocurrió un error en el servidor.' }, { status: 500 });
  }
}
