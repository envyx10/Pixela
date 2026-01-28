import { Metadata } from 'next';
import { getSeriesData } from './seriesService';

/**
 * Genera los metadatos para la página de series
 * @param params Parámetros de la ruta con el ID de la serie
 * @returns Objeto Metadata para Next.js
 */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const serie = await getSeriesData(id);
    
    return {
      title: `${serie.titulo} | Pixela`,
      description: serie.sinopsis,
      openGraph: {
        title: `${serie.titulo} | Pixela`,
        description: serie.sinopsis,
        images: [serie.poster],
      },
    };
  } catch (error) {
    console.error('Error al obtener los metadatos de la serie:', error);
    return {
      title: 'Serie no encontrada | Pixela',
      description: 'La serie que buscas no existe o no está disponible.',
    };
  }
} 