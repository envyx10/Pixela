import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { WatchStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !Object.values(WatchStatus).includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const userId = parseInt(session.user.id);
    const libraryItemId = parseInt(id);

    // Verificar que el item pertenezca al usuario
    const existingItem = await prisma.libraryItem.findUnique({
      where: { id: libraryItemId },
    });

    if (!existingItem || existingItem.userId !== userId) {
      return NextResponse.json(
        { error: "Item no encontrado o no autorizado" },
        { status: 404 },
      );
    }

    const updatedItem = await prisma.libraryItem.update({
      where: { id: libraryItemId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...updatedItem,
        tmdbId: updatedItem.tmdbId.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating library item:", error);
    return NextResponse.json(
      { error: "Error al actualizar item" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const userId = parseInt(session.user.id);
    const libraryItemId = parseInt(id);

    const existingItem = await prisma.libraryItem.findUnique({
      where: { id: libraryItemId },
    });

    if (!existingItem || existingItem.userId !== userId) {
      return NextResponse.json(
        { error: "Item no encontrado o no autorizado" },
        { status: 404 },
      );
    }

    await prisma.libraryItem.delete({
      where: { id: libraryItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting library item:", error);
    return NextResponse.json(
      { error: "Error al eliminar item" },
      { status: 500 },
    );
  }
}
