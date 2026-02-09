import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { fetchFromTmdb } from "@/lib/tmdb";

interface TmdbMediaDetails {
  title?: string;
  name?: string;
  poster_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    const userId = parseInt(session.user.id);
    const whereClause: any = { userId };

    if (statusFilter) {
      whereClause.status = statusFilter;
    }

    const libraryItems = await prisma.libraryItem.findMany({
      where: whereClause,
      orderBy: { updatedAt: "desc" },
    });

    // Obtener detalles de TMDB para cada item
    const itemsWithDetails = await Promise.all(
      libraryItems.map(async (item) => {
        try {
          const tmdbType = item.itemType === "movie" ? "movie" : "tv";
          const data = await fetchFromTmdb<TmdbMediaDetails>(
            `${tmdbType}/${item.tmdbId}`,
          );

          return {
            id: item.id,
            user_id: item.userId,
            tmdb_id: Number(item.tmdbId),
            item_type: item.itemType,
            status: item.status,
            title: data.title || data.name || "Sin título",
            poster_path: data.poster_path,
            overview: data.overview,
            release_date: data.release_date || data.first_air_date,
            vote_average: data.vote_average,
            updated_at: item.updatedAt,
          };
        } catch (error) {
          console.error(
            `Error fetching TMDB for library item ${item.id}:`,
            error,
          );
          return {
            id: item.id,
            user_id: item.userId,
            tmdb_id: Number(item.tmdbId),
            item_type: item.itemType,
            status: item.status,
            title: "Error al cargar detalles",
            poster_path: null,
            overview: "",
            release_date: "",
            vote_average: 0,
            updated_at: item.updatedAt,
          };
        }
      }),
    );

    return NextResponse.json({
      success: true,
      data: itemsWithDetails,
    });
  } catch (error) {
    console.error("Error listing library:", error);
    return NextResponse.json(
      { error: "Error al listar biblioteca" },
      { status: 500 },
    );
  }
}
