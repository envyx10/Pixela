import { getPeliculaById } from "@/api/peliculas/peliculas";
import { getSerieById } from "@/api/series/series";
import { MediaItem, MediaResponse } from "@/features/hero/types/content";

/**
 * Lista de medios destacados cuyas imágenes se mostrarán en el Hero.
 * Cada medio debe tener un ID válido y un tipo específico.
 */
export const featuredMedia: MediaItem[] = [
  { id: "986056",  type: "movie" },  // Thunderbolts
  { id: "1084199", type: "movie" },  // La acompañante
  { id: "124364",  type: "serie" },  // From
  { id: "680",     type: "movie" },  // Pulp Fiction
  { id: "95396",   type: "serie" },  // Severance
  { id: "4607",    type: "serie" },  // Lost
];

// ✅ Cache simple en memoria para evitar llamadas duplicadas
const mediaCache = new Map<string, MediaResponse | null>();

/**
 * ✅ Función helper para obtener media con cache
 */
async function getMediaWithCache(item: MediaItem): Promise<MediaResponse | null> {
  const cacheKey = `${item.type}-${item.id}`;
  
  // Verificar cache
  if (mediaCache.has(cacheKey)) {
    return mediaCache.get(cacheKey) || null;
  }

  try {
    const media = item.type === 'movie' 
      ? await getPeliculaById(item.id)
      : await getSerieById(item.id);
    
    const result = media as MediaResponse;
    mediaCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn(`Error al obtener ${item.type} ${item.id}:`, error);
    mediaCache.set(cacheKey, null);
    return null;
  }
}

/**
 * ✅ Obtiene los fondos destacados para el hero con optimizaciones de rendimiento
 * Prioriza velocidad de carga para mostrar las imágenes backdrop como primera impresión
 * @returns {Promise<string[]>} Array de URLs de imágenes
 */
export async function getFeaturedBackdrops(): Promise<string[]> {
  try {
    // console.time('[HERO] Carga de imágenes backdrop');
    
    // ✅ Procesar todos en paralelo para máxima velocidad (primera impresión)
    // Aumentamos la concurrencia para que las imágenes se carguen inmediatamente
    const allPromises = featuredMedia.map(getMediaWithCache);
    const allResults = await Promise.all(allPromises);

    // ✅ Filtrar y procesar resultados
    const backdrops = allResults
      .filter((media): media is MediaResponse => media !== null && !!media.backdrop)
      .map(media => media.backdrop!)
      .filter(Boolean)
      .slice(0, 6); // Máximo 6 imágenes para el hero

    try {
      // console.timeEnd('[HERO] Carga de imágenes backdrop');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error al finalizar el timer:', error);
      }
    }
    
    return backdrops;

  } catch (error) {
    console.error("Error al obtener imágenes de fondo:", error);
    // ✅ Fallback: devolver array vacío pero no fallar completamente
    return [];
  }
} 