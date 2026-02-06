import { NextResponse } from "next/server";
import { fetchFromTmdb } from "@/lib/tmdb";
import { logger } from "@/lib/logger";

interface TmdbSearchResponse {
  results: unknown[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json(
      { success: false, error: "Query parameter is required" },
      { status: 400 },
    );
  }

  const tmdbParams: Record<string, string> = {
    page,
    query,
    include_adult: "false",
    language: "es-ES",
  };

  try {
    const data = await fetchFromTmdb<TmdbSearchResponse>(
      "/search/movie",
      tmdbParams,
    );

    return NextResponse.json({
      success: true,
      data: data.results || [],
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
  } catch (error) {
    logger.error("Failed to search movies", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Error al buscar películas" },
      { status: 500 },
    );
  }
}
