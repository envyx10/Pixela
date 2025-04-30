import { MediaPage } from '@/features/media/pages/MediaPage';
import { notFound } from 'next/navigation';
import { getMovieData } from '@/features/media/services/movieService';

export { generateMetadata } from '@/features/media/services/movieMetadata';

export default async function MoviePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const pelicula = await getMovieData(id);
    
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 min-h-screen pb-12">
        <MediaPage media={pelicula} />
      </section>
    );
  } catch (error) {
    notFound();
  }
} 