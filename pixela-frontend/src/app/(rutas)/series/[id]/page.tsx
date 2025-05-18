import { MediaPage } from '@/features/media/pages/MediaPage';
import { notFound } from 'next/navigation';
import { getSeriesData } from '@/features/media/services/seriesService';
import type { JSX } from 'react';

export { generateMetadata } from '@/features/media/services/seriesMetadata';

const STYLES = {
  container: 'bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 min-h-screen pb-12',
} as const;

/**
 * Página de detalle de una serie
 * @param {Object} props - Propiedades del componente
 * @param {Promise<{ id: string }>} props.params - Parámetros de la ruta
 * @returns {Promise<JSX.Element>} Componente de la página de serie
 */
export default async function SeriePage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;
  
  try {
    const serie = await getSeriesData(id);
    
    return (
      <section className={STYLES.container}>
        <MediaPage media={serie} />
      </section>
    );
  } catch {
    notFound();
  }
} 