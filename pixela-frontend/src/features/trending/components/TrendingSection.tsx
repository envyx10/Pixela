'use client';

import { useEffect } from 'react';
import { useTrendingStore } from '@/features/trending/store';
import { TrendingSerie, TrendingMovie } from '@/features/trending/type';
import { TrendingHeader } from '@/features/trending/components/TrendingHeader';

interface TrendingSectionProps {
  series: TrendingSerie[];
  movies: TrendingMovie[];
}

export const TrendingSection = ({ series, movies }: TrendingSectionProps) => {
  // Obtenemos las funciones para actualizar el estado
  const setSeries = useTrendingStore((state) => state.setSeries);
  const setMovies = useTrendingStore((state) => state.setMovies);

  // Inicializamos el store con los datos recibidos
  useEffect(() => {
    if (series && series.length > 0) {
      setSeries(series);
    }
    if (movies && movies.length > 0) {
      setMovies(movies);
    }
  }, [series, movies, setSeries, setMovies]);

  // Renderizamos el header (que internamente obtiene los datos del store)
  return <TrendingHeader />;
}; 