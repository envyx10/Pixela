import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { logger } from '@/lib/logger';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .regex(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*$/, "El nombre solo puede contener letras, números y los caracteres . _ - (sin espacios ni caracteres especiales)"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validar datos
    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues[0].message }, { status: 400 });
    }

    const { name, email, password } = parseResult.data;

    // Comprobar si existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este email ya está registrado.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // No verificamos email por defecto en esta versión simplificada
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    logger.error('Registration failed', error);
    return NextResponse.json({ error: 'Ocurrió un error en el servidor.' }, { status: 500 });
  }
}
