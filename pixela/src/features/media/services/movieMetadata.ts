import { Metadata } from 'next';
import { getMovieData } from './movieService';

/**
 * Genera los metadatos para la página de películas
 * @param params Parámetros de la ruta con el ID de la película
 * @returns Objeto Metadata para Next.js
 */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const pelicula = await getMovieData(id);
    
    return {
      title: `${pelicula.titulo} | Pixela`,
      description: pelicula.sinopsis,
      openGraph: {
        title: `${pelicula.titulo} | Pixela`,
        description: pelicula.sinopsis,
        images: [pelicula.poster],
      },
    };
  } catch (error) {
    console.error('Error al obtener los metadatos de la película:', error);
    return {
      title: 'Película no encontrada | Pixela',
      description: 'La película que buscas no existe o no está disponible.',
    };
  }
} 