import { useEffect } from 'react';
import { useTrendingStore } from '../store/trendingStore';
import type { TrendingSerie, TrendingMovie } from '../types';

/**
 * Hook personalizado para manejar la inicialización del store de tendencias
 * @param {TrendingSerie[]} series - Lista de series en tendencia
 * @param {TrendingMovie[]} movies - Lista de películas en tendencia
 */
export const useTrendingInitialization = (series: TrendingSerie[], movies: TrendingMovie[]) => {
  const { setSeries, setMovies } = useTrendingStore();

  useEffect(() => {
    setSeries(series);
    setMovies(movies);
  }, [series, movies, setSeries, setMovies]);
}; 