'use client';

import { useEffect } from 'react';
import { useTrendingStore } from '@/features/trending/store';
import { TrendingSerie } from '@/features/trending/type';
import { TrendingHeader } from './TrendingHeader';

interface TrendingSectionProps {
  series: TrendingSerie[];
}

export const TrendingSection = ({ series }: TrendingSectionProps) => {
  // Obtenemos la función para actualizar el estado
  const setSeries = useTrendingStore((state) => state.setSeries);

  // Inicializamos el store con los datos recibidos
  useEffect(() => {
    if (series && series.length > 0) {
      setSeries(series);
    }
  }, [series, setSeries]);

  // Renderizamos el header (que internamente obtiene los datos del store)
  return <TrendingHeader />;
}; 