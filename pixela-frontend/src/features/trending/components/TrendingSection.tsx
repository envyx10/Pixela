'use client';

import { useEffect } from 'react';
import { useTrendingStore } from '@/features/trending/store';
import { TrendingSerie, TrendingMovie } from '@/features/trending/type';
import { TrendingHeader } from '@/features/trending/components/TrendingHeader';

/**
 * Props para el componente TrendingSection
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 */
interface TrendingSectionProps {
  series: TrendingSerie[];
  movies: TrendingMovie[];
}

/**
 * Elimina elementos duplicados basándose en el ID
 * @param items Array de elementos con ID
 * @returns Array sin duplicados
 */
const removeDuplicates = <T extends { id: number }>(items: T[]): T[] => {
  const seen = new Set<number>();
  return items.filter(item => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};

/**
 * Hook personalizado para manejar la inicialización del store de tendencias
 */
const useTrendingInitialization = (series: TrendingSerie[], movies: TrendingMovie[]) => {
  const setSeries = useTrendingStore((state) => state.setSeries);
  const setMovies = useTrendingStore((state) => state.setMovies);

  useEffect(() => {
    const hasValidSeries = series?.length > 0;
    const hasValidMovies = movies?.length > 0;

    if (hasValidSeries) {
      const uniqueSeries = removeDuplicates(series);
      setSeries(uniqueSeries);
    }
    
    if (hasValidMovies) {
      const uniqueMovies = removeDuplicates(movies);
      setMovies(uniqueMovies);
    }
  }, [series, movies, setSeries, setMovies]);
};

/**
 * Componente que maneja la sección de tendencias
 * Inicializa el store con los datos proporcionados y renderiza el header
 */
export const TrendingSection = ({ series, movies }: TrendingSectionProps) => {
  useTrendingInitialization(series, movies);
  return <TrendingHeader />;
}; 