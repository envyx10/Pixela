import { getPeliculaById } from '@/api/peliculas/peliculas';
import { Pelicula } from '@/features/media/types/content';

/**
 * Obtiene los datos de una película por su ID
 * @param id ID de la película
 * @returns Objeto Pelicula con todos sus datos
 */
export async function getMovieData(id: string): Promise<Pelicula> {
  return await getPeliculaById(id);
} 