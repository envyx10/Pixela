import { getPeliculaById } from "@/api/peliculas/peliculas";
import { getSerieById } from "@/api/series/series";
import {
  MediaItem,
  MediaResponse,
  HeroImage,
} from "@/features/hero/types/content";

/**
 * Lista de medios destacados cuyas imágenes se mostrarán en el Hero.
 * Cada medio debe tener un ID válido y un tipo específico.
 */
export const featuredMedia: MediaItem[] = [
  { id: "1317288", type: "movie" },
  { id: "66732", type: "serie" },
  { id: "1233413", type: "movie" },
  { id: "680", type: "movie" },
  { id: "1311031", type: "movie" },
  { id: "4607", type: "serie" },
];

// ✅ Cache simple en memoria para evitar llamadas duplicadas
const mediaCache = new Map<string, MediaResponse | null>();

/**
 * ✅ Función helper para obtener media con cache
 */
async function getMediaWithCache(
  item: MediaItem,
): Promise<MediaResponse | null> {
  const cacheKey = `${item.type}-${item.id}`;

  // Verificar cache
  if (mediaCache.has(cacheKey)) {
    return mediaCache.get(cacheKey) || null;
  }

  try {
    const media =
      item.type === "movie"
        ? await getPeliculaById(item.id)
        : await getSerieById(item.id);

    const result = media as MediaResponse;
    mediaCache.set(cacheKey, result);
    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Error al obtener ${item.type} ${item.id}:`, error);
    }
    mediaCache.set(cacheKey, null);
    return null;
  }
}

/**
 * ✅ Obtiene las imágenes destacadas (backdrop + poster) para el hero con optimizaciones
 * Prioriza velocidad de carga para mostrar las imágenes backdrop como primera impresión
 * @returns {Promise<HeroImage[]>} Array de objetos de imágenes
 */
export async function getFeaturedImages(): Promise<HeroImage[]> {
  try {
    // console.time('[HERO] Carga de imágenes hero');

    // ✅ Procesar todos en paralelo para máxima velocidad
    const allPromises = featuredMedia.map(getMediaWithCache);
    const allResults = await Promise.all(allPromises);

    // ✅ Filtrar y procesar resultados
    const images: HeroImage[] = allResults
      .filter(
        (media): media is MediaResponse =>
          media !== null && !!media.backdrop && !!media.poster,
      )
      .map((media) => ({
        backdrop: media.backdrop!,
        poster: media.poster!,
      }))
      .slice(0, 6); // Máximo 6 imágenes

    return images;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error al obtener imágenes del hero:", error);
    }
    // ✅ Fallback: devolver array vacío
    return [];
  }
}
