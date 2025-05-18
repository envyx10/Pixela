import { MediaPage } from '@/features/media/pages/MediaPage';
import { notFound } from 'next/navigation';
import { getMovieData } from '@/features/media/services/movieService';

const STYLES = {
  container: 'bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 min-h-screen pb-12',
} as const;

/**
 * Parámetros de la página de película
 */
interface MoviePageParams {
  id: string;
}

/**
 * Página de detalle de una película
 * 
 * @param params - Parámetros de la ruta que incluyen el ID de la película
 * @returns Componente de página de película
 * @throws {notFound} Si la película no existe o hay un error al obtenerla
 */
export default async function MoviePage({ params }: { params: MoviePageParams }) {
  try {
    const movie = await getMovieData(params.id);
    
    return (
      <section className={STYLES.container}>
        <MediaPage media={movie} />
      </section>
    );
  } catch {
    notFound();
  }
}

export { generateMetadata } from '@/features/media/services/movieMetadata'; 