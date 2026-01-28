'use client';

import { TrendingHeader } from '../ui/TrendingHeader';
import type { TrendingSectionProps } from '@/features/trending/types';
import { useTrendingInitialization } from '@/features/trending/hooks/useTrendingInitialization';


/**
 * Componente que maneja la sección de tendencias
 * Inicializa el store con los datos proporcionados y renderiza el header
 */
export const TrendingSection = ({ series, movies, quote }: TrendingSectionProps) => {
  useTrendingInitialization(series, movies);
  return <TrendingHeader quote={quote} />;
}; 