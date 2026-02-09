import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ItemType, WatchStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await request.json();
    const { tmdb_id, item_type, status } = body;

    if (!tmdb_id || !item_type) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 },
      );
    }

    // Validar status si se envía
    let watchStatus: WatchStatus = WatchStatus.PLAN_TO_WATCH;
    if (status && Object.values(WatchStatus).includes(status)) {
      watchStatus = status;
    }

    const libraryItem = await prisma.libraryItem.create({
      data: {
        userId,
        tmdbId: BigInt(tmdb_id),
        itemType: item_type === "movie" ? ItemType.movie : ItemType.series,
        status: watchStatus,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...libraryItem,
        tmdbId: libraryItem.tmdbId.toString(), // BigInt serialization
      },
    });
  } catch (error) {
    console.error("Error adding to library:", error);
    return NextResponse.json(
      { error: "Error al añadir a la biblioteca" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tmdbId = searchParams.get("tmdbId");
    const itemType = searchParams.get("itemType");

    if (!tmdbId || !itemType) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const userId = parseInt(session.user.id);
    const item = await prisma.libraryItem.findFirst({
      where: {
        userId,
        tmdbId: BigInt(tmdbId),
        itemType: itemType === "movie" ? ItemType.movie : ItemType.series,
      },
    });

    if (!item) {
      return NextResponse.json({ inLibrary: false });
    }

    return NextResponse.json({
      inLibrary: true,
      data: {
        ...item,
        tmdbId: item.tmdbId.toString(),
      },
    });
  } catch (error) {
    console.error("Error checking library status:", error);
    return NextResponse.json(
      { error: "Error al verificar estado" },
      { status: 500 },
    );
  }
}
