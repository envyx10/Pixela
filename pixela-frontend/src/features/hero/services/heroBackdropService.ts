import { getPeliculaById } from "@/api/peliculas/peliculas";
import { getSerieById } from "@/api/series/series";

// Tipo para los medios específicos
export type MediaItem = {
  id: string;
  type: 'movie' | 'serie';
};

// Lista de medios cuyas imágenes queremos mostrar en el Hero
export const featuredMedia: MediaItem[] = [
  { id: "986056",  type: "movie" },  // thunderbolts
  { id: "124364",  type: "serie" },  // From
  { id: "1084199", type: "movie" },  // La acompañante
  { id: "680",     type: "movie" },  // pulp fiction
  { id: "95396",   type: "serie" },  // Severance
  { id: "4607",    type: "serie" },  // lost
];

/**
 * Obtiene las imágenes de fondo de los medios especificados
 * @returns Array de URLs de imágenes de fondo
 */
export async function getFeaturedBackdrops(): Promise<string[]> {
  try {
    // Obtener los datos de cada medio en paralelo
    const mediaPromises = featuredMedia.map(item => {
      if (item.type === 'movie') {
        return getPeliculaById(item.id).catch(err => {
          console.warn(`Error al obtener película ${item.id}:`, err);
          return null;
        });
      } else {
        return getSerieById(item.id).catch(err => {
          console.warn(`Error al obtener serie ${item.id}:`, err);
          return null;
        });
      }
    });

    // Esperar a que todas las promesas se resuelvan
    const mediaResults = await Promise.all(mediaPromises);

    // Extraer las URLs de los backdrops manteniendo el orden original
    return mediaResults
      .filter(Boolean)
      .map(media => media?.backdrop || "")
      .filter(url => url !== "");
  } catch (error) {
    console.error("Error al obtener imágenes de fondo:", error);
    return [];
  }
} 