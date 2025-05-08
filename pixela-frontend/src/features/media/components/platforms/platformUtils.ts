import { WatchProvider } from '../../types';

// Mapeo de plataformas a URLs
export const PLATFORM_URLS: Record<string, string> = {
  "netflix": "https://www.netflix.com",
  "disneyplus": "https://www.disneyplus.com",
  "disney+": "https://www.disneyplus.com",
  "primevideo": "https://www.primevideo.com",
  "amazonprimevideo": "https://www.primevideo.com",
  "amazon": "https://www.primevideo.com",
  "hbo": "https://www.hbo.com",
  "hbomax": "https://www.hbomax.com",
  "movistarplus": "https://ver.movistarplus.es",
  "movistar+": "https://ver.movistarplus.es",
  "appletv": "https://tv.apple.com",
  "appletv+": "https://tv.apple.com",
  "filmin": "https://www.filmin.es",
  "youtube": "https://www.youtube.com",
  "youtubepremium": "https://www.youtube.com/premium",
  "rakutentv": "https://rakuten.tv",
  "paramountplus": "https://www.paramountplus.com",
  "paramount+": "https://www.paramountplus.com",
  "crunchyroll": "https://www.crunchyroll.com",
  "skyshowtime": "https://www.skyshowtime.com",
  "atresplayer": "https://www.atresplayer.com",
  "rtve": "https://www.rtve.es",
  "dazn": "https://www.dazn.com",
  "clarovideo": "https://www.clarovideo.com",
  "tivify": "https://tivify.tv/inicio"
};

/**
 * Función para obtener la URL de una plataforma de streaming
 */
export function getPlatformUrl(provider: WatchProvider): string {
    
  // Normalizar el nombre para comparación (minúsculas, sin espacios)
  const normalizedName = provider.nombre.toLowerCase().replace(/\s+/g, '');
  
  // Buscar por nombre normalizado
  const url = PLATFORM_URLS[normalizedName];
  if (url) return url;
  
  // Si no encontramos la URL, intentamos coincidencia parcial
  for (const [key, value] of Object.entries(PLATFORM_URLS)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }
  
  // Como último recurso, construir URL directa
  return `https://www.${normalizedName}.com`;
}

/**
 * Función para abrir una plataforma de streaming
 */
export function openPlatform(provider: WatchProvider): void {
  const url = getPlatformUrl(provider);
  window.open(url, "_blank", "noopener,noreferrer");
} 