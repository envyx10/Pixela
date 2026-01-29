import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Obtener datos frescos de la BD en lugar de usar session
  const userId = parseInt(session.user.id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
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

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      user_id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      photo_url: user.photoUrl,
      image: user.photoUrl,
      is_admin: user.isAdmin,
      isAdmin: user.isAdmin,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    },
  });
}
