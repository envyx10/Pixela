import { getPeliculaById } from "@/api/peliculas/peliculas";
import { getSerieById } from "@/api/series/series";

/**
 * Tipo que representa un medio audiovisual (película o serie)
 * @property {string} id - Identificador único del medio
 * @property {'movie' | 'serie'} type - Tipo de medio (película o serie)
 */
export type MediaItem = {
  id: string;
  type: 'movie' | 'serie';
};

/**
 * Lista de medios destacados cuyas imágenes se mostrarán en el Hero.
 * Cada medio debe tener un ID válido y un tipo específico.
 */
export const featuredMedia: MediaItem[] = [
  { id: "986056",  type: "movie" },  // Thunderbolts
  { id: "124364",  type: "serie" },  // From
  { id: "1084199", type: "movie" },  // La acompañante
  { id: "680",     type: "movie" },  // Pulp Fiction
  { id: "95396",   type: "serie" },  // Severance
  { id: "4607",    type: "serie" },  // Lost
];

/**
 * Tipo que representa la respuesta de la API para un medio
 */
type MediaResponse = {
  backdrop?: string;
};

/**
 * Obtiene las imágenes de fondo de los medios especificados en featuredMedia.
 * Realiza las peticiones en paralelo para optimizar el rendimiento.
 * 
 * @returns {Promise<string[]>} Array de URLs de imágenes de fondo
 * @throws {Error} Si ocurre un error al obtener los medios
 */
export async function getFeaturedBackdrops(): Promise<string[]> {
  try {
    const mediaPromises = featuredMedia.map(async (item) => {
      try {
        const media = item.type === 'movie' 
          ? await getPeliculaById(item.id)
          : await getSerieById(item.id);
        return media as MediaResponse;
      } catch (error) {
        console.warn(`Error al obtener ${item.type} ${item.id}:`, error);
        return null;
      }
    });

    const mediaResults = await Promise.all(mediaPromises);

    return mediaResults
      .filter((media): media is MediaResponse => media !== null)
      .map(media => media.backdrop || "")
      .filter(Boolean);
  } catch (error) {
    console.error("Error al obtener imágenes de fondo:", error);
    return [];
  }
} 