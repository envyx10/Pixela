import { getPeliculaById } from '@/api/peliculas/peliculas';
import { MediaPage } from '@/features/media/pages/MediaPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface MoviePageProps {
  params: {
    id: string;
  };
}

// En Next.js, se recomienda usar esta estructura para metadatos dinámicos
export async function generateMetadata(
  { params }: MoviePageProps
): Promise<Metadata> {
  try {
    const pelicula = await getPeliculaById(params.id);
    
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
    console.error('Error al generar metadatos para película:', error);
    return {
      title: 'Película no encontrada | Pixela',
      description: 'La película que buscas no existe o no está disponible.',
    };
  }
}

export default async function MoviePage(
  { params }: MoviePageProps
) {
  try {
    console.log(`Intentando obtener información de la película con ID: ${params.id}`);
    const pelicula = await getPeliculaById(params.id);
    console.log(`Película obtenida: ${pelicula.titulo}`);
    
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen pb-12">
        <MediaPage media={pelicula} />
      </section>
    );
  } catch (error) {
    console.error(`Error al cargar la película con ID ${params.id}:`, error);
    notFound();
  }
} 