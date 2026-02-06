"use client";

import { useEffect } from "react";
import { useDiscoverStore } from "@/features/discover/store/discoverStore";
import { TrendingSerie, TrendingMovie } from "@/features/discover/types/media";
import { DiscoverContent } from "@/features/discover/components/core/DiscoverContent";

interface DiscoverSectionProps {
  series: TrendingSerie[];
  movies: TrendingMovie[];
}

/**
 * Componente principal de la sección de descubrimiento
 * Maneja el estado global de series y películas
 */
export const DiscoverSection = ({ series, movies }: DiscoverSectionProps) => {
  const { setSeries, setMovies } = useDiscoverStore();

  useEffect(() => {
    const hasValidSeries = series?.length > 0;
    const hasValidMovies = movies?.length > 0;

    if (hasValidSeries) setSeries(series);
    if (hasValidMovies) setMovies(movies);
  }, [series, movies, setSeries, setMovies]);

  return <DiscoverContent />;
};
