import { MediaPage } from '@/features/media/pages/MediaPage';
import { notFound } from 'next/navigation';
import { getSeriesData } from '@/features/media/services/seriesService';

export { generateMetadata } from '@/features/media/services/seriesMetadata';

const PAGE_STYLES = {
  section: "min-h-screen pb-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900"
} as const;

export default async function SeriePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const serie = await getSeriesData(id);
    
    return (
      <section className={PAGE_STYLES.section}>
        <MediaPage media={serie} />
      </section>
    );
  } catch (error) {
    console.error('Error al obtener los datos de la serie:', error);
    notFound();
  }
} 