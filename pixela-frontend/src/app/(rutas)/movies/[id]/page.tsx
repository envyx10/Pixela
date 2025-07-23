import { MediaPage } from '@/features/media/pages/MediaPage';
import { notFound } from 'next/navigation';
import { getMovieData } from '@/features/media/services/movieService';

export { generateMetadata } from '@/features/media/services/movieMetadata';

// Función necesaria para pages dinámicas en Next.js
export async function generateStaticParams() {
  // Retorna un array vacío para permitir generación dinámica
  return [];
}

const PAGE_STYLES = {
  section: "min-h-screen pb-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900"
} as const;

export default async function MoviePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const pelicula = await getMovieData(id);
    
    return (
      <section className={PAGE_STYLES.section}>
        <MediaPage media={pelicula} />
      </section>
    );
  } catch (error) {
    console.error('Error al obtener los datos de la película:', error);
    notFound();
  }
} 