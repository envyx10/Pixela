import { getSerieById } from '@/api/series/series';
import { Serie } from '@/features/media/types/content';

/**
 * Obtiene los datos de una serie por su ID
 * @param id ID de la serie
 * @returns Objeto Serie con todos sus datos
 */
export async function getSeriesData(id: string): Promise<Serie> {
  return await getSerieById(id);
} 