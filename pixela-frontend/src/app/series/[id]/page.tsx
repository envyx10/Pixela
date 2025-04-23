import { getSerieById } from '@/api/series/series';
import { MediaDetail } from '@/features/media/components/MediaDetail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface SeriePageProps {
  params: {
    id: string;
  };
}

// En Next.js, se recomienda usar esta estructura para metadatos dinámicos
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  // Asegurarnos de esperar a params antes de acceder a sus propiedades
  const { id } = await params;
  
  try {
    const serie = await getSerieById(id);
    
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
    console.error('Error al generar metadatos para serie:', error);
    return {
      title: 'Serie no encontrada | Pixela',
      description: 'La serie que buscas no existe o no está disponible.',
    };
  }
}

export default async function SeriePage(
  { params }: { params: { id: string } }
) {
  // Asegurarnos de esperar a params antes de acceder a sus propiedades
  const { id } = await params;
  
  try {
    console.log(`Intentando obtener información de la serie con ID: ${id}`);
    const serie = await getSerieById(id);
    console.log(`Serie obtenida: ${serie.titulo}`);
    
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen pb-12">
        <MediaDetail media={serie} />
      </section>
    );
  } catch (error) {
    console.error(`Error al cargar la serie con ID ${id}:`, error);
    notFound();
  }
} 